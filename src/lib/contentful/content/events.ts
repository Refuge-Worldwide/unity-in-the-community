import type { Document } from '@contentful/rich-text-types';
import { contentfulFetch } from '../client';
import { eventsSpace } from '../spaces';
import type { Event } from '../types';

export const EVENTS_TAG = 'events';

type EventCollectionResponse = {
  eventCollection: {
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

const EVENTS_QUERY = /* GraphQL */ `
  query Events($preview: Boolean, $from: DateTime!) {
    eventCollection(
      preview: $preview
      where: { showOnUitcWebsite: true, date_gte: $from }
      order: date_ASC
    ) {
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
  query PastEvents($preview: Boolean, $before: DateTime!) {
    eventCollection(
      preview: $preview
      where: { showOnUitcWebsite: true, date_lt: $before }
      order: date_DESC
    ) {
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

export async function getEvents(): Promise<Event[]> {
  const data = await contentfulFetch<EventCollectionResponse>({
    query: EVENTS_QUERY,
    variables: { from: startOfTodayISO() },
    space: eventsSpace,
    tags: [EVENTS_TAG],
  });
  return data.eventCollection.items.map(mapEvent);
}

export async function getPastEvents(): Promise<Event[]> {
  const data = await contentfulFetch<EventCollectionResponse>({
    query: PAST_EVENTS_QUERY,
    variables: { before: startOfTodayISO() },
    space: eventsSpace,
    tags: [EVENTS_TAG],
  });
  return data.eventCollection.items.map(mapEvent);
}
