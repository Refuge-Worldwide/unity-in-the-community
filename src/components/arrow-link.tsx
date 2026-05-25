import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

type ArrowLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  direction: 'left' | 'right';
  children: ReactNode;
  transitionTypes?: ComponentProps<typeof Link>['transitionTypes'];
};

export function ArrowLink({ href, direction, children, transitionTypes }: ArrowLinkProps) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;
  const icon = <Icon className="size-5 -translate-y-px" />;
  return (
    <Link
      href={href}
      transitionTypes={transitionTypes}
      className="inline-flex w-fit items-center gap-2 font-medium"
    >
      {direction === 'left' && icon}
      {children}
      {direction === 'right' && icon}
    </Link>
  );
}
