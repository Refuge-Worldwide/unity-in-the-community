import type { CSSProperties } from 'react';
import { faker } from '@faker-js/faker';

const newsItems = Array.from({ length: 7 }).map(() => ({
  title: faker.lorem.sentence(),
  date: faker.date.recent({ days: 30 }),
  content: faker.lorem.paragraphs(2),
  imageStyle: {
    backgroundImage: `linear-gradient(135deg, ${faker.color.human()} 0%, rgba(12, 12, 12, 0.9) 70%)`,
    aspectRatio: '16 / 10',
  } as CSSProperties,
}));

export default function NewsPage() {
  return (
    <>
      <h1>News</h1>
      {/* <p>Latest updates and announcements.</p> */}
      <div className="mt-8 space-y-8">
        {newsItems.map((item, idx) => (
          <article
            key={idx}
            className="grid gap-4 border-b border-border pb-8 md:grid-cols-[12rem_1fr]"
          >
            <div
              className="relative overflow-hidden rounded-md ring-1 ring-inset ring-border/60"
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
    </>
  );
}
