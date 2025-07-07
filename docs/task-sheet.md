# Mini-Commerce Master Task Sheet

## Phase 1: Project Setup & Configuration

### 1.1 Initialize Next.js Project
- [ ] Create new Next.js 14 project with TypeScript: `npx create-next-app@latest mini-commerce --typescript --tailwind --eslint --app`
- [ ] Navigate to project directory: `cd mini-commerce`
- [ ] Verify Next.js 14 with App Router is configured
- [ ] Update `tsconfig.json` to include `"strict": true`

### 1.2 Install Dependencies
- [ ] Install React Query: `npm install @tanstack/react-query`
- [ ] Install Zustand: `npm install zustand`
- [ ] Install development dependencies: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`
- [ ] Install Playwright for E2E testing: `npm install --save-dev @playwright/test`
- [ ] Install additional types: `npm install --save-dev @types/jest`

### 1.3 Configure Development Tools
- [ ] Update `package.json` scripts:
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "jest",
      "test:watch": "jest --watch",
      "test:e2e": "playwright test"
    }
  }
  ```
- [ ] Create `jest.config.js` with React Testing Library setup
- [ ] Create `playwright.config.ts` for E2E testing
- [ ] Configure ESLint and Prettier settings
- [ ] Create `.gitignore` additions for test results

## Phase 2: Type Definitions & Data Structure

### 2.1 Create TypeScript Interfaces
- [ ] Create `src/types/index.ts` with:
  - `Product` interface (id, name, slug, price, image, description, category, stock)
  - `CartItem` interface (product, quantity)
  - `Cart` interface (items, total)
  - `Order` interface (id, items, total, date, status)

### 2.2 Create Mock Data
- [ ] Create `src/data/products.json` with 8+ dummy products
- [ ] Include realistic product data:
  - Unique IDs and slugs
  - Product names and descriptions
  - Prices (numbers, not strings)
  - Categories
  - Stock quantities
  - Image URLs (use placeholder services like Unsplash)

## Phase 3: State Management Setup

### 3.1 Configure React Query
- [ ] Create `src/providers/QueryProvider.tsx` with QueryClient setup
- [ ] Configure stale time, cache time, and error handling
- [ ] Wrap app with QueryProvider in `src/app/layout.tsx`

### 3.2 Create Zustand Store
- [ ] Create `src/store/cartStore.ts` with:
  - Cart state interface
  - Actions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
  - localStorage persistence middleware
  - Selectors for cart total, item count, etc.

### 3.3 Create Data Fetching Utilities
- [ ] Create `src/utils/localStorage.ts` with:
  - `initializeProducts` function to seed localStorage
  - `getProducts` function to retrieve products
  - `getProductBySlug` function for individual products
- [ ] Create `src/hooks/useProducts.ts` with React Query hooks
- [ ] Create `src/hooks/useProduct.ts` for individual product fetching

## Phase 4: UI Components Development

### 4.1 Layout Components
- [ ] Create `src/components/layout/Header.tsx` with:
  - Navigation menu
  - Cart icon with item count
  - Responsive mobile menu
- [ ] Create `src/components/layout/Footer.tsx`
- [ ] Update `src/app/layout.tsx` with header/footer

### 4.2 Product Components
- [ ] Create `src/components/products/ProductCard.tsx`:
  - Product image with next/image optimization
  - Product name, price display
  - Link to product detail page
  - Add to cart button
- [ ] Create `src/components/products/ProductGrid.tsx`:
  - Responsive grid layout
  - Loading states
  - Error handling
- [ ] Create `src/components/products/ProductDetail.tsx`:
  - Full product information
  - Quantity selector
  - Add to cart functionality
  - Image gallery (single image with optimization)

### 4.3 Cart Components
- [ ] Create `src/components/cart/CartItem.tsx`:
  - Product info display
  - Quantity controls
  - Remove item button
  - Price calculations
- [ ] Create `src/components/cart/CartSummary.tsx`:
  - Total calculation
  - Tax calculation (mock)
  - Proceed to checkout button
- [ ] Create `src/components/cart/EmptyCart.tsx`:
  - Empty state message
  - Continue shopping link

### 4.4 UI Utility Components
- [ ] Create `src/components/ui/LoadingSpinner.tsx`
- [ ] Create `src/components/ui/ErrorMessage.tsx`
- [ ] Create `src/components/ui/Button.tsx` with variants
- [ ] Create `src/components/ui/Input.tsx` for forms

## Phase 5: Page Implementation

### 5.1 Home Page (Product Catalogue)
- [ ] Update `src/app/page.tsx`:
  - Fetch products using React Query
  - Render ProductGrid component
  - Handle loading and error states
  - Add SEO meta tags
- [ ] Implement responsive design
- [ ] Add product filtering/sorting (optional)

### 5.2 Product Detail Page
- [ ] Create `src/app/product/[slug]/page.tsx`:
  - Dynamic route with slug parameter
  - Fetch individual product data
  - Render ProductDetail component
  - Handle not found cases
  - Generate metadata for SEO
- [ ] Create `src/app/product/[slug]/loading.tsx`
- [ ] Create `src/app/product/[slug]/error.tsx`

### 5.3 Cart Page
- [ ] Create `src/app/cart/page.tsx`:
  - Display cart items
  - Handle empty cart state
  - Cart summary with totals
  - Checkout button
- [ ] Implement cart persistence verification
- [ ] Add cart item management (update/remove)

### 5.4 Checkout Page
- [ ] Create `src/app/checkout/page.tsx`:
  - Simple checkout form (name, email, address)
  - Order summary
  - Form validation
  - Submit order simulation
- [ ] Create order confirmation logic
- [ ] Redirect to confirmation page

### 5.5 Order Confirmation Page
- [ ] Create `src/app/order/[orderId]/page.tsx`:
  - Display order details
  - Show order number and date
  - Clear cart after successful order
  - Continue shopping link

## Phase 6: Styling & Responsive Design

### 6.1 Tailwind Configuration
- [ ] Configure custom colors and fonts in `tailwind.config.js`
- [ ] Add custom utility classes if needed
- [ ] Ensure proper purging configuration

### 6.2 Mobile-First Responsive Design
- [ ] Implement mobile navigation
- [ ] Optimize product grid for different screen sizes
- [ ] Ensure cart and checkout work on mobile
- [ ] Test touch interactions

### 6.3 Accessibility Implementation
- [ ] Add proper ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Add alt text for all images
- [ ] Implement focus management
- [ ] Test with screen readers

## Phase 7: Testing Implementation

### 7.1 Unit/Component Tests
- [ ] Create `src/components/__tests__/ProductCard.test.tsx`
- [ ] Create `src/components/__tests__/CartItem.test.tsx`
- [ ] Create `src/store/__tests__/cartStore.test.ts`
- [ ] Create `src/utils/__tests__/localStorage.test.ts`
- [ ] Ensure all tests pass with `npm test`

### 7.2 E2E Tests
- [ ] Create `tests/e2e/shopping-flow.spec.ts`:
  - Browse products
  - Add items to cart
  - Complete checkout process
  - Verify order confirmation
- [ ] Run E2E tests: `npm run test:e2e`

## Phase 8: Performance & SEO Optimization

### 8.1 Performance Optimization
- [ ] Implement proper image optimization with next/image
- [ ] Add loading states for better UX
- [ ] Optimize bundle size
- [ ] Add error boundaries

### 8.2 SEO Implementation
- [ ] Add meta tags to all pages
- [ ] Implement Open Graph tags
- [ ] Add structured data for products
- [ ] Create sitemap.xml
- [ ] Add robots.txt

## Phase 9: Error Handling & Edge Cases

### 9.1 Error Handling
- [ ] Implement global error boundary
- [ ] Handle API/localStorage errors gracefully
- [ ] Add proper error messages for users
- [ ] Handle network failures in React Query

### 9.2 Edge Cases
- [ ] Handle empty product catalogue
- [ ] Manage out-of-stock items
- [ ] Handle localStorage quota exceeded
- [ ] Manage cart persistence across sessions

## Phase 10: Final Testing & Deployment Prep

### 10.1 Quality Assurance
- [ ] Run full test suite: `npm test`
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Run linting: `npm run lint`
- [ ] Check TypeScript compilation: `npx tsc --noEmit`
- [ ] Test in multiple browsers

### 10.2 Code Quality
- [ ] Ensure no `any` types used
- [ ] Verify all components have proper TypeScript interfaces
- [ ] Check for unused code and imports
- [ ] Ensure proper error handling throughout

### 10.3 Documentation
- [ ] Update README.md with:
  - Project description
  - Setup instructions
  - Available scripts
  - Testing instructions
  - Architecture overview

## Success Criteria Checklist
- [ ] ✅ All 8+ products display correctly
- [ ] ✅ Product detail pages work with dynamic routing
- [ ] ✅ Cart functionality (add/remove/update) works
- [ ] ✅ Checkout simulation completes successfully
- [ ] ✅ Order confirmation displays properly
- [ ] ✅ All data persists via localStorage
- [ ] ✅ Responsive design works on mobile/desktop
- [ ] ✅ All tests pass (component + E2E)
- [ ] ✅ No TypeScript errors with strict mode
- [ ] ✅ ESLint and Prettier pass
- [ ] ✅ Accessibility requirements met
- [ ] ✅ SEO meta tags implemented

## Notes for AI Agent
- Follow the tasks sequentially for best results
- Test each component as you build it
- Use semantic HTML elements throughout
- Implement proper error boundaries
- Focus on TypeScript strict compliance
- Ensure localStorage operations are wrapped in try-catch blocks
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused on single responsibilities