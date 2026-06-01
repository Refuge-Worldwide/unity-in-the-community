import { PageLayout } from '@/components/page-layout';
import { RichText } from '@/components/rich-text';
import { getHomeContent } from '@/lib/contentful/content/home';

export default async function Home() {
  const data = await getHomeContent();

  return (
    <PageLayout title="Unity in the Community" variant="hero">
      {data?.content && (
        <div className="prose max-w-xl">
          <RichText content={data.content} />
        </div>
      )}
    </PageLayout>
  );
}
