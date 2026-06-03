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
      block: hasMountedRef.current ? 'nearest' : 'center',
      behavior: hasMountedRef.current ? 'smooth' : 'auto',
    });
    hasMountedRef.current = true;
  }, [currentSlug]);

  return (
    <aside className="flex flex-col md:h-full md:w-80 lg:w-96 2xl:w-115 md:shrink-0">
      <BackLink href="/projects">Back</BackLink>
      <nav className="hidden md:mt-6 md:block">
        <MaskedScrollArea
          showScrollButton={false}
          className="h-[50vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul>
            {projects.map((item) => {
              const isCurrent = item.slug === currentSlug;
              return (
                <li
                  key={item.slug}
                  ref={isCurrent ? currentRef : undefined}
                  className={cn(
                    'border-l py-2 pl-4',
                    isCurrent ? 'border-foreground' : 'border-foreground/20'
                  )}
                >
                  {isCurrent ? (
                    <span className="font-medium">{item.title}</span>
                  ) : (
                    <Link
                      href={`/projects/${item.slug}`}
                      className={cn('hover:text-foreground text-muted-foreground')}
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
