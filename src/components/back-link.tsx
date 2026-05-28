import type { ComponentProps, ReactNode } from 'react';
import type Link from 'next/link';
import { ArrowLink } from '@/components/arrow-link';

type BackLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
};

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <div className="mb-8">
      <ArrowLink href={href} direction="left" transitionTypes={['detail-close']}>
        {children}
      </ArrowLink>
    </div>
  );
}
