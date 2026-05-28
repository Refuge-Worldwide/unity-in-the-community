import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLink } from '@/components/arrow-link';
import { RichText } from '@/components/rich-text';
import { getProjectBySlug } from '@/lib/contentful/projects';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-8 md:gap-12">
      <header className="space-y-2">
        {project.timeframe && (
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            {project.timeframe}
          </p>
        )}
        <h1 className="mb-0">{project.title}</h1>
      </header>

      {project.image && (
        <Image
          src={project.image.url}
          alt={project.image.title ?? project.title}
          width={project.image.width}
          height={project.image.height}
          className="h-auto w-full rounded-lg ring-1 ring-inset ring-border/60"
        />
      )}

      {project.description && (
        <article className="prose w-full">
          <RichText content={project.description} />
        </article>
      )}

      {project.link && (
        <ArrowLink href={project.link} direction="right">
          {project.linkText ?? 'Learn more'}
        </ArrowLink>
      )}
    </section>
  );
}
