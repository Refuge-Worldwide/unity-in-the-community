import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RouteBackground } from '@/components/route-background';
import { RouteContentTransition } from '@/components/route-content-transition';
import { ScrollShell } from '../components/scroll-shell';
import './globals.css';

const BACKGROUND_IMAGES = [
  '/backgrounds/home.svg',
  '/backgrounds/about.svg',
  '/backgrounds/events.svg',
  '/backgrounds/news.svg',
  '/backgrounds/projects.svg',
  '/backgrounds/default.svg',
];

export const metadata: Metadata = {
  title: 'Unity in the Community',
  description: 'A non-profit organization by Refuge Worldwide', // todo: TBD
  icons: {
    icon: '/UNITY IN THE COMMUNITY.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {BACKGROUND_IMAGES.map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
      </head>
      <body className="relative isolate flex min-h-dvh bg-background">
        <RouteBackground />
        <div
          className="site-container fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] py-4"
          style={{ viewTransitionName: 'site-header' }}
        >
          <Header />
        </div>
        <ScrollShell>
          <RouteContentTransition>
            <div className="site-container flex-col flex">
              <main className="flex-1 py-16">{children}</main>
              <div className="py-4">
                <Footer />
              </div>
            </div>
          </RouteContentTransition>
        </ScrollShell>
      </body>
    </html>
  );
}
