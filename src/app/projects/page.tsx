import { faker } from '@faker-js/faker';

const projects = Array.from({ length: 4 }).map(() => ({
  name: faker.lorem.words(3),
  description: faker.lorem.paragraphs(1),
  status: faker.helpers.arrayElement(['In Progress', 'Planning', 'Complete']),
}));

export default function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <p>Explore current and upcoming community projects.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((project, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl capitalize">{project.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.status}</p>
            <p className="mt-4">{project.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
