'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RevealImage } from '@/components/scroll-reveal';
import type { ProjectSummary } from '@/lib/contentful/types';

export function ProjectCardMobile({
  project,
  alignRight,
}: {
  project: ProjectSummary;
  alignRight: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={['detail-open']}
      className="relative block overflow-hidden rounded-sm"
    >
      {project.image && (
        <RevealImage>
          <Image
            src={project.image.url}
            alt={project.image.title ?? project.title}
            width={project.image.width}
            height={project.image.height}
            className="aspect-[3/2] w-full object-cover"
          />
        </RevealImage>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
      <div
        className={`absolute inset-x-0 bottom-0 space-y-1 p-2 ${alignRight ? 'text-right' : ''}`}
      >
        {project.timeframe && (
          <p className="tracking-wider text-muted-foreground">{project.timeframe}</p>
        )}
        <h2 className="text-balance">{project.title}</h2>
      </div>
    </Link>
  );
}

export function ProjectCardDesktopImage({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={['detail-open']}
      className="relative hidden overflow-hidden rounded-sm md:block md:rounded-md md:ring-1 md:ring-inset md:ring-border/60"
    >
      {project.image && (
        <RevealImage>
          <Image
            src={project.image.url}
            alt={project.image.title ?? project.title}
            width={project.image.width}
            height={project.image.height}
            className="aspect-[3/2] w-full object-cover"
          />
        </RevealImage>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
    </Link>
  );
}
