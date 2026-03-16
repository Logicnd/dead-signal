"use client";

import { useState } from "react";
import {
  TERMINAL_BOOT_LINES,
  TERMINAL_COMMAND_OUTPUTS,
} from "@/lib/arg-content";

type TerminalCommand =
  keyof typeof TERMINAL_COMMAND_OUTPUTS | "clear";

export function TerminalConsole() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>(() => [...TERMINAL_BOOT_LINES]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = command.trim().toLowerCase() as TerminalCommand;
    if (!normalized) {
      return;
    }

    if (normalized === "clear") {
      setHistory([...TERMINAL_BOOT_LINES]);
      setCommand("");
      return;
    }

    const response =
      normalized in TERMINAL_COMMAND_OUTPUTS
        ? TERMINAL_COMMAND_OUTPUTS[
            normalized as keyof typeof TERMINAL_COMMAND_OUTPUTS
          ]
        : ["command not recognized."];

    setHistory((current) => [...current, `> ${normalized}`, ...response]);
    setCommand("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="relative overflow-hidden border border-white/10 bg-black/55 p-5 sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,82,38,0.1),transparent_30%)]" />
        <div className="relative">
          <div className="h-[26rem] overflow-y-auto border border-white/8 bg-black/55 p-4 text-base leading-7 text-zinc-300">
            {history.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>

          <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              className="flex-1 border border-white/10 bg-black/65 px-4 py-3 text-base text-zinc-200 outline-none transition focus:border-red-400/40"
              placeholder="enter command"
            />
            <button
              type="submit"
              className="border border-red-500/25 bg-red-500/8 px-5 py-3 text-[0.76rem] uppercase tracking-[0.16em] text-zinc-200 transition hover:border-red-400/45 hover:bg-red-500/12"
            >
              run
            </button>
          </form>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="border border-white/8 bg-black/55 p-4">
          <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
            residual verbs
          </p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
            <p>help reveals the shell surface.</p>
            <p>trace exposes route residue.</p>
            <p>pulse, verdict, witness, and mirror keep stranger fragments.</p>
          </div>
        </div>

        <div className="border border-white/8 bg-black/55 p-4">
          <p className="text-[0.76rem] uppercase tracking-[0.16em] text-zinc-600">
            shell warning
          </p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-500">
            <p>the shell speaks more plainly than the interface.</p>
            <p>some responses remain useless until earlier seals are opened.</p>
            <p>not all decoded fragments belong to the same gate.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
