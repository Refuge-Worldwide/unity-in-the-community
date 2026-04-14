'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header>
      <nav className="flex w-full items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/UNITY IN THE COMMUNITY.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-10 w-auto"
          />
        </Link>
        <div className="type-h2 ml-auto flex flex-wrap gap-4 uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'text-accent' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
