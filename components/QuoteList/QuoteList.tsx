import { Clipping, Quote } from '../Quote';

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
