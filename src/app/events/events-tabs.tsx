'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevealContainer, RevealItem } from '@/components/scroll-reveal';
import { EventRow } from './event-row';
import type { Event } from '@/lib/contentful/types';

export function EventsTabs({ upcoming, past }: { upcoming: Event[]; past: Event[] }) {
  const [tab, setTab] = useState(upcoming.length === 0 ? 'past' : 'upcoming');

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-8 md:gap-12">
      <TabsList>
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
          <RevealContainer as="ul">
            {upcoming.map((event) => (
              <RevealItem key={event.id} as="li">
                <EventRow event={event} />
              </RevealItem>
            ))}
          </RevealContainer>
        )}
      </TabsContent>
      <TabsContent value="past">
        <RevealContainer as="ul">
          {past.map((event) => (
            <RevealItem key={event.id} as="li">
              <EventRow event={event} />
            </RevealItem>
          ))}
        </RevealContainer>
      </TabsContent>
    </Tabs>
  );
}
