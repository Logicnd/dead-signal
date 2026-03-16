import { SystemShell } from "@/components/system-shell";

export default function NotFound() {
  return (
    <SystemShell label="null route" width="sm">
      <div className="space-y-3 text-sm leading-7 text-zinc-500">
        <p>resource unavailable.</p>
        <p>the system noted the request.</p>
      </div>
    </SystemShell>
  );
}
