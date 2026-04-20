import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Sparkles } from 'lucide-react';
import { AIJOHN_SYSTEM_PROMPT, COMPANY } from '../data/aijohn-knowledge';
import './ChatBot.css';

const WELCOME_MESSAGES = [
  {
    role: 'assistant',
    content: `👋 Welcome to AIJOHN! I'm your AI product advisor.\n\nWhat are you trying to build? I can help with:\n• MVP timelines & realistic scoping\n• Transparent pricing estimates\n• Best tech stack for your product\n• How our team would approach your project\n\nJust describe your idea — even a rough concept works!`,
  },
];

// Auto-open disabled — chatbot stays collapsed until user clicks

function TypingDots() {
  return (
    <div className="chatbot-typing">
      <span /><span /><span />
    </div>
  );
}

function MessageBubble({ msg, isLast }) {
  const isBot = msg.role === 'assistant';
  return (
    <motion.div
      className={`chatbot-msg chatbot-msg--${isBot ? 'bot' : 'user'}`}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      {isBot && (
        <div className="chatbot-msg__avatar">
          <Bot size={13} />
        </div>
      )}
      <div className="chatbot-msg__bubble">
        {msg.content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < msg.content.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>
      {!isBot && (
        <div className="chatbot-msg__avatar chatbot-msg__avatar--user">
          <User size={13} />
        </div>
      )}
    </motion.div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState(WELCOME_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show a pulsing notification dot after 4s to draw attention (no auto-open)
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem('aijohn_chat_opened');
    if (!alreadyOpened) {
      const notifTimer = setTimeout(() => setShowNotif(true), 4000);
      return () => clearTimeout(notifTimer);
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  }, [messages, isOpen, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowNotif(false);
    sessionStorage.setItem('aijohn_chat_opened', '1');
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        // Fallback without API key
        await new Promise(r => setTimeout(r, 800));
        const fallback = getFallbackReply(text);
        setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: AIJOHN_SYSTEM_PROMPT },
            ...history.map(m => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 400,
          temperature: 0.72,
        }),
      });

      if (!response.ok) throw new Error(`OpenAI ${response.status}`);
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || getFallbackReply(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I'm having trouble connecting right now. Please reach out directly:\n\n📧 ${COMPANY.email}\n📅 Book a free call at calendly.com/aijohn\n\nWe respond within 24 hours!`,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chatbot-trigger"
            onClick={handleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            aria-label="Open AI chat"
          >
            <MessageCircle size={24} />
            <span className="chatbot-trigger__label">Chat with AI Advisor</span>
            {showNotif && (
              <motion.span
                className="chatbot-trigger__dot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.88, y: 24, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header__avatar">
                <Sparkles size={16} />
              </div>
              <div className="chatbot-header__info">
                <div className="chatbot-header__name">AIJOHN AI Advisor</div>
                <div className="chatbot-header__status">
                  <span className="chatbot-online-dot" />
                  AIJOHN AI Advisor
                </div>
              </div>
              <div className="chatbot-header__actions">
                <button
                  className="chatbot-header__btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  className="chatbot-header__btn chatbot-header__btn--close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} />
              ))}
              {loading && (
                <motion.div
                  className="chatbot-msg chatbot-msg--bot"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chatbot-msg__avatar"><Bot size={13} /></div>
                  <div className="chatbot-msg__bubble"><TypingDots /></div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts (shown when only welcome message) */}
            {messages.length === 1 && (
              <div className="chatbot-quick-prompts">
                {[
                  'How much does an MVP cost?',
                  'How fast can you ship?',
                  'Do you build AI features?',
                ].map(prompt => (
                  <button
                    key={prompt}
                    className="chatbot-quick-btn"
                    onClick={() => { setInput(prompt); setTimeout(sendMessage, 50); }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input-row">
              <textarea
                ref={inputRef}
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Describe what you're building…"
                rows={1}
                disabled={loading}
              />
              <button
                className="chatbot-send"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="chatbot-footer">
              AIJOHN Technosoft · AI Product Advisor
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Smart fallback replies when no API key configured ────────────
function getFallbackReply(text) {
  const lower = text.toLowerCase();

  if (/cost|price|pricing|how much|budget|quote|estimate/i.test(lower)) {
    return `Great question! Here's a quick ballpark:\n\n• **Starter MVP** — $8K–$15K (6–8 weeks)\n• **Growth SaaS** — $18K–$35K (8–14 weeks)\n• **Enterprise Platform** — $40K–$90K+ (14–24 weeks)\n\nFor an accurate quote, I need to know more about your product. What are you building?\n\n📅 Book a free scoping call: calendly.com/aijohn`;
  }

  if (/timeline|how long|weeks|fast|quick|speed/i.test(lower)) {
    return `We're known for speed:\n\n🚀 MVP: **6–8 weeks** from kickoff to live product\n🏗️ Full SaaS: **8–14 weeks**\n🏢 Enterprise: **14–24 weeks**\n\nWeekly Friday demos so you're always in the loop.\n\nWhat type of product are you building?`;
  }

  if (/ai|gpt|llm|machine learning|chatbot|openai/i.test(lower)) {
    return `AI integration is our core specialty! 🤖\n\nWe build:\n• GPT-4 / LLM-powered features\n• RAG pipelines & vector search\n• AI chatbots & assistants\n• Recommendation engines\n• Predictive analytics\n\nAI add-on pricing: $4K–$10K depending on complexity.\n\nWhat AI features are you thinking about?`;
  }

  if (/team|engineer|who|people|developers/i.test(lower)) {
    return `Our team:\n\n👥 8 core engineers — same team for 3+ years\n🎓 All IIT / NIT graduates (top 1% of Indian engineers)\n⚡ Avg 5+ years of production experience\n\nNo freelancers, no turnover. You work with the same people from day one to launch.\n\nWant to meet the team? Visit aijohn.in/team`;
  }

  if (/hello|hi|hey|good morning|good evening/i.test(lower)) {
    return `Hey there! 👋 Great to meet you.\n\nI'm the AIJOHN AI Advisor — tell me about your product idea and I'll give you an honest assessment of timeline and cost.\n\nWhat are you trying to build?`;
  }

  return `Thanks for sharing that! To give you an accurate timeline and estimate, could you tell me:\n\n1. What problem does your product solve?\n2. Who are your target users?\n3. Any specific features you need (payments, AI, mobile app)?\n\nOr book a free 30-min call with our team: 📅 calendly.com/aijohn`;
}
