import Link from "next/link";
import { cookies } from "next/headers";
import { ProtocolGate } from "@/components/protocol-gate";
import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import {
  ACCESS_COOKIE_NAME,
  ARCHIVE_COOKIE_NAME,
  hasArchiveAccess,
  hasObserverAccess,
} from "@/lib/auth";
import {
  ARCHIVE_ENTRIES,
  ARCHIVE_PROTOCOL_SHARDS,
  ARCHIVE_SOURCE_CLUES,
} from "@/lib/arg-content";

export default async function ArchivePage() {
  const cookieStore = await cookies();
  const stageOneOpen = hasArchiveAccess(
    cookieStore.get(ACCESS_COOKIE_NAME)?.value,
  );
  const stageTwoOpen = hasObserverAccess(
    cookieStore.get(ARCHIVE_COOKIE_NAME)?.value,
  );

  return (
    <>
      <SourceMarkers clues={ARCHIVE_SOURCE_CLUES} />
      <SystemShell
        label={stageOneOpen ? "archive threshold" : "archive locked"}
        width="lg"
        footer={
          stageOneOpen
            ? "first seal acknowledged. deeper seals remain reactive."
            : "authorization required."
        }
      >
        {stageOneOpen ? (
          <div className="space-y-6">
            <section className="border border-white/8 bg-black/55 p-5 sm:p-6">
              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <p className="text-[0.64rem] uppercase tracking-[0.42em] text-red-300/70">
                    retained narrative
                  </p>
                  <div className="space-y-4 text-sm leading-7 text-zinc-400">
                    {ARCHIVE_ENTRIES.map((entry) => (
                      <p key={entry}>{entry}</p>
                    ))}
                  </div>
                </div>

                <div className="border border-white/8 bg-white/[0.02] p-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.42em] text-zinc-600">
                    archive behavior
                  </p>
                  <div className="mt-4 space-y-3 text-xs leading-6 text-zinc-500">
                    <p>the first key only proves you can assemble fragments.</p>
                    <p>the second seal listens for a phrase built from the reply layer.</p>
                    <p>spacing and punctuation are ignored. assembly is not.</p>
                  </div>
                </div>
              </div>
            </section>

            {stageTwoOpen ? (
              <section className="border border-white/8 bg-black/55 p-5 sm:p-6">
                <p className="text-[0.64rem] uppercase tracking-[0.42em] text-red-300/70">
                  secondary seal
                </p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                    The second phrase has already been accepted. The witness
                    channel is now exposed beyond the archive.
                  </p>
                  <Link
                    href="/observer"
                    className="border border-red-500/25 bg-red-500/8 px-4 py-3 text-[0.72rem] uppercase tracking-[0.34em] text-zinc-200 transition hover:border-red-400/45 hover:bg-red-500/12"
                  >
                    continue inward
                  </Link>
                </div>
              </section>
            ) : (
              <ProtocolGate
                badge="second seal"
                title="the archive expects a reply phrase"
                description="The next layer does not want the first key again. It wants the phrase built from the archive comment, the pulse count, and the route that only wakes after the first seal."
                endpoint="/api/gate/archive"
                placeholder="enter assembled phrase"
                buttonLabel="submit phrase"
                redirectFallback="/observer"
                idleLine="secondary seal waiting."
                note="inspect comments, then query the handshake."
                fieldName="phrase"
                fragments={ARCHIVE_PROTOCOL_SHARDS}
              />
            )}
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-7 text-zinc-500">
            <p>authorization required.</p>
            <p>the archive does not answer without the first verified key.</p>
          </div>
        )}
      </SystemShell>
    </>
  );
}
