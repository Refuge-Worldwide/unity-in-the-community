'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ArrowLink } from '@/components/arrow-link';
import type { Event } from '@/lib/contentful/types';

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

export function EventRow({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false);
  const startDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : startDate;
  const singleDay = isSameDay(startDate, endDate);
  const hasDescription = Boolean(event.description);

  return (
    <li className="grid gap-3 border-t border-foreground py-5 md:grid-cols-[1fr_2fr] md:gap-12 md:py-8">
      <div className="flex flex-wrap items-baseline gap-x-4 md:flex-col md:items-stretch md:gap-x-0">
        <h2>
          {singleDay
            ? formatShortDate(startDate)
            : `${formatShortDate(startDate)} – ${formatShortDate(endDate)}`}
        </h2>
        <div className="flex flex-wrap items-baseline gap-x-3 text-md text-muted-foreground">
          <span className="hidden md:inline">
            {singleDay
              ? startDate.toLocaleDateString('en-US', { weekday: 'long' })
              : `${startDate.toLocaleDateString('en-US', { weekday: 'long' })} – ${endDate.toLocaleDateString('en-US', { weekday: 'long' })}`}
          </span>
          {singleDay && event.endDate && (
            <span>
              {formatTime(startDate)} – {formatTime(endDate)}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-1 md:space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2>{event.title}</h2>
            {event.location && <p className="text-md text-muted-foreground">{event.location}</p>}
          </div>
          {hasDescription && (
            <button
              type="button"
              aria-label={expanded ? 'Hide description' : 'Show description'}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className="text-muted-foreground transition-transform hover:text-foreground md:hidden"
              style={{ transform: expanded ? 'rotate(45deg)' : undefined }}
            >
              <Plus className="size-6" />
            </button>
          )}
        </div>
        {event.description && (
          <div className={`space-y-3 ${expanded ? '' : 'hidden'} md:block`}>
            {documentToReactComponents(event.description)}
          </div>
        )}
        {event.ticketLink && (
          <ArrowLink href={event.ticketLink} direction="right">
            {event.linkText ?? 'More info'}
          </ArrowLink>
        )}
      </div>
    </li>
  );
}
