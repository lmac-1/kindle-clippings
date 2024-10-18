import type { Metadata } from 'next';
import './globals.css';
import { ResetStoreButton } from '@/components/ResetStoreButton';
import Link from 'next/link';

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
    <html lang="en">
      <body className="antialiased">
        <nav className="flex justify-between items-baseline py-2 px-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ResetStoreButton />
        </nav>

        {children}
      </body>
    </html>
  );
}
