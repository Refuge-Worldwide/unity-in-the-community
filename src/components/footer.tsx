'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { href: '/imprint', label: 'Imprint' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export function Footer() {
  const pathname = usePathname();
  const isNested = pathname.split('/').filter(Boolean).length > 1;

  if (isNested) {
    return <footer className="h-[var(--footer-height-nested)] shrink-0" />;
  }

  return (
    <footer className="flex h-[var(--footer-height)] shrink-0 items-end">
      <small className="mx-auto mb-4 flex w-full flex-wrap justify-center gap-6 text-muted-foreground">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </small>
    </footer>
  );
}
