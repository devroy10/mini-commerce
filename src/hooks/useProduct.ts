import { useQuery } from '@tanstack/react-query';
import { getProductBySlug, initializeProducts } from '../utils/localStorage';
import type { Product } from '../types';

export function useProduct(slug: string) {
  return useQuery<Product | undefined>({
    queryKey: ['product', slug],
    queryFn: async () => {
      await initializeProducts();
      return getProductBySlug(slug);
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2,
  });
}

// TODO: review how to choose the time to cache the data for different scenarios
