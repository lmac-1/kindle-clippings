'use client';
import { QuoteList } from '@/components/QuoteList';
import useClippingStore from '@/store/clippingStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthorsPage() {
  const searchParams = useSearchParams();
  const author = searchParams.get('author');
  const { authors, quotes } = useClippingStore();

  if (!quotes || !authors) return 'No quotes/authors found';

  // Author view
  if (author) {
    const parsedAuthor = decodeURIComponent(author);
    const filteredQuotes = quotes.filter((quote) => quote.author === author);
    const totalQuotes = filteredQuotes.length;
    return (
      <div>
        <Link className="mb-4 block hover:text-violet-800" href="/quotes/books">
          &#8592; Back to author list
        </Link>
        <div className="mb-4 bg-violet-50 text-violet-700 rounded-md px-6 py-4">
          <h2 className="font-semibold text-xl mb-2 break-words">
            {parsedAuthor}
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

  // All authors
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold mb-3">Browse by Author</h2>
      {authors.map((author, index) => (
        <Link
          className="py-1 hover:text-violet-700 transition-colors"
          key={index}
          href={`/quotes/authors?author=${encodeURIComponent(author)}`}
        >
          {author}
        </Link>
      ))}
    </div>
  );
}
