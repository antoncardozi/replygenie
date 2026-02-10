import type { Metadata } from 'next';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Tool Name';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export function generateMeta({ title, description, path = '', ogImage }: SeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
