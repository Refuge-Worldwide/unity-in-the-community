import { PageLayout } from '@/components/page-layout';
import { RichText } from '@/components/rich-text';
import { getSupportUsContent } from '@/lib/contentful/content/support-us';
import { SupportUsForm } from './support-us-form';

export default async function SupportUsPage() {
  const data = await getSupportUsContent();

  return (
    <PageLayout title="Support Us">
      {data?.contentTop && (
        <div className="prose">
          <RichText content={data.contentTop} />
        </div>
      )}

      <SupportUsForm
        oneTimeDescription={
          data?.oneTimePaymentDescription && <p>{data.oneTimePaymentDescription}</p>
        }
        monthlyDescription={
          data?.monthlySupportDescription && <p>{data.monthlySupportDescription}</p>
        }
        monthlyDisclaimer={
          data?.monthlySupportDisclaimer && (
            <small className="text-muted-foreground">
              <RichText content={data.monthlySupportDisclaimer} />
            </small>
          )
        }
      />

      {data?.contentBottom && (
        <div className="prose">
          <RichText content={data.contentBottom} />
        </div>
      )}
    </PageLayout>
  );
}
