import Link from 'next/link';
import { generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
  title: 'Blog — Review Response Tips & Guides',
  description: 'Expert guides on responding to customer reviews, reputation management, and growing your local business with AI tools.',
  path: '/blog/',
});

const posts = [
  {
    slug: 'how-to-respond-to-google-reviews',
    title: 'How to Respond to Google Reviews: AI-Powered Guide (Free Tool)',
    excerpt: 'A complete guide to responding to every type of Google review — positive, negative, and fake — with templates, examples, and a free AI tool to generate perfect replies instantly.',
    date: '2026-02-09',
  },
];

export default function BlogPage() {
  return (
    <div className="container py-16 md:py-24 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
      <p className="mt-3 text-muted-foreground">Tips, guides, and strategies for managing your online reviews.</p>

      <div className="mt-10 space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}/`} className="block rounded-lg border border-border p-6 hover:border-primary/50 transition-colors">
              <time className="text-xs text-muted-foreground">{post.date}</time>
              <h2 className="mt-1 text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
