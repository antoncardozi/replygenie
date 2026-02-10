'use client';

import { FormEvent, useState } from 'react';
import { captureEmail } from '@/lib/supabase';
import { trackEmailCapture, getUtmParams } from '@/lib/analytics';

interface EmailCaptureProps {
  source?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  onSuccess?: (email: string) => void;
}

export default function EmailCapture({
  source = 'website',
  heading = 'Get your full results',
  description = 'Enter your email to receive the complete report.',
  buttonText = 'Send My Results',
  onSuccess,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent || !email) return;

    setStatus('loading');
    const utmParams = getUtmParams();
    const result = await captureEmail(email, source, utmParams);

    if (result.success) {
      setStatus('success');
      trackEmailCapture(source);
      onSuccess?.(email);
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="font-medium text-primary">✓ Check your inbox!</p>
        <p className="mt-1 text-sm text-muted-foreground">We&apos;ve sent your results to {email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-muted/30 p-6">
      <h3 className="font-semibold">{heading}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={!consent || status === 'loading'}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? 'Sending...' : buttonText}
        </button>
      </div>

      <label className="mt-3 flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 rounded"
        />
        <span>I agree to receive emails. You can unsubscribe at any time. See our <a href="/privacy/" className="underline hover:text-foreground">Privacy Policy</a>.</span>
      </label>

      {status === 'error' && (
        <p className="mt-2 text-sm text-destructive">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
