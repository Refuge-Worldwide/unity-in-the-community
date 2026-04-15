import { faker } from '@faker-js/faker';

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div className="space-y-4">
        <p>{faker.lorem.paragraphs(2, '\n\n')}</p>
      </div>
    </>
  );
}
