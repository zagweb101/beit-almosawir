/**
 * طبقة Adapter لمزود LLM مستقبلي.
 * حاليًا تستخدم لي لي المحرك القائم على المعرفة في responder.ts
 */
export type LlmMessage = { role: "system" | "user" | "assistant"; content: string };

export type LlmProvider = {
  streamChat: (messages: LlmMessage[]) => AsyncIterable<string>;
};

export function createLlmProvider(): LlmProvider | null {
  const key = import.meta.env.VITE_LILI_LLM_API_KEY;
  if (!key) return null;
  return {
    async *streamChat() {
      yield "";
    },
  };
}
