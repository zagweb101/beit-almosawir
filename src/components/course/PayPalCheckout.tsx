import { useEffect, useRef, useState } from "react";
import {
  capturePaypalOrderFn,
  createPaypalOrderFn,
  getCoursePaymentInfoFn,
  getPaymentConfigFn,
} from "@/lib/payments/actions.server";

type Status = "loading" | "ready" | "paid" | "error" | "hidden";

let sdkPromise: Promise<void> | null = null;

function loadPaypalSdk(clientId: string, currency: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as unknown as { paypal?: unknown }).paypal) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId,
    )}&currency=${encodeURIComponent(currency)}&intent=capture`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PAYPAL_SDK_LOAD_FAILED"));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export default function PayPalCheckout({ courseSlug }: { courseSlug: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [note, setNote] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const [config, info] = await Promise.all([
          getPaymentConfigFn(),
          getCoursePaymentInfoFn({ data: { slug: courseSlug } }),
        ]);
        if (cancelled) return;

        if (!config.enabled || !info.paypalEnabled || !info.payable || !config.clientId) {
          setStatus("hidden");
          return;
        }

        setNote(
          info.currency !== info.paypalCurrency
            ? `يُحصَّل ${info.paypalAmount.toFixed(2)} ${info.paypalCurrency} عبر PayPal`
            : "",
        );

        await loadPaypalSdk(config.clientId, info.paypalCurrency);
        if (cancelled || renderedRef.current) return;

        const paypal = (window as unknown as { paypal?: PaypalNamespace }).paypal;
        if (!paypal || !containerRef.current) {
          setStatus("error");
          return;
        }

        renderedRef.current = true;
        setStatus("ready");
        paypal
          .Buttons({
            style: { layout: "vertical", color: "gold", shape: "rect", label: "pay" },
            createOrder: async () => {
              const res = await createPaypalOrderFn({ data: { courseSlug } });
              return res.paypalOrderId;
            },
            onApprove: async (data: { orderID: string }) => {
              const res = await capturePaypalOrderFn({
                data: { paypalOrderId: data.orderID },
              });
              if (res.ok) setStatus("paid");
              else {
                setStatus("error");
                setNote("تعذّر إتمام الدفع. حاول مرة أخرى أو تواصل معنا.");
              }
            },
            onError: () => {
              setStatus("error");
              setNote("حدث خطأ في الدفع. حاول لاحقًا أو تواصل عبر واتساب.");
            },
          })
          .render(containerRef.current);
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseSlug]);

  if (status === "hidden") return null;

  if (status === "paid") {
    return (
      <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-center">
        تم الدفع بنجاح 🌷 سيتواصل معك فريق بيت المصور لتأكيد التسجيل.
      </div>
    );
  }

  return (
    <div className={status === "ready" ? "mt-4" : ""}>
      {status === "ready" ? (
        <>
          <div className="text-xs text-center text-muted-foreground mb-2">
            أو ادفع وسجّل مباشرة عبر PayPal
          </div>
          {note ? (
            <div className="text-[11px] text-center text-muted-foreground mb-2">{note}</div>
          ) : null}
        </>
      ) : null}
      <div ref={containerRef} />
      {status === "error" ? (
        <div className="mt-3 text-xs text-center text-destructive">
          {note || "تعذّر تحميل الدفع."}
        </div>
      ) : null}
    </div>
  );
}

type PaypalNamespace = {
  Buttons: (config: unknown) => { render: (el: HTMLElement) => void };
};
