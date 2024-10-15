import { QuoteList } from '@/components/QuoteList';
import { data } from '@/data/quotes';
import Link from 'next/link';

type Props = {
  searchParams: { title?: string };
};

export default function BooksPage({ searchParams }: Props) {
  const { title } = searchParams;
  const { books, quotes } = data;

  // Book view
  if (title) {
    const parsedTitle = decodeURIComponent(title);
    const filteredQuotes = quotes.filter((quote) => quote.book === title);
    const totalQuotes = filteredQuotes.length;

    return (
      <div>
        <Link className="mb-4 block hover:text-blue-800" href="/quotes/books">
          &#8592; Back to book list
        </Link>
        <div className="mb-4 bg-blue-100/75 rounded-md px-6 py-4">
          <h2 className="font-semibold text-xl mb-2">{parsedTitle}</h2>
          <p className="text-gray-700 text-sm">
            {totalQuotes} quote{totalQuotes > 1 && 's'} found
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
          className="block py-1 hover:text-blue-800 transition-colors"
          key={index}
          href={`/quotes/books?title=${encodeURIComponent(book)}`}
        >
          {book}
        </Link>
      ))}
    </div>
  );
}
