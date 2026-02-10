'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToolWrapper from '@/components/ToolWrapper';
import EmailCapture from '@/components/EmailCapture';
import ReviewTool from '@/components/ReviewTool';

const BENEFITS = [
  { icon: '⚡', title: 'Instant Responses', desc: 'Get 3 polished reply options in seconds. No more staring at a blank text box.' },
  { icon: '🎯', title: 'Tone Control', desc: 'Choose professional, friendly, empathetic, or assertive to match your brand voice.' },
  { icon: '📈', title: 'Boost Your SEO', desc: 'Responding to reviews improves your Google Maps ranking and builds trust.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your reviews stay on your device. Nothing is stored on our servers.' },
];

const FAQ = [
  {
    q: 'Is this AI review response generator really free?',
    a: 'Yes! You get 3 free responses per day, every day. No account or credit card required. Pro unlocks unlimited responses, custom brand voice, and bulk processing.',
  },
  {
    q: 'What types of reviews can I respond to?',
    a: 'ReplyGenie works with reviews from Google, Yelp, Facebook, TripAdvisor, and any other platform. Just paste the review text and we generate a response.',
  },
  {
    q: 'How does the AI generate review responses?',
    a: 'Our AI analyzes the sentiment, key topics, and tone of the review, then crafts personalized responses that sound natural and on-brand for your business.',
  },
  {
    q: 'Will my responses sound generic or robotic?',
    a: 'Not at all. Each response is tailored to the specific review content. Add your business name and industry for even more personalization. Pro users can train a custom brand voice.',
  },
  {
    q: 'Why should I respond to every review?',
    a: 'Responding to reviews shows potential customers you care about their experience. Google also favors businesses that actively engage with reviewers, which can boost your local search ranking.',
  },
  {
    q: 'Can I use this for negative reviews too?',
    a: 'Absolutely. ReplyGenie excels at negative reviews — the hardest ones to write. Choose the empathetic or professional tone for a response that acknowledges concerns without being defensive.',
  },
];

export default function HomePage() {
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container py-16 md:py-24 text-center">
        <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
          Free AI-powered tool — no sign-up required
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto">
          AI Review Response Generator{' '}
          <span className="text-primary">for Local Businesses</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stop struggling to reply to Google, Yelp, and Facebook reviews. Paste any review, pick your tone, and get 3 professional responses instantly. Free forever.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <a href="#tool" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Generate a Response Free →
          </a>
          <Link href="/pricing/" className="rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
            View Pricing
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Free forever · No credit card required
        </p>
      </section>

      {/* Tool Section */}
      <section id="tool" className="container pb-16">
        <ToolWrapper title="Generate Your Review Response">
          <ReviewTool onFirstUse={() => setShowEmailCapture(true)} />
        </ToolWrapper>
      </section>

      {/* Email Capture — appears after first use */}
      {showEmailCapture && (
        <section className="container pb-16 max-w-xl mx-auto">
          <EmailCapture
            source="ai-review-responder"
            heading="Save your responses and brand voice"
            description="Enter your email to get your responses emailed and save your personalization settings for next time."
            buttonText="Save My Responses"
          />
        </section>
      )}

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Paste the Review', desc: 'Copy any customer review from Google, Yelp, Facebook, or any platform and paste it into the tool.' },
              { step: '2', title: 'Choose Your Tone', desc: 'Select professional, friendly, empathetic, or assertive to match your brand personality.' },
              { step: '3', title: 'Copy & Reply', desc: 'Get 3 tailored response options. Click copy, paste it on the review platform, and you\'re done.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">Why Business Owners Love ReplyGenie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-lg border border-border bg-background p-6">
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ with structured data */}
      <section className="container py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-lg border border-border p-4">
              <summary className="cursor-pointer font-medium list-none flex justify-between items-center">
                {item.q}
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">Stop Ignoring Reviews. Start Growing.</h2>
          <p className="mt-3 opacity-90 max-w-lg mx-auto">
            Every unanswered review is a missed opportunity. Start replying to every review in seconds — for free.
          </p>
          <a href="#tool" className="mt-6 inline-block rounded-md bg-background text-foreground px-8 py-3 font-medium hover:bg-background/90 transition-colors">
            Generate Your First Response →
          </a>
        </div>
      </section>
    </div>
  );
}
