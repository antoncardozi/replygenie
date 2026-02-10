import PricingCard from '@/components/PricingCard';
import { generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
  title: 'Pricing — Free vs Pro',
  description: 'ReplyGenie is free forever. Upgrade to Pro for $9/mo to unlock unlimited responses, custom brand voice, and bulk review processing.',
  path: '/pricing/',
});

const FREE_FEATURES = [
  '3 responses per day',
  '4 tone options (professional, friendly, empathetic, assertive)',
  'Business name & industry personalization',
  '3 response options per review',
  'One-click copy to clipboard',
  'Works with Google, Yelp, Facebook & more',
];

const PRO_FEATURES = [
  'Unlimited responses per day',
  'Everything in Free, plus:',
  'Custom brand voice training',
  'Bulk review import (paste 10+ at once)',
  'Saved response templates',
  'Response history & analytics',
  'CSV export',
  'Priority AI generation (faster model)',
  'Email support',
];

export default function PricingPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Start free with 3 responses per day. Upgrade to Pro when you need unlimited power.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <PricingCard
          name="Free"
          price="Free"
          description="Perfect for businesses getting started with review management"
          features={FREE_FEATURES}
          cta="Start Free — No Sign Up"
        />
        <PricingCard
          name="Pro"
          price="$9"
          description="For businesses serious about their online reputation"
          features={PRO_FEATURES}
          cta="Upgrade to Pro"
          highlighted
          priceId="price_1SzDVC5I5nmzz6RYsWU1BuHo"
        />
      </div>

      {/* Comparison */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">Why Upgrade to Pro?</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground">Custom Brand Voice</h3>
            <p className="mt-1">Train the AI on your existing responses so every generated reply sounds like you wrote it. Consistency builds trust.</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground">Bulk Processing</h3>
            <p className="mt-1">Managing multiple locations? Paste 10+ reviews at once and get all responses in one batch. Save hours every week.</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground">Response Templates</h3>
            <p className="mt-1">Save your best responses as templates. Mix and match for even faster replies to common review themes.</p>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        All plans include a 7-day money-back guarantee. Cancel anytime, no questions asked.
      </p>
    </div>
  );
}
