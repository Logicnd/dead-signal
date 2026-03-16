import { InterfaceTabs } from "@/components/interface-tabs";
import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import { LOG_SOURCE_CLUES, SYSTEM_LOGS } from "@/lib/arg-content";

export default function LogsPage() {
  const earlyLogs = SYSTEM_LOGS.slice(0, 3);
  const laterLogs = SYSTEM_LOGS.slice(3);

  return (
    <>
      <SourceMarkers clues={LOG_SOURCE_CLUES} />
      <SystemShell
        label="historical records"
        width="lg"
        footer="the logs remember more than the interface admits."
      >
        <InterfaceTabs
          items={[
            {
              id: "early",
              label: "2003-2012",
              content: (
                <section className="space-y-4">
                  {earlyLogs.map((entry) => (
                    <article
                      key={`${entry.year}-${entry.tag}`}
                      className="border border-white/8 bg-black/55 p-5 sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-2xl uppercase tracking-[0.22em] text-zinc-200">
                            {entry.year}
                          </p>
                          <p className="mt-2 text-[0.76rem] uppercase tracking-[0.16em] text-red-300/70">
                            {entry.tag}
                          </p>
                        </div>
                        <p className="max-w-3xl text-base leading-7 text-zinc-400">
                          {entry.entry}
                        </p>
                      </div>
                    </article>
                  ))}
                </section>
              ),
            },
            {
              id: "late",
              label: "2017-2026",
              content: (
                <section className="space-y-4">
                  {laterLogs.map((entry) => (
                    <article
                      key={`${entry.year}-${entry.tag}`}
                      className="border border-white/8 bg-black/55 p-5 sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-2xl uppercase tracking-[0.22em] text-zinc-200">
                            {entry.year}
                          </p>
                          <p className="mt-2 text-[0.76rem] uppercase tracking-[0.16em] text-red-300/70">
                            {entry.tag}
                          </p>
                        </div>
                        <p className="max-w-3xl text-base leading-7 text-zinc-400">
                          {entry.entry}
                        </p>
                      </div>
                    </article>
                  ))}
                </section>
              ),
            },
            {
              id: "residue",
              label: "Residue",
              content: (
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_1fr]">
                  <div className="border border-white/8 bg-black/55 p-4">
                    <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
                      residue map
                    </p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
                      <p>/api/system-status answers without complaint.</p>
                      <p>/api/transmission preserves the tail of the first key.</p>
                      <p>/terminal exposes older verbs than the main shell.</p>
                      <p className="text-zinc-600">
                        another route wakes after the archive accepts you.
                      </p>
                    </div>
                  </div>

                  <div className="border border-white/8 bg-black/55 p-4">
                    <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
                      operator note
                    </p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-500">
                      <p>they thought the public gate would slow people down.</p>
                      <p>they did not expect the curious ones to use the source itself.</p>
                      <p>the archive was never the last lock.</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </SystemShell>
    </>
  );
}
