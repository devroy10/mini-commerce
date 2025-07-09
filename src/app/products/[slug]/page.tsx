import { Metadata } from 'next';

import { api } from '@/lib/api';
import ProductDetailsLayout from '@/components/productDetailsLayout';
import { siteConfig } from '@/config/site.config';

type ProductDetailsProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
  const resolvedParams = await params;

  const product = await api.fetchProductBySlug(resolvedParams.slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: `${product.name} – Mini Commerce`,
    description: product.description,
    openGraph: {
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
      url: siteConfig.origin,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: { url: product.image, width: 800, height: 800, alt: product.name },
    },
  };
}

export default async function ProductDetailsPage() {
  return <ProductDetailsLayout />;
}
