import { Clipping } from '@/store/clippingStore';
import Link from 'next/link';

type Props = {
  clipping: Clipping;
};

export const Quote = ({ clipping }: Props) => {
  const { book, quote, date } = clipping;
  const bookLink = `/quotes/books?title=${encodeURIComponent(book)}`;

  return (
    <figure className="bg-gray-50 rounded-md px-6 py-5">
      <blockquote className="mb-3 text-lg before:content-['\201C'] after:content-['\201D']">
        {quote}
      </blockquote>
      <figcaption className="text-sm text-right text-gray-600">
        <cite>
          <Link
            className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-300 font-semibold"
            href={bookLink}
          >
            {book}
          </Link>{' '}
        </cite>
        <p className="italic">{date}</p>
      </figcaption>
    </figure>
  );
};
