import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });
faker.seed(303);

const description = faker.lorem.paragraph();

export default function Home() {
  return (
    <section className="flex h-full flex-col items-end justify-end text-right">
      <h1>Unity in the Community</h1>
      <p className="max-w-xl">{description}</p>
    </section>
  );
}
