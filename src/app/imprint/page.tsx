import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });
faker.seed(101);

const sections = Array.from({ length: 3 }).map((_, idx) => ({
  title: `${idx + 1}. ${faker.lorem.words(2)}`,
  body: faker.lorem.paragraph(),
}));

export default function ImprintPage() {
  return (
    <>
      <h1>Imprint</h1>
      <div className="space-y-4">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 font-semibold capitalize">{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
