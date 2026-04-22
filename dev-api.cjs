/**
 * Local dev server for /api/chat
 * ──────────────────────────────
 * Only needed when running locally with `npm run dev`.
 * On Vercel, api/chat.js handles this automatically.
 *
 * Run in a separate terminal:  node dev-api.cjs
 * Then start Vite normally:    npm run dev
 *
 * Reads ANTHROPIC_API_KEY from .env.local automatically.
 */

require('dotenv').config({ path: '.env.local' });
const http = require('http');

const API_KEY       = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const PORT          = 3001;

const server = http.createServer(async (req, res) => {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  if (req.method !== 'POST')    { res.writeHead(405); return res.end('Method not allowed'); }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const { messages, systemPrompt, model } = JSON.parse(body);

      if (!API_KEY) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env.local' }));
      }

      // Use built-in fetch (Node 18+)
      const response = await fetch(ANTHROPIC_URL, {
        method:  'POST',
        headers: {
          'x-api-key':         API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type':      'application/json',
        },
        body: JSON.stringify({
          model:      model || 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          system:     systemPrompt || 'You are a helpful assistant.',
          messages,
        }),
      });

      const data = await response.text();
      res.writeHead(response.status, { 'Content-Type': 'application/json' });
      res.end(data);

    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n  ✅ Dev API running at http://localhost:${PORT}`);
  if (!API_KEY) {
    console.log('  ⚠️  ANTHROPIC_API_KEY not found in .env.local');
    console.log('     AI chat will fall back to simulated responses.\n');
  } else {
    console.log('  🤖 Claude API key loaded — real AI chat enabled.\n');
  }
});
