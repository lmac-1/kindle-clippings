'use client';

import { Loading } from '@/components/Loading';
import { UploadClippings } from '@/components/UploadClippings';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <div className="flex items-center flex-col gap-4">
        <Loading />
        <p className="text-sm text-gray-700">
          We are preparing your quotes for you
        </p>
      </div>
    );

  return (
    <div className="flex items-start flex-col gap-8">
      <div>
        <h2 className="font-bold text-4xl mb-3">
          Rediscover your Kindle highlights
        </h2>
        <p className="text-gray-700 font-light">
          Upload, search and revisit the best parts of every book you&apos;ve
          read.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-2">How to find your clippings</h3>
        <ol className="list-decimal ml-4">
          <li>Connect your Kindle to your computer via USB</li>
          <li>
            Find the <strong className="font-semibold">Documents</strong> folder
            of your Kindle
          </li>
          <li>
            You should see a{' '}
            <strong className="font-semibold">My Clippings.txt</strong> file
          </li>
          <li>Upload the file here to get started</li>
        </ol>
      </div>
      <UploadClippings loading={loading} setLoading={setLoading} />
    </div>
  );
}
