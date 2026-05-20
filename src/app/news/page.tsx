import type { CSSProperties } from 'react';
import { faker } from '@faker-js/faker';
import { PageLayout } from '@/components/page-layout';

const newsItems = Array.from({ length: 7 }).map(() => ({
  title: faker.lorem.sentence(),
  date: faker.date.recent({ days: 30 }),
  content: faker.lorem.paragraphs(2),
  imageStyle: {
    backgroundImage: `linear-gradient(135deg, ${faker.color.human()} 0%, rgba(12, 12, 12, 0.9) 70%)`,
  } as CSSProperties,
}));

const [featured, ...rest] = newsItems;

export default function NewsPage() {
  return (
    <PageLayout title="News">
      <article className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-inset ring-border/60"
          style={featured.imageStyle}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl">{featured.title}</h2>
          <p className="text-sm text-muted-foreground">
            {new Date(featured.date).toLocaleDateString()}
          </p>
          <p>{featured.content}</p>
        </div>
      </article>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((item, idx) => (
          <article key={idx} className="space-y-4">
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-md ring-1 ring-inset ring-border/60"
              style={item.imageStyle}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
            </div>
            <div>
              <h2 className="text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="mt-4">{item.content}</p>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
