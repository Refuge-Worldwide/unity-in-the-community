import Image from 'next/image';
import Link from 'next/link';
import { ArrowLink } from '@/components/arrow-link';
import { PageLayout } from '@/components/page-layout';
import { RevealContainer, RevealImage, RevealItem } from '@/components/scroll-reveal';
import { formatNewsDate, getNewsArticles } from '@/lib/contentful/content/news';

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
      <RevealContainer className="space-y-3 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        <Link
          href={`/news/${featured.slug}`}
          transitionTypes={['detail-open']}
          className="relative block aspect-[16/10] overflow-hidden rounded-sm md:aspect-[4/3] md:rounded-md md:ring-1 md:ring-inset md:ring-border/60"
        >
          {featured.coverImage && (
            <RevealImage className="absolute inset-0">
              <Image
                src={featured.coverImage.url}
                alt={featured.coverImage.title ?? featured.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </RevealImage>
          )}
          <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)] md:block" />
        </Link>
        <RevealItem as="div" className="space-y-1 md:space-y-3">
          <small className="text-muted-foreground">{formatNewsDate(featured.date)}</small>
          <h3 className="md:text-3xl">
            <Link href={`/news/${featured.slug}`} transitionTypes={['detail-open']}>
              {featured.title}
            </Link>
          </h3>
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
        </RevealItem>
      </RevealContainer>

      <RevealContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <RevealItem key={item.slug} className="space-y-3 md:space-y-4">
            <Link
              href={`/news/${item.slug}`}
              transitionTypes={['detail-open']}
              className="relative block aspect-[16/10] overflow-hidden rounded-sm md:rounded-md md:ring-1 md:ring-inset md:ring-border/60"
            >
              {item.coverImage && (
                <RevealImage className="absolute inset-0">
                  <Image
                    src={item.coverImage.url}
                    alt={item.coverImage.title ?? item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </RevealImage>
              )}
              <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)] md:block" />
            </Link>
            <div className="space-y-1">
              <small className="text-muted-foreground">{formatNewsDate(item.date)}</small>
              <h3>
                <Link href={`/news/${item.slug}`} transitionTypes={['detail-open']}>
                  {item.title}
                </Link>
              </h3>
              {item.subtitle && <p>{item.subtitle}</p>}
            </div>
          </RevealItem>
        ))}
      </RevealContainer>
    </PageLayout>
  );
}
