'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const INTERVAL_MS = 5000;
const FADE_MS = 1200;

export function HomeBackground({ photos }: { photos: string[] }) {
  const pathname = usePathname();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * photos.length));

  useEffect(() => {
    if (photos.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [photos.length]);

  if (pathname !== '/' || photos.length === 0) return null;

  return (
    <>
      <div aria-hidden className="site-bg-layer">
        {photos.map((url, i) => (
          <div
            key={url}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity ease-in-out"
            style={{
              backgroundImage: `url('${url}')`,
              opacity: i === index ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[calc(var(--header-height)+2rem)] bg-gradient-to-b from-black/70 to-transparent"
      />
    </>
  );
}
