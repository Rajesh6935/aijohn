/**
 * Vercel Serverless Function — /api/chat
 * ──────────────────────────────────────
 * Proxies requests from the Estimate page to the Anthropic Claude API.
 * Deployed automatically by Vercel — no backend setup needed.
 *
 * Local dev: Vite proxies /api → this function via vite.config.js
 * Production: Vercel runs this as a serverless function at /api/chat
 *
 * Set ANTHROPIC_API_KEY in:
 *   - Local:      .env.local  (never commit this file)
 *   - Production: Vercel Dashboard → Project → Settings → Environment Variables
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!API_KEY) {
    return res.status(503).json({
      error: 'ANTHROPIC_API_KEY not set. Add it in Vercel Dashboard → Environment Variables.',
    });
  }

  const { messages, systemPrompt, model, maxTokens } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key':         API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      model || 'claude-sonnet-4-6',
        max_tokens: Math.min(maxTokens || 300, 800),   // hard cap at 800 per call
        system:     systemPrompt || 'You are a helpful AI assistant.',
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[api/chat] Anthropic error:', response.status, errText);
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('[api/chat] fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
}
