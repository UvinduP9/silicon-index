import type { ReactNode } from "react";

/**
 * Site header: wordmark, metric tabs, then view controls pushed to the right.
 * Below 900px the tabs drop to their own scrollable row.
 */
export function TopBar({
  tabs,
  actions,
  wordmark = "Silicon Index",
  href = "/",
}: {
  tabs?: ReactNode;
  actions?: ReactNode;
  wordmark?: string;
  href?: string;
}) {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-line px-gutter py-3.5 min-[900px]:flex-nowrap min-[900px]:gap-7 min-[900px]:py-4">
      <a
        href={href}
        className="text-lead font-wordmark whitespace-nowrap [font-variation-settings:'opsz'_24]"
      >
        {wordmark}
      </a>
      {tabs ? (
        <div className="order-3 -mx-gutter w-[calc(100%+2*var(--gutter))] overflow-x-auto px-gutter min-[900px]:order-none min-[900px]:mx-0 min-[900px]:w-auto min-[900px]:px-0">
          {tabs}
        </div>
      ) : null}
      <div className="flex-1" />
      {actions ? (
        <div className="flex items-center gap-2.5">{actions}</div>
      ) : null}
    </header>
  );
}
