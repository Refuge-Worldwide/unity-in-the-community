import Image from 'next/image';
import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { getProjects } from '@/lib/contentful/projects';
import type { ProjectPriority } from '@/lib/contentful/types';

const priorityClassMap: Record<ProjectPriority, string> = {
  low: 'md:col-span-4',
  medium: 'md:col-span-6',
  high: 'md:col-span-8',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageLayout title="Projects">
      <div className="grid content-start items-start gap-2 md:gap-6 md:grid-cols-12">
        {projects.map((project) => (
          <article
            key={project.slug}
            className={`self-start space-y-3 ${priorityClassMap[project.priority]}`}
          >
            <Link
              href={`/projects/${project.slug}`}
              transitionTypes={['detail-open']}
              className="relative block overflow-hidden rounded-lg ring-1 ring-inset ring-border/60"
            >
              {project.image && (
                <Image
                  src={project.image.url}
                  alt={project.image.title ?? project.title}
                  width={project.image.width}
                  height={project.image.height}
                  className="h-auto w-full"
                />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
              <div className="absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:hidden">
                {project.timeframe && (
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {project.timeframe}
                  </p>
                )}
                <h2 className="text-balance">{project.title}</h2>
              </div>
            </Link>
            <div className="hidden md:block md:space-y-1">
              {project.timeframe && (
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {project.timeframe}
                </p>
              )}
              <h2>
                <Link href={`/projects/${project.slug}`} transitionTypes={['detail-open']}>
                  {project.title}
                </Link>
              </h2>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
