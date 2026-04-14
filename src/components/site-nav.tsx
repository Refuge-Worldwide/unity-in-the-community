import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
];

export function SiteNav() {
  return (
    <header className="border-b border-border/60">
      <nav className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 py-4 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-full border px-4 py-2">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
