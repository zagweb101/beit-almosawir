let speaking = false;

function stripForSpeech(text: string) {
  return text
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/\n+/g, " ")
    .replace(/https?:\/\S+/g, "")
    .trim();
}

export const liliTts = {
  isSupported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  },
  isSpeaking() {
    return speaking;
  },
  stop() {
    if (!liliTts.isSupported()) return;
    window.speechSynthesis.cancel();
    speaking = false;
  },
  speak(text: string, enabled: boolean) {
    if (!enabled || !liliTts.isSupported()) return;
    const clean = stripForSpeech(text);
    if (!clean) return;
    liliTts.stop();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "ar-SA";
    utter.rate = 0.95;
    utter.onend = () => {
      speaking = false;
    };
    utter.onerror = () => {
      speaking = false;
    };
    speaking = true;
    window.speechSynthesis.speak(utter);
  },
};
