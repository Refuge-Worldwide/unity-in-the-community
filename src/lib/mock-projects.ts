import type { CSSProperties } from 'react';
import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });
faker.seed(404);

export type ProjectPriority = 'low' | 'medium' | 'high';

export type ProjectBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; style: CSSProperties; caption?: string };

export type Project = {
  slug: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  priority: ProjectPriority;
  imageStyle: CSSProperties;
  body: ProjectBlock[];
};

function priorityFromSlug(slug: string): ProjectPriority {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  const bucket = Math.abs(h) % 6;
  if (bucket === 0) return 'high';
  if (bucket < 3) return 'medium';
  return 'low';
}

const dummyAspectRatios = [
  '16 / 10',
  '4 / 3',
  '3 / 2',
  '1 / 1',
  '21 / 9',
  '5 / 4',
  '3 / 4',
] as const;

const blockPattern: ProjectBlock['type'][] = [
  'paragraph',
  'paragraph',
  'image',
  'paragraph',
  'paragraph',
  'image',
  'paragraph',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function gradientStyle(aspectRatio?: string): CSSProperties {
  const accent = faker.color.human();
  return {
    backgroundImage: `linear-gradient(135deg, ${accent} 0%, rgba(12, 12, 12, 0.9) 70%)`,
    ...(aspectRatio ? { aspectRatio } : {}),
  };
}

export const projects: Project[] = Array.from({ length: 25 }).map((_, idx) => {
  const startDate = faker.date.between({
    from: new Date('2025-01-01'),
    to: new Date('2026-08-01'),
  });
  const endDate = faker.date.soon({
    days: faker.number.int({ min: 60, max: 240 }),
    refDate: startDate,
  });
  const wordCount = faker.number.int({ min: 3, max: 8 });
  const title = faker.lorem.words(wordCount).replace(/\b\w/g, (char) => char.toUpperCase());
  const slug = `${idx + 1}-${slugify(title)}`;
  const body: ProjectBlock[] = blockPattern.map((type) => {
    if (type === 'paragraph') {
      return { type, text: faker.lorem.paragraph({ min: 4, max: 8 }) };
    }
    return {
      type,
      style: gradientStyle('16 / 9'),
      caption: faker.lorem.sentence({ min: 4, max: 10 }),
    };
  });

  return {
    slug,
    title,
    startDate,
    endDate,
    description: faker.lorem.sentence(),
    priority: priorityFromSlug(slug),
    imageStyle: gradientStyle(dummyAspectRatios[idx] ?? '16 / 10'),
    body,
  };
});

export function formatProjectMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function formatProjectDateRange(project: Project): string {
  return `${formatProjectMonthYear(project.startDate)} - ${formatProjectMonthYear(project.endDate)}`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
