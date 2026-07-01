import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { ABOUT_TAG } from '@/lib/contentful/content/about';
import { EVENTS_TAG } from '@/lib/contentful/content/events';
import { HOME_TAG } from '@/lib/contentful/content/home';
import { IMPRINT_TAG } from '@/lib/contentful/content/imprint';
import { RW_NEWS_TAG, UITC_NEWS_TAG } from '@/lib/contentful/content/news';
import { PAGE_BACKGROUNDS_TAG } from '@/lib/contentful/content/page-backgrounds';
import { PRIVACY_POLICY_TAG } from '@/lib/contentful/content/privacy-policy';
import { PROJECTS_TAG } from '@/lib/contentful/content/projects';
import { SUPPORT_US_TAG } from '@/lib/contentful/content/support-us';

const CONTENT_TYPE_TAGS: Record<string, string> = {
  event: EVENTS_TAG,
  project: PROJECTS_TAG,
  newsArticle: UITC_NEWS_TAG,
  article: RW_NEWS_TAG,
  pageAbout: ABOUT_TAG,
  pageSupportUs: SUPPORT_US_TAG,
  pageHome: HOME_TAG,
  pageBackgrounds: PAGE_BACKGROUNDS_TAG,
  pageImprint: IMPRINT_TAG,
  pagePrivacyPolicy: PRIVACY_POLICY_TAG,
};

export async function POST(req: NextRequest) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  if (req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    sys?: { contentType?: { sys?: { id?: string } } };
  } | null;
  const contentType = body?.sys?.contentType?.sys?.id;
  if (!contentType) {
    return NextResponse.json({ error: 'Missing content type in payload' }, { status: 400 });
  }

  const tag = CONTENT_TYPE_TAGS[contentType];
  if (!tag) {
    return NextResponse.json({ revalidated: false, contentType });
  }

  revalidateTag(tag, 'max');
  return NextResponse.json({ revalidated: true, tag });
}
