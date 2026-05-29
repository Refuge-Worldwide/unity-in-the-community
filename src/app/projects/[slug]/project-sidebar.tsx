'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { BackLink } from '@/components/back-link';
import { MaskedScrollArea } from '@/components/masked-scroll-area';
import { cn } from '@/lib/utils';

type SidebarProject = { slug: string; title: string };

export function ProjectSidebar({
  currentSlug,
  projects,
}: {
  currentSlug: string;
  projects: SidebarProject[];
}) {
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
    <aside className="flex flex-col md:w-80 md:shrink-0 md:self-start md:sticky md:top-0">
      <BackLink href="/projects">Back</BackLink>
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
