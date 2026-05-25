import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ArrowLink } from '@/components/arrow-link';
import { PageLayout } from '@/components/page-layout';
import { getEvents } from '@/lib/contentful/events';

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageLayout title="Events">
      <ul>
        {events.map((event) => {
          const startDate = new Date(event.date);
          const endDate = event.endDate ? new Date(event.endDate) : startDate;
          const singleDay = isSameDay(startDate, endDate);

          return (
            <li
              key={event.id}
              className="grid gap-6 border-t border-foreground py-8 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              <div className="flex flex-col">
                <h2>
                  {singleDay
                    ? formatShortDate(startDate)
                    : `${formatShortDate(startDate)} – ${formatShortDate(endDate)}`}
                </h2>
                <div className="flex flex-wrap items-baseline gap-x-3 text-md text-muted-foreground">
                  <span>
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
              <div className="space-y-3">
                <div>
                  <h2>{event.title}</h2>
                  {event.location && (
                    <p className="text-md text-muted-foreground">{event.location}</p>
                  )}
                </div>
                {event.description && (
                  <div className="space-y-3">{documentToReactComponents(event.description)}</div>
                )}
                {event.ticketLink && (
                  <ArrowLink href={event.ticketLink} direction="right">
                    {event.linkText ?? 'More info'}
                  </ArrowLink>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </PageLayout>
  );
}
