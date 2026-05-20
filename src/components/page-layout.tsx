import { cn } from '@/lib/utils';

type PageVariant = 'default' | 'hero';

type PageLayoutProps = {
  title: string;
  variant?: PageVariant;
  children: React.ReactNode;
};

const variantClassName: Record<PageVariant, string | undefined> = {
  default: undefined,
  hero: 'h-full items-end justify-end text-right',
};

export function PageLayout({ title, variant = 'default', children }: PageLayoutProps) {
  return (
    <section className={cn('flex flex-col gap-6 md:gap-8', variantClassName[variant])}>
      <h1 className="mb-0">{title}</h1>
      <div className="space-y-8">{children}</div>
    </section>
  );
}
