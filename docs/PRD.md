# Mini-Commerce — Product Requirements Document (PRD)

## Overview

Mini-Commerce is a **frontend-only e-commerce prototype** built using:

- Next.js 14 (App Router)
- TypeScript (`strict: true`)
- React Query
- Zustand
- Tailwind CSS

It allows users to browse products, view product details, manage a cart, and simulate a checkout flow. All data/state persists via `localStorage`.

---

## Goals

- Allow users to browse a product catalogue
- Enable product detail viewing and cart interactions
- Support basic cart management (add/update/remove)
- Simulate checkout and show confirmation

---

## User Stories

1. As a visitor, I want to view a list of products.
2. As a visitor, I want to view product details.
3. As a visitor, I want to add items to a cart and see the total.
4. As a visitor, I want to place a mock order and get a confirmation.

---

## Functional Requirements

| Feature            | Route                    | Description                                                                 |
|--------------------|--------------------------|-----------------------------------------------------------------------------|
| Product Catalogue  | `/`                      | List at least 8 dummy products (image, name, price). Use React Query to fetch from a local JSON file seeded into `localStorage`. |
| Product Detail     | `/product/[slug]`        | Show product details and allow adding to cart.                             |
| Cart               | `/cart`                  |

## Non-Functional Requirements
Responsive: Mobile-first, fluid Tailwind layout

Accessibility: Semantic HTML, keyboard navigation, alt text

Performance: Use next/image for optimized loading

Error Handling: Informative feedback on fetch or cart failures

SEO (Bonus): Include meta tags, Open Graph, structured data

## Technical Requirements

### Stack

- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript (`strict: true`)**
- **React Query** for catalogue fetching, caching, and refetching
- **Zustand** for global state (selectors + localStorage persistence)
- **Tailwind CSS** for styling
- **localStorage** as the data/state layer

### Coding Standards

- Functional components only
- No `any` types; strict typing required
- Linting via ESLint; formatting via Prettier

---

## Testing Requirements

- At least one of:
  - **Component Test** using **Jest + React Testing Library**
  - **E2E Test** using **Playwright** (happy path)
- Tests must be passing
- Linting (`eslint`) and formatting (`prettier`) must pass

---

## 11. Assumptions

- No backend integration — only local JSON + localStorage allowed
- No payment or real transaction handling
- No user authentication required
- Search, filters, dark mode, animations are optional extras

---