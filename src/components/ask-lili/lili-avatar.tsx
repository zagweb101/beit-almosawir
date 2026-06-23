import { useLili } from "@/lib/lili/context";
import { AssistantAvatar } from "@/lib/lili/avatars";

export default function LiliAvatar({ className = "size-10" }: { className?: string }) {
  const { settings } = useLili();
  return (
    <AssistantAvatar
      avatar={settings.avatar}
      name={settings.assistantName}
      className={className}
    />
  );
}
