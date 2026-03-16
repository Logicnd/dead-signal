import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import { TerminalConsole } from "@/components/terminal-console";
import { TERMINAL_SOURCE_CLUES } from "@/lib/arg-content";

export default function TerminalPage() {
  return (
    <>
      <SourceMarkers clues={TERMINAL_SOURCE_CLUES} />
      <SystemShell
        label="legacy shell"
        width="lg"
        footer="responses are partial. some channels only answer after earlier seals."
      >
        <TerminalConsole />
      </SystemShell>
    </>
  );
}
