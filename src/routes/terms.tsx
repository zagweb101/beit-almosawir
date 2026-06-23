import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site-config";

const title = "الشروط والأحكام | أكاديمية بيت المصور";
const description =
  "الشروط والأحكام الخاصة بالتسجيل في دورات أكاديمية بيت المصور واستخدام الموقع.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE.siteUrl}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl" dir="rtl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">الشروط والأحكام</h1>
      <p className="text-sm text-muted-foreground mb-8">
        آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
      </p>

      <div className="space-y-8 leading-loose text-foreground/90">
        <Section title="قبول الشروط">
          باستخدامك لموقع أكاديمية بيت المصور والتسجيل في دوراتها، فإنك توافق على هذه الشروط والأحكام.
        </Section>

        <Section title="التسجيل في الدورات">
          <ul className="list-disc ps-6 space-y-1">
            <li>يُعتمد التسجيل بعد تأكيد الأكاديمية للمقعد واستيفاء الرسوم وفق المتاح.</li>
            <li>الأسعار والمواعيد المعروضة قابلة للتحديث، ويتم تأكيدها مع فريق الأكاديمية عند التسجيل.</li>
            <li>قد تتطلب بعض الدورات حدًا أدنى من المتدربين لانعقادها.</li>
          </ul>
        </Section>

        <Section title="الدفع والإلغاء">
          تُوضّح سياسة الدفع والاسترداد عند التسجيل لكل دورة. في حال إلغاء الأكاديمية لدورة، يحق
          للمتدرب إعادة الجدولة أو استرداد الرسوم وفق السياسة المعلنة.
        </Section>

        <Section title="الملكية الفكرية">
          جميع المحتويات التدريبية والمواد والصور المعروضة في الدورات وعلى الموقع مملوكة لأكاديمية بيت
          المصور، ولا يجوز إعادة نشرها أو استخدامها تجاريًا دون إذن خطّي.
        </Section>

        <Section title="سلوك المتدرب">
          يلتزم المتدرب بالسلوك المهني واحترام المدربين وزملائه أثناء الدورات، وللأكاديمية الحق في
          إنهاء مشاركة من يخالف ذلك.
        </Section>

        <Section title="تعديل الشروط">
          تحتفظ الأكاديمية بحق تعديل هذه الشروط في أي وقت، ويسري التعديل فور نشره على الموقع.
        </Section>

        <Section title="التواصل">
          لأي استفسار، تواصل معنا عبر واتساب على الرقم <span dir="ltr">+{SITE.whatsappNumber}</span>.
        </Section>

        <p className="text-xs text-muted-foreground">
          ملاحظة: هذه شروط أولية يُنصح بمراجعتها قانونيًا قبل الاعتماد النهائي.
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
