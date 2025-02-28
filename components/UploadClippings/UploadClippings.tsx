'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../Button';
import useClippingStore from '@/store/clippingStore';
import { useRouter } from 'next/navigation';
import { demoData } from '@/data/demo';

type Props = { loading: boolean; setLoading: (value: boolean) => void };

export const UploadClippings = ({ loading, setLoading }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const updateClippings = useClippingStore((state) => state.updateData);
  const quotes = useClippingStore((state) => state.quotes);
  const authors = useClippingStore((state) => state.authors);
  const books = useClippingStore((state) => state.books);

  useEffect(() => {
    console.log('from store:', { quotes, authors, books });
  }, [quotes, authors, books]);

  useEffect(() => {
    if (file) {
      setErrorMessage('');
    }
  }, [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleDemo = () => {
    setLoading(true);
    updateClippings(demoData);
    router.push('/quotes');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.time('loading');
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
      console.timeLog('loading');
      setLoading(false);
      //router.push('/quotes');
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

      <div className="min-w-48 -mt-4">
        <p className="text-sm text-center h-5 text-gray-500 mb-1">
          {errorMessage && `Oops! ${errorMessage}.`}
        </p>
        <Button className="w-full" disabled={loading}>
          Upload
        </Button>
      </div>
      <p className="text-gray-600">
        No clippings file?{' '}
        <button
          onClick={handleDemo}
          className="decoration-dashed focus:ring-2 focus:ring-offset-1 rounded-md focus:ring-violet-400 focus:outline-none underline underline-offset-4 decoration-1 hover:text-violet-600 transition-colors"
        >
          Use our demo data
        </button>{' '}
        to try out the application
      </p>
    </form>
  );
};
