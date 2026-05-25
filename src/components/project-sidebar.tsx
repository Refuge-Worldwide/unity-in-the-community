'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowLink } from '@/components/arrow-link';
import { MaskedScrollArea } from '@/components/masked-scroll-area';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/mock-projects';

export function ProjectSidebar({ currentSlug }: { currentSlug: string }) {
  const currentRef = useRef<HTMLLIElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!currentRef.current) return;
    currentRef.current.scrollIntoView({
      block: 'center',
      behavior: hasMountedRef.current ? 'smooth' : 'auto',
    });
    hasMountedRef.current = true;
  }, [currentSlug]);

  return (
    <aside className="flex flex-col gap-8 md:w-80 md:shrink-0 md:self-start md:sticky md:top-0">
      <ArrowLink href="/projects" transitionTypes={['detail-close']} direction="left">
        Back
      </ArrowLink>
      <nav className="hidden md:block">
        <MaskedScrollArea className="h-[50vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="space-y-4">
            {projects.map((item) => {
              const isCurrent = item.slug === currentSlug;
              return (
                <li key={item.slug} ref={isCurrent ? currentRef : undefined}>
                  {isCurrent ? (
                    <span className="font-medium">{item.title}</span>
                  ) : (
                    <Link
                      href={`/projects/${item.slug}`}
                      className={cn('hover:text-accent text-muted-foreground')}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </MaskedScrollArea>
      </nav>
    </aside>
  );
}
