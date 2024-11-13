'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../Button';
import useClippingStore from '@/store/clippingStore';
import { useRouter } from 'next/navigation';

export const UploadClippings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const updateClippings = useClippingStore((state) => state.updateData);
  const quotes = useClippingStore((state) => state.quotes);
  const authors = useClippingStore((state) => state.authors);
  const books = useClippingStore((state) => state.books);

  useEffect(() => {
    console.log('from store:', { quotes, authors, books });
  }, [quotes, authors, books]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!file) {
      setErrorMessage('No file selected');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/py/upload', {
        method: 'POST',
        body: formData,
      });
      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.detail);
        setLoading(false);
        return;
      }

      const { clippings } = body;
      updateClippings(clippings);
      router.push('/quotes');
    } catch (error) {
      console.error({ error });
      setErrorMessage('Something went wrong');
      setLoading(false);
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      <label className="block text-xl font-bold" htmlFor="file">
        Upload clippings
      </label>
      <input
        id="file"
        type="file"
        className="block border border-gray-100 text-slate-500 focus:ring-2 outline-none rounded-full focus:ring-violet-400 text-sm mb-4 file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:border-0 file:rounded-full"
        onChange={handleFileChange}
      />
      <Button className="self-center min-w-48" disabled={loading}>
        {loading ? 'Loading...' : 'Upload'}
      </Button>
      {errorMessage && (
        <p className="text-sm text-center text-gray-500">
          Oops! {errorMessage}.
        </p>
      )}
    </form>
  );
};
