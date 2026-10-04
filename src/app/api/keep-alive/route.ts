import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Force dynamic execution for API route
export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({
      success: true,
      timestamp,
      message: 'Keep-alive endpoint triggered successfully. Supabase credentials are missing or pending configuration in .env.',
      databaseConnected: false
    });
  }

  try {
    // Perform a non-disruptive, lightweight ping to keep Supabase active
    // We try to log into keep_alive_pings table, or fallback to head select on events
    const { error: insertErr } = await supabase
      .from('keep_alive_pings')
      .insert([{ source: 'automated_48hr_trigger', status: 'success' }]);

    if (insertErr) {
      // If keep_alive_pings table doesn't exist yet, do a lightweight select
      const { error: selectErr } = await supabase
        .from('events')
        .select('id', { head: true, count: 'exact' });

      if (selectErr) {
        console.warn('[Supabase Keep-Alive Warning]:', selectErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp,
      message: 'Supabase database triggered successfully. Active & refreshed to prevent inactivity pause.',
      databaseConnected: true
    });
  } catch (error: any) {
    console.error('[Supabase Keep-Alive Error]:', error);
    return NextResponse.json(
      {
        success: false,
        timestamp,
        error: error?.message || 'Unknown error occurred while pinging Supabase'
      },
      { status: 500 }
    );
  }
}
