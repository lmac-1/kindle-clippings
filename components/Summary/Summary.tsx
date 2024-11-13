type Props = {
  totalQuotes: number;
  totalBooks: number;
};

export const Summary = ({ totalQuotes, totalBooks }: Props) => {
  const subText = `${totalQuotes} quote${
    totalQuotes > 1 && 's'
  } from ${totalBooks} book${totalBooks > 1 && 's'}`;

  return (
    <div className="flex justify-center gap-2 flex-col items-center">
      <h2 className="font-bold text-4xl">Your Kindle Clippings</h2>
      <p className="text-sm text-gray-600 italic">{subText}</p>
    </div>
  );
};
