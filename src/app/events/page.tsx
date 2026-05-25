import { faker } from '@faker-js/faker';
import { ArrowLink } from '@/components/arrow-link';
import { PageLayout } from '@/components/page-layout';

type Event = {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  moreInfoUrl?: string;
};

const events: Event[] = Array.from({ length: 8 })
  .map(() => {
    const startDate = faker.date.between({
      from: new Date(),
      to: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
    const isMultiDay = Math.random() < 0.3;
    const endDate = isMultiDay
      ? new Date(startDate.getTime() + (1 + Math.floor(Math.random() * 4)) * 24 * 60 * 60 * 1000)
      : new Date(startDate.getTime() + (1 + Math.floor(Math.random() * 4)) * 60 * 60 * 1000);

    return {
      name: faker.lorem.sentence({ min: 2, max: 7 }).replace(/\.$/, ''),
      startDate,
      endDate,
      location: faker.location.city(),
      description: faker.lorem.sentences(2),
      moreInfoUrl: Math.random() < 0.5 ? '#' : undefined,
    };
  })
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

export default function EventsPage() {
  return (
    <PageLayout title="Events">
      <ul>
        {events.map((event, idx) => {
          const singleDay = isSameDay(event.startDate, event.endDate);
          return (
            <li
              key={idx}
              className="grid gap-6 border-t border-foreground py-8 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              <div className="flex flex-col">
                <h2 className="">
                  {singleDay
                    ? formatShortDate(event.startDate)
                    : `${formatShortDate(event.startDate)} – ${formatShortDate(event.endDate)}`}
                </h2>
                <div className="flex flex-wrap items-baseline gap-x-3 text-md text-muted-foreground">
                  <span>
                    {singleDay
                      ? event.startDate.toLocaleDateString('en-US', { weekday: 'long' })
                      : `${event.startDate.toLocaleDateString('en-US', { weekday: 'long' })} – ${event.endDate.toLocaleDateString('en-US', { weekday: 'long' })}`}
                  </span>
                  {singleDay && (
                    <span>
                      {formatTime(event.startDate)} – {formatTime(event.endDate)}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h2>{event.name}</h2>
                  <p className="text-md text-muted-foreground">{event.location}</p>
                </div>
                <p>{event.description}</p>
                {event.moreInfoUrl && (
                  <ArrowLink href={event.moreInfoUrl} direction="right">
                    More info
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
