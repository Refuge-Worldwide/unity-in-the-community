'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type NavLinkData = { href: string; label: string };

const navLinks: NavLinkData[] = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
];

const ctaLink: NavLinkData = { href: '/support-us', label: 'Support Us' };

const allLinks = [...navLinks, ctaLink];

function isLinkActive(href: string, pathname: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

function getTransitionTypes(currentPath: string, targetHref: string): string[] | undefined {
  const currentIndex = allLinks.findIndex((link) => isLinkActive(link.href, currentPath));
  const targetIndex = allLinks.findIndex((link) => isLinkActive(link.href, targetHref));

  if (currentIndex === -1 || targetIndex === -1 || currentIndex === targetIndex) {
    return undefined;
  }

  return [targetIndex > currentIndex ? 'nav-forward' : 'nav-back'];
}

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  transitionTypes?: string[];
  onClick?: () => void;
};

function NavLink({ href, children, isActive, transitionTypes, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      transitionTypes={transitionTypes}
      onClick={onClick}
      className={cn(
        'transition-colors',
        isActive ? 'text-accent' : 'hover:text-accent active:text-accent focus-visible:text-accent'
      )}
    >
      {children}
    </Link>
  );
}

type NavCtaLinkProps = NavLinkProps & { variant: 'desktop' | 'mobile' };

function NavCtaLink({
  href,
  children,
  variant,
  isActive,
  transitionTypes,
  onClick,
}: NavCtaLinkProps) {
  return (
    <Link
      href={href}
      transitionTypes={transitionTypes}
      onClick={onClick}
      data-active={isActive || undefined}
      className={cn(
        buttonVariants({ variant: 'cta' }),
        variant === 'desktop' ? '-my-px px-2' : 'mt-auto w-full px-3'
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-full pt-4 md:pt-6">
      <nav className="flex h-full items-start justify-between">
        <Link href="/">
          <Image
            src="/UNITY IN THE COMMUNITY.svg"
            alt="Logo"
            width={2993}
            height={905}
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        <div className="type-h2 ml-auto hidden flex-wrap items-baseline gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              isActive={isLinkActive(link.href, pathname)}
              transitionTypes={getTransitionTypes(pathname, link.href)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavCtaLink
            href={ctaLink.href}
            variant="desktop"
            isActive={isLinkActive(ctaLink.href, pathname)}
            transitionTypes={getTransitionTypes(pathname, ctaLink.href)}
          >
            {ctaLink.label}
          </NavCtaLink>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost-bare"
                size="icon-sm"
                className="ml-auto md:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="size-7" />
              </Button>
            }
          ></SheetTrigger>
          <SheetContent side="right" className="w-[80vw] max-w-xs">
            <SheetHeader></SheetHeader>
            <div className="type-h1 flex h-full flex-col gap-4 px-4 pb-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={isLinkActive(link.href, pathname)}
                  transitionTypes={getTransitionTypes(pathname, link.href)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <NavCtaLink
                href={ctaLink.href}
                variant="mobile"
                isActive={isLinkActive(ctaLink.href, pathname)}
                transitionTypes={getTransitionTypes(pathname, ctaLink.href)}
                onClick={() => setOpen(false)}
              >
                {ctaLink.label}
              </NavCtaLink>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
