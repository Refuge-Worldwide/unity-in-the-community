import { ProjectSidebar } from './project-sidebar';
import { getProjects } from '@/lib/contentful/content/projects';

export default async function ProjectDetailLayout({
  children,
  params,
}: LayoutProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const projects = await getProjects();
  const sidebarProjects = projects.map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-20">
      <ProjectSidebar currentSlug={slug} projects={sidebarProjects} />
      <div className="md:flex-1">{children}</div>
    </div>
  );
}
