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
      <div
        aria-hidden
        className="site-bg-layer opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          viewTransitionName: 'route-background-grain',
        }}
      />
    </>
  );
}
