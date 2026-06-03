import { PageLayout } from '@/components/page-layout';
import { RichText } from '@/components/rich-text';
import { getSupportUsContent } from '@/lib/contentful/content/support-us';
import { SupportUsForm } from './support-us-form';

export default async function SupportUsPage() {
  const data = await getSupportUsContent();

  return (
    <PageLayout title="Support Us">
      <div className="grid gap-6 md:gap-10 xl:grid-cols-[minmax(0,36rem)_1fr] xl:gap-12 xl:gap-x-10">
        {data?.contentTop && (
          <div className="prose xl:hidden">
            <RichText content={data.contentTop} />
          </div>
        )}

        <div>
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
        </div>

        <div className="prose hidden xl:block">
          {data?.contentTop && <RichText content={data.contentTop} />}
          {data?.contentBottom && <RichText content={data.contentBottom} />}
        </div>

        {data?.contentBottom && (
          <div className="prose xl:hidden">
            <RichText content={data.contentBottom} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
