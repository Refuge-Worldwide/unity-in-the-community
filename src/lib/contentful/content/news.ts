import type { NewsArticle, NewsArticleSummary } from '../types';
import { getRwNewsArticleBySlug, getRwNewsArticles } from './rw-news';
import { getUitcNewsArticleBySlug, getUitcNewsArticles } from './uitc-news';

export { UITC_NEWS_TAG } from './uitc-news';
export { RW_NEWS_TAG } from './rw-news';

export async function getAllNewsArticles(): Promise<NewsArticleSummary[]> {
  const [uitcArticles, rwArticles] = await Promise.all([
    getUitcNewsArticles(),
    getRwNewsArticles(),
  ]);
  return [...uitcArticles, ...rwArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const uitcArticle = await getUitcNewsArticleBySlug(slug);
  if (uitcArticle) return uitcArticle;
  return getRwNewsArticleBySlug(slug);
}

export function formatNewsDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
