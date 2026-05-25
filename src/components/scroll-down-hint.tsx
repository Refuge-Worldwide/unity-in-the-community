'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type ScrollDownHintProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollDownHint({ children, className }: ScrollDownHintProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
      setVisible(remaining > 16);
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

  const maskStyle = visible
    ? {
        maskImage: 'linear-gradient(to bottom, black calc(100% - 4rem), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 4rem), transparent 100%)',
      }
    : undefined;

  return (
    <div className="relative md:h-full md:min-h-0 md:flex-1">
      <div ref={scrollRef} className={className} style={maskStyle}>
        {children}
      </div>
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 hidden justify-center pb-2 transition-opacity duration-300 md:flex',
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
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
    </div>
  );
}
