import { Faker, en } from '@faker-js/faker';
import { PageLayout } from '@/components/page-layout';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const faker = new Faker({ locale: [en] });
faker.seed(7);

const bodyParagraphs = Array.from({ length: 6 }, () => faker.lorem.paragraph({ min: 4, max: 8 }));

export default function AboutPage() {
  return (
    <PageLayout title="About">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_26rem] md:gap-16">
        <article className="space-y-6 text-justify hyphens-auto">
          {bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </article>

        <Card className="self-start">
          <section className="space-y-2">
            <h2>Contact us</h2>
            <address className="not-italic">
              Unity In The Community
              <br />
              Niemetzstrasse 1
              <br />
              12055 Berlin
            </address>
            <p>
              <a href="mailto:hello@unityinthecommunity.de" className="hover:text-accent">
                hello@unityinthecommunity.de
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2>Volunteering</h2>
            <p>
              Please reach out with volunteering in the subject title and a brief description of how
              you would like to get involved. We&rsquo;d love to hear from you!
            </p>
          </section>

          <section className="space-y-2">
            <h2>Partnerships &amp; Donations</h2>
            <p>
              Funding support is a vital way to keep our work going. If you can help us, please get
              in touch.
            </p>
          </section>

          <section className="space-y-3">
            <h2>Newsletter</h2>
            <a href="#" className={cn(buttonVariants({ variant: 'cta' }), 'w-full px-3 py-2')}>
              Subscribe to our newsletter
            </a>
          </section>
        </Card>
      </div>
    </PageLayout>
  );
}
