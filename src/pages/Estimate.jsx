import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Brain, Cloud, ShoppingCart, Building2,
  CheckCircle2, ArrowRight, ArrowLeft, Calculator, Zap, Clock,
  DollarSign, Layers, Code2, Server, Shield, BarChart3,
  Send, Rocket, Users, Star, Sparkles, MessageSquare, TrendingDown,
  MapPin, Award, RefreshCw
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import './Estimate.css';

/* ═══════════════════════════════════════════════════════════════════
   CONFIGURATION — replace the placeholder with your real API key
   or set the ANTHROPIC_API_KEY env variable when running the proxy.
   See proxy-server.js in the project root for setup instructions.
═══════════════════════════════════════════════════════════════════ */
const AI_PROXY_URL = '/api/chat';   // local proxy endpoint
const CLAUDE_MODEL  = 'claude-sonnet-4-5';

/* ── Project Types ── */
const PROJECT_TYPES = [
  { id: 'saas',       icon: Globe,        color: '#2176AE', label: 'SaaS Web App',        desc: 'Multi-tenant platform, subscriptions, dashboards' },
  { id: 'mobile',     icon: Smartphone,   color: '#7C3AED', label: 'Mobile App',          desc: 'iOS & Android, cross-platform or native' },
  { id: 'ai',         icon: Brain,        color: '#0891B2', label: 'AI / ML Product',     desc: 'LLM integration, RAG pipeline, AI agents' },
  { id: 'ecommerce',  icon: ShoppingCart, color: '#059669', label: 'E-Commerce Platform', desc: 'Marketplace, payments, inventory, CMS' },
  { id: 'enterprise', icon: Building2,    color: '#D97706', label: 'Enterprise System',   desc: 'ERP, CRM, internal tools, integrations' },
  { id: 'mvp',        icon: Rocket,       color: '#EC4899', label: 'MVP / Prototype',     desc: 'Validate fast, minimal but production-ready' },
];

/* ── Features ── */
const FEATURE_GROUPS = [
  { label: 'Core', items: [
    { id: 'auth',          label: 'Auth & User Roles',         weeks: 1,   cost: 2000 },
    { id: 'dashboard',     label: 'Analytics Dashboard',       weeks: 2,   cost: 4000 },
    { id: 'payments',      label: 'Payments / Subscriptions',  weeks: 1.5, cost: 3000 },
    { id: 'multitenancy',  label: 'Multi-Tenancy',             weeks: 2,   cost: 4500 },
    { id: 'notifications', label: 'Email / Push Notifications',weeks: 1,   cost: 1800 },
    { id: 'search',        label: 'Advanced Search & Filters', weeks: 1,   cost: 2000 },
  ]},
  { label: 'AI', items: [
    { id: 'chatbot',       label: 'AI Chatbot / Agent',        weeks: 2,   cost: 5000 },
    { id: 'rag',           label: 'RAG Knowledge Pipeline',    weeks: 2.5, cost: 6000 },
    { id: 'recommendations', label: 'AI Recommendations',     weeks: 2,   cost: 4500 },
    { id: 'ocr',           label: 'OCR / Document Processing', weeks: 1.5, cost: 3500 },
    { id: 'prediction',    label: 'Predictive Analytics',      weeks: 3,   cost: 7000 },
  ]},
  { label: 'Infrastructure', items: [
    { id: 'cicd',          label: 'CI/CD Pipeline',            weeks: 0.5, cost: 1500 },
    { id: 'microservices', label: 'Microservices Architecture',weeks: 2,   cost: 5000 },
    { id: 'realtime',      label: 'Real-Time (WebSockets)',    weeks: 1.5, cost: 3500 },
    { id: 'file_storage',  label: 'File Storage / CDN (S3)',   weeks: 0.5, cost: 1200 },
  ]},
];

/* ── Budget Ranges ── */
const BUDGETS = [
  { id: 'starter',    label: '$10K – $25K',  desc: 'MVP · Core features · 6–8 weeks',      icon: '🚀' },
  { id: 'growth',     label: '$25K – $60K',  desc: 'Full product · AI ready · 8–14 weeks',  icon: '⚡' },
  { id: 'scale',      label: '$60K – $120K', desc: 'Enterprise · Complex · 14–24 weeks',    icon: '🏢' },
  { id: 'enterprise', label: '$120K+',       desc: 'Full-scale platform · Custom scope',    icon: '💎' },
];

/* ── Estimate Calculator ── */
function calcEstimate(typeId, features, budgetId) {
  const BASE_WEEKS = { saas: 4, mobile: 5, ai: 5, ecommerce: 4, enterprise: 6, mvp: 3 };
  const BASE_COST  = { saas: 8000, mobile: 10000, ai: 12000, ecommerce: 9000, enterprise: 14000, mvp: 6000 };
  let weeks = BASE_WEEKS[typeId] || 4;
  let cost  = BASE_COST[typeId]  || 8000;
  const allFeatures = FEATURE_GROUPS.flatMap(g => g.items);
  features.forEach(fId => {
    const f = allFeatures.find(x => x.id === fId);
    if (f) { weeks += f.weeks; cost += f.cost; }
  });
  const mods = { starter: 0.85, growth: 1.0, scale: 1.15, enterprise: 1.3 };
  cost = Math.round(cost * (mods[budgetId] || 1));
  return {
    weeks: Math.ceil(weeks),
    aijohn: { min: Math.round(cost * 0.9 / 1000) * 1000, max: Math.round(cost * 1.1 / 1000) * 1000 },
    // North America: 3.8–4.5× more expensive
    na:     { min: Math.round(cost * 3.8 * 0.9 / 1000) * 1000, max: Math.round(cost * 4.5 * 1.1 / 1000) * 1000 },
    phases: [
      { name: 'Discovery & Architecture', duration: '1 week',                          pct: 10 },
      { name: 'Core Backend & APIs',      duration: `${Math.ceil(weeks*0.30)} weeks`,  pct: 30 },
      { name: 'Frontend & UI/UX',         duration: `${Math.ceil(weeks*0.25)} weeks`,  pct: 25 },
      { name: 'AI / Integrations',        duration: `${Math.ceil(weeks*0.20)} weeks`,  pct: 20 },
      { name: 'Testing & QA',             duration: `${Math.ceil(weeks*0.10)} weeks`,  pct: 10 },
      { name: 'Deployment & Handover',    duration: '3–5 days',                        pct:  5 },
    ],
  };
}

/* ── Simulated AI responses (used when API key not yet configured) ── */
function getSimulatedResponse(exchange, context) {
  const { projectType, idea } = context;
  const responses = [
    `Thanks for sharing that! Based on your idea — ${idea ? `"${idea.slice(0,80)}${idea.length>80?'…':''}"` : 'your project'} — I can see you're building something interesting. Let me ask a few quick questions to sharpen the estimate.\n\nFirst: **how many distinct user roles** will your product have? For example: Admin, Regular User, Guest — or is it single-role?`,
    `Got it, that helps. Next question: **what's your target timeline for going live**? Are you aiming for a quick MVP in 6–8 weeks, or is this a phased build over several months?`,
    `Perfect. One more: **will this product need to integrate with any third-party services**? Things like payment processors (Stripe), CRMs (HubSpot), or external APIs? This significantly affects the scope.`,
    `Great, that's all I need! I have a clear picture of the scope now. Let me calculate your estimate — comparing AIJOHN's India-based engineering rates against typical North America agency pricing.`,
  ];
  return responses[Math.min(exchange, responses.length - 1)];
}

/* ── Claude API call (via proxy) ── */
async function callClaude(messages, systemPrompt) {
  try {
    const res = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, systemPrompt, model: CLAUDE_MODEL }),
    });
    if (!res.ok) throw new Error('proxy error');
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch {
    return null; // fall back to simulated
  }
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.06, duration: 0.45, ease: [0.4,0,0.2,1] } }),
};

/* ══════════════════════════════════════════════════════════════════ */
export default function Estimate() {
  useEffect(() => { document.title = 'Get an Estimate | AIJOHN Technosoft'; }, []);

  const [step,     setStep]     = useState(0); // 0=idea, 1-3=wizard, 4=chat, 5=result
  const [idea,     setIdea]     = useState('');
  const [type,     setType]     = useState(null);
  const [features, setFeatures] = useState([]);
  const [budget,   setBudget]   = useState(null);
  const [form,     setForm]     = useState({ name: '', email: '' });

  // Chat state
  const [messages,    setMessages]    = useState([]);
  const [userInput,   setUserInput]   = useState('');
  const [aiTyping,    setAiTyping]    = useState(false);
  const [chatExchanges, setChatExchanges] = useState(0);
  const [chatDone,    setChatDone]    = useState(false);

  // Result
  const [result,   setResult]   = useState(null);

  const chatEndRef = useRef(null);
  const ideaRef    = useRef(null);

  const scrollChat = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollChat, [messages, aiTyping]);

  const toggleFeature = (id) =>
    setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  /* ── Start chat after wizard ── */
  const startChat = useCallback(async () => {
    setStep(4);
    const systemPrompt = `You are a friendly, senior software requirements analyst at AIJOHN Technosoft.
The user wants to build: "${idea}". Project type: ${type}. Features selected: ${features.join(', ') || 'none yet'}. Budget range: ${budget}.
Your job: ask 3-4 short, smart questions one at a time to clarify scope, user roles, integrations, timeline, and scale.
Keep each message to 2-3 sentences max. Be warm and conversational. After the 4th exchange, say you have enough info and will now generate the estimate.
Do NOT ask about things already known (type, features, budget). Focus on: user roles, target timeline, third-party integrations, expected user volume.`;

    const firstMsg = {
      role: 'user',
      content: `Hi! I want to build: ${idea || `a ${type} product`}`,
    };

    setAiTyping(true);
    const aiText = await callClaude([firstMsg], systemPrompt)
      || getSimulatedResponse(0, { projectType: type, idea });

    setMessages([
      { role: 'assistant', text: aiText, id: Date.now() },
    ]);
    setAiTyping(false);
    setChatExchanges(1);
  }, [idea, type, features, budget]);

  /* ── Send user message ── */
  const sendMessage = useCallback(async () => {
    const text = userInput.trim();
    if (!text || aiTyping) return;
    setUserInput('');

    const newMsg = { role: 'user', text, id: Date.now() };
    setMessages(prev => [...prev, newMsg]);

    const exchangeNum = chatExchanges + 1;
    const isLastExchange = exchangeNum >= 4;

    if (isLastExchange) {
      setAiTyping(true);
      const finalText = `Perfect — I have everything I need! You've given me a clear picture of the scope. Let me now calculate your personalised estimate comparing **AIJOHN's rates** with typical **North America agency pricing**.`;
      await new Promise(r => setTimeout(r, 900));
      setMessages(prev => [...prev, { role: 'assistant', text: finalText, id: Date.now() }]);
      setAiTyping(false);
      setChatDone(true);
      setChatExchanges(exchangeNum);

      // Generate result
      const est = calcEstimate(type, features, budget);
      setResult(est);
      return;
    }

    setAiTyping(true);
    const historyForApi = messages.map(m => ({ role: m.role, content: m.text }));
    historyForApi.push({ role: 'user', content: text });

    const systemPrompt = `You are a friendly requirements analyst at AIJOHN Technosoft.
User is building: "${idea}". Type: ${type}. Features: ${features.join(', ')}. Budget: ${budget}.
This is exchange ${exchangeNum} of 4. Ask one focused question about: user roles, timeline, integrations, or scale.
Keep it brief (2-3 sentences). After exchange 4 you will wrap up.`;

    const aiText = await callClaude(historyForApi, systemPrompt)
      || getSimulatedResponse(exchangeNum - 1, { projectType: type, idea });

    setMessages(prev => [...prev, { role: 'assistant', text: aiText, id: Date.now() }]);
    setAiTyping(false);
    setChatExchanges(exchangeNum);
  }, [userInput, aiTyping, chatExchanges, messages, idea, type, features, budget]);

  const showResult = () => setStep(5);
  const restart = () => {
    setStep(0); setIdea(''); setType(null); setFeatures([]); setBudget(null);
    setForm({ name: '', email: '' }); setMessages([]); setUserInput('');
    setAiTyping(false); setChatExchanges(0); setChatDone(false); setResult(null);
  };

  const progress = step <= 3 ? (step / 3) * 100 : 100;

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="est-hero">
        <div className="est-hero__bg" />
        <div className="est-hero__overlay" />
        <div className="container est-hero__inner">
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="section-tag" style={{ color:'#7CC2E8', background:'rgba(74,159,212,0.14)', borderColor:'rgba(74,159,212,0.28)' }}>
              <Calculator size={12} /> Free AI-Powered Estimator
            </span>
            <h1 className="est-hero__title">
              Describe Your Idea.<br/>
              <span className="est-hero__accent">Get an Instant Estimate.</span>
            </h1>
            <p className="est-hero__sub">
              Tell us what you're building, answer a few quick questions, and our AI will
              generate a detailed estimate — comparing AIJOHN rates with North America pricing.
            </p>
            <div className="est-hero__badges">
              {[
                { icon: Zap,           label: 'AI-Powered Chat'      },
                { icon: Shield,        label: 'No Obligation'         },
                { icon: TrendingDown,  label: 'Save 60–70% vs US/EU' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="est-hero__badge"><Icon size={13} /> {label}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Wizard / Chat / Result ── */}
      <section className="est-wizard-section">
        <div className="container">
          <AnimatePresence mode="wait">

            {/* ════ STEP 0: Idea Input ════ */}
            {step === 0 && (
              <motion.div key="s0" className="est-wizard"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}>

                <div className="est-idea-wrap">
                  <div className="est-idea-header">
                    <h2 className="est-step__title">What's your idea?</h2>
                    <p className="est-step__sub">
                      Describe what you want to build — a sentence or a paragraph, whatever feels natural.
                      Our AI will use this to ask smarter questions.
                    </p>
                  </div>

                  <div className="est-idea-box">
                    <div className="est-idea-icon"><MessageSquare size={22} /></div>
                    <textarea
                      ref={ideaRef}
                      className="est-idea-textarea"
                      rows={5}
                      placeholder="e.g. I want to build a SaaS platform where businesses can manage their customer support tickets using AI automation. It should have a dashboard, team management, and integrate with Slack..."
                      value={idea}
                      onChange={e => setIdea(e.target.value)}
                    />
                    <div className="est-idea-hint">
                      {idea.length > 0
                        ? `${idea.length} chars — looking good!`
                        : 'Write at least a sentence to get the best estimate'}
                    </div>
                  </div>

                  <div className="est-idea-or">
                    <span>or choose a quick start</span>
                  </div>

                  <div className="est-quickstart-grid">
                    {[
                      { label: 'SaaS Dashboard App',    text: 'I want to build a multi-tenant SaaS dashboard with user roles, analytics, and subscription billing.' },
                      { label: 'Mobile App (iOS/Android)', text: 'I want to build a cross-platform mobile app for both iOS and Android with a backend API.' },
                      { label: 'AI Chatbot Product',    text: 'I want to build an AI-powered chatbot product that uses LLMs to answer questions from a knowledge base.' },
                      { label: 'E-Commerce Platform',   text: 'I want to build an e-commerce marketplace with vendor management, payments, and an admin dashboard.' },
                    ].map(q => (
                      <button key={q.label} className="est-quickstart-chip"
                        onClick={() => { setIdea(q.text); }}>
                        {q.label}
                      </button>
                    ))}
                  </div>

                  <div className="est-idea-actions">
                    <button
                      className="est-btn-next"
                      onClick={() => setStep(1)}
                    >
                      Next: Project Type <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ STEPS 1–3: Wizard ════ */}
            {step >= 1 && step <= 3 && (
              <motion.div key="wizard" className="est-wizard"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}>

                {/* Progress bar */}
                <div className="est-progress">
                  <div className="est-progress__bar">
                    <motion.div className="est-progress__fill" animate={{ width: `${progress}%` }} transition={{ duration:0.4 }} />
                  </div>
                  <div className="est-progress__steps">
                    {[1,2,3].map(s => (
                      <div key={s} className={`est-progress__step ${s < step ? 'done' : s === step ? 'active' : ''}`}>
                        {s < step ? <CheckCircle2 size={13}/> : s}
                      </div>
                    ))}
                  </div>
                  <div className="est-progress__labels">
                    {['Project Type','Features','Budget'].map((l,i) => (
                      <span key={l} className={`est-progress__label ${i+1 === step ? 'active' : ''}`}>{l}</span>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div key="s1" className="est-step"
                      initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                      exit={{ opacity:0, x:-30 }} transition={{ duration:0.3 }}>
                      <h2 className="est-step__title">What type of product?</h2>
                      <p className="est-step__sub">Choose the best fit — you can adjust later in the chat.</p>
                      <div className="est-type-grid">
                        {PROJECT_TYPES.map((pt, i) => {
                          const Icon = pt.icon;
                          return (
                            <motion.button key={pt.id}
                              className={`est-type-card ${type === pt.id ? 'selected' : ''}`}
                              style={{ '--pt-color': pt.color }}
                              onClick={() => { setType(pt.id); setTimeout(() => setStep(2), 260); }}
                              custom={i} initial="hidden" animate="visible" variants={fadeUp}
                              whileHover={{ y:-4 }}>
                              <div className="est-type-card__icon"><Icon size={24}/></div>
                              <div className="est-type-card__label">{pt.label}</div>
                              <div className="est-type-card__desc">{pt.desc}</div>
                              {type === pt.id && <div className="est-type-card__check"><CheckCircle2 size={15}/></div>}
                            </motion.button>
                          );
                        })}
                      </div>
                      <div className="est-step__actions">
                        <button className="est-btn-back" onClick={() => setStep(0)}><ArrowLeft size={14}/> Back</button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div key="s2" className="est-step"
                      initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                      exit={{ opacity:0, x:-30 }} transition={{ duration:0.3 }}>
                      <h2 className="est-step__title">Which features do you need?</h2>
                      <p className="est-step__sub">Select all that apply — don't worry if unsure, the AI will help clarify.</p>
                      <div className="est-features-wrap">
                        {FEATURE_GROUPS.map(group => (
                          <div key={group.label} className="est-feature-group">
                            <div className="est-feature-group__label">{group.label}</div>
                            <div className="est-feature-chips">
                              {group.items.map(item => (
                                <button key={item.id}
                                  className={`est-feature-chip ${features.includes(item.id) ? 'selected' : ''}`}
                                  onClick={() => toggleFeature(item.id)}>
                                  {features.includes(item.id) && <CheckCircle2 size={11}/>}
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="est-step__actions">
                        <button className="est-btn-back" onClick={() => setStep(1)}><ArrowLeft size={14}/> Back</button>
                        <button className="est-btn-next" onClick={() => setStep(3)}>Next: Budget <ArrowRight size={14}/></button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div key="s3" className="est-step"
                      initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                      exit={{ opacity:0, x:-30 }} transition={{ duration:0.3 }}>
                      <h2 className="est-step__title">What's your budget range?</h2>
                      <p className="est-step__sub">This calibrates scope. AIJOHN typically costs 60–70% less than equivalent US/EU agencies.</p>
                      <div className="est-budget-grid">
                        {BUDGETS.map((b, i) => (
                          <motion.button key={b.id}
                            className={`est-budget-card ${budget === b.id ? 'selected' : ''}`}
                            onClick={() => { setBudget(b.id); }}
                            custom={i} initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="est-budget-card__emoji">{b.icon}</div>
                            <div className="est-budget-card__label">{b.label}</div>
                            <div className="est-budget-card__desc">{b.desc}</div>
                            {budget === b.id && <CheckCircle2 size={14} className="est-budget-card__check"/>}
                          </motion.button>
                        ))}
                      </div>
                      <div className="est-step__actions">
                        <button className="est-btn-back" onClick={() => setStep(2)}><ArrowLeft size={14}/> Back</button>
                        <button className="est-btn-next" disabled={!budget}
                          onClick={startChat}>
                          <MessageSquare size={14}/> Chat with AI Advisor <ArrowRight size={14}/>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ════ STEP 4: AI Chat ════ */}
            {step === 4 && (
              <motion.div key="chat" className="est-chat-wrap"
                initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-20 }} transition={{ duration:0.45 }}>

                <div className="est-chat-header">
                  <div className="est-chat-header__left">
                    <div className="est-chat-avatar">
                      <Brain size={18}/>
                    </div>
                    <div>
                      <div className="est-chat-name">AIJOHN AI Advisor</div>
                      <div className="est-chat-status">
                        <span className="est-chat-dot" />
                        Requirement Gathering · {chatExchanges} of 4 questions
                      </div>
                    </div>
                  </div>
                  {idea && (
                    <div className="est-chat-idea-pill">
                      <MessageSquare size={11}/> {idea.slice(0,48)}{idea.length>48?'…':''}
                    </div>
                  )}
                </div>

                <div className="est-chat-messages">
                  {messages.map(msg => (
                    <div key={msg.id} className={`est-chat-msg est-chat-msg--${msg.role}`}>
                      {msg.role === 'assistant' && (
                        <div className="est-chat-msg__avatar"><Brain size={14}/></div>
                      )}
                      <div className="est-chat-msg__bubble">
                        {msg.text.split('\n').map((line, i) => {
                          // Bold markdown **text**
                          const parts = line.split(/\*\*(.*?)\*\*/g);
                          return (
                            <span key={i}>
                              {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
                              {i < msg.text.split('\n').length - 1 && <br/>}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {aiTyping && (
                    <div className="est-chat-msg est-chat-msg--assistant">
                      <div className="est-chat-msg__avatar"><Brain size={14}/></div>
                      <div className="est-chat-msg__bubble est-chat-typing">
                        <span/><span/><span/>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {!chatDone ? (
                  <div className="est-chat-input-row">
                    <textarea
                      className="est-chat-input"
                      rows={2}
                      placeholder="Type your answer here…"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      disabled={aiTyping}
                    />
                    <button className="est-chat-send" onClick={sendMessage} disabled={aiTyping || !userInput.trim()}>
                      <Send size={16}/>
                    </button>
                  </div>
                ) : (
                  <motion.div className="est-chat-done-row"
                    initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}>
                    <p className="est-chat-done-text">Requirements gathered! Your estimate is ready.</p>
                    <button className="est-btn-next" onClick={showResult}>
                      <Sparkles size={15}/> View My Estimate <ArrowRight size={15}/>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ════ STEP 5: Dual Estimate Results ════ */}
            {step === 5 && result && (
              <motion.div key="result" className="est-result"
                initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}>

                {/* Header */}
                <div className="est-result__header">
                  <motion.div className="est-result__check"
                    initial={{ scale:0 }} animate={{ scale:1 }}
                    transition={{ type:'spring', stiffness:300, damping:20, delay:0.2 }}>
                    <CheckCircle2 size={28}/>
                  </motion.div>
                  <h2 className="est-result__title">Your Estimate is Ready!</h2>
                  <p className="est-result__sub">We've compared AIJOHN's pricing against typical North America agency rates for the same project.</p>
                </div>

                {/* Savings Banner */}
                <motion.div className="est-savings-banner"
                  initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.3, duration:0.4 }}>
                  <TrendingDown size={20}/>
                  <span>
                    Save up to <strong>${(result.na.max - result.aijohn.max).toLocaleString()}</strong> by building with AIJOHN
                  </span>
                  <span className="est-savings-pct">
                    ~{Math.round((1 - result.aijohn.max / result.na.max) * 100)}% savings
                  </span>
                </motion.div>

                {/* Side-by-Side Estimate Cards */}
                <div className="est-dual-grid">

                  {/* AIJOHN Card */}
                  <motion.div className="est-est-card est-est-card--aijohn"
                    initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp} custom={0}>
                    <div className="est-est-card__header">
                      <div className="est-est-card__logo">
                        <span className="est-est-card__logo-ai">AI</span><span className="est-est-card__logo-john">JOHN</span>
                      </div>
                      <span className="est-est-card__tag est-est-card__tag--india">
                        <MapPin size={11}/> India · IIT/NIT Engineers
                      </span>
                    </div>
                    <div className="est-est-card__price">
                      <span className="est-est-card__currency">$</span>
                      {result.aijohn.min.toLocaleString()} – ${result.aijohn.max.toLocaleString()}
                    </div>
                    <div className="est-est-card__timeline">
                      <Clock size={13}/> {result.weeks} weeks to production
                    </div>
                    <div className="est-est-card__divider"/>
                    <ul className="est-est-card__perks">
                      {[
                        'Senior IIT/NIT engineers only',
                        'Daily standups & Friday demos',
                        'Fixed-price guarantee — no surprises',
                        '30-day post-launch support included',
                        'Direct Slack communication',
                        '6–8 week MVP capability',
                      ].map(p => (
                        <li key={p}><CheckCircle2 size={13}/> {p}</li>
                      ))}
                    </ul>
                    <Link to="/contact" className="est-est-card__cta est-est-card__cta--primary">
                      Start with AIJOHN <ArrowRight size={14}/>
                    </Link>
                  </motion.div>

                  {/* North America Card */}
                  <motion.div className="est-est-card est-est-card--na"
                    initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp} custom={1}>
                    <div className="est-est-card__header">
                      <div className="est-est-card__na-label">North America</div>
                      <span className="est-est-card__tag est-est-card__tag--na">
                        <MapPin size={11}/> US / Canada Agencies
                      </span>
                    </div>
                    <div className="est-est-card__price est-est-card__price--na">
                      <span className="est-est-card__currency">$</span>
                      {result.na.min.toLocaleString()} – ${result.na.max.toLocaleString()}
                    </div>
                    <div className="est-est-card__timeline est-est-card__timeline--na">
                      <Clock size={13}/> {result.weeks + 2}–{result.weeks + 6} weeks typically
                    </div>
                    <div className="est-est-card__divider"/>
                    <ul className="est-est-card__perks est-est-card__perks--na">
                      {[
                        'Mixed seniority teams (juniors included)',
                        'Weekly check-ins standard',
                        'Time & material billing common',
                        'No post-launch support included',
                        'Account manager as middleman',
                        'Slower ramp-up typical',
                      ].map(p => (
                        <li key={p}><span className="est-na-cross">✕</span> {p}</li>
                      ))}
                    </ul>
                    <div className="est-est-card__cta est-est-card__cta--na">
                      For comparison only
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Phases */}
                <motion.div className="est-phases-card"
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{once:true}} transition={{ duration:0.45, delay:0.1 }}>
                  <div className="est-phases-card__header">
                    <BarChart3 size={17}/> AIJOHN Project Timeline — {result.weeks} Weeks
                  </div>
                  <div className="est-phases-list">
                    {result.phases.map((phase, i) => (
                      <motion.div key={phase.name} className="est-phase"
                        initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                        viewport={{once:true}} transition={{ delay: i*0.07 }}>
                        <div className="est-phase__left">
                          <div className="est-phase__dot">{i+1}</div>
                          <div>
                            <div className="est-phase__name">{phase.name}</div>
                            <div className="est-phase__dur">{phase.duration}</div>
                          </div>
                        </div>
                        <div className="est-phase__bar-wrap">
                          <motion.div className="est-phase__bar"
                            initial={{ width:0 }} whileInView={{ width:`${phase.pct}%` }}
                            viewport={{once:true}} transition={{ duration:0.7, delay: i*0.08 }}/>
                          <span className="est-phase__pct">{phase.pct}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div className="est-result__cta"
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{once:true}} transition={{ duration:0.45 }}>
                  <div className="est-result__cta-glow"/>
                  <div className="est-result__cta-content">
                    <h3 className="est-result__cta-title">Ready to make it real?</h3>
                    <p className="est-result__cta-sub">
                      This estimate is based on your inputs. Book a free 30-min call and we'll
                      deliver a precise, fixed-price proposal within 48 hours.
                    </p>
                    <div className="est-result__cta-btns">
                      <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer"
                        className="btn-hero-primary">
                        Book Free Scoping Call <ArrowRight size={15}/>
                      </a>
                      <Link to="/contact" className="est-btn-contact">
                        Send Us Your Idea <Send size={13}/>
                      </Link>
                    </div>
                    <div className="est-result__cta-note">
                      <CheckCircle2 size={12} style={{color:'#34d399'}}/> Response within 24 hours &nbsp;·&nbsp;
                      <CheckCircle2 size={12} style={{color:'#34d399'}}/> Fixed-price guarantee &nbsp;·&nbsp;
                      <CheckCircle2 size={12} style={{color:'#34d399'}}/> No lock-in
                    </div>
                  </div>
                </motion.div>

                <div className="est-result__restart">
                  <button className="est-btn-restart" onClick={restart}>
                    <RefreshCw size={13}/> Start a new estimate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="section est-trust-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag"><Shield size={12}/> Why Trust Our Estimates</span>
            <h2 className="section-title">Honest Numbers, Every Time</h2>
            <p className="section-subtitle">10+ shipped SaaS products. Our estimates are based on real delivery data.</p>
          </div>
          <div className="est-trust-grid">
            {[
              { icon: BarChart3, color:'#2176AE', title:'Real Delivery Data',      desc:'Every estimate is calibrated from 10+ live projects. No inflated buffers, no surprise invoices.' },
              { icon: Shield,    color:'#7C3AED', title:'Fixed-Price Contracts',   desc:"We quote a price and stick to it. You'll never get a bill for scope creep we didn't warn you about." },
              { icon: Zap,       color:'#059669', title:'6–8 Week MVPs',           desc:"Most MVPs ship in 6–8 weeks. We know because we've done it — not because a sales deck said so." },
              { icon: Award,     color:'#D97706', title:'Senior Engineers Only',   desc:'IIT/NIT grad engineers handle your project. No juniors, no outsourcing, no surprises.' },
            ].map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.title} className="est-trust-card"
                  style={{ '--tc-color': t.color }}
                  custom={i} initial="hidden" whileInView="visible"
                  viewport={{once:true, margin:'-60px'}} variants={fadeUp}>
                  <div className="est-trust-card__icon"><Icon size={20}/></div>
                  <h3 className="est-trust-card__title">{t.title}</h3>
                  <p className="est-trust-card__desc">{t.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
