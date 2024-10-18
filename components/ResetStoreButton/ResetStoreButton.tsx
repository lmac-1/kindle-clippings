'use client';
import useClippingStore from '@/store/clippingStore';
import { Button } from '../Button';

export const ResetStoreButton = () => {
  const { resetData } = useClippingStore();
  return <Button onClick={resetData}>Reset store</Button>;
};
