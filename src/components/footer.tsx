import Link from 'next/link';

const footerLinks = [
  { href: '/imprint', label: 'Imprint' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export function Footer() {
  return (
    <footer className="mt-8 md:mt-16">
      <div className="mx-auto my-4 flex w-full flex-wrap justify-center gap-6 text-xs text-muted-foreground">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
