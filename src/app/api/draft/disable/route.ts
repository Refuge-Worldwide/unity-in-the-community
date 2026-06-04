import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const safeSlug = slug && slug.startsWith('/') && !slug.startsWith('//') ? slug : '/';

  const draft = await draftMode();
  draft.disable();
  redirect(safeSlug);
}
