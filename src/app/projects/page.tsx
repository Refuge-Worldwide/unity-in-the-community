import type { CSSProperties } from 'react';
import { Faker, en } from '@faker-js/faker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const faker = new Faker({ locale: [en] });
faker.seed(404);

type ProjectPriority = 'low' | 'medium' | 'high';

const priorityClassMap: Record<ProjectPriority, string> = {
  low: 'md:col-span-4',
  medium: 'md:col-span-6',
  high: 'md:col-span-8',
};

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

const dummyPriorities: ProjectPriority[] = [
  'medium',
  'medium',
  'low',
  'medium',
  'high',
  'low',
  'medium',
];

const dummyAspectRatios = [
  '16 / 10',
  '4 / 3',
  '3 / 2',
  '1 / 1',
  '21 / 9',
  '5 / 4',
  '3 / 4',
] as const;

const projects = Array.from({ length: 7 }).map((_, idx) => {
  const start = faker.date.between({
    from: new Date('2025-01-01'),
    to: new Date('2026-08-01'),
  });
  const end = faker.date.soon({ days: faker.number.int({ min: 60, max: 240 }), refDate: start });
  const accent = faker.color.human();
  const priority = dummyPriorities[idx] ?? 'medium';
  const imageRatio = dummyAspectRatios[idx] ?? '16 / 10';

  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(2).toUpperCase(),
    category: faker.helpers.arrayElement(['current', 'past'] as const),
    dateRange: `${formatMonthYear(start)} - ${formatMonthYear(end)}`,
    description: faker.lorem.sentence(),
    priority,
    imageStyle: {
      backgroundImage: `linear-gradient(135deg, ${accent} 0%, rgba(12, 12, 12, 0.9) 70%)`,
      aspectRatio: imageRatio,
    } as CSSProperties,
  };
});

const projectsByCategory = [
  { value: 'all', projects },
  { value: 'current', projects: projects.filter((project) => project.category === 'current') },
  { value: 'past', projects: projects.filter((project) => project.category === 'past') },
] as const;

export default function ProjectsPage() {
  return (
    <section>
      <Tabs
        defaultValue="all"
        orientation="vertical"
        responsiveOrientation="horizontal-below-lg"
        className="grid gap-8 lg:grid-cols-[minmax(10rem,16rem)_1fr]"
      >
        <aside className="space-y-6">
          <h1>Projects</h1>
          <TabsList className="type-h2 bg-transparent p-0">
            {projectsByCategory.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.value.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </aside>

        {projectsByCategory.map((category) => {
          const filteredProjects = category.projects;

          return (
            <TabsContent
              key={category.value}
              value={category.value}
              className="grid content-start items-start gap-6 md:grid-cols-12"
            >
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className={`self-start space-y-3 ${priorityClassMap[project.priority]}`}
                >
                  <div
                    className="relative overflow-hidden rounded-lg ring-1 ring-inset ring-border/60"
                    style={project.imageStyle}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="type-h2 text-lg uppercase">{project.title}</h2>
                      <p className="text-sm text-foreground">{project.dateRange}</p>
                    </div>
                    <p className="text-sm text-foreground">{project.description}</p>
                  </div>
                </article>
              ))}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
