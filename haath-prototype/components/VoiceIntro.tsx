"use client";

import { useState } from "react";

export function VoiceIntro({ name, seconds }: { name: string; seconds: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="voice">
      <button
        type="button"
        className="voice-btn"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? `Stop ${name}'s voice intro` : `Play ${name}'s voice intro`}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        )}
      </button>
      <div className="voice-meta">
        <span>{name}&rsquo;s voice intro</span>
        <span className="voice-track">
          <span
            className={playing ? "voice-fill playing" : "voice-fill"}
            style={{ animationDuration: `${seconds}s` }}
            onAnimationEnd={() => setPlaying(false)}
          />
        </span>
        <span className="muted small">0:{String(seconds).padStart(2, "0")} {playing && "(sample, no sound in prototype)"}</span>
      </div>
    </div>
  );
}
