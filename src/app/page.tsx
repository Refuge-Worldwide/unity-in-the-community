import { Faker, en } from '@faker-js/faker';
import { PageLayout } from '@/components/page-layout';

const faker = new Faker({ locale: [en] });
faker.seed(303);

const description = faker.lorem.paragraph();

export default function Home() {
  return (
    <PageLayout title="Unity in the Community" variant="hero">
      <p className="max-w-xl">{description}</p>
    </PageLayout>
  );
}
