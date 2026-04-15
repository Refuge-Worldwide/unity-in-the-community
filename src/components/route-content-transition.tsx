'use client';

import { useEffect, useState } from 'react';
import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';

type RouteContentTransitionProps = {
  children: React.ReactNode;
};

export function RouteContentTransition({ children }: RouteContentTransitionProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mdBreakpoint =
      getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim() ||
      '48rem';
    const mediaQuery = window.matchMedia(`(max-width: calc(${mdBreakpoint} - 0.001rem))`);
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);

    return () => {
      mediaQuery.removeEventListener('change', updateMobileState);
    };
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ViewTransition
      key={pathname}
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        default: 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        default: 'none',
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
