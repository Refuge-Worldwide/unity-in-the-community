import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { RevealContainer, RevealItem } from '@/components/scroll-reveal';
import { getProjects } from '@/lib/contentful/content/projects';
import { ProjectCardDesktopImage, ProjectCardMobile } from './project-card';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageLayout title="Projects">
      <RevealContainer className="grid content-start items-start gap-2 md:grid-cols-12 md:gap-8">
        {projects.map((project, index) => (
          <RevealItem
            key={project.slug}
            className="self-start space-y-4 md:col-span-6 2xl:col-span-4"
          >
            <div className="md:hidden">
              <ProjectCardMobile project={project} alignRight={index % 2 === 1} />
            </div>
            <ProjectCardDesktopImage project={project} />
            <div className="hidden md:block md:space-y-0">
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
