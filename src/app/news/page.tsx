import Image from 'next/image';
import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { RevealContainer, RevealImage, RevealItem } from '@/components/scroll-reveal';
import { formatNewsDate, getAllNewsArticles } from '@/lib/contentful/content/news';

export default async function NewsPage() {
  const newsItems = await getAllNewsArticles();

  return (
    <PageLayout title="News">
      <RevealContainer className="[&>*:first-child_a]:pt-0">
        {newsItems.map((item) => (
          <RevealItem key={item.id}>
            <Link
              href={`/news/${item.slug}`}
              transitionTypes={['detail-open']}
              className="flex flex-col gap-3 py-4 md:flex-row md:gap-8 md:py-6"
            >
              {item.coverImage && (
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-sm md:aspect-[4/3] md:w-72 md:rounded-md md:ring-1 md:ring-inset md:ring-border/60">
                  <RevealImage className="absolute inset-0">
                    <Image
                      src={item.coverImage.url}
                      alt={item.coverImage.title ?? item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 288px, 100vw"
                    />
                  </RevealImage>
                </div>
              )}
              <div className="flex flex-col justify-start space-y-1">
                <p className="text-muted-foreground">{formatNewsDate(item.date)}</p>
                <h2>{item.title}</h2>
                {item.subtitle && <p className="hidden md:block mt-2">{item.subtitle}</p>}
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealContainer>
    </PageLayout>
  );
}
