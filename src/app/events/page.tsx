import { faker } from '@faker-js/faker';

const events = Array.from({ length: 5 }).map(() => ({
  name: faker.lorem.words(3),
  date: faker.date.future({ days: 60 }),
  location: faker.location.city(),
  description: faker.lorem.sentence(),
}));

export default function EventsPage() {
  return (
    <>
      <h1>Events</h1>
      <p>Find upcoming events and community gatherings.</p>
      <div className="mt-8 space-y-6">
        {events.map((event, idx) => (
          <div key={idx} className="flex flex-col gap-2 border-l-4 border-accent pl-4">
            <h2 className="text-xl capitalize">{event.name}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toLocaleDateString()} • {event.location}
            </p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
