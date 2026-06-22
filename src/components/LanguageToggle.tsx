import { useT } from "@/lib/i18n";
import { Switch } from "@/components/ui/switch";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { lang, setLang } = useT();
  const isEn = lang === "en";
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md border border-border/50 bg-secondary/40">
      <Languages className="size-3.5 text-muted-foreground" />
      <span
        className={`text-xs font-semibold ${!isEn ? "text-foreground" : "text-muted-foreground"}`}
      >
        ع
      </span>
      <Switch
        checked={isEn}
        onCheckedChange={(c) => setLang(c ? "en" : "ar")}
        aria-label="Toggle language"
      />
      <span
        className={`text-xs font-semibold ${isEn ? "text-foreground" : "text-muted-foreground"}`}
      >
        EN
      </span>
    </div>
  );
}
