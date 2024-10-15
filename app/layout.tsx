import type { Metadata } from 'next';
import './globals.css';

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
