import { notFound } from 'next/navigation';
import { formatProjectDateRange, getProjectBySlug } from '@/lib/mock-projects';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-8 md:gap-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          {formatProjectDateRange(project)}
        </p>
        <h1 className="mb-0">{project.title}</h1>
      </header>

      <article className="w-full space-y-6">
        <p className="text-lg font-medium md:text-xl">{project.description}</p>
        {project.body.map((block, idx) => {
          if (block.type === 'paragraph') {
            return (
              <p key={idx} className="text-justify hyphens-auto">
                {block.text}
              </p>
            );
          }
          return (
            <figure key={idx} className="space-y-2">
              <div
                className="overflow-hidden rounded-lg ring-1 ring-inset ring-border/60"
                style={block.style}
              />
              {block.caption && (
                <figcaption className="text-sm text-muted-foreground">{block.caption}</figcaption>
              )}
            </figure>
          );
        })}
      </article>
    </section>
  );
}
