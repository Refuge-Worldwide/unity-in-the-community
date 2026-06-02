import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomeBackground } from '@/components/home-background';
import { RouteBackground } from '@/components/route-background';
import { RouteContentTransition } from '@/components/route-content-transition';
import { ScrollShell } from '@/components/scroll-shell';
import { getPageBackgrounds } from '@/lib/contentful/content/page-backgrounds';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unity in the Community',
  description: "Refuge Worldwide's educational platform.", // todo: TBD
  icons: {
    icon: '/unity-in-the-community.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgrounds = await getPageBackgrounds();
  const homePhotos = backgrounds?.home ?? [];
  const preloadUrls = Array.from(
    new Set(
      [
        ...homePhotos,
        backgrounds?.about,
        backgrounds?.events,
        backgrounds?.news,
        backgrounds?.projects,
        backgrounds?.supportUs,
        backgrounds?.imprint,
        backgrounds?.privacyPolicy,
      ].filter((url): url is string => Boolean(url))
    )
  );

  return (
    <html lang="en">
      <head>
        {preloadUrls.map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
      </head>
      <body className="relative isolate flex min-h-dvh bg-background">
        <RouteBackground backgrounds={backgrounds} />
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
