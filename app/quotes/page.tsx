'use client';
import { QuoteList } from '@/components/QuoteList';
import { Search } from '@/components/Search';
import useClippingStore from '@/store/clippingStore';

type Props = {
  searchParams: {
    search?: string;
  };
};

export default function QuotesPage({ searchParams }: Props) {
  const { search } = searchParams;
  const { quotes: rawQuotes } = useClippingStore();

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
