declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, props ? { props } : undefined);
  }
}

export function trackEmailCapture(source?: string) {
  trackEvent('email_capture', source ? { source } : undefined);
}

export function trackCheckout() {
  trackEvent('stripe_checkout');
}

export function trackToolUse(toolName?: string) {
  trackEvent('tool_use', toolName ? { tool: toolName } : undefined);
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}
