# Mini-Commerce

## Project Overview

**Mini-Commerce** is a frontend-only e-commerce prototype built with Next.js 14 (App Router), React, React Query, Zustand, and Tailwind CSS. It allows users to browse a curated catalogue, view product details, manage a persistent cart, and complete a mock checkout—all with state and data stored in localStorage. No backend is required.

**Key Features:**

- Product catalogue with at least 8 dummy products (image, name, price)
- Product detail pages with “Add to Cart”
- Cart page: view, update, remove items, subtotal/total
- Checkout flow: order summary, “Place Order” clears cart, success page with order ID
- State and data persist across reloads

---

## Design Approach

- **Layout & Responsiveness:**  
  Mobile-first, responsive grid/flex layouts using Tailwind CSS. Key pages (catalogue, product, cart, checkout) use semantic HTML and accessible components.
- **Color & Branding:**  
  Custom Tailwind palette with warm neutrals and sage greens. Dark mode supported via Tailwind’s `dark` class and `next-themes`.
- **UI Patterns:**  
  Reusable components (cards, modals, forms, toasts) in `/src/components`.  
  Product filtering (category, price, color) and search are available.
- **Accessibility:**  
  All images have alt text. Modals and forms are keyboard-accessible.

---

## Tools & Techniques

- **Libraries:**
  - [Next.js 14](https://nextjs.org/) (App Router, SEO, image optimization)
  - [React Query](https://tanstack.com/query/latest) for product fetching/caching
  - [Zustand](https://zustand-demo.pmnd.rs/) for global cart state (with localStorage persistence)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests
  - [Playwright](https://playwright.dev/) for e2e checkout flow

- **Patterns:**
  - Functional React components and hooks only
  - Strict TypeScript (`"strict": true` in `tsconfig.json`)
  - No `any` types; all types defined in `/src/types`
  - React Query handles loading/error states natively
  - Zustand store uses selectors and middleware for persistence

- **Testing & CI:**
  - Unit tests for utilities and components (see `/src/utils/__tests__`)
  <!-- - Playwright e2e for checkout flow -->
  - ESLint and Prettier enforced (`next/core-web-vitals` config)
  - Scripts: `pnpm test`, `pnpm test:e2e`, `pnpm lint`, `pnpm format`

---

## SEO Strategy

- **Meta Tags:**  
  Dynamic titles/descriptions per page via Next.js metadata API.
- **Open Graph & Twitter Cards:**  
  Configured in `/src/app/layout.tsx` and product detail pages for rich sharing.
- **Structured Data:**  
  Product and site metadata included for better search visibility.
- **Performance:**
  - Uses `next/image` for optimized images
  <!-- - Code-splitting and lazy loading for fast initial load -->

---

## Error-Handling Technique

- **Async Operations:**  
  All fetches and cart actions are wrapped in try/catch.
- **User Feedback:**
  - Friendly error messages via `<ErrorMessage />` and toast notifications
  - Loading spinners for async states
  - 404 and 500 pages with clear navigation options
- **Recovery:**  
  Users can retry failed fetches or return home from error screens.

---

## Quick Start

```bash
pnpm install
pnpm dev
# Visit http://localhost:3000
```

---

## Project Structure

```
src/
  app/         # Pages (App Router)
  components/  # UI & layout components
  hooks/       # React Query & custom hooks
  stores/      # Zustand cart store
  data/        # products.json
  types/       # TypeScript types
  styles/      # Tailwind & global CSS
```

---

## License

MIT
