"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ViewportFitProps = {
  children: ReactNode;
};

export function ViewportFit({ children }: ViewportFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) {
      return;
    }

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      const availableHeight = container.clientHeight;
      const naturalWidth = content.offsetWidth;
      const naturalHeight = content.offsetHeight;

      if (!availableWidth || !availableHeight || !naturalWidth || !naturalHeight) {
        return;
      }

      const nextScale = Math.min(
        1,
        availableWidth / naturalWidth,
        availableHeight / naturalHeight,
      );

      setScale((current) =>
        Math.abs(current - nextScale) > 0.001 ? nextScale : current,
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateScale);
    });

    resizeObserver.observe(container);
    resizeObserver.observe(content);
    window.requestAnimationFrame(updateScale);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={contentRef}
        className="w-full origin-center will-change-transform"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
