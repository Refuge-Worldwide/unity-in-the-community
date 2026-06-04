import { PageLayout } from '@/components/page-layout';
import { RichText } from '@/components/rich-text';
import { getHomeContent } from '@/lib/contentful/content/home';

export default async function Home() {
  const content = await getHomeContent();

  return (
    <PageLayout title="Unity in the Community" variant="hero">
      {content && (
        <div className="prose ml-12 md:ml-0 md:max-w-xl">
          <RichText content={content} />
        </div>
      )}
    </PageLayout>
  );
}
