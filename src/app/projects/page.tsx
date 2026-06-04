import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { RevealContainer, RevealItem } from '@/components/scroll-reveal';
import { getProjects } from '@/lib/contentful/content/projects';
import type { ProjectPriority } from '@/lib/contentful/types';
import { ProjectCardDesktopImage, ProjectCardMobile } from './project-card';

const priorityClassMap: Record<ProjectPriority, string> = {
  low: 'md:col-span-4',
  medium: 'md:col-span-6',
  high: 'md:col-span-8',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageLayout title="Projects">
      <RevealContainer className="grid content-start items-start gap-2 md:grid-cols-12 md:gap-8">
        {projects.map((project, index) => (
          <RevealItem
            key={project.slug}
            className={`self-start space-y-3 ${priorityClassMap[project.priority]}`}
          >
            <div className="md:hidden">
              <ProjectCardMobile project={project} alignRight={index % 2 === 1} />
            </div>
            <ProjectCardDesktopImage project={project} />
            <div className="hidden md:block md:space-y-1">
              {project.timeframe && (
                <p className="tracking-wider text-muted-foreground">{project.timeframe}</p>
              )}
              <h2>
                <Link href={`/projects/${project.slug}`} transitionTypes={['detail-open']}>
                  {project.title}
                </Link>
              </h2>
            </div>
          </RevealItem>
        ))}
      </RevealContainer>
    </PageLayout>
  );
}
