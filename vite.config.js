import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // ── Vite plugin: handles /api/chat in the dev server directly ──
  // This avoids the Vite proxy header-injection quirks that cause 401s.
  // In production, Vercel runs api/chat.js as a serverless function instead.
  const localApiPlugin = {
    name: 'local-api-chat',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const apiKey = env.ANTHROPIC_API_KEY
        if (!apiKey) {
          res.statusCode = 503
          res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env.local' }))
          return
        }

        // Read the request body
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const body = JSON.parse(Buffer.concat(chunks).toString())

        const { messages, systemPrompt, model, maxTokens, system, max_tokens } = body

        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key':         apiKey,
              'anthropic-version': '2023-06-01',
              'content-type':      'application/json',
            },
            body: JSON.stringify({
              model:      model      || 'claude-sonnet-4-5',
              max_tokens: Math.min(maxTokens || max_tokens || 300, 800),
              system:     systemPrompt || system || 'You are a helpful AI assistant.',
              messages,
            }),
          })

          const data = await response.json()
          res.statusCode = response.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        } catch (err) {
          console.error('[local-api] fetch error:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }

  return {
    plugins: [react(), localApiPlugin],
  }
})
