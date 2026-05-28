import { notFound } from 'next/navigation';
import { ArrowLink } from '@/components/arrow-link';
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
    <section className="flex flex-col gap-2 md:h-[calc(100dvh-var(--header-height)-var(--footer-height))] md:gap-4">
      <ArrowLink href="/news" transitionTypes={['detail-close']} direction="left">
        Back
      </ArrowLink>
      <div className="flex flex-col gap-8 md:min-h-0 md:flex-1 md:flex-row md:gap-12">
        <aside className="flex max-w-lg xl:max-w-2xl 2xl:max-w-3xl flex-col gap-6 md:flex-1 md:gap-8">
          <h1>{article.title}</h1>
          <div className="mt-auto space-y-1">
            {article.author && (
              <>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">Written by</p>
                <p className="text-lg">{article.author}</p>
              </>
            )}
            <p className="pt-2 text-sm uppercase tracking-wider text-muted-foreground">Date</p>
            <p className="text-lg">{formatNewsDate(article.date)}</p>
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
