import { contentfulFetch } from '../client';
import { type RawImage, toImage } from '../fields/image';
import { RICH_TEXT_FIELDS, type RawRichTextField, toRichText } from '../fields/rich-text';
import { eventsSpace } from '../spaces';
import type { NewsArticle, NewsArticleSummary } from '../types';

export const RW_NEWS_TAG = 'rw-news';

type RawRwArticleSummary = {
  sys: { id: string };
  slug: string | null;
  title: string | null;
  subtitle: string | null;
  date: string | null;
  author: { name: string } | null;
  coverImage: RawImage;
};

type RawRwArticle = RawRwArticleSummary & {
  content: RawRichTextField;
};

const RW_ARTICLE_LIST_FIELDS = /* GraphQL */ `
  sys {
    id
  }
  slug
  title
  subtitle
  date
  author {
    name
  }
  coverImage {
    url
    width
    height
    title
  }
`;

const RW_ARTICLE_DETAIL_FIELDS = /* GraphQL */ `
  ${RW_ARTICLE_LIST_FIELDS}
  content {
    ${RICH_TEXT_FIELDS}
  }
`;

const RW_NEWS_QUERY = /* GraphQL */ `
  query RwNews($preview: Boolean) {
    articleCollection(preview: $preview, where: { showOnUitcWebsite: true }, order: date_DESC) {
      items {
        ${RW_ARTICLE_LIST_FIELDS}
      }
    }
  }
`;

const RW_NEWS_BY_SLUG_QUERY = /* GraphQL */ `
  query RwNewsBySlug($preview: Boolean, $slug: String!) {
    articleCollection(preview: $preview, where: { showOnUitcWebsite: true, slug: $slug }, limit: 1) {
      items {
        ${RW_ARTICLE_DETAIL_FIELDS}
      }
    }
  }
`;

function toSummary(raw: RawRwArticleSummary): NewsArticleSummary | null {
  if (!raw.slug || !raw.title || !raw.date) return null;
  return {
    id: raw.sys.id,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle,
    date: raw.date,
    author: raw.author?.name ?? null,
    coverImage: toImage(raw.coverImage),
  };
}

function toArticle(raw: RawRwArticle): NewsArticle | null {
  const summary = toSummary(raw);
  if (!summary) return null;
  return { ...summary, content: toRichText(raw.content) };
}

export async function getRwNewsArticles(): Promise<NewsArticleSummary[]> {
  const data = await contentfulFetch<{
    articleCollection: { items: RawRwArticleSummary[] };
  }>({
    query: RW_NEWS_QUERY,
    space: eventsSpace,
    tags: [RW_NEWS_TAG],
  });
  return data.articleCollection.items
    .map(toSummary)
    .filter((a): a is NewsArticleSummary => a !== null);
}

export async function getRwNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const data = await contentfulFetch<{
    articleCollection: { items: RawRwArticle[] };
  }>({
    query: RW_NEWS_BY_SLUG_QUERY,
    variables: { slug },
    space: eventsSpace,
    tags: [RW_NEWS_TAG],
  });
  const raw = data.articleCollection.items[0];
  return raw ? toArticle(raw) : null;
}
