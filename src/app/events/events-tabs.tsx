'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevealContainer, RevealItem } from '@/components/scroll-reveal';
import { EventRow } from './event-row';
import { ArrowButton } from '@/components/arrow-link';
import { loadMorePastEvents, loadMoreUpcomingEvents } from './actions';
import type { Event } from '@/lib/contentful/types';

function EventList({
  initialBatches,
  total,
  loadMore,
}: {
  initialBatches: Event[][];
  total: number;
  loadMore: (skip: number) => Promise<{ events: Event[]; total: number }>;
}) {
  const [batches, setBatches] = useState<Event[][]>(initialBatches);
  const [isPending, setIsPending] = useState(false);

  const loadedCount = batches.reduce((sum, b) => sum + b.length, 0);
  const hasMore = loadedCount < total;

  async function handleLoadMore() {
    setIsPending(true);
    try {
      const { events } = await loadMore(loadedCount);
      setBatches((prev) => [...prev, events]);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="[&>ul:first-child>li:first-child>div]:max-md:border-t-0">
      {batches.map((batch, i) => (
        <RevealContainer key={i} as="ul">
          {batch.map((event) => (
            <RevealItem key={event.id} as="li">
              <EventRow event={event} />
            </RevealItem>
          ))}
        </RevealContainer>
      ))}
      {hasMore && (
        <ArrowButton
          onClick={handleLoadMore}
          disabled={isPending}
          direction="down"
          className="mt-8"
        >
          {isPending ? 'Loading…' : 'Show more events'}
        </ArrowButton>
      )}
    </div>
  );
}

export function EventsTabs({
  upcoming,
  upcomingTotal,
  past,
  pastTotal,
}: {
  upcoming: Event[];
  upcomingTotal: number;
  past: Event[];
  pastTotal: number;
}) {
  const [tab, setTab] = useState(upcoming.length === 0 ? 'past' : 'upcoming');

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-2 md:gap-12">
      <TabsList className="w-full md:w-fit">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        {upcoming.length === 0 ? (
          <p className="text-muted-foreground">
            No upcoming events at the moment.{' '}
            <button
              className="underline underline-offset-2 transition-colors hover:text-foreground"
              onClick={() => setTab('past')}
            >
              Check out our past events.
            </button>
          </p>
        ) : (
          <EventList
            initialBatches={[upcoming]}
            total={upcomingTotal}
            loadMore={loadMoreUpcomingEvents}
          />
        )}
      </TabsContent>
      <TabsContent value="past">
        <EventList initialBatches={[past]} total={pastTotal} loadMore={loadMorePastEvents} />
      </TabsContent>
    </Tabs>
  );
}
