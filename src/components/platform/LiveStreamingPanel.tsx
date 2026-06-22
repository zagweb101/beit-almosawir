import { useState } from "react";
import { ExternalLink, Radio, Video } from "lucide-react";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { usePlatform } from "@/lib/platform/context";
import { cn } from "@/lib/utils";

export default function LiveStreamingPanel() {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { liveSessions } = usePlatform();
  const [activeId, setActiveId] = useState(liveSessions[0]?.id ?? "");
  const session = liveSessions.find((s) => s.id === activeId) ?? liveSessions[0];

  if (!session) {
    return <p className="text-muted-foreground">{pt.noThreads}</p>;
  }

  const title = lang === "ar" ? session.title.ar : session.title.en;
  const statusLabel =
    session.status === "live" ? pt.liveNow : session.status === "ended" ? pt.ended : pt.scheduled;

  return (
    <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] gap-6 min-w-0">
      <ul className="space-y-2">
        {liveSessions.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setActiveId(s.id)}
              className={cn(
                "w-full text-start rounded-xl border px-4 py-3 transition-colors",
                s.id === session.id
                  ? "border-primary/40 bg-primary/10"
                  : "border-border/60 hover:bg-secondary/30",
              )}
            >
              <div className="font-semibold text-sm break-words">
                {lang === "ar" ? s.title.ar : s.title.en}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {s.provider === "zoom" ? pt.zoomTab : pt.webrtcTab}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="card-elegant rounded-2xl p-5 sm:p-6 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {session.provider === "zoom" ? (
            <Video className="size-5 text-primary" />
          ) : (
            <Radio className="size-5 text-primary" />
          )}
          <h2 className="text-xl font-bold break-words">{title}</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
            {statusLabel}
          </span>
        </div>

        {session.provider === "zoom" && session.zoomUrl ? (
          <div className="space-y-4">
            <a
              href={session.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
            >
              {pt.joinLive}
              <ExternalLink className="size-4" />
            </a>
            <div className="aspect-video rounded-xl overflow-hidden border border-border bg-black/20">
              <iframe
                title={title}
                src={session.zoomUrl.replace("/j/", "/wc/join/")}
                className="w-full h-full"
                allow="camera; microphone; fullscreen"
              />
            </div>
          </div>
        ) : null}

        {session.provider === "webrtc" && session.webrtcRoom ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground break-words">
              {lang === "ar"
                ? "انضم بالكاميرا والمايك مباشرة من المتصفح."
                : "WebRTC room via Jitsi — join with camera and mic directly in your browser."}
            </p>
            <a
              href={`https://meet.jit.si/${session.webrtcRoom}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
            >
              {pt.joinLive}
              <ExternalLink className="size-4" />
            </a>
            <div className="aspect-video rounded-xl overflow-hidden border border-border">
              <iframe
                title={title}
                src={`https://meet.jit.si/${session.webrtcRoom}#config.prejoinPageEnabled=false`}
                className="w-full h-full"
                allow="camera; microphone; fullscreen; display-capture"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
