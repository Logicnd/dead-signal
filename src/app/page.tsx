import { AccessPortal } from "@/components/access-portal";
import { SourceMarkers } from "@/components/source-markers";
import { SystemShell } from "@/components/system-shell";
import { HOME_SOURCE_CLUES } from "@/lib/arg-content";

export default function Home() {
  return (
    <>
      <SourceMarkers clues={HOME_SOURCE_CLUES} />
      <SystemShell label="authentication required" width="lg">
        <AccessPortal />
      </SystemShell>
    </>
  );
}
