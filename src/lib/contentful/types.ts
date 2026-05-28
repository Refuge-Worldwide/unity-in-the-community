import type { Document } from '@contentful/rich-text-types';

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

export type Project = {
  id: string;
  slug: string;
  title: string;
  timeframe: string | null;
  priority: ProjectPriority;
  description: Document | null;
  image: ProjectImage | null;
  link: string | null;
  linkText: string | null;
};
