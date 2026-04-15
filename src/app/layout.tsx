import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RouteBackground } from '@/components/route-background';
import { RouteContentTransition } from '@/components/route-content-transition';
import './globals.css';

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
      <body className="relative isolate flex min-h-dvh bg-background">
        <RouteBackground />
        <div
          className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] site-container py-4"
          style={{ viewTransitionName: 'site-header' }}
        >
          <Header />
        </div>
        <div
          className="site-container subtle-scrollbar fixed z-10 flex h-dvh w-full flex-col overflow-y-auto overflow-x-hidden pt-[var(--header-height)]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0, black var(--header-height))',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, black var(--header-height))',
          }}
        >
          <RouteContentTransition>
            <main className="flex-1 py-16">{children}</main>
            <div className="py-4">
              <Footer />
            </div>
          </RouteContentTransition>
        </div>
      </body>
    </html>
  );
}
