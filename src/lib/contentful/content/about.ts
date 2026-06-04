import { contentfulFetch } from '../client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { RichTextContent } from '../types';

export const ABOUT_TAG = 'about';

type RawAboutResponse = {
  pageAboutCollection: {
    items: Array<{
      content: RawRichTextField;
    }>;
  };
};

const ABOUT_QUERY = /* GraphQL */ `
  query About($preview: Boolean) {
    pageAboutCollection(preview: $preview, limit: 1) {
      items {
        content {
          ${RICH_TEXT_FIELDS}
        }
      }
    }
  }
`;

export async function getAboutContent(): Promise<RichTextContent | null> {
  const data = await contentfulFetch<RawAboutResponse>({
    query: ABOUT_QUERY,
    space: mainSpace,
    tags: [ABOUT_TAG],
  });
  const raw = data.pageAboutCollection.items[0];
  return raw ? toRichText(raw.content) : null;
}
