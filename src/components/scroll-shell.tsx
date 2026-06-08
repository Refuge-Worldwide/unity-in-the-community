'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type ScrollShellProps = {
  children: React.ReactNode;
};

function isAncestor(parent: string, child: string): boolean {
  return child !== parent && child.startsWith(parent === '/' ? '/' : `${parent}/`);
}

export function ScrollShell({ children }: ScrollShellProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef(pathname);
  const scrollPositions = useRef(new Map<string, number>());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const trackedPathname = pathname;
    const handleScroll = () => {
      if (previousPathname.current !== trackedPathname) {
        return;
      }
      scrollPositions.current.set(trackedPathname, container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (isAncestor(pathname, previousPathname.current)) {
      container.scrollTop = scrollPositions.current.get(pathname) ?? 0;
    } else {
      container.scrollTop = 0;
    }

    previousPathname.current = pathname;
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="subtle-scrollbar fixed z-10 flex w-full overflow-y-auto overflow-x-hidden top-[var(--banner-height)] h-[calc(100dvh-var(--banner-height))] pt-[var(--header-height)]"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) -5%, rgba(0,0,0,0.2) calc(var(--header-height) * 0.3), rgba(0,0,0,0.5) calc(var(--header-height) * 0.6), rgba(0,0,0,0.85) calc(var(--header-height) * 0.85), black calc(var(--header-height) * 1.15))',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) -5%, rgba(0,0,0,0.2) calc(var(--header-height) * 0.3), rgba(0,0,0,0.5) calc(var(--header-height) * 0.6), rgba(0,0,0,0.85) calc(var(--header-height) * 0.85), black calc(var(--header-height) * 1.15))',
      }}
    >
      {children}
    </div>
  );
}
