'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../Button';

export const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);

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
      const response = await fetch('http://localhost:3000/api/py/upload', {
        method: 'POST',
        body: formData,
      });
      // todo: error handling
      const { clippings } = await response.json();
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
        className="block mb-4"
        onChange={handleFileChange}
      />
      <Button>Upload</Button>
    </form>
  );
};
