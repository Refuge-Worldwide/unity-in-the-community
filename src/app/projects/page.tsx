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
            </Link>
            <div className="space-y-1">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-3">
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
