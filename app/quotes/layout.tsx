'use client';
import { Summary } from '@/components/Summary';
import useClippingStore from '@/store/clippingStore';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { quotes, books } = useClippingStore();

  if (!quotes && !books) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        Oops! No clippings found.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      {quotes && books && (
        <Summary totalQuotes={quotes.length} totalBooks={books.length} />
      )}
      {quotes && books && (
        <div className="mt-4 mb-8 flex gap-6 justify-center">
          <Link
            className="text-violet-700 outline-none focus:ring-2 rounded-md focus:ring-offset-2 focus:ring-violet-300 hover:text-violet-900 font-semibold block text-center"
            href="/quotes"
          >
            All quotes
          </Link>
          <Link
            className="text-violet-700 outline-none focus:ring-2 rounded-md focus:ring-offset-2 focus:ring-violet-300 hover:text-violet-900 font-semibold block text-center"
            href="/quotes/books"
          >
            All books
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
