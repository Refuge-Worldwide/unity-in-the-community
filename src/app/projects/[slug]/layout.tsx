import { ProjectSidebar } from '@/components/project-sidebar';

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-20">
      <ProjectSidebar currentSlug={slug} />
      {children}
    </div>
  );
}
