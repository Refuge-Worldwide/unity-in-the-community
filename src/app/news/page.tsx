import { faker } from '@faker-js/faker';

const newsItems = Array.from({ length: 7 }).map(() => ({
  title: faker.lorem.sentence(),
  date: faker.date.recent({ days: 30 }),
  content: faker.lorem.paragraphs(2),
}));

export default function NewsPage() {
  return (
    <>
      <h1>News</h1>
      <p>Latest updates and announcements.</p>
      <div className="mt-8 space-y-8">
        {newsItems.map((item, idx) => (
          <article key={idx} className="border-b border-border pb-8">
            <h2 className="text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(item.date).toLocaleDateString()}
            </p>
            <p className="mt-4">{item.content}</p>
          </article>
        ))}
      </div>
    </>
  );
}
