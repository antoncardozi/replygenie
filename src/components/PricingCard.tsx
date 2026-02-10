'use client';

import { redirectToCheckout, PRICE_IDS } from '@/lib/stripe';
import { trackCheckout } from '@/lib/analytics';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  priceId?: string;
}

export default function PricingCard({
  name,
  price,
  period = '/mo',
  description,
  features,
  cta,
  highlighted = false,
  priceId,
}: PricingCardProps) {
  const handleClick = async () => {
    if (priceId) {
      trackCheckout();
      await redirectToCheckout(priceId);
    }
  };

  return (
    <div
      className={`rounded-xl border p-8 flex flex-col ${
        highlighted
          ? 'border-primary bg-primary/5 shadow-lg ring-1 ring-primary'
          : 'border-border bg-background'
      }`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-muted-foreground">{period}</span>}
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className={`mt-8 w-full rounded-md py-2.5 text-sm font-medium transition-colors ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-border hover:bg-accent'
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
