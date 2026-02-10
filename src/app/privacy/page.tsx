import { generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
  title: 'Privacy Policy',
  description: 'How ReplyGenie handles your data and protects your privacy.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <div className="container py-16 md:py-24 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: February 9, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Overview</h2>
          <p>ReplyGenie (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides a free AI-powered review response generator for local businesses. We are committed to protecting your privacy and being transparent about what data we collect.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Information We Collect</h2>
          <p>We collect minimal information to provide our service:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong>Review text you submit</strong> — processed in real-time to generate responses. We do not store the reviews you paste into the tool. All processing happens during your session and is not retained.</li>
            <li><strong>Email address</strong> — only when you voluntarily provide it to save responses or subscribe to our newsletter. You can unsubscribe at any time.</li>
            <li><strong>Usage data</strong> — anonymous analytics via privacy-friendly tools (no cookies, GDPR compliant). We track page views and feature usage in aggregate, not individual behavior.</li>
            <li><strong>Payment information</strong> — Pro subscriptions are processed securely by Stripe. We never see, store, or have access to your credit card details.</li>
            <li><strong>Local storage</strong> — we use your browser&apos;s localStorage to track daily usage counts for the free tier. This data never leaves your device.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To generate AI-powered review responses based on the text you submit.</li>
            <li>To send emails you&apos;ve explicitly opted into (response history, newsletter).</li>
            <li>To process Pro subscription payments via Stripe.</li>
            <li>To improve the service through anonymous, aggregated analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Data Sharing</h2>
          <p>We do not sell, rent, or trade your personal data. We share information only with these service providers, solely for the purposes described:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong>OpenAI</strong> — review text is sent to OpenAI&apos;s API to generate responses. OpenAI&apos;s data usage policies apply. We do not send your email or personal information to OpenAI.</li>
            <li><strong>Stripe</strong> — for secure payment processing of Pro subscriptions.</li>
            <li><strong>Supabase</strong> — for secure storage of email addresses and account data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Data Retention</h2>
          <p>Review text submitted to the tool is not stored after your session ends. Email addresses are retained until you unsubscribe or request deletion. Payment records are retained as required by law and Stripe&apos;s policies.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Request a copy of any personal data we hold about you.</li>
            <li>Request deletion of your data at any time.</li>
            <li>Unsubscribe from emails with one click.</li>
            <li>Use the free tier without providing any personal information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Cookies</h2>
          <p>ReplyGenie does not use tracking cookies. We use localStorage (which stays on your device) for usage counting. Our analytics tool does not use cookies and is GDPR compliant without a consent banner.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Children&apos;s Privacy</h2>
          <p>ReplyGenie is designed for business owners and professionals. We do not knowingly collect data from children under 13. If you believe a child has provided us with personal information, please contact us for immediate deletion.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated date. Continued use of ReplyGenie after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
          <p>Questions or concerns about this policy? Contact us at <a href="mailto:support@replygenie.com" className="text-primary hover:underline">support@replygenie.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
