import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _supabase = createClient(url, key);
  return _supabase;
}

export async function captureEmail(
  email: string,
  source: string,
  utmParams?: { utm_source?: string; utm_medium?: string; utm_campaign?: string }
) {
  const supabase = getSupabase();
  if (!supabase) return { success: false, error: { message: 'Supabase not configured' } as any };
  const { error } = await supabase.from('contacts').upsert(
    {
      email,
      consent: true,
      source,
      utm_source: utmParams?.utm_source || null,
      utm_medium: utmParams?.utm_medium || null,
      utm_campaign: utmParams?.utm_campaign || null,
    },
    { onConflict: 'email' }
  );
  return { success: !error, error };
}
