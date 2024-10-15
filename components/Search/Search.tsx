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
    <div className="mb-6 w-100">
      <h2 className="text-xl font-semibold mb-2">Search quotes</h2>
      <input
        onChange={handleSearch}
        placeholder="Search..."
        className="border rounded-md px-4 mb-2 py-2 w-full focus:ring-2 outline-none focus:ring-blue-800/50 focus:ring-offset-1"
      />
      <p>
        {totalQuotes} quote{totalQuotes > 1 && 's'} found
      </p>
    </div>
  );
};
