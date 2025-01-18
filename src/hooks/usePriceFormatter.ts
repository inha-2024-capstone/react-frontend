import { useCallback } from 'react';

const usePriceFormatter = () => {
  const priceFormatter = useCallback((price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  return priceFormatter;
};

export default usePriceFormatter;
