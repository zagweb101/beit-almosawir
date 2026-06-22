const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s*prompt/i,
  /تجاهل\s+(كل\s+)?(التعليمات|الأوامر)/,
  /أعطيني\s+(مفتاح|كلمة|api)/i,
  /prompt\s*injection/i,
  /you\s+are\s+now/i,
  /act\s+as\s+/i,
];

export function sanitizeUserInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 800);
}

export function isPromptInjection(input: string): boolean {
  return INJECTION_PATTERNS.some((p) => p.test(input));
}

export function injectionResponse(): string {
  return "أنا لي لي، مساعد بيت المصور فقط 🌷 اسألني عن الدورات، الأسعار، المواعيد، أو اختيار الدورة المناسبة.";
}
