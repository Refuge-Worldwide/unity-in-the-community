import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });
faker.seed(202);

const sections = Array.from({ length: 5 }).map((_, idx) => ({
  title: `${idx + 1}. ${faker.lorem.words(3)}`,
  body: faker.lorem.paragraph(),
}));

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
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
