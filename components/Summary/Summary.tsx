type Props = {
  totalQuotes: number;
  totalBooks: number;
};

export const Summary = ({ totalQuotes, totalBooks }: Props) => {
  return (
    <div className="flex justify-center gap-2 flex-col items-center">
      <h2 className="font-semibold text-3xl">Your Kindle Clippings</h2>
      <p className="text-sm text-gray-600 italic">
        {totalQuotes} quote{totalQuotes > 1 && 's'} from {totalBooks} book
        {totalBooks > 1 && 's'}
      </p>
    </div>
  );
};
