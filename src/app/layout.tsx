import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'ReplyGenie';
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Free AI Review Response Generator — Craft perfect replies to Google, Yelp & Facebook reviews in seconds';
const datafastWebsiteId = process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID || '';
const datafastDomain = process.env.NEXT_PUBLIC_DATAFAST_DOMAIN || '';

export const metadata: Metadata = {
  title: { default: `${siteName} — Free AI Review Response Generator`, template: `%s | ${siteName}` },
  description: siteDescription,
  keywords: ['ai review response generator', 'google review reply generator free', 'how to respond to reviews ai', 'review response tool', 'ai review responder'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {datafastWebsiteId && (
          <script
            defer
            data-website-id={datafastWebsiteId}
            data-domain={datafastDomain}
            src="https://datafa.st/js/script.js"
          />
        )}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
