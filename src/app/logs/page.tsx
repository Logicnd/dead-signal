import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import { LOG_SOURCE_CLUES, SYSTEM_LOGS } from "@/lib/arg-content";

export default function LogsPage() {
  return (
    <>
      <SourceMarkers clues={LOG_SOURCE_CLUES} />
      <SystemShell
        label="historical records"
        width="lg"
        footer="the logs remember more than the interface admits."
      >
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-4">
            {SYSTEM_LOGS.map((entry) => (
              <article
                key={`${entry.year}-${entry.tag}`}
                className="border border-white/8 bg-black/55 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-2xl uppercase tracking-[0.22em] text-zinc-200">
                      {entry.year}
                    </p>
                    <p className="mt-2 text-[0.66rem] uppercase tracking-[0.42em] text-red-300/70">
                      {entry.tag}
                    </p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                    {entry.entry}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <aside className="space-y-4">
            <div className="border border-white/8 bg-black/55 p-4">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-zinc-600">
                residue map
              </p>
              <div className="mt-4 space-y-3 text-xs leading-6 text-zinc-400">
                <p>/api/system-status answers without complaint.</p>
                <p>/api/transmission preserves the tail of the first key.</p>
                <p>/terminal exposes older verbs than the main shell.</p>
                <p className="text-zinc-600">
                  another route wakes after the archive accepts you.
                </p>
              </div>
            </div>

            <div className="border border-white/8 bg-black/55 p-4">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-zinc-600">
                operator note
              </p>
              <div className="mt-4 space-y-3 text-xs leading-6 text-zinc-500">
                <p>they thought the public gate would slow people down.</p>
                <p>they did not expect the curious ones to use the source itself.</p>
                <p>the archive was never the last lock.</p>
              </div>
            </div>
          </aside>
        </div>
      </SystemShell>
    </>
  );
}
