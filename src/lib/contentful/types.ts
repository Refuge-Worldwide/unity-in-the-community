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
