import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

type Direction = 'left' | 'right' | 'down';

const iconClass = 'size-5 -translate-y-px';

function ArrowIcon({ direction }: { direction: Direction }) {
  if (direction === 'left') return <ArrowLeft className={iconClass} />;
  if (direction === 'down') return <ArrowDown className={iconClass} />;
  return <ArrowRight className={iconClass} />;
}

const baseClass = 'type-link inline-flex w-fit cursor-pointer items-center gap-2';

type ArrowLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  direction: Direction;
  children: ReactNode;
  transitionTypes?: ComponentProps<typeof Link>['transitionTypes'];
};

type ArrowButtonProps = {
  onClick: () => void;
  direction: Direction;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function ArrowLink({ href, direction, children, transitionTypes }: ArrowLinkProps) {
  return (
    <Link href={href} transitionTypes={transitionTypes} className={baseClass}>
      {direction === 'left' && <ArrowIcon direction={direction} />}
      {children}
      {direction !== 'left' && <ArrowIcon direction={direction} />}
    </Link>
  );
}

export function ArrowButton({
  onClick,
  direction,
  children,
  disabled,
  className,
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} disabled:opacity-50 ${className ?? ''}`}
    >
      {direction === 'left' && <ArrowIcon direction={direction} />}
      {children}
      {direction !== 'left' && <ArrowIcon direction={direction} />}
    </button>
  );
}
