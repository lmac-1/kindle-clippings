import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Button = ({ children }: Props) => {
  return (
    <button className="bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none rounded-md px-4 font-medium py-1 hover:bg-blue-700 transition-colors">
      {children}
    </button>
  );
};
