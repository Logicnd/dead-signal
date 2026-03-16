import type { ReactNode } from "react";
import { ViewportFit } from "@/components/viewport-fit";

type SystemShellProps = {
  label: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: "sm" | "md" | "lg";
};

const widthClasses: Record<NonNullable<SystemShellProps["width"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
};

export function SystemShell({
  label,
  children,
  footer,
  width = "md",
}: SystemShellProps) {
  return (
    <main className="relative isolate h-dvh overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="signal-grid absolute inset-0 opacity-35" />
        <div className="signal-noise absolute inset-0" />
        <div className="signal-rise absolute -left-[12%] top-[15%] h-80 w-80 rounded-full border border-red-500/10 bg-red-500/5 blur-3xl" />
        <div className="signal-rise absolute bottom-[8%] right-[6%] h-72 w-72 rounded-full border border-white/5 bg-white/[0.03] blur-3xl [animation-delay:-6s]" />
        <div className="signal-orbit absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />
        <div className="signal-orbit absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/10 [animation-duration:24s] [animation-direction:reverse]" />
        <div className="signal-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-red-500/12 to-transparent blur-3xl" />
        <div className="absolute inset-x-[12%] top-[18%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute inset-y-[14%] left-[16%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <ViewportFit>
        <div className={`relative z-10 mx-auto w-full ${widthClasses[width]}`}>
          <div className="relative overflow-hidden border border-white/10 bg-black/70 shadow-[0_0_120px_rgba(255,72,32,0.08)] backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,88,46,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%)]" />
            <div className="absolute inset-0 border border-red-500/10" />
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <div className="absolute right-8 top-6 hidden text-right text-[0.62rem] uppercase tracking-[0.42em] text-zinc-700 sm:block">
              <p>ext relay 03</p>
              <p className="mt-2">latency unstable</p>
            </div>

            <div className="relative p-4 sm:p-6">
              <div className="flex items-start justify-between gap-6 border-b border-white/8 pb-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.36em] text-red-400/80 signal-flicker">
                    residual intake
                  </p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.28em] text-zinc-500">
                    {label}
                  </p>
                </div>
                <div className="text-right text-[0.62rem] uppercase tracking-[0.38em] text-zinc-700 sm:hidden">
                  <p>relay 03</p>
                </div>
              </div>

              <div className="mt-4">{children}</div>

              {footer ? (
                <div className="mt-5 border-t border-white/8 pt-3 text-[0.6rem] uppercase tracking-[0.2em] text-zinc-600">
                  {footer}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ViewportFit>
    </main>
  );
}
