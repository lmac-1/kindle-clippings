import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen pb-12">
      <div>
        <h1 className="text-6xl font-bold">Welcome</h1>
        <Link href="/quotes" className="underline block text-center">
          Quotes
        </Link>
      </div>
    </div>
  );
}
