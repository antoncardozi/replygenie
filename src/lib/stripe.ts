export const PRICE_IDS = {
  pro_monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
};

export async function redirectToCheckout(priceId: string) {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error('Checkout error:', data.error);
      alert('Unable to start checkout. Please try again.');
    }
  } catch (e) {
    console.error('Checkout error:', e);
    alert('Unable to start checkout. Please try again.');
  }
}
