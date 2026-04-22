/**
 * AIJOHN AI Proxy Server
 * ──────────────────────
 * Serves the static build and proxies /api/chat → Anthropic API.
 *
 * SETUP:
 *   1. npm install express cors node-fetch   (or: npm install)
 *   2. Set your Anthropic API key:
 *        export ANTHROPIC_API_KEY="sk-ant-..."
 *   3. Run:  node proxy-server.js
 *   4. Open: http://localhost:3000
 *
 * The Estimate page's AI chat will now use real Claude responses.
 * Without the API key it gracefully falls back to simulated replies.
 */

const express  = require('express');
const cors     = require('cors');
const path     = require('path');

// ── Config ─────────────────────────────────────────────────────────
const PORT    = process.env.PORT || 3000;

// Set your Anthropic API key via environment variable:
//   export ANTHROPIC_API_KEY="sk-ant-api03-..."
// Or paste it directly below (not recommended for production):
const API_KEY = process.env.ANTHROPIC_API_KEY || '';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const app = express();
app.use(cors());
app.use(express.json());

// ── Proxy endpoint ─────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages, systemPrompt, model } = req.body;

  if (!API_KEY || API_KEY.startsWith('REPLACE_')) {
    return res.status(503).json({ error: 'API key not configured. Please set ANTHROPIC_API_KEY.' });
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
        model:      model || 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system:     systemPrompt || 'You are a helpful AI assistant.',
        messages:   messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[proxy] Anthropic error:', response.status, err);
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('[proxy] fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Serve static build ─────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  AIJOHN site running at http://localhost:${PORT}`);
  if (API_KEY.startsWith('REPLACE_')) {
    console.log('  ⚠️  No API key — AI chat will use simulated responses.');
    console.log('  Set ANTHROPIC_API_KEY env var to enable real Claude AI.\n');
  } else {
    console.log('  ✅ Anthropic API key configured — real AI chat enabled.\n');
  }
});
