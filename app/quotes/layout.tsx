'use client';
import { Loading } from '@/components/Loading';
import { Summary } from '@/components/Summary';
import useClippingStore from '@/store/clippingStore';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loading, quotes, books } = useClippingStore();
  if (loading) return <Loading className="mx-auto" />;

  if (!quotes && !books) {
    return <>Oops! No clippings found.</>;
  }

  return (
    <>
      {quotes && books && (
        <Summary totalQuotes={quotes.length} totalBooks={books.length} />
      )}
      {quotes && books && (
        <div className="mt-2 sm:mt-4 mb-8 flex gap-6 justify-center">
          <Link
            className="text-violet-700 outline-none focus:ring-2 rounded-md focus:ring-offset-2 focus:ring-violet-300 hover:text-violet-900 font-semibold block text-center"
            href="/quotes"
          >
            Quotes
          </Link>
          <Link
            className="text-violet-700 outline-none focus:ring-2 rounded-md focus:ring-offset-2 focus:ring-violet-300 hover:text-violet-900 font-semibold block text-center"
            href="/quotes/books"
          >
            Books
          </Link>
          <Link
            className="text-violet-700 outline-none focus:ring-2 rounded-md focus:ring-offset-2 focus:ring-violet-300 hover:text-violet-900 font-semibold block text-center"
            href="/quotes/authors"
          >
            Authors
          </Link>
        </div>
      )}
      {children}
    </>
  );
}
