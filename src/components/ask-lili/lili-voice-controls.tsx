import { Volume2, VolumeX } from "lucide-react";
import { useLili } from "@/lib/lili/context";
import { liliTts } from "@/lib/lili/tts";

export default function LiliVoiceControls() {
  const { voiceEnabled, toggleVoice } = useLili();
  const supported = liliTts.isSupported();

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggleVoice}
      className="size-9 rounded-lg border border-border/50 inline-flex items-center justify-center hover:bg-secondary/40"
      aria-label={voiceEnabled ? "كتم الصوت" : "تشغيل الصوت"}
      title={voiceEnabled ? "كتم الصوت" : "تشغيل الصوت"}
    >
      {voiceEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4 opacity-60" />}
    </button>
  );
}
