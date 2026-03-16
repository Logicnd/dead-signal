"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

type GateResponse = {
  ok: boolean;
  message: string;
  redirect?: string;
};

type ProtocolFragment = {
  label: string;
  value: string;
};

type ProtocolGateProps = {
  badge: string;
  title: string;
  description: string;
  endpoint: string;
  placeholder: string;
  buttonLabel: string;
  redirectFallback: string;
  idleLine: string;
  note: string;
  fieldName: string;
  fragments: readonly ProtocolFragment[];
};

export function ProtocolGate({
  badge,
  title,
  description,
  endpoint,
  placeholder,
  buttonLabel,
  redirectFallback,
  idleLine,
  note,
  fieldName,
  fragments,
}: ProtocolGateProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [response, setResponse] = useState(idleLine);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setResponse("parsing sequence.");

    try {
      const gateResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [fieldName]: value,
        }),
      });

      const result = (await gateResponse.json()) as GateResponse;
      setResponse(result.message);

      if (result.ok) {
        window.setTimeout(() => {
          startTransition(() => {
            router.push(result.redirect ?? redirectFallback);
          });
        }, 360);
      }
    } catch {
      setResponse("signal interrupted.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden border border-white/10 bg-black/55 p-5 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,82,38,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_25%)]" />
      <div className="signal-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-red-500/10 to-transparent blur-3xl" />

      <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.16em] text-red-300/70">
              {badge}
            </p>
            <h2 className="mt-2 text-2xl uppercase tracking-[0.08em] text-zinc-200 sm:text-[1.9rem]">
              {title}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-400">
              {description}
            </p>
          </div>

          <form className="max-w-3xl space-y-4" onSubmit={handleSubmit}>
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={placeholder}
              className="w-full border border-white/10 bg-black/65 px-4 py-3 text-base text-zinc-200 outline-none transition focus:border-red-400/40"
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="border border-red-500/25 bg-red-500/8 px-5 py-3 text-[0.76rem] uppercase tracking-[0.16em] text-zinc-200 transition hover:border-red-400/45 hover:bg-red-500/12 disabled:opacity-50"
              >
                {submitting ? "parsing" : buttonLabel}
              </button>
              <p className="flex items-center text-[0.76rem] uppercase tracking-[0.12em] text-zinc-600">
                {note}
              </p>
            </div>
          </form>

          <div className="space-y-1 border-t border-white/8 pt-4 text-[0.78rem] uppercase tracking-[0.12em]">
            <p className="min-h-[1rem] text-zinc-500">{response}</p>
            <p className="text-zinc-700">incorrect formatting is forgiven. incorrect assembly is not.</p>
          </div>
        </div>

        <div className="border border-white/8 bg-white/[0.02] p-4">
          <p className="text-[0.76rem] uppercase tracking-[0.14em] text-zinc-600">
            fragments
          </p>
          <div className="mt-3 space-y-3">
          {fragments.map((fragment) => (
            <div
              key={fragment.label}
              className="border border-white/8 bg-black/30 p-3"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.14em] text-zinc-600">
                {fragment.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {fragment.value}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
