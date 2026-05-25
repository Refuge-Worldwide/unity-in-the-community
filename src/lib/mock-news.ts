import type { CSSProperties } from 'react';
import { faker } from '@faker-js/faker';

faker.seed(1);

export type NewsItem = {
  slug: string;
  title: string;
  date: Date;
  author: string;
  /** Short summary shown on the news listing page. */
  preview: string;
  /** Full article body, will be rich text once Contentful is wired up. */
  content: string;
  imageStyle: CSSProperties;
};

export function formatNewsDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

const paragraphCounts = [20, 3, 12, 2, 8, 1, 5];

export const newsItems: NewsItem[] = Array.from({ length: 7 }).map((_, idx) => {
  const title = faker.lorem.sentence();
  return {
    slug: `${idx + 1}-${toSlug(title)}`,
    title,
    date: faker.date.recent({ days: 30 }),
    author: faker.person.fullName(),
    preview: faker.lorem.sentences(2),
    content: faker.lorem.paragraphs(paragraphCounts[idx]),
    imageStyle: {
      backgroundImage: `linear-gradient(135deg, ${faker.color.human()} 0%, rgba(12, 12, 12, 0.9) 70%)`,
    } as CSSProperties,
  };
});

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}
