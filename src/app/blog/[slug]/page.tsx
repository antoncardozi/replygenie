import Link from 'next/link';
import EmailCapture from '@/components/EmailCapture';
import { generateMeta } from '@/lib/seo';

const posts: Record<string, { title: string; date: string; meta: string; sections: { heading?: string; content: string }[] }> = {
  'how-to-respond-to-google-reviews': {
    title: 'How to Respond to Google Reviews: AI-Powered Guide (Free Tool)',
    date: '2026-02-09',
    meta: 'Learn how to respond to Google reviews like a pro. Includes templates for positive, negative, and fake reviews plus a free AI review response generator tool.',
    sections: [
      {
        content: 'If you own a local business, Google reviews are one of the most powerful factors influencing whether new customers walk through your door or click away to a competitor. Yet most business owners either ignore reviews entirely or write the same generic "Thank you for your feedback!" response every time. Both approaches leave money on the table.',
      },
      {
        content: 'In this guide, you\'ll learn exactly how to respond to every type of Google review — positive, negative, and even fake ones — with proven strategies that boost your local SEO, build customer loyalty, and protect your reputation. Plus, we\'ll show you how to use AI to generate perfect responses in seconds instead of spending 15-20 minutes agonizing over each reply.',
      },
      {
        heading: 'Why Responding to Google Reviews Matters More Than You Think',
        content: 'According to a BrightLocal study, 88% of consumers trust online reviews as much as personal recommendations. But here\'s the part most business owners miss: Google\'s algorithm actively rewards businesses that respond to reviews. Responding signals to Google that your business is active and engaged, which can directly improve your ranking in Google Maps and local search results.\n\nHarvard Business School research found that businesses that respond to reviews see an average revenue increase of 35%. That\'s not a typo — responding to reviews literally puts more money in your pocket.\n\nHere\'s what happens when you respond consistently:\n\n• Your Google Maps ranking improves because Google sees you as an active, engaged business\n• Potential customers reading reviews see that you care about customer experience\n• Negative review damage is minimized because readers see your professional response\n• You build a feedback loop that improves your actual service quality\n• Your business appears more trustworthy and professional than competitors who don\'t respond',
      },
      {
        heading: 'How to Respond to Positive Google Reviews',
        content: 'Positive reviews are the easiest to respond to, but most businesses still get it wrong. The #1 mistake? Being too generic. "Thank you for your kind words!" tells the reviewer (and everyone reading) that you didn\'t actually read their review.\n\nHere\'s a better framework for positive review responses:\n\n1. Thank them by name (if available in the review)\n2. Reference something specific they mentioned\n3. Add a personal touch or insider detail\n4. Invite them back\n\nExample — if a customer writes "The pasta carbonara was incredible and our server Mike was amazing!"\n\nBad response: "Thank you for your review! We appreciate your feedback."\n\nGood response: "Thank you, Sarah! We\'re thrilled you enjoyed the carbonara — it\'s our chef\'s signature dish, made with imported guanciale from Italy. Mike is one of our best, and I\'ll make sure he sees this. We hope to welcome you back soon!"\n\nSee the difference? The good response shows you actually read and care about the review. It builds a real connection.\n\nPro tip: Vary your responses. If every positive review gets the same template, it looks automated (even if it\'s not). This is where an AI review response generator like ReplyGenie shines — it creates unique, personalized responses every time while maintaining your brand voice.',
      },
      {
        heading: 'How to Respond to Negative Google Reviews',
        content: 'Negative reviews are where most business owners freeze up. The instinct is to either ignore the review or get defensive. Both are the wrong move.\n\nHere\'s the truth: a well-crafted response to a negative review can actually win you MORE customers than a positive review alone. Why? Because potential customers want to see how you handle problems. A thoughtful, professional response shows character.\n\nFollow this framework for negative review responses:\n\n1. Acknowledge and apologize — Even if you think the customer is wrong, validate their experience. "I\'m sorry you had this experience" costs nothing and defuses tension.\n2. Take responsibility — Never blame the customer, even indirectly. Avoid phrases like "We\'re sorry you feel that way" (which implies the problem is their perception, not your service).\n3. Offer a solution — Move the conversation offline. Provide a direct phone number or email. "I\'d like to make this right — please contact me directly at..." shows you\'re serious.\n4. Keep it brief — Long defensive responses make you look worse, not better. 3-4 sentences is ideal.\n\nExample — if a customer writes "Waited 45 minutes for our food and when it arrived, the steak was overcooked. Terrible experience."\n\nBad response: "We were very busy that night and our kitchen was backed up. The steak was cooked to order. Sorry you didn\'t enjoy it."\n\nGood response: "I\'m truly sorry about your experience — a 45-minute wait and an overcooked steak is not the standard we hold ourselves to. I\'d like to make this right. Please reach out to me directly at [email] so we can discuss how to earn back your trust."\n\nThe empathetic tone option in ReplyGenie is specifically designed for negative reviews. It generates responses that acknowledge feelings without being defensive — the hardest tone to nail on your own when you\'re frustrated.',
      },
      {
        heading: 'How to Handle Fake Google Reviews',
        content: 'Fake reviews happen. Competitors, disgruntled ex-employees, or people who confuse your business with another one can all leave reviews that don\'t reflect a real customer experience.\n\nStep 1: Flag the review with Google. Go to your Google Business Profile, find the review, click the three dots, and select "Report review." Google will investigate, though this process can take weeks.\n\nStep 2: Respond publicly while the review is up. A calm, professional response protects your reputation for anyone reading:\n\n"We take every review seriously, but we\'re unable to find any record of this experience in our system. We\'d love to learn more — please contact us at [email] with your booking details so we can look into this."\n\nThis response does three things: it shows readers you\'re professional, it casts doubt on the review\'s authenticity without being accusatory, and it invites the reviewer to provide proof (which a fake reviewer won\'t do).\n\nNever accuse someone of leaving a fake review publicly. Even if you\'re certain it\'s fake, the accusation makes you look petty to other readers.',
      },
      {
        heading: 'Using AI to Respond to Reviews: The Smart Approach',
        content: 'Let\'s be honest — responding to every review takes time. If you\'re getting 5-10 reviews per week across Google, Yelp, and Facebook, that\'s potentially hours of writing time.\n\nThis is where AI review response generators become essential. Tools like ReplyGenie analyze the review content, detect sentiment, and generate personalized responses tailored to your business and preferred tone.\n\nThe key advantages of using AI for review responses:\n\n• Speed — Generate 3 response options in under 10 seconds instead of spending 15-20 minutes per review\n• Consistency — Maintain a professional tone even when you\'re frustrated by an unfair review\n• Variety — AI never sends the same response twice, avoiding the "template" feel\n• Tone matching — Switch between professional, friendly, empathetic, and assertive tones to match each situation\n\nThe best approach is AI-assisted, not AI-only. Use the tool to generate a response, then add a personal touch or specific detail before posting. This gives you the efficiency of AI with the authenticity of a human touch.\n\nYou can try this right now — our free AI review response generator at the top of this page lets you paste any review and get 3 tailored responses instantly. No sign-up required.',
      },
      {
        heading: 'Response Templates for Common Review Scenarios',
        content: 'While every response should feel personalized, here are frameworks you can adapt:\n\nFor a glowing 5-star review:\n"[Name], thank you so much for this wonderful review! We\'re delighted to hear [specific detail from review]. [Personal touch or behind-the-scenes detail]. We look forward to welcoming you back!"\n\nFor a mixed 3-star review:\n"Thank you for your honest feedback, [Name]. We\'re glad [positive aspect they mentioned], and we appreciate you letting us know about [negative aspect]. We\'re working on [improvement]. We\'d love the chance to give you a 5-star experience next time."\n\nFor a harsh 1-star review:\n"We\'re sorry this was your experience. [Acknowledge specific complaint without being defensive]. We hold ourselves to a higher standard and want to make this right. Please contact us at [email/phone] so we can discuss this directly."\n\nFor a review with no text (just stars):\n"Thank you for the [X]-star rating! If you have a moment, we\'d love to hear more about your experience — it helps us continue to improve."',
      },
      {
        heading: 'How Fast Should You Respond to Reviews?',
        content: 'Ideally, within 24-48 hours. A quick response shows customers (and Google) that you\'re attentive. Reviews that sit unanswered for weeks or months send the opposite signal.\n\nSet a routine: check your reviews once daily, or at minimum every other day. Many business owners block 15 minutes each morning for review responses. With an AI tool like ReplyGenie, this becomes a 5-minute task.\n\nDon\'t respond immediately to negative reviews when you\'re emotional. Give yourself an hour to cool down, then craft a professional response. AI tools help here too — they remove the emotional impulse and generate a measured, professional reply.',
      },
      {
        heading: 'Start Responding to Every Review Today',
        content: 'The data is clear: responding to reviews increases revenue, improves your Google ranking, builds customer loyalty, and protects your reputation. There\'s no downside.\n\nIf time has been your excuse for not responding, that excuse is gone. AI tools make it possible to craft personalized, professional responses in seconds instead of minutes.\n\nTry our free AI review response generator at the top of this page. Paste any review, choose your tone, and see the difference a great response makes. No sign-up, no credit card, no catch.',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) return {};
  return generateMeta({
    title: post.title,
    description: post.meta,
    path: `/blog/${params.slug}/`,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/blog/" className="mt-4 inline-block text-primary hover:underline">&larr; Back to blog</Link>
      </div>
    );
  }

  return (
    <article className="container py-16 md:py-24 max-w-2xl mx-auto">
      <Link href="/blog/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">&larr; Back to blog</Link>
      <time className="mt-4 block text-sm text-muted-foreground">{post.date}</time>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>

      <div className="mt-8 space-y-6">
        {post.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="text-xl font-semibold mt-10 mb-3">{section.heading}</h2>
            )}
            {section.content.split('\n\n').map((paragraph, j) => {
              if (paragraph.startsWith('•')) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={j} className="my-3 space-y-1.5 ml-4">
                    {items.map((item, k) => (
                      <li key={k} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 shrink-0">•</span>
                        <span>{item.replace(/^•\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ol key={j} className="my-3 space-y-1.5 ml-4 list-decimal list-inside">
                    {items.map((item, k) => (
                      <li key={k} className="text-sm text-muted-foreground">{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={j} className="my-3 text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
              );
            })}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
        <h3 className="font-semibold text-lg">Ready to try it?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Generate your first AI review response in seconds — completely free.</p>
        <Link href="/#tool" className="mt-4 inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Try ReplyGenie Free →
        </Link>
      </div>

      <div className="mt-12">
        <EmailCapture source="blog-review-guide" heading="Get more review response tips" description="Join our newsletter for weekly tips on managing your online reputation and growing your local business." buttonText="Subscribe" />
      </div>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'ReplyGenie' },
            publisher: { '@type': 'Organization', name: 'ReplyGenie' },
          }),
        }}
      />
    </article>
  );
}
