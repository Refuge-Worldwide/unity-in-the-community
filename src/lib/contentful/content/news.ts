import { contentfulFetch } from '../client';
import { type RawImage, toImage } from '../fields/image';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { mainSpace } from '../spaces';
import type { NewsArticle, NewsArticleSummary } from '../types';

export const NEWS_TAG = 'news';

type RawNewsSummary = {
  sys: { id: string };
  slug: string | null;
  title: string | null;
  subtitle: string | null;
  date: string | null;
  author: string | null;
  coverImage: RawImage;
};

type RawNewsArticle = RawNewsSummary & {
  content: RawRichTextField;
};

const NEWS_LIST_FIELDS = /* GraphQL */ `
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

const NEWS_DETAIL_FIELDS = /* GraphQL */ `
  ${NEWS_LIST_FIELDS}
  content {
    ${RICH_TEXT_FIELDS}
  }
`;

const NEWS_QUERY = /* GraphQL */ `
  query News($preview: Boolean) {
    newsArticleCollection(preview: $preview, order: date_DESC) {
      items {
        ${NEWS_LIST_FIELDS}
      }
    }
  }
`;

const NEWS_BY_SLUG_QUERY = /* GraphQL */ `
  query NewsBySlug($preview: Boolean, $slug: String!) {
    newsArticleCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        ${NEWS_DETAIL_FIELDS}
      }
    }
  }
`;

function toSummary(raw: RawNewsSummary): NewsArticleSummary | null {
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

function toArticle(raw: RawNewsArticle): NewsArticle | null {
  const summary = toSummary(raw);
  if (!summary) return null;
  return { ...summary, content: toRichText(raw.content) };
}

export async function getNewsArticles(): Promise<NewsArticleSummary[]> {
  const data = await contentfulFetch<{ newsArticleCollection: { items: RawNewsSummary[] } }>({
    query: NEWS_QUERY,
    space: mainSpace,
    tags: [NEWS_TAG],
  });
  return data.newsArticleCollection.items
    .map(toSummary)
    .filter((a): a is NewsArticleSummary => a !== null);
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const data = await contentfulFetch<{ newsArticleCollection: { items: RawNewsArticle[] } }>({
    query: NEWS_BY_SLUG_QUERY,
    variables: { slug },
    space: mainSpace,
    tags: [NEWS_TAG],
  });
  const raw = data.newsArticleCollection.items[0];
  return raw ? toArticle(raw) : null;
}

export function formatNewsDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
