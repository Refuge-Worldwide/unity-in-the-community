import { PageLayout } from '@/components/page-layout';
import { RichText } from '@/components/rich-text';
import { getPrivacyPolicyContent } from '@/lib/contentful/content/privacy-policy';

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicyContent();

  return (
    <PageLayout title="Privacy Policy">
      {content && (
        <article className="prose">
          <RichText content={content} />
        </article>
      )}
    </PageLayout>
  );
}
