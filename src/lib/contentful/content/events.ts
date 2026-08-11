import type { Document } from '@contentful/rich-text-types';
import { contentfulFetch } from '../client';
import { eventsSpace } from '../spaces';
import type { Event } from '../types';

export const EVENTS_TAG = 'events';

type EventCollectionResponse = {
  eventCollection: {
    total: number;
    items: Array<{
      sys: { id: string };
      title: string;
      date: string;
      endDate: string | null;
      location: string | null;
      price: string | null;
      description: { json: Document } | null;
      ticketLink: string | null;
      linkText: string | null;
    }>;
  };
};

export const PAST_EVENTS_PAGE_SIZE = 10;

export const UPCOMING_EVENTS_PAGE_SIZE = 10;

const EVENTS_QUERY = /* GraphQL */ `
  query Events($preview: Boolean, $from: DateTime!, $limit: Int!, $skip: Int!) {
    eventCollection(
      preview: $preview
      where: { showOnUitcWebsite: true, date_gte: $from }
      order: date_ASC
      limit: $limit
      skip: $skip
    ) {
      total
      items {
        sys {
          id
        }
        title
        date
        endDate
        location
        price
        description {
          json
        }
        ticketLink
        linkText
      }
    }
  }
`;

const PAST_EVENTS_QUERY = /* GraphQL */ `
  query PastEvents($preview: Boolean, $before: DateTime!, $limit: Int!, $skip: Int!) {
    eventCollection(
      preview: $preview
      where: { showOnUitcWebsite: true, date_lt: $before }
      order: date_DESC
      limit: $limit
      skip: $skip
    ) {
      total
      items {
        sys {
          id
        }
        title
        date
        endDate
        location
        price
        description {
          json
        }
        ticketLink
        linkText
      }
    }
  }
`;

function startOfTodayISO(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
}

function mapEvent(item: EventCollectionResponse['eventCollection']['items'][number]): Event {
  return {
    id: item.sys.id,
    title: item.title,
    date: item.date,
    endDate: item.endDate,
    location: item.location,
    price: item.price,
    description: item.description?.json ?? null,
    ticketLink: item.ticketLink,
    linkText: item.linkText,
  };
}

export async function getEvents(skip = 0): Promise<{ events: Event[]; total: number }> {
  const data = await contentfulFetch<EventCollectionResponse>({
    query: EVENTS_QUERY,
    variables: { from: startOfTodayISO(), limit: UPCOMING_EVENTS_PAGE_SIZE, skip },
    space: eventsSpace,
    tags: [EVENTS_TAG],
  });
  return {
    events: data.eventCollection.items.map(mapEvent),
    total: data.eventCollection.total,
  };
}

export async function getPastEvents(skip = 0): Promise<{ events: Event[]; total: number }> {
  const data = await contentfulFetch<EventCollectionResponse>({
    query: PAST_EVENTS_QUERY,
    variables: { before: startOfTodayISO(), limit: PAST_EVENTS_PAGE_SIZE, skip },
    space: eventsSpace,
    tags: [EVENTS_TAG],
  });
  return {
    events: data.eventCollection.items.map(mapEvent),
    total: data.eventCollection.total,
  };
}
