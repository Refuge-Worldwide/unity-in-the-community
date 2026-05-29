'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { PlainRichText } from '@/components/rich-text';
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

  const handleRowClick = () => {
    if (!hasDescription) return;
    setExpanded((v) => !v);
  };

  return (
    <div
      onClick={handleRowClick}
      role={hasDescription ? 'button' : undefined}
      tabIndex={hasDescription ? 0 : undefined}
      aria-expanded={hasDescription ? expanded : undefined}
      onKeyDown={(e) => {
        if (!hasDescription) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
      className={`grid gap-3 border-t border-foreground py-5 md:grid-cols-[1fr_2fr] md:gap-12 md:py-8 ${hasDescription ? 'cursor-pointer md:cursor-auto' : ''}`}
    >
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
            <span
              aria-hidden
              className="text-muted-foreground transition-transform md:hidden"
              style={{ transform: expanded ? 'rotate(45deg)' : undefined }}
            >
              <Plus className="size-6" />
            </span>
          )}
        </div>
        <div className="hidden md:block">
          <div className="prose">
            {event.description && <PlainRichText document={event.description} />}
            {event.price && <p className="text-muted-foreground">Entry: {event.price}</p>}
          </div>
          {event.ticketLink && (
            <div className="mt-3">
              <ArrowLink href={event.ticketLink} direction="right">
                {event.linkText ?? 'More info'}
              </ArrowLink>
            </div>
          )}
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="prose pt-1">
                {event.description && <PlainRichText document={event.description} />}
                {event.price && <p className="text-muted-foreground">Entry: {event.price}</p>}
              </div>
              {event.ticketLink && (
                <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                  <ArrowLink href={event.ticketLink} direction="right">
                    {event.linkText ?? 'More info'}
                  </ArrowLink>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
