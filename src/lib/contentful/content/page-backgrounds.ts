import { contentfulFetch } from '../client';
import { mainSpace } from '../spaces';

export const PAGE_BACKGROUNDS_TAG = 'page-backgrounds';

export type PageBackgrounds = {
  home: string[];
  about: string | null;
  events: string | null;
  news: string | null;
  projects: string | null;
  supportUs: string | null;
  imprint: string | null;
  privacyPolicy: string | null;
};

type RawAsset = { url: string | null } | null;

type RawPageBackgroundsResponse = {
  pageBackgroundsCollection: {
    items: Array<{
      homeCollection: { items: Array<{ url: string | null }> };
      about: RawAsset;
      events: RawAsset;
      news: RawAsset;
      projects: RawAsset;
      supportUs: RawAsset;
      imprint: RawAsset;
      privacyPolicy: RawAsset;
    }>;
  };
};

const PAGE_BACKGROUNDS_QUERY = /* GraphQL */ `
  query PageBackgrounds($preview: Boolean) {
    pageBackgroundsCollection(preview: $preview, limit: 1) {
      items {
        homeCollection(limit: 20) {
          items {
            url
          }
        }
        about {
          url
        }
        events {
          url
        }
        news {
          url
        }
        projects {
          url
        }
        supportUs {
          url
        }
        imprint {
          url
        }
        privacyPolicy {
          url
        }
      }
    }
  }
`;

const BACKGROUND_IMAGE_PARAMS = 'w=2400&q=75&fm=webp&fit=fill';

function optimize(url: string | null | undefined): string | null {
  if (!url) return null;
  return `${url}?${BACKGROUND_IMAGE_PARAMS}`;
}

export async function getPageBackgrounds(): Promise<PageBackgrounds | null> {
  const data = await contentfulFetch<RawPageBackgroundsResponse>({
    query: PAGE_BACKGROUNDS_QUERY,
    space: mainSpace,
    tags: [PAGE_BACKGROUNDS_TAG],
  });
  const raw = data.pageBackgroundsCollection.items[0];
  if (!raw) return null;
  return {
    home: raw.homeCollection.items
      .map((item) => optimize(item.url))
      .filter((url): url is string => Boolean(url)),
    about: optimize(raw.about?.url),
    events: optimize(raw.events?.url),
    news: optimize(raw.news?.url),
    projects: optimize(raw.projects?.url),
    supportUs: optimize(raw.supportUs?.url),
    imprint: optimize(raw.imprint?.url),
    privacyPolicy: optimize(raw.privacyPolicy?.url),
  };
}
