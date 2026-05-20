import { faker } from '@faker-js/faker';
import { PageLayout } from '@/components/page-layout';

export default function AboutPage() {
  return (
    <PageLayout title="About">
      <p>{faker.lorem.paragraphs(2, '\n\n')}</p>
    </PageLayout>
  );
}
