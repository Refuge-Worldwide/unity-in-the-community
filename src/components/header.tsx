'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

const links = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
];

function getNavIndex(path: string): number {
  const index = links.findIndex((link) => {
    if (link.href === '/') {
      return path === '/';
    }
    return path.startsWith(link.href);
  });

  return index;
}

function getTransitionTypes(currentPath: string, targetHref: string): string[] | undefined {
  const currentIndex = getNavIndex(currentPath);
  const targetIndex = getNavIndex(targetHref);

  if (currentIndex === -1 || targetIndex === -1 || currentIndex === targetIndex) {
    return undefined;
  }

  return [targetIndex > currentIndex ? 'nav-forward' : 'nav-back'];
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="h-full">
      <nav className="flex h-full items-start justify-between">
        <Link href="/">
          <Image
            src="/UNITY IN THE COMMUNITY.svg"
            alt="Logo"
            width={2993}
            height={905}
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <div className="type-h2 ml-auto hidden h-full flex-wrap gap-4 uppercase md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              transitionTypes={getTransitionTypes(pathname, link.href)}
              className={isActive(link.href) ? 'text-accent' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="ml-auto md:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] max-w-xs">
            <SheetHeader></SheetHeader>
            <div className="type-h2 flex flex-col gap-4 px-4 pb-6 uppercase">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  transitionTypes={getTransitionTypes(pathname, link.href)}
                  onClick={() => setOpen(false)}
                  className={isActive(link.href) ? 'text-accent' : ''}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
