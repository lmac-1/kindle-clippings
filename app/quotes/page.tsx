'use client';
import { QuoteList } from '@/components/QuoteList';
import { Search } from '@/components/Search';
import useClippingStore from '@/store/clippingStore';
import { useSearchParams } from 'next/navigation';

// type Props = {
//   searchParams: {
//     search?: string;
//   };
// };

export default function QuotesPage() {
  //const { search } = searchParams;
  const { quotes: rawQuotes } = useClippingStore();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  if (!rawQuotes) {
    return 'No quotes found';
  }

  const quotes = search
    ? rawQuotes.filter((quote) =>
        quote.quote.toLowerCase().includes(search.toLowerCase())
      )
    : rawQuotes;

  const totalQuotes = quotes.length;

  return (
    <div>
      <Search totalQuotes={totalQuotes} />
      <QuoteList quotes={quotes} />
    </div>
  );
}
