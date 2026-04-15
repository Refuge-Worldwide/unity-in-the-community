import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unity in the Community',
  description: 'A non-profit organization by Refuge Worldwide', // todo: TBD
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] site-container">
          <Header />
        </div>
        <div
          className="fixed flex h-screen w-full flex-col overflow-scroll pt-[var(--header-height)]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0, black var(--header-height))',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, black var(--header-height))',
          }}
        >
          <main className="site-container flex-1 py-16">{children}</main>
          <div className="site-container py-4">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
