import type { Document } from '@contentful/rich-text-types';

export type EmbeddedAsset = {
  id: string;
  url: string;
  width: number;
  height: number;
  title: string | null;
  description: string | null;
};

export type RichTextContent = {
  document: Document;
  embeddedAssets: Record<string, EmbeddedAsset>;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
  location: string | null;
  price: string | null;
  description: Document | null;
  ticketLink: string | null;
  linkText: string | null;
};

export type ProjectPriority = 'low' | 'medium' | 'high';

export type ProjectImage = {
  url: string;
  width: number;
  height: number;
  title: string | null;
};

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  timeframe: string | null;
  priority: ProjectPriority;
  image: ProjectImage | null;
};

export type Project = ProjectSummary & {
  description: RichTextContent | null;
  link: string | null;
  linkText: string | null;
};

export type NewsImage = ProjectImage;

export type NewsArticleSummary = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  date: string;
  author: string | null;
  coverImage: NewsImage | null;
};

export type NewsArticle = NewsArticleSummary & {
  content: RichTextContent | null;
};
