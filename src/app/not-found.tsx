import { ArrowLink } from '@/components/arrow-link';
import { PageLayout } from '@/components/page-layout';

export default function NotFound() {
  return (
    <PageLayout title="Not Found">
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <ArrowLink href="/" direction="right">
        Back to home
      </ArrowLink>
    </PageLayout>
  );
}
