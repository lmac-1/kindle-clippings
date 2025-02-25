import { formatDate } from '@/lib/utils';
import { Clipping } from '@/store/clippingStore';

import Link from 'next/link';
import { useMemo } from 'react';
import { CopyButton } from '../CopyButton';

type Props = {
  clipping: Clipping;
};

export const Quote = ({ clipping }: Props) => {
  const { book, quote, date } = clipping;
  const bookLink = `/quotes/books?title=${encodeURIComponent(book)}`;
  const formattedDate = useMemo(() => formatDate(date), [date]);

  return (
    <figure className="bg-gray-50 rounded-md px-6 pb-6 pt-12 relative">
      <CopyButton
        className="text-right block absolute top-3 right-4"
        textToCopy={quote}
      />
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
      </figcaption>
      <p className="italic text-xs text-gray-600 mt-1 text-right">
        Highlighted on {formattedDate}
      </p>
    </figure>
  );
};
