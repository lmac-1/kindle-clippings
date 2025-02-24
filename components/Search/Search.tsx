'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Search = ({ totalQuotes }: { totalQuotes: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const searchValue = event.target.value;
    if (searchValue) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline">
        <h2 className="text-xl font-semibold mb-2">Search quotes</h2>
        <p className="text-gray-600 text-sm">
          {totalQuotes} quote{(totalQuotes > 1 || totalQuotes === 0) && 's'}{' '}
          found
        </p>
      </div>
      <input
        onChange={handleSearch}
        placeholder="Search..."
        className="border w-full rounded-md px-4 mb-2 py-2 focus:ring-2 outline-none focus:ring-violet-300 focus:ring-offset-1"
      />
    </div>
  );
};
