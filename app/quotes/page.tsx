import { QuoteList } from '@/components/QuoteList';
import { Search } from '@/components/Search';
import { data } from '@/data/quotes';

type Props = {
  searchParams: {
    search?: string;
  };
};

export default function QuotesPage({ searchParams }: Props) {
  const { search } = searchParams;
  const { quotes: rawQuotes } = data;

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
