import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  MessageCircle, X, Send, Sparkles, User,
  ChevronDown, RefreshCw, Zap, ArrowRight, Calendar, Calculator, Mail,
} from 'lucide-react';
import { AIJOHN_SYSTEM_PROMPT, COMPANY } from '../data/aijohn-knowledge';
import './ChatBot.css';

/* ── Config ─────────────────────────────────── */
const AI_PROXY_URL = '/api/chat';
const CLAUDE_MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS   = 400;

/* ── System prompt ──────────────────────────── */
const CHAT_SYSTEM = `${AIJOHN_SYSTEM_PROMPT}

WIDGET RULES:
- Replies must be 1–2 short sentences max. Hard limit — never go longer.
- Only ask a follow-up question if the person seems genuinely interested or engaged. Do not ask questions just to fill space.
- If someone is just browsing or asking something vague, give a short answer and let them lead.
- Never use bullet points or lists — plain sentences only.
- Never start a reply with "I".
- No emoji unless the person uses one first.

ACTION SIGNALS — append ONE of these at the end of your reply when relevant:
- Append [SHOW_ESTIMATE] when the user wants cost, timeline, or pricing info
- Append [SHOW_CONTACT] when the user wants to talk to the team, book a call, or get in touch
- Append [COLLECT_INFO] when the user seems interested but hesitant to navigate away — offer to take their details instead
- Only use a signal when it clearly fits — never force it`;

/* ── Quick chips ─────────────────────────────── */
const QUICK_CHIPS = [
  { label: 'I have a product idea', icon: '💡' },
  { label: 'How good is the team?', icon: '👥' },
  { label: 'I want to book a call', icon: '📞' },
  { label: 'What can you build?',   icon: '🛠️' },
];

/* ── Welcome ─────────────────────────────────── */
const WELCOME = {
  role: 'assistant',
  content: "Hey, good to meet you. I'm JOHN — what are you working on?",
};

/* ── Signal parser ───────────────────────────── */
function parseSignal(text) {
  if (text.includes('[SHOW_ESTIMATE]')) return 'estimate';
  if (text.includes('[SHOW_CONTACT]'))  return 'contact';
  if (text.includes('[COLLECT_INFO]'))  return 'collect';
  return null;
}
function stripSignals(text) {
  return text
    .replace('[SHOW_ESTIMATE]', '')
    .replace('[SHOW_CONTACT]', '')
    .replace('[COLLECT_INFO]', '')
    .trim();
}

/* ── Call Claude ─────────────────────────────── */
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

/* ── Typing dots ─────────────────────────────── */
function TypingDots() {
  return <div className="cb-typing"><span /><span /><span /></div>;
}

/* ── Bot avatar ──────────────────────────────── */
function BotAvatar({ size = 28 }) {
  return (
    <div className="cb-avatar cb-avatar--bot" style={{ width: size, height: size }}>
      <Sparkles size={size * 0.45} />
    </div>
  );
}

/* ── Message text renderer ───────────────────── */
function MsgContent({ text }) {
  return (
    <>
      {text.split('\n').map((line, i, arr) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
            {i < arr.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

/* ── Action buttons rendered below a bot message ── */
function ActionButtons({ signal, onNavigate, onCollect }) {
  if (signal === 'estimate') return (
    <div className="cb-action-btns">
      <button className="cb-action-btn cb-action-btn--primary" onClick={() => onNavigate('/estimate')}>
        <Calculator size={13} /> Open Estimator
      </button>
      <button className="cb-action-btn cb-action-btn--ghost" onClick={onCollect}>
        <Mail size={13} /> Leave my details instead
      </button>
    </div>
  );
  if (signal === 'contact') return (
    <div className="cb-action-btns">
      <a className="cb-action-btn cb-action-btn--primary" href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer">
        <Calendar size={13} /> Book a Free Call
      </a>
      <button className="cb-action-btn cb-action-btn--ghost" onClick={() => onNavigate('/contact')}>
        <ArrowRight size={13} /> Contact Page
      </button>
      <button className="cb-action-btn cb-action-btn--ghost" onClick={onCollect}>
        <Mail size={13} /> Drop my details here
      </button>
    </div>
  );
  if (signal === 'collect') return (
    <div className="cb-action-btns">
      <button className="cb-action-btn cb-action-btn--primary" onClick={onCollect}>
        <Mail size={13} /> Leave my details
      </button>
      <button className="cb-action-btn cb-action-btn--ghost" onClick={() => onNavigate('/contact')}>
        <ArrowRight size={13} /> Fill the contact form
      </button>
    </div>
  );
  return null;
}

/* ── Inline lead collection form ─────────────── */
function LeadForm({ conversationSummary, onDone }) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [note,    setNote]    = useState('');
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          description: `[Chat Lead]\n\n${note || '(No note left)'}\n\nConversation context:\n${conversationSummary}`,
          company: '',
          phone: '',
          budget: 'Via chat widget',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setTimeout(onDone, 3000);
    } catch (err) {
      console.error('[LeadForm] EmailJS error:', err);
      setSent(true); // still show success to user
      setTimeout(onDone, 3000);
    }
    setSending(false);
  };

  if (sent) return (
    <div className="cb-lead-sent">
      ✅ Got it! Our engineering team will reach out within 24 hours.
    </div>
  );

  return (
    <form className="cb-lead-form" onSubmit={handleSubmit}>
      <p className="cb-lead-form__label">Leave your details and we'll reach out:</p>
      <input
        className="cb-lead-input"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="cb-lead-input"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <textarea
        className="cb-lead-input cb-lead-textarea"
        placeholder="Anything else you'd like us to know? (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={2}
      />
      <button className="cb-action-btn cb-action-btn--primary cb-lead-submit" type="submit" disabled={sending}>
        {sending ? 'Sending…' : <><Send size={12} /> Send — we'll be in touch</>}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════
   MAIN CHATBOT COMPONENT
══════════════════════════════════════════════ */
export default function ChatBot() {
  const navigate = useNavigate();
  const [isOpen,      setIsOpen]      = useState(false);
  const [messages,    setMessages]    = useState([WELCOME]);
  const [input,       setInput]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [showNotif,   setShowNotif]   = useState(false);
  const [notifText,   setNotifText]   = useState("Need a quote? Chat with JOHN →");
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef    = useRef(null);

  /* ── Signals per message index ── */
  const [signals, setSignals] = useState({});

  /* ── Notification after 5s ── */
  useEffect(() => {
    if (sessionStorage.getItem('aijohn_chat_opened')) return;
    const t1 = setTimeout(() => setShowNotif(true), 5000);
    const msgs = ["Need a quote? Chat with JOHN →","Got a project idea? Let's talk →","Ask me anything →"];
    let idx = 0;
    const t2 = setInterval(() => { idx = (idx + 1) % msgs.length; setNotifText(msgs[idx]); }, 4000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  /* ── Scroll to bottom ── */
  useEffect(() => {
    if (isOpen && !isMinimized)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [messages, isOpen, loading, isMinimized, showLeadForm]);

  /* ── Auto-resize textarea ── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }, [input]);

  /* ── Focus on open ── */
  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => textareaRef.current?.focus(), 300);
  }, [isOpen, isMinimized]);

  const handleOpen = useCallback(() => {
    setIsOpen(true); setIsMinimized(false); setShowNotif(false);
    sessionStorage.setItem('aijohn_chat_opened', '1');
  }, []);

  /* ── Send message ── */
  const send = useCallback(async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setShowLeadForm(false);

    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    const reply = await callClaude(history);
    const raw   = reply || `Having trouble connecting right now. You can reach us at contact@aijohn.in or book a call at calendly.com/aijohn — we reply within 24 hours.`;

    const signal  = parseSignal(raw);
    const content = stripSignals(raw);
    const botMsg  = { role: 'assistant', content };
    const newMessages = [...history, botMsg];
    setMessages(newMessages);
    if (signal) setSignals(prev => ({ ...prev, [newMessages.length - 1]: signal }));
    setLoading(false);
  }, [input, messages, loading]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }, [send]);

  const handleChip  = useCallback((label) => send(label), [send]);
  const handleReset = useCallback(() => {
    setMessages([WELCOME]); setInput(''); setSignals({}); setShowLeadForm(false);
  }, []);

  const handleNavigate = useCallback((path) => {
    setIsOpen(false);
    navigate(path);
  }, [navigate]);

  const conversationSummary = messages
    .map(m => `${m.role === 'user' ? 'User' : 'JOHN'}: ${m.content}`)
    .join('\n');

  const showChips = messages.length === 1;

  return (
    <>
      {/* ── Floating trigger ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div className="cb-trigger-wrap"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 360, damping: 24 }}>
            <AnimatePresence>
              {showNotif && (
                <motion.div className="cb-notif-bubble"
                  initial={{ opacity: 0, x: 10, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }} transition={{ duration: 0.28 }}>
                  {notifText}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button className="cb-trigger" onClick={handleOpen}
              whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.94 }} aria-label="Open AI chat">
              <span className="cb-trigger__ring" />
              <span className="cb-trigger__ring cb-trigger__ring--2" />
              <span className="cb-trigger__icon"><MessageCircle size={22} strokeWidth={2.2} /></span>
              {showNotif && <span className="cb-trigger__dot" />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className={`cb-window${isMinimized ? ' cb-window--minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }} transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}>

            {/* Header */}
            <div className="cb-header" onClick={() => isMinimized && setIsMinimized(false)}>
              <div className="cb-header__glow" />
              <div className="cb-header__avatar">
                <Sparkles size={18} />
                <span className="cb-header__avatar-pulse" />
              </div>
              <div className="cb-header__info">
                <div className="cb-header__name">JOHN <span className="cb-header__badge">AI Advisor</span></div>
                <div className="cb-header__status">
                  <span className="cb-online-dot" />
                  Online · Claude Sonnet powered
                </div>
              </div>
              <div className="cb-header__actions">
                <motion.button className="cb-header-btn" onClick={handleReset}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="New conversation">
                  <RefreshCw size={13} />
                </motion.button>
                <motion.button className="cb-header-btn"
                  onClick={() => setIsMinimized(v => !v)}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ChevronDown size={15} style={{ transform: isMinimized ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
                </motion.button>
                <motion.button className="cb-header-btn cb-header-btn--close"
                  onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <X size={15} />
                </motion.button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div className="cb-body"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>

                  <div className="cb-messages">
                    {messages.map((msg, i) => (
                      <React.Fragment key={i}>
                        {/* Message bubble */}
                        <motion.div className={`cb-msg ${msg.role === 'assistant' ? 'cb-msg--bot' : 'cb-msg--user'}`}
                          initial={{ opacity: 0, y: 14, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}>
                          {msg.role === 'assistant' && <BotAvatar />}
                          <div className="cb-bubble"><MsgContent text={msg.content} /></div>
                          {msg.role === 'user' && (
                            <div className="cb-avatar cb-avatar--user"><User size={13} /></div>
                          )}
                        </motion.div>

                        {/* Action buttons below last bot message that has a signal */}
                        {msg.role === 'assistant' && signals[i] && i === messages.length - 1 && !showLeadForm && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <ActionButtons
                              signal={signals[i]}
                              onNavigate={handleNavigate}
                              onCollect={() => setShowLeadForm(true)}
                            />
                          </motion.div>
                        )}
                      </React.Fragment>
                    ))}

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {loading && (
                        <motion.div className="cb-msg cb-msg--bot"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                          <BotAvatar />
                          <div className="cb-bubble"><TypingDots /></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Inline lead form */}
                    <AnimatePresence>
                      {showLeadForm && (
                        <motion.div className="cb-msg cb-msg--bot"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <BotAvatar />
                          <div className="cb-bubble cb-bubble--form">
                            <LeadForm
                              conversationSummary={conversationSummary}
                              onDone={() => setShowLeadForm(false)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick chips */}
                  <AnimatePresence>
                    {showChips && (
                      <motion.div className="cb-chips"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }}>
                        {QUICK_CHIPS.map((chip, i) => (
                          <motion.button key={chip.label} className="cb-chip"
                            onClick={() => handleChip(chip.label)} disabled={loading}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                            <span className="cb-chip__icon">{chip.icon}</span>
                            {chip.label}
                            <Zap size={10} className="cb-chip__arrow" />
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input */}
                  <div className="cb-input-wrap">
                    <div className="cb-input-row">
                      <textarea ref={textareaRef} className="cb-input" value={input}
                        onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                        placeholder="Type your message…" rows={1} disabled={loading} />
                      <motion.button className="cb-send" onClick={() => send()}
                        disabled={loading || !input.trim()}
                        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
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
