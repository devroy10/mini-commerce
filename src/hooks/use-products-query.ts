import { useQuery, useQueries } from '@tanstack/react-query';
import { api } from '../lib/api';
import { filterTypes } from '@/types';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, filterTypes>) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  byCategory: (category: string) => [...productKeys.all, 'category', category] as const,
};

// Hook to fetch all products
export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: api.fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: api.fetchFeaturedProducts,
    staleTime: 10 * 60 * 1000, // 10 minutes - featured products change less frequently
  });
}

// Hook to fetch products by category
export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: () => api.fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch single product by slug
export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => api.fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // Product details are more stable
  });
}

// Hook to fetch single product by ID
export function useProductById(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => api.fetchProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

// Hook to search products
export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => api.searchProducts(query),
    enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 2 * 60 * 1000, // Search results are more dynamic
  });
}

// Hook to fetch categories
export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: api.fetchCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes - categories rarely change
  });
}

// Hook to prefetch multiple products (useful for product cards)
export function usePrefetchProducts(slugs: string[]) {
  return useQueries({
    queries: slugs.map((slug) => ({
      queryKey: productKeys.detail(slug),
      queryFn: () => api.fetchProductBySlug(slug),
      staleTime: 10 * 60 * 1000,
    })),
  });
}

// Custom hook for filtered products with client-side filtering
export function useFilteredProducts(filters: {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
}) {
  const { data: products, ...query } = useProducts();

  const filteredProducts = products?.filter((product) => {
    // Category filter
    const categoryMatch =
      filters.categories.includes('all') ||
      filters.categories.some((cat) => product.category.toLowerCase().includes(cat.toLowerCase()));

    // Price filter
    const priceMatch =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    // Color filter
    const colorMatch =
      filters.colors.length === 0 ||
      (product.colors && product.colors.some((color) => filters.colors.includes(color)));

    return categoryMatch && priceMatch && colorMatch;
  });

  return {
    ...query,
    data: filteredProducts,
    filteredCount: filteredProducts?.length || 0,
    totalCount: products?.length || 0,
  };
}
