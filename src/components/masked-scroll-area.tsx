'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const FADE = '3rem';

type MaskedScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
  showScrollButton?: boolean;
};

export function MaskedScrollArea({
  children,
  className,
  showScrollButton = true,
}: MaskedScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      setFadeTop(el.scrollTop > 0);
      setFadeBottom(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      resizeObserver.disconnect();
    };
  }, []);

  const maskImage = (() => {
    if (!fadeTop && !fadeBottom) return undefined;
    const top = fadeTop
      ? `transparent 0, rgba(0,0,0,0.5) calc(${FADE} / 2), black ${FADE}`
      : `black 0`;
    const bottom = fadeBottom
      ? `black calc(100% - ${FADE}), rgba(0,0,0,0.5) calc(100% - ${FADE} / 2), transparent 100%`
      : `black 100%`;
    return `linear-gradient(to bottom, ${top}, ${bottom})`;
  })();

  const maskStyle = maskImage ? { maskImage, WebkitMaskImage: maskImage } : undefined;

  return (
    <div className="relative md:h-full md:min-h-0 md:w-fit md:flex-1">
      <div ref={scrollRef} className={className} style={maskStyle}>
        {children}
      </div>
      {showScrollButton && (
        <>
          <div
            className={cn(
              'absolute inset-x-0 top-0 hidden justify-center pt-2 transition-opacity duration-300 md:flex',
              fadeTop ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <button
              type="button"
              aria-label="Scroll up"
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                el.scrollBy({ top: -el.clientHeight * 0.8, behavior: 'smooth' });
              }}
              className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronUp className="size-8" />
            </button>
          </div>
          <div
            className={cn(
              'absolute inset-x-0 bottom-0 hidden justify-center pb-2 transition-opacity duration-300 md:flex',
              fadeBottom ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <button
              type="button"
              aria-label="Scroll down"
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                el.scrollBy({ top: el.clientHeight * 0.8, behavior: 'smooth' });
              }}
              className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronDown className="size-8" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
