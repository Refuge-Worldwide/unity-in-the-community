import { contentfulFetch } from '../client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { RichTextContent } from '../types';

export const HOME_TAG = 'home';

type RawHomeResponse = {
  pageHomeCollection: {
    items: Array<{
      content: RawRichTextField;
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
      }
    }
  }
`;

export async function getHomeContent(): Promise<RichTextContent | null> {
  const data = await contentfulFetch<RawHomeResponse>({
    query: HOME_QUERY,
    space: mainSpace,
    tags: [HOME_TAG],
  });
  const raw = data.pageHomeCollection.items[0];
  return raw ? toRichText(raw.content) : null;
}
