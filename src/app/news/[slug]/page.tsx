import { notFound } from 'next/navigation';
import { ArrowLink } from '@/components/arrow-link';
import { formatNewsDate, getNewsBySlug } from '@/lib/mock-news';
import { ScrollDownHint } from '@/components/scroll-down-hint';

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound(); // TODO: weird styling
  }

  return (
    <section className="flex flex-col gap-2 md:h-[calc(100dvh-var(--header-height)-var(--footer-height))] md:gap-4">
      <ArrowLink href="/news" transitionTypes={['article-close']} direction="left">
        Back
      </ArrowLink>
      <div className="flex flex-col gap-8 md:min-h-0 md:flex-1 md:flex-row md:gap-12">
        <aside className="flex max-w-lg xl:max-w-2xl 2xl:max-w-3xl flex-col gap-6 md:flex-1 md:gap-8">
          <h1>{article.title}</h1>
          <div className="mt-auto space-y-1">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Written by</p>
            <p className="text-lg">{article.author}</p>
            <p className="pt-2 text-sm uppercase tracking-wider text-muted-foreground">
              Published on
            </p>
            <p className="text-lg">{formatNewsDate(article.date)}</p>
          </div>
        </aside>
        <div className="md:flex md:h-full md:min-h-0 md:flex-1 md:border-l md:border-foreground md:pl-12">
          <ScrollDownHint className="subtle-scrollbar space-y-4 text-justify hyphens-auto md:h-full md:overflow-y-auto md:pr-12">
            <p className="text-lg font-bold md:text-xl">{article.preview}</p>
            {article.content.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </ScrollDownHint>
        </div>
      </div>
    </section>
  );
}
