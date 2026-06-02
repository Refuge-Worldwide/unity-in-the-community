import { contentfulFetch } from '../client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { RichTextContent } from '../types';

export const PRIVACY_POLICY_TAG = 'privacy-policy';

type RawPrivacyPolicyResponse = {
  pagePrivacyPolicyCollection: {
    items: Array<{
      content: RawRichTextField;
    }>;
  };
};

const PRIVACY_POLICY_QUERY = /* GraphQL */ `
  query PrivacyPolicy($preview: Boolean) {
    pagePrivacyPolicyCollection(preview: $preview, limit: 1) {
      items {
        content {
          ${RICH_TEXT_FIELDS}
        }
      }
    }
  }
`;

export async function getPrivacyPolicyContent(): Promise<RichTextContent | null> {
  const data = await contentfulFetch<RawPrivacyPolicyResponse>({
    query: PRIVACY_POLICY_QUERY,
    space: mainSpace,
    tags: [PRIVACY_POLICY_TAG],
  });
  const raw = data.pagePrivacyPolicyCollection.items[0];
  return raw ? toRichText(raw.content) : null;
}
