import { notFound } from 'next/navigation';
import { BackLink } from '@/components/back-link';
import { MaskedScrollArea } from '@/components/masked-scroll-area';
import { RichText } from '@/components/rich-text';
import { formatNewsDate, getNewsArticleBySlug } from '@/lib/contentful/news';

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex flex-col md:h-[calc(100dvh-var(--header-height)-var(--footer-height))]">
      <BackLink href="/news">Back</BackLink>
      <div className="flex flex-col gap-8 md:min-h-0 md:flex-1 md:flex-row md:gap-12">
        <aside className="flex max-w-lg flex-col gap-6 md:w-1/3 md:shrink-0 md:gap-8 lg:w-2/5 xl:max-w-2xl 2xl:max-w-3xl">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-wider text-muted-foreground md:hidden">
              {formatNewsDate(article.date)}
            </p>
            <h1>{article.title}</h1>
          </div>
          <div className="mt-auto space-y-1">
            {article.author && (
              <>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">Written by</p>
                <p className="text-lg">{article.author}</p>
              </>
            )}
            <p className="hidden pt-2 text-sm uppercase tracking-wider text-muted-foreground md:block">
              Date
            </p>
            <p className="hidden text-lg md:block">{formatNewsDate(article.date)}</p>
          </div>
        </aside>
        <div className="md:flex md:h-full md:min-h-0 md:flex-1 md:border-l md:border-foreground md:pl-12">
          <MaskedScrollArea className="subtle-scrollbar prose text-justify hyphens-auto md:h-full md:overflow-y-auto md:pr-12">
            {article.subtitle && <p className="text-lg font-bold md:text-xl">{article.subtitle}</p>}
            {article.content && <RichText content={article.content} />}
          </MaskedScrollArea>
        </div>
      </div>
    </section>
  );
}
