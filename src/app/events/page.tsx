import { EventsTabs } from './events-tabs';
import { PageLayout } from '@/components/page-layout';
import { getEvents, getPastEvents } from '@/lib/contentful/content/events';

export default async function EventsPage() {
  const [
    { events: initialUpcoming, total: totalUpcoming },
    { events: initialPast, total: totalPast },
  ] = await Promise.all([getEvents(), getPastEvents()]);

  return (
    <PageLayout title="Events">
      <EventsTabs
        upcoming={initialUpcoming}
        upcomingTotal={totalUpcoming}
        past={initialPast}
        pastTotal={totalPast}
      />
    </PageLayout>
  );
}
