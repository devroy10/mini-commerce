import { useQuery } from '@tanstack/react-query';
import { getProducts, initializeProducts } from '../utils/localStorage';
import type { Product } from '../types';

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      await initializeProducts();
      return getProducts();
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2,
  });
} 