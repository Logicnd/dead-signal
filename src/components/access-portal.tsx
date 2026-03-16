"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_HINTS, CONSOLE_MESSAGES } from "@/lib/arg-content";

declare global {
  interface Window {
    __deadSignalBooted?: boolean;
  }
}

type GateResponse = {
  ok: boolean;
  message: string;
  redirect?: string;
};

export function AccessPortal() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [response, setResponse] = useState("containment corridor waiting.");
  const [hintIndex, setHintIndex] = useState(-1);
  const [submitting, setSubmitting] = useState(false);
  const [hoverMessage, setHoverMessage] = useState(" ");
  const [glitchMessage, setGlitchMessage] = useState(" ");
  const hoverActivatedRef = useRef(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.__deadSignalBooted) {
      return;
    }

    window.__deadSignalBooted = true;

    console.groupCollapsed("[residual intake]");

    const timeouts = CONSOLE_MESSAGES.map((message, index) =>
      window.setTimeout(() => {
        if (message.startsWith("[signal]")) {
          console.log(
            "%c[signal]%c %s",
            "color:#ff5a3c;font-weight:bold;",
            "color:#9ca3af;",
            message.replace("[signal] ", ""),
          );
          return;
        }

        console.log(message);
      }, index * 220),
    );

    const groupTimeout = window.setTimeout(() => {
      console.groupEnd();
    }, CONSOLE_MESSAGES.length * 220 + 180);

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.clearTimeout(groupTimeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const advanceHint = () => {
    setHintIndex((current) =>
      current < ACCESS_HINTS.length - 1 ? current + 1 : current,
    );
  };

  const revealHoverMessage = () => {
    setHoverMessage("the lower seam remembers touch.");

    if (!hoverActivatedRef.current) {
      hoverActivatedRef.current = true;
      advanceHint();
    }

    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoverMessage(" ");
    }, 2600);
  };

  const revealGlitchMessage = () => {
    setGlitchMessage("a second seal waits behind the archive.");
    window.setTimeout(() => {
      setGlitchMessage(" ");
    }, 2400);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setResponse("verifying external phrase.");

    try {
      const gateResponse = await fetch("/api/gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessKey,
        }),
      });

      const result = (await gateResponse.json()) as GateResponse;
      setResponse(result.message);

      if (result.ok) {
        window.setTimeout(() => {
          startTransition(() => {
            router.push(result.redirect ?? "/archive");
          });
        }, 360);

        return;
      }

      advanceHint();
    } catch {
      setResponse("signal interrupted.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_19rem]">
      <section className="relative overflow-hidden border border-white/10 bg-black/55 p-5 sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,82,38,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_30%)]" />
        <div className="absolute -left-12 top-8 h-28 w-28 rounded-full border border-red-500/20 bg-red-500/10 blur-2xl" />
        <div className="relative space-y-5">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="space-y-5">
              <div className="space-y-2.5">
                <p className="text-[0.76rem] uppercase tracking-[0.18em] text-zinc-500">
                  external access request
                </p>
                <h1 className="max-w-2xl text-2xl uppercase tracking-[0.08em] text-zinc-200 sm:text-4xl sm:leading-tight">
                  authentication corridor active.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-zinc-400">
                  The public shell was abandoned in place. It still accepts the
                  first assembled key from visitors who inspect the residue.
                </p>
              </div>

              <form className="max-w-2xl space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="access-key"
                    className="text-[0.78rem] uppercase tracking-[0.14em] text-zinc-500"
                  >
                    enter access key
                  </label>
                  <input
                    id="access-key"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    type="password"
                    inputMode="text"
                    value={accessKey}
                    onChange={(event) => setAccessKey(event.target.value)}
                    className="w-full border border-white/10 bg-black/60 px-4 py-3 text-base text-zinc-200 outline-none transition focus:border-red-400/40"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="border border-red-500/25 bg-red-500/8 px-5 py-3 text-[0.76rem] uppercase tracking-[0.16em] text-zinc-200 transition hover:border-red-400/45 hover:bg-red-500/12 disabled:opacity-50"
                  >
                    {submitting ? "verifying" : "submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      advanceHint();
                      revealGlitchMessage();
                    }}
                    className="border border-white/10 px-5 py-3 text-[0.76rem] uppercase tracking-[0.14em] text-zinc-500 transition hover:border-white/20 hover:text-zinc-300"
                  >
                    inspect status drift
                  </button>
                </div>
              </form>

              <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  "carrier drift 18.4 dB",
                  "seal count 03",
                  "observer state awake",
                ].map((item) => (
                  <p
                    key={item}
                    className="border border-white/8 bg-white/[0.02] px-3 py-3 text-[0.8rem] uppercase tracking-[0.12em] text-zinc-400"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="border border-white/8 bg-black/45 p-4">
                <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
                  corridor map
                </p>
                <div className="mt-3 space-y-2 text-[0.8rem] uppercase tracking-[0.12em] text-zinc-400">
                  <p>public gate active</p>
                  <p>archive seal waiting</p>
                  <p>observer seal latent</p>
                  <p>witness chamber hidden</p>
                </div>
              </div>

              <button
                type="button"
                onClick={advanceHint}
                className="block w-full border border-white/8 bg-white/[0.02] p-4 text-left transition hover:border-red-400/20"
              >
                <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
                  status line
                </p>
                <p className="mt-2 text-[0.86rem] uppercase tracking-[0.12em] text-zinc-300">
                  monitoring / dormant / recursive
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Console and source still disagree with the screen.
                </p>
              </button>
            </div>
          </div>

          <div className="grid gap-2 border-t border-white/8 pt-4 text-[0.8rem] sm:grid-cols-[1fr_auto]">
            <div className="space-y-1">
              <p className="min-h-[1rem] uppercase tracking-[0.12em] text-zinc-500">
                {response}
              </p>
              <p className="min-h-[1rem] uppercase tracking-[0.12em] text-zinc-600">
                {hintIndex >= 0 ? ACCESS_HINTS[hintIndex] : " "}
              </p>
              <p className="min-h-[1rem] uppercase tracking-[0.12em] text-zinc-700">
                {hoverMessage}
              </p>
              <p className="min-h-[1rem] uppercase tracking-[0.12em] text-red-300/55">
                {glitchMessage}
              </p>
            </div>

            <button
              type="button"
              aria-label="calibration seam"
              onClick={() => {
                advanceHint();
                revealGlitchMessage();
              }}
              className="h-2 w-24 self-end bg-gradient-to-r from-transparent via-white/10 to-transparent transition hover:via-red-400/35"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          onMouseEnter={revealHoverMessage}
          className="absolute inset-x-0 bottom-0 h-16"
          data-fragment="archive-behind-first-seal"
        />
      </section>

      <aside className="space-y-4">
        <div className="relative overflow-hidden border border-white/8 bg-black/55 p-4">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,82,38,0.08),transparent_40%)]" />
          <div className="relative">
            <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
              residue
            </p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-zinc-500">
              <p data-shard="observer">fragment retained in source comments</p>
              <p data-shard="article">console carries an article for the watcher</p>
              <p data-shard="listens">transmission route stores the surviving tail</p>
              <p className="text-zinc-700">assemble carefully.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
