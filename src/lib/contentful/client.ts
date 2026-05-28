import { draftMode } from 'next/headers';
import type { SpaceConfig } from './spaces';

type FetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  space: SpaceConfig;
  tags?: string[];
};

export async function contentfulFetch<TData>({
  query,
  variables,
  space,
  tags,
}: FetchOptions): Promise<TData> {
  const { isEnabled: preview } = await draftMode();
  const token = preview ? space.previewToken : space.deliveryToken;

  const url = `https://graphql.contentful.com/content/v1/spaces/${space.spaceId}/environments/${space.environment}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { ...variables, preview } }),
    cache: preview ? 'no-store' : 'force-cache',
    next: { tags },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Contentful request failed: ${res.status} ${res.statusText} — ${body}`);
  }

  const json = (await res.json()) as { data: TData; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new Error(`Contentful GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`);
  }

  return json.data;
}
