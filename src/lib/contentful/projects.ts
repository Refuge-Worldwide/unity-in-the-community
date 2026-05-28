import type { Document } from '@contentful/rich-text-types';
import { contentfulFetch } from './client';
import { mainSpace } from './spaces';
import type { Project, ProjectImage, ProjectPriority } from './types';

export const PROJECTS_TAG = 'projects';

type RawProject = {
  sys: { id: string; firstPublishedAt: string | null };
  slug: string | null;
  projectName: string | null;
  timeframe: string | null;
  priority: string | null;
  description: { json: Document } | null;
  galleryImage: {
    url: string | null;
    width: number | null;
    height: number | null;
    title: string | null;
  } | null;
  link: string | null;
  linkText: string | null;
};

const PROJECT_FIELDS = /* GraphQL */ `
  sys {
    id
    firstPublishedAt
  }
  slug
  projectName
  timeframe
  priority
  description {
    json
  }
  galleryImage {
    url
    width
    height
    title
  }
  link
  linkText
`;

const PROJECTS_QUERY = /* GraphQL */ `
  query Projects($preview: Boolean) {
    projectCollection(preview: $preview, order: sys_firstPublishedAt_DESC) {
      items {
        ${PROJECT_FIELDS}
      }
    }
  }
`;

const PROJECT_BY_SLUG_QUERY = /* GraphQL */ `
  query ProjectBySlug($preview: Boolean, $slug: String!) {
    projectCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        ${PROJECT_FIELDS}
      }
    }
  }
`;

const PRIORITIES: ProjectPriority[] = ['low', 'medium', 'high'];

function normalizePriority(value: string | null): ProjectPriority {
  return value && (PRIORITIES as string[]).includes(value) ? (value as ProjectPriority) : 'medium';
}

function toImage(raw: RawProject['galleryImage']): ProjectImage | null {
  if (!raw || !raw.url || raw.width == null || raw.height == null) return null;
  return { url: raw.url, width: raw.width, height: raw.height, title: raw.title };
}

function toProject(raw: RawProject): Project | null {
  if (!raw.slug || !raw.projectName) return null;
  return {
    id: raw.sys.id,
    slug: raw.slug,
    title: raw.projectName,
    timeframe: raw.timeframe,
    priority: normalizePriority(raw.priority),
    description: raw.description?.json ?? null,
    image: toImage(raw.galleryImage),
    link: raw.link,
    linkText: raw.linkText,
  };
}

export async function getProjects(): Promise<Project[]> {
  const data = await contentfulFetch<{ projectCollection: { items: RawProject[] } }>({
    query: PROJECTS_QUERY,
    space: mainSpace,
    tags: [PROJECTS_TAG],
  });
  return data.projectCollection.items.map(toProject).filter((p): p is Project => p !== null);
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
