'use client';

import { useEffect } from 'react';

const KEEP_ALIVE_INTERVAL_MS = 48 * 60 * 60 * 1000; // 48 Hours in milliseconds
const STORAGE_KEY = 'dsc_last_supabase_keep_alive';

export function SupabaseKeepAlive() {
  useEffect(() => {
    const triggerKeepAlive = async () => {
      try {
        const lastPingStr = localStorage.getItem(STORAGE_KEY);
        const lastPing = lastPingStr ? parseInt(lastPingStr, 10) : 0;
        const now = Date.now();

        // If never pinged or > 48 hours have passed since last ping
        if (!lastPing || now - lastPing > KEEP_ALIVE_INTERVAL_MS) {
          const res = await fetch('/api/keep-alive');
          if (res.ok) {
            localStorage.setItem(STORAGE_KEY, now.toString());
            console.log('[Supabase Keep-Alive] 48hr auto-trigger executed successfully.');
          }
        }
      } catch (err) {
        console.warn('[Supabase Keep-Alive] Background ping failed:', err);
      }
    };

    triggerKeepAlive();
  }, []);

  return null; // Silent background trigger component
}
