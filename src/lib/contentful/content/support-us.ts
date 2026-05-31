import { contentfulFetch } from '../client';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { RichTextContent } from '../types';

export const SUPPORT_US_TAG = 'support-us';

export type SupportUsContent = {
  content: RichTextContent | null;
  oneTimePaymentDescription: string | null;
  monthlySupportDescription: string | null;
  monthlySupportDisclaimer: RichTextContent | null;
};

type RawSupportUsResponse = {
  pageSupportUsCollection: {
    items: Array<{
      content: RawRichTextField;
      oneTimePaymentDescription: string | null;
      monthlySupportDescription: string | null;
      monthySupportDisclaimer: RawRichTextField;
    }>;
  };
};

const SUPPORT_US_QUERY = /* GraphQL */ `
  query SupportUs($preview: Boolean) {
    pageSupportUsCollection(preview: $preview, limit: 1) {
      items {
        content {
          ${RICH_TEXT_FIELDS}
        }
        oneTimePaymentDescription
        monthlySupportDescription
        monthySupportDisclaimer {
          ${RICH_TEXT_FIELDS}
        }
      }
    }
  }
`;

export async function getSupportUsContent(): Promise<SupportUsContent | null> {
  const data = await contentfulFetch<RawSupportUsResponse>({
    query: SUPPORT_US_QUERY,
    space: mainSpace,
    tags: [SUPPORT_US_TAG],
  });
  const raw = data.pageSupportUsCollection.items[0];
  if (!raw) return null;
  return {
    content: toRichText(raw.content),
    oneTimePaymentDescription: raw.oneTimePaymentDescription,
    monthlySupportDescription: raw.monthlySupportDescription,
    monthlySupportDisclaimer: toRichText(raw.monthySupportDisclaimer),
  };
}
