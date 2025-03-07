'use client';
import { QuoteList } from '@/components/QuoteList';
import useClippingStore from '@/store/clippingStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// type Props = {
//   searchParams: { title?: string };
// };

export default function BooksPage() {
  //const { title } = searchParams;
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const { books, quotes } = useClippingStore();

  if (!quotes || !books) return 'No quotes/books found';

  // Book view
  if (title) {
    const parsedTitle = decodeURIComponent(title);
    const filteredQuotes = quotes.filter((quote) => quote.book === title);
    const totalQuotes = filteredQuotes.length;

    return (
      <div>
        <Link className="mb-4 block hover:text-violet-800" href="/quotes/books">
          &#8592; Back to book list
        </Link>
        <div className="mb-4 bg-violet-50 text-violet-700 rounded-md px-6 py-4">
          <h2 className="font-semibold text-xl mb-2 break-words">
            {parsedTitle}
          </h2>
          <p className="text-gray-700 text-sm">
            {totalQuotes} quote{(totalQuotes === 0 || totalQuotes > 1) && 's'}{' '}
            found
          </p>
        </div>
        <QuoteList quotes={filteredQuotes} />
      </div>
    );
  }

  // All books
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold mb-3">Browse by Book</h2>
      {books.map((book, index) => (
        <Link
          className="py-1 hover:text-violet-700 transition-colors "
          key={index}
          href={`/quotes/books?title=${encodeURIComponent(book)}`}
        >
          {book}
        </Link>
      ))}
    </div>
  );
}
