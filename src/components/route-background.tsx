'use client';

import { usePathname } from 'next/navigation';
import type { PageBackgrounds } from '@/lib/contentful/content/page-backgrounds';

function pickBackground(pathname: string, backgrounds: PageBackgrounds | null): string | null {
  if (pathname === '/') return null;
  if (pathname.startsWith('/about')) return backgrounds?.about ?? null;
  if (pathname.startsWith('/events')) return backgrounds?.events ?? null;
  if (pathname.startsWith('/news')) return backgrounds?.news ?? null;
  if (pathname.startsWith('/projects')) return backgrounds?.projects ?? null;
  if (pathname.startsWith('/support-us')) return backgrounds?.supportUs ?? null;
  if (pathname.startsWith('/imprint')) return backgrounds?.imprint ?? null;
  if (pathname.startsWith('/privacy-policy')) return backgrounds?.privacyPolicy ?? null;
  return null;
}

export function RouteBackground({ backgrounds }: { backgrounds: PageBackgrounds | null }) {
  const pathname = usePathname();
  const image = pickBackground(pathname, backgrounds);
  if (!image) return null;

  return (
    <>
      <div
        aria-hidden
        className="site-bg-layer"
        style={{
          backgroundImage: `url('${image}')`,
          filter: 'blur(6px)',
          transform: 'scale(1.1)',
          viewTransitionName: 'route-background',
        }}
      />
      <div
        aria-hidden
        className="site-bg-layer bg-black/60"
        style={{ viewTransitionName: 'route-background-overlay' }}
      />
    </>
  );
}
