"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type InterfaceTabsProps = {
  items: readonly TabItem[];
  defaultTab?: string;
};

export function InterfaceTabs({ items, defaultTab }: InterfaceTabsProps) {
  const firstTab = items[0]?.id ?? "";
  const [activeTab, setActiveTab] = useState(defaultTab ?? firstTab);

  const currentTab =
    items.find((item) => item.id === activeTab) ?? items[0];

  if (!currentTab) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b border-white/8 pb-3">
        {items.map((item) => {
          const isActive = item.id === currentTab.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`border px-4 py-2 text-[0.76rem] uppercase tracking-[0.14em] transition ${
                isActive
                  ? "border-red-400/35 bg-red-500/10 text-zinc-100"
                  : "border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div>{currentTab.content}</div>
    </div>
  );
}
