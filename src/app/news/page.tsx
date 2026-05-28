import Image from 'next/image';
import Link from 'next/link';
import { ArrowLink } from '@/components/arrow-link';
import { PageLayout } from '@/components/page-layout';
import { formatNewsDate, getNewsArticles } from '@/lib/contentful/news';

export default async function NewsPage() {
  const newsItems = await getNewsArticles();
  if (newsItems.length === 0) {
    return (
      <PageLayout title="News">
        <p className="text-muted-foreground">No news articles yet.</p>
      </PageLayout>
    );
  }

  const [featured, ...rest] = newsItems;

  return (
    <PageLayout title="News">
      <article className="grid gap-6 md:grid-cols-2 md:gap-8">
        <Link
          href={`/news/${featured.slug}`}
          transitionTypes={['detail-open']}
          className="relative block aspect-[16/10] overflow-hidden rounded-md ring-1 ring-inset ring-border/60 md:aspect-[4/3]"
        >
          {featured.coverImage && (
            <Image
              src={featured.coverImage.url}
              alt={featured.coverImage.title ?? featured.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
        </Link>
        <div className="space-y-3">
          <h3 className="md:text-3xl">
            <Link href={`/news/${featured.slug}`} transitionTypes={['detail-open']}>
              {featured.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{formatNewsDate(featured.date)}</p>
          {featured.subtitle && <p>{featured.subtitle}</p>}
          <div className="hidden md:block">
            <ArrowLink
              href={`/news/${featured.slug}`}
              transitionTypes={['detail-open']}
              direction="right"
            >
              Read more
            </ArrowLink>
          </div>
        </div>
      </article>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <article key={item.slug} className="space-y-4">
            <Link
              href={`/news/${item.slug}`}
              transitionTypes={['detail-open']}
              className="relative block aspect-[16/10] overflow-hidden rounded-md ring-1 ring-inset ring-border/60"
            >
              {item.coverImage && (
                <Image
                  src={item.coverImage.url}
                  alt={item.coverImage.title ?? item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
            </Link>
            <div>
              <h3>
                <Link href={`/news/${item.slug}`} transitionTypes={['detail-open']}>
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{formatNewsDate(item.date)}</p>
              {item.subtitle && <p className="mt-2">{item.subtitle}</p>}
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
