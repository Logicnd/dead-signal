import Link from "next/link";
import { cookies } from "next/headers";
import { ProtocolGate } from "@/components/protocol-gate";
import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import {
  ARCHIVE_COOKIE_NAME,
  SEALED_COOKIE_NAME,
  hasObserverAccess,
  hasSealedAccess,
} from "@/lib/auth";
import {
  OBSERVER_ENTRIES,
  OBSERVER_PROTOCOL_SHARDS,
  OBSERVER_SOURCE_CLUES,
} from "@/lib/arg-content";

export default async function ObserverPage() {
  const cookieStore = await cookies();
  const stageTwoOpen = hasObserverAccess(
    cookieStore.get(ARCHIVE_COOKIE_NAME)?.value,
  );
  const stageThreeOpen = hasSealedAccess(
    cookieStore.get(SEALED_COOKIE_NAME)?.value,
  );

  return (
    <>
      <SourceMarkers clues={OBSERVER_SOURCE_CLUES} />
      <SystemShell
        label={stageTwoOpen ? "witness channel" : "observer locked"}
        width="lg"
        footer={
          stageTwoOpen
            ? "the witness buffer has noticed you."
            : "secondary seal required."
        }
      >
        {stageTwoOpen ? (
          <div className="space-y-6">
            <section className="border border-white/8 bg-black/55 p-5 sm:p-6">
              <div className="space-y-4 text-sm leading-7 text-zinc-400">
                <p className="text-[0.64rem] uppercase tracking-[0.42em] text-red-300/70">
                  witness record
                </p>
                {OBSERVER_ENTRIES.map((entry) => (
                  <p key={entry}>{entry}</p>
                ))}
              </div>
            </section>

            {stageThreeOpen ? (
              <section className="border border-white/8 bg-black/55 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                    The final checksum is already accepted. The chamber beyond
                    this point is no longer pretending to be locked.
                  </p>
                  <Link
                    href="/sealed"
                    className="border border-red-500/25 bg-red-500/8 px-4 py-3 text-[0.72rem] uppercase tracking-[0.34em] text-zinc-200 transition hover:border-red-400/45 hover:bg-red-500/12"
                  >
                    enter chamber
                  </Link>
                </div>
              </section>
            ) : (
              <ProtocolGate
                badge="final checksum"
                title="the witness channel expects confirmation"
                description="The last seal accepts a single assembled string. Its prefix lives in the source. Its verdict remains trapped in the shell. Its witness survives in a hidden report route."
                endpoint="/api/gate/observer"
                placeholder="enter assembled checksum"
                buttonLabel="submit checksum"
                redirectFallback="/sealed"
                idleLine="final checksum waiting."
                note="prefix + verdict + witness."
                fieldName="checksum"
                fragments={OBSERVER_PROTOCOL_SHARDS}
              />
            )}
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-7 text-zinc-500">
            <p>secondary seal required.</p>
            <p>the witness channel does not answer directly from the public archive.</p>
          </div>
        )}
      </SystemShell>
    </>
  );
}
