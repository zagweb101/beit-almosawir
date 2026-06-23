/**
 * تحليلات قابلة للتفعيل دون كود إضافي:
 * - Plausible: اضبط VITE_PLAUSIBLE_DOMAIN (مثل baytalmosawer.net)
 * - Google Analytics 4: اضبط VITE_GA_MEASUREMENT_ID (مثل G-XXXXXXX)
 * لا يُحقن أي شيء إن لم تُضبط المتغيرات.
 */
export default function Analytics() {
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

  return (
    <>
      {plausibleDomain ? (
        <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
      ) : null}

      {gaId ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
