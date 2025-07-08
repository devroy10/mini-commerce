import type { Product } from "../types"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API data
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'modern-wood-furniture',
    name: 'Modern Wood Furniture',
    price: 260,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751985212/mediterranean-aesthetics-bag-still-life_23-2151141451_vutpfw.jpg',
    category: 'Furniture',
    colors: ['#8B4513', '#D2691E'],
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isFeatured: true,
    description:
      'A beautifully crafted modern wood furniture piece that combines functionality with elegant design.',
  },
  {
    id: '2',
    slug: 'marble-table',
    name: 'Marble Table',
    price: 597,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751988680/elegant-black-marble-dining-table_191095-84000_p0bh5t.jpg',
    category: 'Tables',
    colors: ['#F5F5DC', '#D3D3D3'],
    rating: 4.8,
    reviewCount: 89,
    isFeatured: true,
    description: 'Elegant marble table perfect for modern dining rooms and contemporary spaces.',
  },
  {
    id: '3',
    slug: 'light-wing-chair',
    name: 'Light Wing Chair',
    price: 458,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751984948/sofa_1203-2825_f5ek7k.png',
    category: 'Chairs',
    colors: ['#F5F5DC', '#8B4513'],
    rating: 4.6,
    reviewCount: 156,
    isFeatured: true,
    description:
      'Comfortable wing chair with light upholstery, perfect for reading corners and living rooms.',
  },
  {
    id: '4',
    slug: 'vintage-wood-plate',
    name: 'Vintage Wood Plate',
    price: 260,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751985256/top-view-round-wood-board-dark-background_140725-145751_rmnaql.jpg',
    category: 'Decor',
    colors: ['#8B4513', '#CD853F'],
    rating: 4.3,
    reviewCount: 67,
    isFeatured: true,
    description:
      'Handcrafted vintage wood plate, perfect for serving or as decorative accent piece.',
  },
  {
    id: '5',
    slug: 'floor-lamp',
    name: 'Floor Lamp',
    price: 180,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751983943/71YtRKOtaKL._AC_SL1500__otd0as.jpg',
    category: 'Lightings',
    colors: ['#000000', '#8B4513'],
    rating: 4.4,
    reviewCount: 89,
    description: 'Contemporary floor lamp with adjustable height and warm lighting options.',
  },
  {
    id: '6',
    slug: 'minimalist-desk',
    name: 'Minimalist Desk',
    price: 380,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751983944/Elektrisch-hoehenverstellbarer-schreibtisch-l-shape_nmklfh.jpg',
    category: 'Furniture',
    colors: ['#FFFFFF', '#F5F5F5'],
    rating: 4.2,
    reviewCount: 75,
    description: 'Clean-lined minimalist desk perfect for modern home offices and workspaces.',
  },
  {
    id: '7',
    slug: 'wing-chair-with-stool',
    name: 'Wing Chair pair',
    price: 445,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751983943/Sessel-mit-Hocker-TEDDY-weiss-NEU--5-_1_g19scl.jpg',
    category: 'Chairs',
    colors: ['#F5F5DC', '#8B4513'],
    rating: 4.6,
    reviewCount: 76,
    isFeatured: true,
    description:
      'Comfortable wing chair wth leg rest stool, perfect for reading corners and living rooms.',
  },
  {
    id: '8',
    slug: 'glass-coffee-table',
    name: 'Glass Coffee Table',
    price: 425,
    image: 'https://res.cloudinary.com/dyeno6wgp/image/upload/v1751985079/undef_src_sa_picid_171313_type_whitesh_image_clczaf.jpg',
    category: 'Tables',
    colors: ['#FFFFFF', '#E0E0E0'],
    rating: 4.1,
    reviewCount: 63,
    description: 'Modern glass coffee table that adds elegance and openness to any living space.',
  },
];

// API Functions
export const api = {
  // Fetch all products
  async fetchProducts(): Promise<Product[]> {
    await delay(800) // Simulate network delay
    return mockProducts
  },

  // Fetch featured products
  async fetchFeaturedProducts(): Promise<Product[]> {
    await delay(600)
    return mockProducts.filter((product) => product.isFeatured)
  },

  // Fetch products by category
  async fetchProductsByCategory(category: string): Promise<Product[]> {
    await delay(500)
    if (category === "all") return mockProducts
    return mockProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  },

  // Fetch single product by slug
  async fetchProductBySlug(slug: string): Promise<Product | null> {
    await delay(400)
    return mockProducts.find((product) => product.slug === slug) || null
  },

  // Fetch single product by ID
  async fetchProductById(id: string): Promise<Product | null> {
    await delay(400)
    return mockProducts.find((product) => product.id === id) || null
  },

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    await delay(600)
    const searchTerm = query.toLowerCase()
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm),
    )
  },

  // Get categories
  async fetchCategories(): Promise<string[]> {
    await delay(300)
    const categories = Array.from(new Set(mockProducts.map((p) => p.category)))
    return ["all", ...categories]
  },
}
