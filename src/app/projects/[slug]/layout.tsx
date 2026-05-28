import { ProjectSidebar } from '@/components/project-sidebar';
import { getProjects } from '@/lib/contentful/projects';

export default async function ProjectDetailLayout({
  children,
  params,
}: LayoutProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const projects = await getProjects();
  const sidebarProjects = projects.map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-20">
      <ProjectSidebar currentSlug={slug} projects={sidebarProjects} />
      {children}
    </div>
  );
}
