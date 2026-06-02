import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Sparkles, User,
  ChevronDown, RefreshCw, Zap,
} from 'lucide-react';
import { AIJOHN_SYSTEM_PROMPT, COMPANY } from '../data/aijohn-knowledge';
import './ChatBot.css';

/* ── Config ─────────────────────────────────── */
const AI_PROXY_URL = '/api/chat';
const CLAUDE_MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS   = 500;

/* ── System prompt specifically for the floating chatbot ── */
const CHAT_SYSTEM = `${AIJOHN_SYSTEM_PROMPT}

EXTRA INSTRUCTIONS FOR THIS WIDGET:
- You appear as a floating chat widget on the AIJOHN website.
- Keep replies SHORT — 2–4 sentences max, or a tight bullet list.
- Be warm, friendly, and slightly playful — like a smart colleague, not a robot.
- Never start a response with "I" — vary your openers.
- After 2 exchanges, gently invite them to book a free call or visit /estimate for a detailed quote.
- Emoji are fine but use them sparingly (1 per message max).`;

/* ── Quick prompt chips ─────────────────────── */
const QUICK_CHIPS = [
  { label: 'How much does an MVP cost?',  icon: '💰' },
  { label: 'How fast can you ship?',       icon: '🚀' },
  { label: 'Do you build AI features?',   icon: '🤖' },
  { label: 'Who is the team?',            icon: '👥' },
];

/* ── Welcome message ────────────────────────── */
const WELCOME = {
  role: 'assistant',
  content: "Hey! 👋 I'm JOHN — AIJOHN's AI advisor.\n\nTell me what you're building and I'll give you an honest timeline, tech stack suggestion, and rough cost — in plain English.",
};

/* ── Call Claude via /api/chat ─────────────── */
async function callClaude(history) {
  try {
    const res = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:        CLAUDE_MODEL,
        max_tokens:   MAX_TOKENS,
        system:       CHAT_SYSTEM,
        messages:     history.map(m => ({ role: m.role, content: m.content })),
        systemPrompt: CHAT_SYSTEM,
        maxTokens:    MAX_TOKENS,
      }),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch (err) {
    console.error('[ChatBot] API error:', err);
    return null;
  }
}

/* ── Typing animation dots ──────────────────── */
function TypingDots() {
  return (
    <div className="cb-typing">
      <span /><span /><span />
    </div>
  );
}

/* ── Avatar ─────────────────────────────────── */
function BotAvatar({ size = 28 }) {
  return (
    <div className="cb-avatar cb-avatar--bot" style={{ width: size, height: size }}>
      <Sparkles size={size * 0.45} />
    </div>
  );
}

/* ── Render message content with simple markdown ── */
function MsgContent({ text }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trimStart();
        const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ');
        if (isBullet) {
          return (
            <span key={i} className="cb-bullet">
              <span className="cb-bullet-dot" />
              {trimmed.slice(2)}
              {i < lines.length - 1 && <br />}
            </span>
          );
        }
        // Bold **text**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

/* ── Single message bubble ──────────────────── */
function MessageBubble({ msg, isFirst }) {
  const isBot = msg.role === 'assistant';
  return (
    <motion.div
      className={`cb-msg ${isBot ? 'cb-msg--bot' : 'cb-msg--user'}`}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {isBot && <BotAvatar />}
      <div className="cb-bubble">
        <MsgContent text={msg.content} />
      </div>
      {!isBot && (
        <div className="cb-avatar cb-avatar--user">
          <User size={13} />
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN CHATBOT COMPONENT
══════════════════════════════════════════════ */
export default function ChatBot() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [messages,   setMessages]   = useState([WELCOME]);
  const [input,      setInput]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [showNotif,  setShowNotif]  = useState(false);
  const [notifText,  setNotifText]  = useState("Need a quote? Chat with JOHN →");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const textareaRef    = useRef(null);

  /* ── Notification dot after 5s ── */
  useEffect(() => {
    if (sessionStorage.getItem('aijohn_chat_opened')) return;
    const t1 = setTimeout(() => setShowNotif(true), 5000);
    // Cycle notif messages
    const messages = [
      "Need a quote? Chat with JOHN →",
      "Got a project idea? Let's talk →",
      "Ask me anything about your build →",
    ];
    let idx = 0;
    const t2 = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setNotifText(messages[idx]);
    }, 4000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  /* ── Scroll to bottom ── */
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }, [messages, isOpen, loading, isMinimized]);

  /* ── Auto-resize textarea ── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }, [input]);

  /* ── Focus input on open ── */
  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => textareaRef.current?.focus(), 300);
  }, [isOpen, isMinimized]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowNotif(false);
    sessionStorage.setItem('aijohn_chat_opened', '1');
  }, []);

  /* ── Send message ── */
  const send = useCallback(async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    const reply = await callClaude(history);

    const botMsg = {
      role: 'assistant',
      content: reply || `Hmm, I had trouble connecting. Reach out directly:\n\n📧 ${COMPANY.email}\n📅 calendly.com/aijohn\n\nWe reply within 24 hours!`,
    };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  }, [input, messages, loading]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }, [send]);

  const handleChip = useCallback((label) => {
    send(label);
  }, [send]);

  const handleReset = useCallback(() => {
    setMessages([WELCOME]);
    setInput('');
  }, []);

  const showChips = messages.length === 1;

  return (
    <>
      {/* ── Floating trigger ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="cb-trigger-wrap"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          >
            {/* Notification bubble */}
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  className="cb-notif-bubble"
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.28 }}
                >
                  {notifText}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className="cb-trigger"
              onClick={handleOpen}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Open AI chat"
            >
              {/* Animated ring */}
              <span className="cb-trigger__ring" />
              <span className="cb-trigger__ring cb-trigger__ring--2" />
              <span className="cb-trigger__icon">
                <MessageCircle size={22} strokeWidth={2.2} />
              </span>
              {showNotif && <span className="cb-trigger__dot" />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`cb-window${isMinimized ? ' cb-window--minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* ── Header ── */}
            <div className="cb-header" onClick={() => isMinimized && setIsMinimized(false)}>
              {/* Background glow */}
              <div className="cb-header__glow" />

              <div className="cb-header__avatar">
                <Sparkles size={18} />
                <span className="cb-header__avatar-pulse" />
              </div>

              <div className="cb-header__info">
                <div className="cb-header__name">JOHN <span className="cb-header__badge">AI Advisor</span></div>
                <div className="cb-header__status">
                  <span className="cb-online-dot" />
                  Online · Claude {CLAUDE_MODEL.includes('sonnet') ? 'Sonnet' : 'AI'} powered
                </div>
              </div>

              <div className="cb-header__actions">
                <motion.button
                  className="cb-header-btn"
                  onClick={handleReset}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="New conversation"
                  aria-label="Reset conversation"
                >
                  <RefreshCw size={13} />
                </motion.button>
                <motion.button
                  className="cb-header-btn"
                  onClick={() => setIsMinimized(v => !v)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isMinimized ? 'Expand' : 'Minimise'}
                  aria-label="Minimise chat"
                >
                  <ChevronDown size={15} style={{ transform: isMinimized ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
                </motion.button>
                <motion.button
                  className="cb-header-btn cb-header-btn--close"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close chat"
                >
                  <X size={15} />
                </motion.button>
              </div>
            </div>

            {/* ── Collapsible body ── */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div
                  className="cb-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Messages */}
                  <div className="cb-messages">
                    {messages.map((msg, i) => (
                      <MessageBubble key={i} msg={msg} isFirst={i === 0} />
                    ))}

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {loading && (
                        <motion.div
                          className="cb-msg cb-msg--bot"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <BotAvatar />
                          <div className="cb-bubble">
                            <TypingDots />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>

                  {/* ── Quick chips (shown only on first message) ── */}
                  <AnimatePresence>
                    {showChips && (
                      <motion.div
                        className="cb-chips"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22 }}
                      >
                        {QUICK_CHIPS.map((chip, i) => (
                          <motion.button
                            key={chip.label}
                            className="cb-chip"
                            onClick={() => handleChip(chip.label)}
                            disabled={loading}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="cb-chip__icon">{chip.icon}</span>
                            {chip.label}
                            <Zap size={10} className="cb-chip__arrow" />
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Input ── */}
                  <div className="cb-input-wrap">
                    <div className="cb-input-row">
                      <textarea
                        ref={textareaRef}
                        className="cb-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Describe what you're building…"
                        rows={1}
                        disabled={loading}
                        aria-label="Chat message"
                      />
                      <motion.button
                        className="cb-send"
                        onClick={() => send()}
                        disabled={loading || !input.trim()}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        aria-label="Send message"
                      >
                        <Send size={15} strokeWidth={2.5} />
                      </motion.button>
                    </div>
                    <div className="cb-footer">
                      Powered by Claude AI · <a href="/estimate" className="cb-footer-link">Detailed estimate →</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
