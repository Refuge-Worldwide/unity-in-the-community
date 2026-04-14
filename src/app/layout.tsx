import type { Metadata } from 'next';
import { Header } from '@/components/header';
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
      <body className="min-h-screen">
        <Header />
        <main className="px-6 py-16">{children}</main>
      </body>
    </html>
  );
}
