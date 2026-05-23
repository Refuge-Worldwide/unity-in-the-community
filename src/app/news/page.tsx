import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { formatNewsDate, newsItems } from '@/lib/mock-news';

const [featured, ...rest] = newsItems;

export default function NewsPage() {
  return (
    <PageLayout title="News">
      <article className="grid gap-6 md:grid-cols-2 md:gap-8">
        <Link
          href={`/news/${featured.slug}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-md ring-1 ring-inset ring-border/60"
          style={featured.imageStyle}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
        </Link>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl">
            <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p className="text-sm text-muted-foreground">{formatNewsDate(featured.date)}</p>
          <p>{featured.preview}</p>
        </div>
      </article>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <article key={item.slug} className="space-y-4">
            <Link
              href={`/news/${item.slug}`}
              className="relative block aspect-[16/10] overflow-hidden rounded-md ring-1 ring-inset ring-border/60"
              style={item.imageStyle}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
            </Link>
            <div>
              <h2 className="text-2xl">
                <Link href={`/news/${item.slug}`}>{item.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{formatNewsDate(item.date)}</p>
              <p className="mt-2">{item.preview}</p>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
