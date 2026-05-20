import { faker } from '@faker-js/faker';
import { PageLayout } from '@/components/page-layout';

type Event = {
  name: string;
  date: Date;
  location: string;
  description: string;
};

const events: Event[] = Array.from({ length: 8 })
  .map(() => ({
    name: faker.lorem.words(3),
    date: faker.date.between({
      from: new Date(),
      to: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    }),
    location: faker.location.city(),
    description: faker.lorem.sentence(),
  }))
  .sort((a, b) => a.date.getTime() - b.date.getTime());

function groupByMonth(events: Event[]): { label: string; events: Event[] }[] {
  const groups = new Map<string, Event[]>();
  for (const event of events) {
    const key = event.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }
  return Array.from(groups, ([label, events]) => ({ label, events }));
}

const groupedEvents = groupByMonth(events);

export default function EventsPage() {
  return (
    <PageLayout title="Events">
      {groupedEvents.map((group) => (
        <section key={group.label} className="space-y-6">
          <h2 className="font-sans uppercase">{group.label}</h2>
          <ul className="space-y-6">
            {group.events.map((event, idx) => (
              <li key={idx} className="grid gap-4 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <div className="font-heading text-3xl leading-none md:text-4xl">
                  {event.date.toLocaleDateString('en-US', { day: '2-digit' })}
                </div>
                <div className="space-y-2">
                  <h3 className="type-h2 uppercase">{event.name}</h3>
                  <p className="text-md text-muted-foreground">
                    {event.date.toLocaleDateString('en-US', { weekday: 'long' })} ·{' '}
                    {event.date.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {event.location}
                  </p>
                  <p>{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageLayout>
  );
}
