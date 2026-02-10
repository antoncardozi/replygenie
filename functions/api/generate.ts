// Cloudflare Pages Function — proxies AI generation requests
// Keeps OpenAI key server-side, never exposed to browser

interface Env {
  OPENAI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as {
      review: string;
      tone: string;
      businessName?: string;
      industry?: string;
    };

    if (!body.review || body.review.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Review text too short' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const toneInstructions: Record<string, string> = {
      professional: 'Use a professional, polished tone. Be courteous and business-like. Avoid filler phrases.',
      friendly: 'Use a warm, friendly tone. Be personable and genuine — like a real person, not a corporate bot.',
      empathetic: 'Use an empathetic, understanding tone. Acknowledge feelings and show genuine care without being over-the-top.',
      assertive: 'Use a confident, direct tone. Be firm but respectful. Address concerns head-on without being defensive.',
    };

    const prompt = `You write review responses for local businesses. Generate 3 different response options for this customer review.

${toneInstructions[body.tone] || toneInstructions.professional}

${body.businessName ? `Business: ${body.businessName}` : ''}
${body.industry ? `Industry: ${body.industry}` : ''}

Review:
"""
${body.review.slice(0, 2000)}
"""

Rules:
- Each response: 2-4 sentences, natural and human-sounding
- Reference specific details from the review (names, dishes, services mentioned)
- Never use generic filler like "We value your feedback" or "Your satisfaction is our priority"
- If positive: be genuinely grateful, mention what they highlighted
- If negative: acknowledge the specific issue, offer to make it right, don't be defensive
- Each response should take a different angle
- Sound like a real business owner wrote it, not a template

Return exactly 3 responses separated by "---" on its own line. No numbering or labels.`;

    const apiKey = context.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('OpenAI error:', err);
      return new Response(JSON.stringify({ error: 'AI generation failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data = await res.json() as any;
    const content: string = data.choices?.[0]?.message?.content || '';
    const responses = content.split('---').map((s: string) => s.trim()).filter(Boolean).slice(0, 3);

    return new Response(JSON.stringify({ responses }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
