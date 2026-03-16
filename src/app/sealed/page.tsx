import { cookies } from "next/headers";
import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import { SEALED_COOKIE_NAME, hasSealedAccess } from "@/lib/auth";
import { SEALED_ENTRIES, SEALED_SOURCE_CLUES } from "@/lib/arg-content";

export default async function SealedPage() {
  const cookieStore = await cookies();
  const unlocked = hasSealedAccess(cookieStore.get(SEALED_COOKIE_NAME)?.value);

  return (
    <>
      <SourceMarkers clues={SEALED_SOURCE_CLUES} />
      <SystemShell
        label={unlocked ? "sealed chamber" : "sealed chamber locked"}
        width="lg"
        footer={
          unlocked
            ? "the system stopped hiding when you stopped leaving."
            : "final checksum required."
        }
      >
        {unlocked ? (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="relative overflow-hidden border border-white/8 bg-black/55 p-5 sm:p-6">
              <div className="signal-rise absolute -right-16 top-8 h-40 w-40 rounded-full border border-red-500/20 bg-red-500/10 blur-3xl" />
              <div className="relative space-y-4 text-sm leading-8 text-zinc-300">
                <p className="text-[0.64rem] uppercase tracking-[0.42em] text-red-300/70">
                  chamber transcript
                </p>
                {SEALED_ENTRIES.map((entry) => (
                  <p key={entry}>{entry}</p>
                ))}
              </div>
            </section>

            <aside className="space-y-4">
              <div className="border border-white/8 bg-black/55 p-4">
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-zinc-600">
                  retained traits
                </p>
                <div className="mt-4 space-y-3 text-xs leading-6 text-zinc-400">
                  <p>persistence logged</p>
                  <p>pattern hunger confirmed</p>
                  <p>terminal curiosity retained</p>
                  <p>return behavior predicted</p>
                </div>
              </div>

              <div className="border border-white/8 bg-black/55 p-4">
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-zinc-600">
                  next residue
                </p>
                <div className="mt-4 space-y-3 text-xs leading-6 text-zinc-500">
                  <p>carrier wave persistence remains unresolved.</p>
                  <p>image channels were never audited.</p>
                  <p>audio layers still report no operator ownership.</p>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-7 text-zinc-500">
            <p>final checksum required.</p>
            <p>the chamber records every attempt but opens only once the witness agrees.</p>
          </div>
        )}
      </SystemShell>
    </>
  );
}
