import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomeBackground } from '@/components/home-background';
import { RouteBackground } from '@/components/route-background';
import { RouteContentTransition } from '@/components/route-content-transition';
import { ScrollShell } from '@/components/scroll-shell';
import { getHomeContent } from '@/lib/contentful/content/home';
import './globals.css';

const BACKGROUND_IMAGES = [
  '/backgrounds/home.svg',
  '/backgrounds/about.svg',
  '/backgrounds/events.svg',
  '/backgrounds/news.svg',
  '/backgrounds/projects.svg',
  '/backgrounds/default.svg',
  '/backgrounds/support-us.svg',
];

export const metadata: Metadata = {
  title: 'Unity in the Community',
  description: "Refuge Worldwide's educational platform.", // todo: TBD
  icons: {
    icon: '/UNITY IN THE COMMUNITY.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const home = await getHomeContent();
  const homePhotos = home?.photos ?? [];

  return (
    <html lang="en">
      <head>
        {BACKGROUND_IMAGES.map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
      </head>
      <body className="relative isolate flex min-h-dvh bg-background">
        <RouteBackground />
        <HomeBackground photos={homePhotos} />
        <div
          className="site-container fixed top-0 left-0 right-0 z-50 h-[var(--header-height)]"
          style={{ viewTransitionName: 'site-header' }}
        >
          <Header />
        </div>
        <ScrollShell>
          <RouteContentTransition>
            <div className="site-container flex-col flex md:min-h-full">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </RouteContentTransition>
        </ScrollShell>
      </body>
    </html>
  );
}
