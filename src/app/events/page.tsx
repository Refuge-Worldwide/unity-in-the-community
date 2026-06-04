import { EventRow } from './event-row';
import { PageLayout } from '@/components/page-layout';
import { RevealContainer, RevealItem } from '@/components/scroll-reveal';
import { getEvents } from '@/lib/contentful/content/events';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageLayout title="Events">
      <RevealContainer as="ul">
        {events.map((event) => (
          <RevealItem key={event.id} as="li">
            <EventRow event={event} />
          </RevealItem>
        ))}
      </RevealContainer>
    </PageLayout>
  );
}
