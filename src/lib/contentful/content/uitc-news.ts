import { contentfulFetch } from '../client';
import { type RawImage, toImage } from '../fields/image';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { NewsArticle, NewsArticleSummary } from '../types';

export const UITC_NEWS_TAG = 'uitc-news';

type RawUitcNewsSummary = {
  sys: { id: string };
  slug: string | null;
  title: string | null;
  subtitle: string | null;
  date: string | null;
  author: string | null;
  coverImage: RawImage;
};

type RawUitcNewsArticle = RawUitcNewsSummary & {
  content: RawRichTextField;
};

const UITC_NEWS_LIST_FIELDS = /* GraphQL */ `
  sys {
    id
  }
  slug
  title
  subtitle
  date
  author
  coverImage {
    url
    width
    height
    title
  }
`;

const UITC_NEWS_DETAIL_FIELDS = /* GraphQL */ `
  ${UITC_NEWS_LIST_FIELDS}
  content {
    ${RICH_TEXT_FIELDS}
  }
`;

const UITC_NEWS_QUERY = /* GraphQL */ `
  query UitcNews($preview: Boolean) {
    newsArticleCollection(preview: $preview, order: date_DESC) {
      items {
        ${UITC_NEWS_LIST_FIELDS}
      }
    }
  }
`;

const UITC_NEWS_BY_SLUG_QUERY = /* GraphQL */ `
  query UitcNewsBySlug($preview: Boolean, $slug: String!) {
    newsArticleCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        ${UITC_NEWS_DETAIL_FIELDS}
      }
    }
  }
`;

function toSummary(raw: RawUitcNewsSummary): NewsArticleSummary | null {
  if (!raw.slug || !raw.title || !raw.date) return null;
  return {
    id: raw.sys.id,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle,
    date: raw.date,
    author: raw.author,
    coverImage: toImage(raw.coverImage),
  };
}

function toArticle(raw: RawUitcNewsArticle): NewsArticle | null {
  const summary = toSummary(raw);
  if (!summary) return null;
  return { ...summary, content: toRichText(raw.content) };
}

export async function getUitcNewsArticles(): Promise<NewsArticleSummary[]> {
  const data = await contentfulFetch<{
    newsArticleCollection: { items: RawUitcNewsSummary[] };
  }>({
    query: UITC_NEWS_QUERY,
    space: mainSpace,
    tags: [UITC_NEWS_TAG],
  });
  return data.newsArticleCollection.items
    .map(toSummary)
    .filter((a): a is NewsArticleSummary => a !== null);
}

export async function getUitcNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const data = await contentfulFetch<{
    newsArticleCollection: { items: RawUitcNewsArticle[] };
  }>({
    query: UITC_NEWS_BY_SLUG_QUERY,
    variables: { slug },
    space: mainSpace,
    tags: [UITC_NEWS_TAG],
  });
  const raw = data.newsArticleCollection.items[0];
  return raw ? toArticle(raw) : null;
}
