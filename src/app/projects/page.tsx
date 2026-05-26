import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { formatProjectDateRange, projects, type ProjectPriority } from '@/lib/mock-projects';

const priorityClassMap: Record<ProjectPriority, string> = {
  low: 'md:col-span-4',
  medium: 'md:col-span-6',
  high: 'md:col-span-8',
};

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects">
      <div className="grid content-start items-start gap-6 md:grid-cols-12">
        {projects.map((project) => (
          <article
            key={project.slug}
            className={`self-start space-y-3 ${priorityClassMap[project.priority]}`}
          >
            <Link
              href={`/projects/${project.slug}`}
              transitionTypes={['detail-open']}
              className="relative block overflow-hidden rounded-lg ring-1 ring-inset ring-border/60"
              style={project.imageStyle}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
              <div className="absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:hidden">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {formatProjectDateRange(project)}
                </p>
                <h2 className="text-balance">{project.title}</h2>
                <p className="text-sm">{project.description}</p>
              </div>
            </Link>
            <div className="hidden md:block md:space-y-1">
              <div className="flex flex-row items-center justify-between gap-3">
                <h2>
                  <Link href={`/projects/${project.slug}`} transitionTypes={['detail-open']}>
                    {project.title}
                  </Link>
                </h2>
                <p className="text-sm">{formatProjectDateRange(project)}</p>
              </div>
              <p className="text-sm">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
