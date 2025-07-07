import type { Product } from '../types';

const PRODUCTS_KEY = 'products';

// Seed localStorage with products from products.json if not already present
export async function initializeProducts(): Promise<void> {
  try {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
      const response = await fetch('/src/data/products.json');
      const products: Product[] = await response.json();
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }
  } catch (error) {
    console.error('Failed to initialize products:', error);
  }
}

// Get all products from localStorage
export function getProducts(): Product[] {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Product[];
  } catch (error) {
    console.error('Failed to get products:', error);
    return [];
  }
}

// Get a single product by slug
export function getProductBySlug(slug: string): Product | undefined {
  try {
    const products = getProducts();
    return products.find((p) => p.slug === slug);
  } catch (error) {
    console.error('Failed to get product by slug:', error);
    return undefined;
  }
}

// TODO: explore adding retry logic for localStorage operations if necessary