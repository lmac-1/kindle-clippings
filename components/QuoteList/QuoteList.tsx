import { Clipping } from '@/store/clippingStore';
import { Quote } from '@/components/Quote';

type Props = {
  quotes: Clipping[];
};

export const QuoteList = ({ quotes }: Props) => {
  return (
    <div className="space-y-4">
      {quotes.map((quote, index) => (
        <Quote clipping={quote} key={index} />
      ))}
    </div>
  );
};
