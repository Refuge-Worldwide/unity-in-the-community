'use server';

import { getEvents, getPastEvents } from '@/lib/contentful/content/events';
import type { Event } from '@/lib/contentful/types';

export async function loadMoreUpcomingEvents(
  skip: number
): Promise<{ events: Event[]; total: number }> {
  return getEvents(skip);
}

export async function loadMorePastEvents(
  skip: number
): Promise<{ events: Event[]; total: number }> {
  return getPastEvents(skip);
}
