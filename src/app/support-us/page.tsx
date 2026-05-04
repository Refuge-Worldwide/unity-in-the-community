import { faker } from '@faker-js/faker';

export default function SupportUsPage() {
  return (
    <>
      <h1>Support Us</h1>
      <div className="space-y-4">
        <p>{faker.lorem.paragraphs(2, '\n\n')}</p>
      </div>
    </>
  );
}
