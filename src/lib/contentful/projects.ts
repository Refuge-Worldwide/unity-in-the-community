import { contentfulFetch } from './client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from './rich-text';
import { mainSpace } from './spaces';
import type { Project, ProjectImage, ProjectPriority, ProjectSummary } from './types';

export const PROJECTS_TAG = 'projects';

type RawProjectSummary = {
  sys: { id: string; firstPublishedAt: string | null };
  slug: string | null;
  projectName: string | null;
  timeframe: string | null;
  priority: string | null;
  galleryImage: {
    url: string | null;
    width: number | null;
    height: number | null;
    title: string | null;
  } | null;
};

type RawProject = RawProjectSummary & {
  description: RawRichTextField;
  link: string | null;
  linkText: string | null;
};

const PROJECT_LIST_FIELDS = /* GraphQL */ `
  sys {
    id
    firstPublishedAt
  }
  slug
  projectName
  timeframe
  priority
  galleryImage {
    url
    width
    height
    title
  }
`;

const PROJECT_DETAIL_FIELDS = /* GraphQL */ `
  ${PROJECT_LIST_FIELDS}
  description {
    ${RICH_TEXT_FIELDS}
  }
  link
  linkText
`;

const PROJECTS_QUERY = /* GraphQL */ `
  query Projects($preview: Boolean) {
    projectCollection(preview: $preview, order: sys_firstPublishedAt_DESC) {
      items {
        ${PROJECT_LIST_FIELDS}
      }
    }
  }
`;

const PROJECT_BY_SLUG_QUERY = /* GraphQL */ `
  query ProjectBySlug($preview: Boolean, $slug: String!) {
    projectCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        ${PROJECT_DETAIL_FIELDS}
      }
    }
  }
`;

const PRIORITIES: ProjectPriority[] = ['low', 'medium', 'high'];

function normalizePriority(value: string | null): ProjectPriority {
  return value && (PRIORITIES as string[]).includes(value) ? (value as ProjectPriority) : 'medium';
}

function toImage(raw: RawProjectSummary['galleryImage']): ProjectImage | null {
  if (!raw || !raw.url || raw.width == null || raw.height == null) return null;
  return { url: raw.url, width: raw.width, height: raw.height, title: raw.title };
}

function toSummary(raw: RawProjectSummary): ProjectSummary | null {
  if (!raw.slug || !raw.projectName) return null;
  return {
    id: raw.sys.id,
    slug: raw.slug,
    title: raw.projectName,
    timeframe: raw.timeframe,
    priority: normalizePriority(raw.priority),
    image: toImage(raw.galleryImage),
  };
}

function toProject(raw: RawProject): Project | null {
  const summary = toSummary(raw);
  if (!summary) return null;
  return {
    ...summary,
    description: toRichText(raw.description),
    link: raw.link,
    linkText: raw.linkText,
  };
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const data = await contentfulFetch<{ projectCollection: { items: RawProjectSummary[] } }>({
    query: PROJECTS_QUERY,
    space: mainSpace,
    tags: [PROJECTS_TAG],
  });
  return data.projectCollection.items.map(toSummary).filter((p): p is ProjectSummary => p !== null);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await contentfulFetch<{ projectCollection: { items: RawProject[] } }>({
    query: PROJECT_BY_SLUG_QUERY,
    variables: { slug },
    space: mainSpace,
    tags: [PROJECTS_TAG],
  });
  const raw = data.projectCollection.items[0];
  return raw ? toProject(raw) : null;
}
