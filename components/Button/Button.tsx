import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Button = ({ children, className }: Props) => {
  return (
    <button
      className={cn(
        'bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none rounded-md px-4 font-medium py-1 hover:bg-blue-700 transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
};
