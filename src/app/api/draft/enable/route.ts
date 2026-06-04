import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const secret = process.env.CONTENTFUL_PREVIEW_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const providedSecret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (providedSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const safeSlug = slug && slug.startsWith('/') && !slug.startsWith('//') ? slug : '/';

  const draft = await draftMode();
  draft.enable();
  redirect(safeSlug);
}
