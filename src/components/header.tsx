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
  variant?: 'desktop' | 'mobile';
  transitionTypes?: string[];
  onClick?: () => void;
};

const navPillBase =
  'type-link inline-flex items-center justify-center leading-none rounded-full border px-3 pt-1.5 pb-1 transition-all duration-200';
const navPillActive = 'border-accent bg-accent text-primary-foreground';
const navPillInactive =
  'border-border bg-background text-foreground hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent active:border-accent active:text-accent';

function NavLink({
  href,
  children,
  isActive,
  variant = 'desktop',
  transitionTypes,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      transitionTypes={transitionTypes}
      onClick={onClick}
      className={cn(
        'transition-colors',
        variant === 'desktop'
          ? cn(navPillBase, isActive ? navPillActive : navPillInactive)
          : cn(
              'font-sans',
              isActive
                ? 'text-accent'
                : 'hover:text-accent active:text-accent focus-visible:text-accent'
            )
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
      className={
        variant === 'desktop'
          ? cn(navPillBase, isActive ? navPillActive : navPillInactive)
          : cn(buttonVariants({ variant: 'cta' }), 'font-sans mt-auto h-auto w-full px-3')
      }
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
            src="/unity-in-the-community.svg"
            alt="Logo"
            width={2993}
            height={905}
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        <div className="ml-auto hidden flex-wrap items-baseline gap-3 md:flex">
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
                  variant="mobile"
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
