import { PageLayout } from '@/components/page-layout';
import { RichText } from '@/components/rich-text';
import { getImprintContent } from '@/lib/contentful/content/imprint';

export default async function ImprintPage() {
  const content = await getImprintContent();

  return (
    <PageLayout title="Imprint">
      {content && (
        <article className="prose">
          <RichText content={content} />
        </article>
      )}
    </PageLayout>
  );
}
