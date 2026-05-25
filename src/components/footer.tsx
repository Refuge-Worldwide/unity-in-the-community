import Link from 'next/link';

const footerLinks = [
  { href: '/imprint', label: 'Imprint' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export function Footer() {
  return (
    <footer className="flex h-[var(--footer-height)] shrink-0 items-end">
      <div className="mx-auto mb-4 flex w-full flex-wrap justify-center gap-6 text-xs text-muted-foreground">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
