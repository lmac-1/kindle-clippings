import { cn } from '@/lib/utils';
import React from 'react';

type Props = React.ComponentProps<'button'> & {
  children: React.ReactNode;
  className?: string;
};

export const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={cn(
        'bg-violet-600 disabled:cursor-not-allowed text-white focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:outline-none rounded-full px-6 font-medium py-2 enabled:hover:bg-violet-700 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
