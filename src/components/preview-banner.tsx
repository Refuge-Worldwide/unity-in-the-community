import { draftMode } from 'next/headers';

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-4 bg-red-600 px-4 py-2 text-sm text-white">
      <span>Preview mode — showing drafts</span>
      <a href="/api/draft/disable" className="underline underline-offset-2 hover:no-underline">
        Exit preview
      </a>
    </div>
  );
}
