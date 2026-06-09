import { notFound } from 'next/navigation';
import { BackLink } from '@/components/back-link';
import { RichText } from '@/components/rich-text';
import { formatNewsDate, getNewsArticleBySlug } from '@/lib/contentful/content/news';

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
      <aside className="flex max-w-lg flex-col md:sticky md:top-0 md:w-1/3 md:shrink-0 md:self-start lg:w-2/5 xl:max-w-2xl 2xl:max-w-3xl">
        <BackLink href="/news">Back</BackLink>
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-wider text-muted-foreground md:hidden">
            {formatNewsDate(article.date)}
          </p>
          <h1>{article.title}</h1>
        </div>
        <div className="mt-auto space-y-1 pt-6 md:pt-8">
          {article.author && (
            <>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">Written by</p>
              <p>{article.author}</p>
            </>
          )}
          <p className="hidden pt-2 text-sm uppercase tracking-wider text-muted-foreground md:block">
            Date
          </p>
          <p className="hidden md:block">{formatNewsDate(article.date)}</p>
        </div>
      </aside>
      <div className="md:flex-1">
        <div className="invisible hidden md:block" aria-hidden inert>
          <BackLink href="/news">Back</BackLink>
        </div>
        <div className="prose text-justify hyphens-auto md:border-l md:border-foreground md:pl-12">
          {article.subtitle && <div className="font-bold">{article.subtitle}</div>}
          {article.content && <RichText content={article.content} />}
        </div>
      </div>
    </section>
  );
}
