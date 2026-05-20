import { Faker, en } from '@faker-js/faker';
import { PageLayout } from '@/components/page-layout';

const faker = new Faker({ locale: [en] });
faker.seed(101);

const sections = Array.from({ length: 3 }).map((_, idx) => ({
  title: `${idx + 1}. ${faker.lorem.words(2)}`,
  body: faker.lorem.paragraph(),
}));

export default function ImprintPage() {
  return (
    <PageLayout title="Imprint">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="mb-2 font-semibold capitalize">{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}
    </PageLayout>
  );
}
