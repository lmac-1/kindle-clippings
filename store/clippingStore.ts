import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  quotes: Quotes;
  books: Books;
  authors: Authors;
  updateData: (data: ClippingData) => void;
  resetData: () => void;
};

export type Clipping = {
  book: string;
  author: string;
  quote: string;
  date: string;
};

type Quotes = Clipping[] | null;
type Books = string[] | null;
type Authors = string[] | null;

type ClippingData = {
  quotes: Quotes;
  books: Books;
  authors: Authors;
};

const initialState = { quotes: null, books: null, authors: null };

const useClippingStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      updateData: (data: ClippingData) =>
        set({
          quotes: data.quotes,
          books: data.books,
          authors: data.authors,
        }),
      resetData: () => set(initialState),
    }),
    {
      name: 'kindle-clippings',
    }
  )
);

export default useClippingStore;
