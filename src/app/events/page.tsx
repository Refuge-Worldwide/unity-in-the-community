import { EventsTabs } from './events-tabs';
import { PageLayout } from '@/components/page-layout';
import { getEvents, getPastEvents } from '@/lib/contentful/content/events';

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getEvents(), getPastEvents()]);

  return (
    <PageLayout title="Events">
      <EventsTabs upcoming={upcoming} past={past} />
    </PageLayout>
  );
}
