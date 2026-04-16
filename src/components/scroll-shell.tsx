'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type ScrollShellProps = {
  children: React.ReactNode;
};

export function ScrollShell({ children }: ScrollShellProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTop = 0;
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="subtle-scrollbar fixed z-10 flex h-dvh w-full overflow-y-auto overflow-x-hidden pt-[var(--header-height)]"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0, black var(--header-height))',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, black var(--header-height))',
      }}
    >
      {children}
    </div>
  );
}
