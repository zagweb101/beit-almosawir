import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site-config";

const title = "سياسة الخصوصية | أكاديمية بيت المصور";
const description =
  "سياسة الخصوصية لأكاديمية بيت المصور: كيف نجمع بياناتك ونستخدمها ونحميها عند التواصل والتسجيل في الدورات.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE.siteUrl}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl" dir="rtl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">سياسة الخصوصية</h1>
      <p className="text-sm text-muted-foreground mb-8">
        آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
      </p>

      <div className="space-y-8 leading-loose text-foreground/90">
        <Section title="مقدمة">
          تحترم أكاديمية بيت المصور خصوصية زوّارها وعملائها. توضّح هذه السياسة أنواع البيانات التي
          نجمعها وكيفية استخدامها وحمايتها عند استخدامك لموقعنا أو التواصل معنا أو التسجيل في دوراتنا.
        </Section>

        <Section title="البيانات التي نجمعها">
          <ul className="list-disc ps-6 space-y-1">
            <li>الاسم ورقم الجوال والبريد الإلكتروني عند تعبئة نماذج التواصل أو الاهتمام بالدورات.</li>
            <li>الدورة التي تهتم بها وتفضيلاتك المتعلقة بالموعد.</li>
            <li>بيانات تقنية عامة (مثل نوع المتصفح وصفحات الزيارة) لأغراض تحسين الموقع.</li>
          </ul>
        </Section>

        <Section title="كيف نستخدم بياناتك">
          <ul className="list-disc ps-6 space-y-1">
            <li>التواصل معك بخصوص الدورة التي أبديت اهتمامك بها وتأكيد التفاصيل والأسعار والمواعيد.</li>
            <li>الرد على استفساراتك وتقديم الدعم.</li>
            <li>تحسين خدماتنا ومحتوى الموقع.</li>
          </ul>
        </Section>

        <Section title="مشاركة البيانات">
          لا نبيع بياناتك الشخصية لأي طرف ثالث. قد تتم مشاركة بياناتك مع فريق الأكاديمية عبر قنوات
          التواصل (مثل واتساب) لغرض خدمتك فقط، وبموافقتك عند إرسال النموذج.
        </Section>

        <Section title="حماية البيانات والاحتفاظ بها">
          نتخذ إجراءات تقنية وتنظيمية معقولة لحماية بياناتك. نحتفظ بالبيانات للمدة اللازمة لتحقيق
          أغراض التواصل والخدمة، أو وفق ما يتطلبه النظام.
        </Section>

        <Section title="حقوقك">
          يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها بالتواصل معنا عبر القنوات الرسمية
          الموضّحة في الموقع.
        </Section>

        <Section title="التواصل">
          لأي استفسار يخص الخصوصية، تواصل معنا عبر واتساب على الرقم{" "}
          <span dir="ltr">+{SITE.whatsappNumber}</span>.
        </Section>

        <p className="text-xs text-muted-foreground">
          ملاحظة: هذه سياسة أولية يُنصح بمراجعتها قانونيًا قبل الاعتماد النهائي.
        </p>
      </div>

      <div className="mt-10">
        <Link to="/" className="text-primary underline">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
