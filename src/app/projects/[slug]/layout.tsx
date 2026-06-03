import { ProjectSidebar } from './project-sidebar';
import { MaskedScrollArea } from '@/components/masked-scroll-area';
import { getProjects } from '@/lib/contentful/content/projects';

export default async function ProjectDetailLayout({
  children,
  params,
}: LayoutProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const projects = await getProjects();
  const sidebarProjects = projects.map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <div className="flex flex-col md:h-[calc(100dvh-var(--header-height)-var(--footer-height-nested))] md:flex-row md:gap-20">
      <ProjectSidebar currentSlug={slug} projects={sidebarProjects} />
      <MaskedScrollArea className="hide-scrollbar md:h-full md:overflow-y-auto">
        {children}
      </MaskedScrollArea>
    </div>
  );
}
