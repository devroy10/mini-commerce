import { initializeProducts, getProducts, getProductBySlug } from '../localStorage';
import type { Product } from '../../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    price: 10,
    image: 'test.jpg',
    description: 'desc',
    category: 'cat',
    stock: 5,
  },
];

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  describe('initializeProducts', () => {
    it('seeds products if not present', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockProducts),
      });
      await initializeProducts();
      expect(localStorage.getItem('products')).toBe(JSON.stringify(mockProducts));
    });

    it('does not overwrite if products already present', async () => {
      localStorage.setItem('products', JSON.stringify(mockProducts));
      global.fetch = jest.fn();
      await initializeProducts();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('getProducts', () => {
    it('returns products from localStorage', () => {
      localStorage.setItem('products', JSON.stringify(mockProducts));
      expect(getProducts()).toEqual(mockProducts);
    });
    it('returns empty array if not present', () => {
      expect(getProducts()).toEqual([]);
    });
  });

  describe('getProductBySlug', () => {
    it('returns the correct product', () => {
      localStorage.setItem('products', JSON.stringify(mockProducts));
      expect(getProductBySlug('test-product')).toEqual(mockProducts[0]);
    });
    it('returns undefined if not found', () => {
      localStorage.setItem('products', JSON.stringify(mockProducts));
      expect(getProductBySlug('nope')).toBeUndefined();
    });
  });
});
