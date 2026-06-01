'use client';

import { usePathname } from 'next/navigation';

function getBackgroundImage(pathname: string): string | null {
  if (pathname === '/') return null;
  if (pathname.startsWith('/about')) return '/backgrounds/about.svg';
  if (pathname.startsWith('/events')) return '/backgrounds/events.svg';
  if (pathname.startsWith('/news')) return '/backgrounds/news.svg';
  if (pathname.startsWith('/projects')) return '/backgrounds/projects.svg';
  if (pathname.startsWith('/support-us')) return '/backgrounds/support-us.svg';
  return '/backgrounds/default.svg';
}

export function RouteBackground() {
  const pathname = usePathname();
  const image = getBackgroundImage(pathname);
  if (!image) return null;

  return (
    <div
      aria-hidden
      className="site-bg-layer"
      style={{
        backgroundImage: `url('${image}')`,
      }}
    />
  );
}
