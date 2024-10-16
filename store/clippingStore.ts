import { create } from 'zustand';

type Store = {
  quotes: Quotes;
  books: Books;
  authors: Authors;
  updateData: (data: ClippingData) => void;
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

const useClippingStore = create<Store>((set) => ({
  quotes: null,
  books: null,
  authors: null,
  updateData: (data: ClippingData) =>
    set({
      quotes: data.quotes,
      books: data.books,
      authors: data.authors,
    }),
}));

export default useClippingStore;
