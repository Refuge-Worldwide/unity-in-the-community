'use client';

import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';

type RouteContentTransitionProps = {
  children: React.ReactNode;
};

export function RouteContentTransition({ children }: RouteContentTransitionProps) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'article-open': 'article-open',
        'article-close': 'article-close',
        default: 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'article-open': 'article-open',
        'article-close': 'article-close',
        default: 'none',
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
