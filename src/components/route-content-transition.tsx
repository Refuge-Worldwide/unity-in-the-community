'use client';

import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';

type RouteContentTransitionProps = {
  children: React.ReactNode;
};

/**
 * Key by route-tree level, not full pathname, so that nested layout boundaries
 * (e.g. /projects → /projects/[slug]) trigger a transition, but sibling slugs
 * (/projects/a → /projects/b) keep their shared layout mounted.
 */
function getTransitionKey(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if (segments.length === 1) return `/${segments[0]}`;
  return `/${segments[0]}/[slug]`;
}

export function RouteContentTransition({ children }: RouteContentTransitionProps) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={getTransitionKey(pathname)}
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'detail-open': 'detail-open',
        'detail-close': 'detail-close',
        default: 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'detail-open': 'detail-open',
        'detail-close': 'detail-close',
        default: 'none',
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
