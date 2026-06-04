import { contentfulFetch } from '../client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { RichTextContent } from '../types';

export const IMPRINT_TAG = 'imprint';

type RawImprintResponse = {
  pageImprintCollection: {
    items: Array<{
      content: RawRichTextField;
    }>;
  };
};

const IMPRINT_QUERY = /* GraphQL */ `
  query Imprint($preview: Boolean) {
    pageImprintCollection(preview: $preview, limit: 1) {
      items {
        content {
          ${RICH_TEXT_FIELDS}
        }
      }
    }
  }
`;

export async function getImprintContent(): Promise<RichTextContent | null> {
  const data = await contentfulFetch<RawImprintResponse>({
    query: IMPRINT_QUERY,
    space: mainSpace,
    tags: [IMPRINT_TAG],
  });
  const raw = data.pageImprintCollection.items[0];
  return raw ? toRichText(raw.content) : null;
}
