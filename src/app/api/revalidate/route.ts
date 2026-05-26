import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { EVENTS_TAG } from '@/lib/contentful/events';

const CONTENT_TYPE_TAGS: Record<string, string> = {
  event: EVENTS_TAG,
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
