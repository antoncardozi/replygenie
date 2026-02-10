'use client';

import { useState, useCallback } from 'react';
import { trackToolUse } from '@/lib/analytics';

interface GeneratedResponse {
  text: string;
  tone: string;
}

const TONES = [
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'friendly', label: 'Friendly', emoji: '😊' },
  { value: 'empathetic', label: 'Empathetic', emoji: '💛' },
  { value: 'assertive', label: 'Assertive', emoji: '💪' },
] as const;

const INDUSTRIES = [
  'Restaurant / Food Service',
  'Roofing / Exteriors',
  'Plumbing',
  'HVAC / Heating & Cooling',
  'Electrical',
  'General Contractor',
  'Landscaping / Lawn Care',
  'Cleaning / Janitorial',
  'Pest Control',
  'Automotive / Mechanic',
  'Salon / Spa / Beauty',
  'Healthcare / Medical',
  'Dental',
  'Veterinary',
  'Real Estate',
  'Legal Services',
  'Accounting / Financial',
  'Retail / E-commerce',
  'Fitness / Wellness',
  'Hospitality / Hotels',
  'Moving / Storage',
  'Photography / Videography',
  'Education / Tutoring',
  'IT / Tech Support',
  'Other',
];

const USAGE_KEY = 'replygenie_daily_usage';
const FREE_LIMIT = 3;

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getUsageToday(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const data = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}');
    return data[getTodayKey()] || 0;
  } catch {
    return 0;
  }
}

function incrementUsage(): void {
  if (typeof window === 'undefined') return;
  try {
    const data = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}');
    const today = getTodayKey();
    data[today] = (data[today] || 0) + 1;
    localStorage.setItem(USAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

function buildPrompt(review: string, tone: string, businessName: string, industry: string): string {
  const toneInstructions: Record<string, string> = {
    professional: 'Use a professional, polished tone. Be courteous and business-like.',
    friendly: 'Use a warm, friendly tone. Be personable and approachable, like chatting with a neighbor.',
    empathetic: 'Use an empathetic, understanding tone. Acknowledge feelings and show genuine care.',
    assertive: 'Use a confident, assertive tone. Be firm but respectful. Address concerns directly without being defensive.',
  };

  return `You are an expert at writing responses to customer reviews for local businesses. Generate 3 different response options for the following review.

${toneInstructions[tone] || toneInstructions.professional}

${businessName ? `Business name: ${businessName}` : ''}
${industry ? `Industry: ${industry}` : ''}

Customer Review:
"""
${review}
"""

Rules:
- Each response should be 2-4 sentences
- Never be defensive or argumentative
- If the review is positive, express genuine gratitude
- If the review is negative, acknowledge the concern and offer to make it right
- Include the reviewer's name if mentioned in the review
- Each response should take a slightly different approach
- Do NOT use generic filler phrases like "We value your feedback"

Return exactly 3 responses, each on its own line, separated by "---". Do not number them or add labels.`;
}

function extractDetails(review: string): { name: string | null; topics: string[]; isPositive: boolean } {
  // Try to extract reviewer name (common patterns: "my server X", "X was", "thanks X")
  const nameMatch = review.match(/(?:server|waiter|waitress|stylist|technician|doctor|nurse|agent|rep)\s+(\w+)/i)
    || review.match(/(\w+)\s+was\s+(?:great|amazing|awesome|wonderful|fantastic|terrible|rude|helpful)/i);
  const name = nameMatch ? nameMatch[1] : null;

  // Extract topic keywords
  const topics: string[] = [];
  if (review.match(/food|meal|dish|pasta|steak|pizza|burger|sushi|menu/i)) topics.push('food');
  if (review.match(/service|staff|server|waiter|waitress|team|employee/i)) topics.push('service');
  if (review.match(/wait|slow|time|hour|minutes|long/i)) topics.push('wait-time');
  if (review.match(/clean|dirty|mess|hygiene|sanitary/i)) topics.push('cleanliness');
  if (review.match(/price|expensive|cheap|cost|value|overpriced/i)) topics.push('price');
  if (review.match(/atmosphere|ambiance|vibe|decor|music|noise/i)) topics.push('atmosphere');
  if (review.match(/quality|work|result|outcome|job/i)) topics.push('quality');

  const negWords = review.match(/bad|terrible|worst|horrible|awful|disappointed|rude|slow|dirty|never|poor|mediocre|overpriced|cold|stale|wrong|mistake|problem|issue|complaint/gi);
  const posWords = review.match(/great|amazing|awesome|wonderful|fantastic|excellent|perfect|love|best|delicious|outstanding|recommend|friendly|helpful|impressed/gi);
  const isPositive = (posWords?.length || 0) > (negWords?.length || 0);

  return { name, topics, isPositive };
}

function generateFallbackResponses(review: string, tone: string, businessName: string): GeneratedResponse[] {
  const { name, topics, isPositive } = extractDetails(review);
  const biz = businessName || 'our team';

  const nameRef = name ? ` We'll be sure to let ${name} know — ` : ' ';
  const topicRef = topics.includes('food') ? 'the food' : topics.includes('service') ? 'the service' : topics.includes('quality') ? 'the quality of work' : 'your experience';

  if (isPositive) {
    const responses: Record<string, string[]> = {
      professional: [
        `Thank you for the thoughtful review. We're glad ${topicRef} met your expectations at ${biz}.${name ? ` We'll pass along your kind words to ${name} — feedback like this is exactly what drives our team.` : ' We look forward to welcoming you back.'}`,
        `We appreciate you sharing your experience. Hearing that ${topicRef} stood out means a lot to the team at ${biz}.${nameRef}It's feedback like yours that keeps us motivated.`,
        `Thank you — it's always great to know when things come together the way we intend at ${biz}. We'd love to have you back anytime.`,
      ],
      friendly: [
        `This made our day — thank you! So glad you enjoyed ${topicRef} at ${biz}.${name ? ` ${name} is going to be thrilled to hear this!` : ''} Hope to see you again soon! 😊`,
        `Thanks so much for the kind words! We had a great time serving you and it sounds like the feeling was mutual.${name ? ` ${name} says thanks!` : ''} Come back anytime!`,
        `Love hearing this! We put a lot of care into what we do at ${biz} and it's awesome when it shows. See you next time! 🙌`,
      ],
      empathetic: [
        `Thank you for taking the time to share this — it genuinely means a lot to our team. We put real care into ${topicRef} at ${biz}, and knowing it resonated with you makes all the effort worthwhile.${name ? ` ${name} will be touched to hear your words.` : ''}`,
        `Reading this really made our day. We know you have plenty of options, and the fact that you chose ${biz} — and had a great experience — is something we don't take for granted. Thank you.`,
        `Your kind words remind us why we do what we do. Every detail matters to us at ${biz}, and we're so glad that came through in your visit.${name ? ` We'll make sure ${name} sees this.` : ''}`,
      ],
      assertive: [
        `Appreciate the review. We hold ourselves to a high standard at ${biz}, and it's good to hear that shows in ${topicRef}.${name ? ` ${name} consistently delivers — your review confirms that.` : ''} Thanks for choosing us.`,
        `Thank you. We built ${biz} to deliver, and your feedback confirms we're hitting the mark.${name ? ` ${name} is one of our best — glad you got to experience that firsthand.` : ''} We'll keep the bar high.`,
        `Thanks for taking the time to write this. We don't aim for "good enough" at ${biz} — we aim for exactly the kind of experience you described. Looking forward to your next visit.`,
      ],
    };
    return (responses[tone] || responses.professional).map(text => ({ text, tone }));
  } else {
    const issueRef = topics.includes('wait-time') ? 'the wait time' : topics.includes('cleanliness') ? 'the cleanliness issue' : topics.includes('price') ? 'the pricing concern' : topics.includes('service') ? 'the service issue' : 'what happened';

    const responses: Record<string, string[]> = {
      professional: [
        `Thank you for letting us know about ${issueRef}. This falls short of the standard we set at ${biz}, and we want to make it right. Could you reach out to us directly so we can address your specific concerns?`,
        `We appreciate your honest feedback. What you described isn't the experience we aim to deliver at ${biz}, and we're looking into ${issueRef} to prevent this going forward. We'd welcome the chance to discuss this with you.`,
        `Thank you for bringing this to our attention. We take ${issueRef} seriously at ${biz} and are taking steps to address it. Please don't hesitate to contact us — we'd like to earn back your confidence.`,
      ],
      friendly: [
        `We're sorry about ${issueRef} — that's not the experience we want anyone to have at ${biz}. We'd really love a chance to make it up to you. Drop us a message and let's sort this out together!`,
        `Ugh, we hate hearing this. Thank you for being upfront about ${issueRef} — that's the only way we get better. Please reach out so we can make your next visit a totally different experience!`,
        `Not the experience we want you walking away with! We're on it with ${issueRef} at ${biz}. Would love to chat and figure out how to make things right for you.`,
      ],
      empathetic: [
        `We're sorry about what you experienced. ${issueRef.charAt(0).toUpperCase() + issueRef.slice(1)} is something we take very seriously at ${biz}, and we understand how frustrating that must have been. We'd genuinely appreciate the chance to make this right — please reach out to us.`,
        `Thank you for sharing this, and we're sorry we let you down. No one should leave ${biz} feeling the way you described. We're committed to doing better and would love the opportunity to show you that.`,
        `We hear you, and we're sorry. Your experience matters to us, and ${issueRef} is not something we take lightly at ${biz}. Please contact us — we want to understand what happened and make it right.`,
      ],
      assertive: [
        `Thank you for the direct feedback on ${issueRef}. We hold ${biz} to a high standard, and what you described doesn't meet it. We're addressing this and would like to resolve your concerns — please contact us.`,
        `We appreciate you calling out ${issueRef}. We don't make excuses at ${biz} — we fix things. We're already looking into this and want to make it right for you. Please reach out.`,
        `Your feedback on ${issueRef} is noted and taken seriously. We're taking action at ${biz} to ensure this doesn't happen again. We'd like to discuss your experience directly — please get in touch.`,
      ],
    };
    return (responses[tone] || responses.professional).map(text => ({ text, tone }));
  }
}

interface ReviewToolProps {
  onFirstUse?: () => void;
}

export default function ReviewTool({ onFirstUse }: ReviewToolProps) {
  const [review, setReview] = useState('');
  const [tone, setTone] = useState('professional');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [responses, setResponses] = useState<GeneratedResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hasUsedTool, setHasUsedTool] = useState(false);

  const usageToday = typeof window !== 'undefined' ? getUsageToday() : 0;
  const remainingFree = Math.max(0, FREE_LIMIT - usageToday);

  const generateResponses = useCallback(async () => {
    if (!review.trim()) {
      setError('Please paste a review first.');
      return;
    }

    if (review.trim().length < 10) {
      setError('Please paste a longer review for better results.');
      return;
    }

    const currentUsage = getUsageToday();
    if (currentUsage >= FREE_LIMIT) {
      setError(`You've used all ${FREE_LIMIT} free responses today. Upgrade to Pro for unlimited responses.`);
      return;
    }

    setLoading(true);
    setError('');
    setResponses([]);

    try {
      // Call our edge API (keeps OpenAI key server-side)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, tone, businessName, industry }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.responses?.length >= 2) {
          setResponses(data.responses.slice(0, 3).map((text: string) => ({ text, tone })));
        } else {
          setResponses(generateFallbackResponses(review, tone, businessName));
        }
      } else {
        // API failed — use smart fallback
        setResponses(generateFallbackResponses(review, tone, businessName));
      }

      incrementUsage();
      trackToolUse('review-responder');

      if (!hasUsedTool) {
        setHasUsedTool(true);
        onFirstUse?.();
      }
    } catch {
      // Fallback to template responses on any error
      setResponses(generateFallbackResponses(review, tone, businessName));
      incrementUsage();
      trackToolUse('review-responder');

      if (!hasUsedTool) {
        setHasUsedTool(true);
        onFirstUse?.();
      }
    } finally {
      setLoading(false);
    }
  }, [review, tone, businessName, industry, hasUsedTool, onFirstUse]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Input */}
      <div>
        <label htmlFor="review-input" className="block text-sm font-medium mb-2">
          Paste the customer review
        </label>
        <textarea
          id="review-input"
          rows={5}
          placeholder={'Example: "Great food and amazing service! Our waiter John was incredibly attentive. The pasta was cooked perfectly. Will definitely come back!"'}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          aria-label="Customer review text"
        />
      </div>

      {/* Tone Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Response tone</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                tone === t.value
                  ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                  : 'border-border hover:border-primary/40 hover:bg-accent'
              }`}
              aria-pressed={tone === t.value}
            >
              <span className="mr-1.5">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Business Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="industry-select" className="block text-sm font-medium mb-2">
            Business type
          </label>
          <select
            id="industry-select"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select your business type...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="business-name" className="block text-sm font-medium mb-2">
            Business name <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="business-name"
            type="text"
            placeholder="e.g., Wilson Roofing"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          type="button"
          onClick={generateResponses}
          disabled={loading || !review.trim()}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Generate review responses"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Responses ✨'
          )}
        </button>
        <span className="text-xs text-muted-foreground">
          {remainingFree} of {FREE_LIMIT} free responses remaining today
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
          {error.includes('Upgrade') && (
            <a href="/pricing/" className="ml-2 underline font-medium hover:no-underline">
              View Pro plans →
            </a>
          )}
        </div>
      )}

      {/* Generated Responses */}
      {responses.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Your Response Options
          </h3>
          {responses.map((r, i) => (
            <div
              key={i}
              className="group rounded-lg border border-border bg-muted/20 p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed flex-1">{r.text}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(r.text, i)}
                  className="shrink-0 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
                  aria-label={`Copy response option ${i + 1}`}
                >
                  {copiedIndex === i ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
