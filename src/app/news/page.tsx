import Image from 'next/image';
import { faker } from '@faker-js/faker';

const newsItems = Array.from({ length: 7 }).map(() => ({
  title: faker.lorem.sentence(),
  date: faker.date.recent({ days: 30 }),
  content: faker.lorem.paragraphs(2),
  imageUrl: faker.image.urlPicsumPhotos({
    width: 640,
    height: 420,
    grayscale: false,
    blur: 0,
  }),
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
            <div className="overflow-hidden rounded-md ring-1 ring-border/60">
              <Image
                src={item.imageUrl}
                alt="News item"
                width={640}
                height={420}
                className="h-full w-full object-cover"
              />
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
