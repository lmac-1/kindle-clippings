'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  textToCopy: string;
  className?: string;
};

export const CopyButton = ({ textToCopy, className }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = copied ? TickIcon : CopyIcon;

  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        onClick={handleCopy}
        className="peer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
      >
        <Icon />
      </button>
      <div
        className={`absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 text-sm font-medium text-white bg-gray-900 rounded-lg shadow transition-opacity ${
          copied ? 'opacity-100' : 'opacity-0 peer-hover:opacity-100'
        }`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </div>
    </div>
  );
};

const TickIcon = () => (
  <svg
    className="w-4 h-4 text-violet-600 dark:text-violet-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 12"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 5.917 5.724 10.5 15 1.5"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 20"
  >
    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
  </svg>
);
