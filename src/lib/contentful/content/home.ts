import { contentfulFetch } from '../client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { RichTextContent } from '../types';

export const HOME_TAG = 'home';

export type HomeContent = {
  content: RichTextContent | null;
  photos: string[];
};

type RawHomeResponse = {
  pageHomeCollection: {
    items: Array<{
      content: RawRichTextField;
      photosCollection: {
        items: Array<{ url: string | null }>;
      };
    }>;
  };
};

const HOME_QUERY = /* GraphQL */ `
  query Home($preview: Boolean) {
    pageHomeCollection(preview: $preview, limit: 1) {
      items {
        content {
          ${RICH_TEXT_FIELDS}
        }
        photosCollection(limit: 20) {
          items {
            url
          }
        }
      }
    }
  }
`;

export async function getHomeContent(): Promise<HomeContent | null> {
  const data = await contentfulFetch<RawHomeResponse>({
    query: HOME_QUERY,
    space: mainSpace,
    tags: [HOME_TAG],
  });
  const raw = data.pageHomeCollection.items[0];
  if (!raw) return null;
  return {
    content: toRichText(raw.content),
    photos: raw.photosCollection.items
      .map((item) => item.url)
      .filter((url): url is string => Boolean(url)),
  };
}
