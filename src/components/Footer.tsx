import Link from 'next/link';

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'ReplyGenie';
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {year} {siteName}. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/privacy/" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms/" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/blog/" className="hover:text-foreground transition-colors">Blog</Link>
        </nav>
      </div>
    </footer>
  );
}
