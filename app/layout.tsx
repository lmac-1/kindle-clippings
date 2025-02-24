import type { Metadata } from 'next';
import './globals.css';
import { ResetStoreButton } from '@/components/ResetStoreButton';
import Link from 'next/link';
import { Quicksand, Nunito, Montserrat } from 'next/font/google';
import { Footer } from '@/components/Footer';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'My Kindle Clippings',
  description: 'An application to process your Kindle clippings',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="antialiased min-h-screen flex flex-col">
        <nav className="flex justify-between border-b border-dashed items-baseline py-3 px-4">
          <Link href="/" className="text-lg font-semibold">
            📚 My Kindle Clippings
          </Link>
          <div className="flex gap-6 items-baseline">
            <Link
              href="/about"
              className="decoration-dashed underline underline-offset-4 decoration-1 hover:decoration-violet-600 transition-colors"
            >
              About
            </Link>
            <ResetStoreButton />
          </div>
        </nav>
        <div className="grow max-w-xl mx-auto py-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
