'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../Button';
import useClippingStore from '@/store/clippingStore';

export const UploadClippings = () => {
  const [file, setFile] = useState<File | null>(null);
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

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/py/upload', {
        method: 'POST',
        body: formData,
      });
      // todo: error handling
      const { clippings } = await response.json();
      updateClippings(clippings);

      console.log({ clippings });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
      <label className="block font-semibold" htmlFor="file">
        Upload Kindle clippings
      </label>
      <input
        id="file"
        type="file"
        className="block text-slate-500 focus:ring-2 outline-none rounded-full focus:ring-violet-400 text-sm mb-4 file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:border-0 file:rounded-full"
        onChange={handleFileChange}
      />
      <Button>Upload</Button>
    </form>
  );
};
