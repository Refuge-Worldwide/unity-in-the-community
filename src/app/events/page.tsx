import { EventRow } from './event-row';
import { PageLayout } from '@/components/page-layout';
import { getEvents } from '@/lib/contentful/content/events';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageLayout title="Events">
      <ul>
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </ul>
    </PageLayout>
  );
}
