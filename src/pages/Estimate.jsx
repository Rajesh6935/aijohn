import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Brain, Cloud,
  CheckCircle2, ArrowRight, Send, Sparkles, TrendingDown,
  MapPin, RefreshCw, GitBranch, Server, Clock, BarChart3,
  DollarSign, Shield, Zap, HelpCircle
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import JohnAvatar from '../components/JohnAvatar';
import { useSEO } from '../utils/seo';
import './Estimate.css';

/* ══════════════════════════════════════════════════════
   CONFIG
══════════════════════════════════════════════════════ */
const AI_PROXY_URL  = '/api/chat';
const CLAUDE_MODEL  = 'claude-sonnet-4-6';   // Sonnet for JOHN — smarter conversation
const MAX_TOKENS    = 800;                    // hard cap per conversation

const AIJOHN_RATE   = { min: 20, max: 35 };

/* ── Market rates ── */
const MARKET_RATES = [
  { region: 'North America',  flag: '🇺🇸', rate: '$150–$250/hr', multiplier: 5.5 },
  { region: 'Western Europe', flag: '🇬🇧', rate: '$100–$180/hr', multiplier: 4.2 },
  { region: 'Australia',      flag: '🇦🇺', rate: '$120–$200/hr', multiplier: 4.8 },
  { region: 'Eastern Europe', flag: '🇵🇱', rate: '$50–$90/hr',   multiplier: 2.2 },
  { region: 'AIJOHN (India)', flag: '🇮🇳', rate: '$20–$35/hr',   multiplier: 1.0, highlight: true },
];

/* ── Project types — visual cards with real imagery ── */
const PROJECT_TYPES = [
  {
    id: 'saas', color: '#2176AE',
    gradient: 'linear-gradient(135deg,#1a4fa3,#2176AE)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60',
    emoji: '🌐',
    label: 'Website / Web App',
    plain: 'A product people use in their browser',
    examples: 'Booking platform · Dashboard · Portal',
  },
  {
    id: 'mobile', color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#5b21b6,#7C3AED)',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60',
    emoji: '📱',
    label: 'Mobile App',
    plain: 'An app on iPhone or Android',
    examples: 'Delivery · Fitness · On-demand service',
  },
  {
    id: 'ecommerce', color: '#059669',
    gradient: 'linear-gradient(135deg,#065f46,#059669)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=60',
    emoji: '🛍️',
    label: 'Online Store',
    plain: 'Sell products or services online',
    examples: 'Marketplace · Subscription · Retail',
  },
  {
    id: 'ai', color: '#0891B2',
    gradient: 'linear-gradient(135deg,#0e4a6e,#0891B2)',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=60',
    emoji: '🤖',
    label: 'AI-Powered Product',
    plain: 'Something smart that learns & adapts',
    examples: 'Chatbot · Smart search · Auto-decisions',
  },
  {
    id: 'enterprise', color: '#D97706',
    gradient: 'linear-gradient(135deg,#92400e,#D97706)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=60',
    emoji: '🏢',
    label: 'Internal Business Tool',
    plain: 'Software just for your team',
    examples: 'CRM · HR tool · Operations system',
  },
  {
    id: 'mvp', color: '#EC4899',
    gradient: 'linear-gradient(135deg,#9d174d,#EC4899)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60',
    emoji: '🚀',
    label: 'Quick Launch / MVP',
    plain: 'Get something live fast to test the idea',
    examples: '6–8 week · Lean · Investor-ready',
  },
];

/* ── Features — plain English, client-friendly, 8 options max ── */
const FEATURES_SIMPLE = [
  { id: 'users',    emoji: '👤', label: 'User Accounts',       sub: 'People can sign up & log in',              weeks: 1,   cost: 2000 },
  { id: 'payments', emoji: '💳', label: 'Take Payments',       sub: 'Accept cards, subscriptions, invoices',    weeks: 1.5, cost: 3000 },
  { id: 'admin',    emoji: '📊', label: 'Admin Dashboard',     sub: 'Manage everything from one place',         weeks: 2,   cost: 4000 },
  { id: 'notify',   emoji: '🔔', label: 'Notifications',       sub: 'Email, SMS or push alerts to users',       weeks: 1,   cost: 1800 },
  { id: 'search',   emoji: '🔍', label: 'Search & Filters',    sub: 'Find anything quickly in the app',         weeks: 1,   cost: 2000 },
  { id: 'ai',       emoji: '🤖', label: 'AI Assistant',        sub: 'Smart chat, recommendations or automation',weeks: 2,   cost: 5000 },
  { id: 'realtime', emoji: '⚡', label: 'Live / Real-Time',    sub: 'Chat, live updates, live tracking',        weeks: 1.5, cost: 3500 },
  { id: 'files',    emoji: '📁', label: 'File Uploads',        sub: 'Photos, documents, videos',                weeks: 0.5, cost: 1200 },
];

/* ── Support packages — replaces raw budget picker ── */
const SUPPORT_PACKAGES = [
  {
    id: 'launch',
    emoji: '🚀',
    color: '#2176AE',
    gradient: 'linear-gradient(135deg,#1e3a5f,#2176AE)',
    label: 'Just Build It',
    tagline: 'One-time project, you take it from there',
    perks: ['Full handover of code & docs','2 weeks of launch support','Direct Slack during build'],
    weeks: 'modifier:0.9',
  },
  {
    id: 'care',
    emoji: '🛡️',
    color: '#059669',
    gradient: 'linear-gradient(135deg,#064e3b,#059669)',
    label: 'Build + Care Plan',
    tagline: 'We build it, then keep it healthy for you',
    perks: ['Everything in Build','Monthly updates & bug fixes','Hosting managed by us','Priority response within 24h'],
    badge: 'Most Popular',
    weeks: 'modifier:1.0',
  },
  {
    id: 'growth',
    emoji: '⚡',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#4c1d95,#7C3AED)',
    label: 'Build + Grow Together',
    tagline: 'Ongoing dev team on-call as you scale',
    perks: ['Everything in Care Plan','Dedicated dev hours per month','New features on demand','Monthly strategy call with our team'],
    weeks: 'modifier:1.1',
  },
  {
    id: 'partner',
    emoji: '💎',
    color: '#D97706',
    gradient: 'linear-gradient(135deg,#78350f,#D97706)',
    label: 'Full Tech Partner',
    tagline: 'We become your in-house engineering team',
    perks: ['Everything in Grow Together','Full-time dedicated engineers','You focus on business, we own the tech','Quarterly roadmap planning sessions'],
    weeks: 'modifier:1.2',
  },
];

/* ── Tech stacks ── */
const TECH_STACKS = {
  saas:       { frontend: ['React / Next.js','TypeScript','Tailwind CSS'],    backend: ['Node.js / Express','PostgreSQL','Supabase'],          infra: ['AWS (EC2 + RDS)','CloudFront CDN','GitHub Actions'],    ai: [] },
  mobile:     { frontend: ['React Native','Expo','TypeScript'],               backend: ['Node.js / Fastify','PostgreSQL','Firebase Auth'],      infra: ['AWS Amplify','S3 Storage','GitHub Actions'],            ai: [] },
  ai:         { frontend: ['Next.js','TypeScript','shadcn/ui'],               backend: ['FastAPI (Python)','PostgreSQL','Redis'],               infra: ['AWS ECS','S3 + CloudFront','Docker'],                   ai: ['Claude / OpenAI API','LangChain','Pinecone (vector DB)'] },
  ecommerce:  { frontend: ['Next.js','TypeScript','Tailwind CSS'],            backend: ['Node.js','PostgreSQL','Stripe Payments'],              infra: ['Vercel / AWS','CloudFront CDN','GitHub Actions'],       ai: [] },
  enterprise: { frontend: ['React','TypeScript','Ant Design'],                backend: ['Node.js / NestJS','PostgreSQL + Redis','REST + GraphQL'], infra: ['AWS (ECS / RDS)','VPN / SSO','Terraform IaC'],       ai: [] },
  mvp:        { frontend: ['Next.js','TypeScript','Tailwind CSS'],            backend: ['Supabase (BaaS)','PostgreSQL','Vercel Serverless'],    infra: ['Vercel (deploy)','Supabase Storage','GitHub Actions'],  ai: [] },
};

/* ── Estimate calculator ── */
function calcEstimate(typeIds, featureIds, packageId) {
  const ids = Array.isArray(typeIds) && typeIds.length ? typeIds : ['saas'];
  const BASE_WEEKS = { saas:4, mobile:5, ai:5, ecommerce:4, enterprise:6, mvp:3 };
  const BASE_COST  = { saas:8000, mobile:10000, ai:12000, ecommerce:9000, enterprise:14000, mvp:6000 };
  const primaryId  = ids[0];
  let weeks = BASE_WEEKS[primaryId] || 4;
  let cost  = BASE_COST[primaryId]  || 8000;
  // Additional platforms share some codebase — 60% of base cost each
  ids.slice(1).forEach(tId => {
    weeks = Math.max(weeks, BASE_WEEKS[tId] || 4);
    cost += Math.round((BASE_COST[tId] || 8000) * 0.6);
  });
  featureIds.forEach(fId => {
    const f = FEATURES_SIMPLE.find(x => x.id === fId);
    if (f) { weeks += f.weeks; cost += f.cost; }
  });
  // Support package modifier
  const pkgMods = { launch:0.9, care:1.0, growth:1.1, partner:1.2 };
  cost = Math.round(cost * (pkgMods[packageId] || 1));
  const pkg = SUPPORT_PACKAGES.find(p => p.id === packageId) || SUPPORT_PACKAGES[0];
  const aijohnMin = Math.round(cost * 0.9 / 1000) * 1000;
  const aijohnMax = Math.round(cost * 1.1 / 1000) * 1000;
  return {
    weeks: Math.ceil(weeks),
    pkg,
    aijohn: { min: aijohnMin, max: aijohnMax },
    na:     { min: Math.round(aijohnMin*4.0/1000)*1000, max: Math.round(aijohnMax*5.0/1000)*1000 },
    markets: MARKET_RATES.map(m => ({ ...m, min: m.highlight ? aijohnMin : Math.round(aijohnMin*m.multiplier/1000)*1000, max: m.highlight ? aijohnMax : Math.round(aijohnMax*m.multiplier/1000)*1000 })),
    stack: TECH_STACKS[primaryId] || TECH_STACKS.saas,
    phases: [
      { name:'Discovery & Architecture', duration:'1 week',                         pct:10 },
      { name:'Design & Prototyping',     duration:`${Math.ceil(weeks*0.15)} weeks`, pct:15 },
      { name:'Core Build',               duration:`${Math.ceil(weeks*0.40)} weeks`, pct:40 },
      { name:'Testing & Refinement',     duration:`${Math.ceil(weeks*0.20)} weeks`, pct:20 },
      { name:'Launch & Handover',        duration:`${Math.ceil(weeks*0.10)} weeks`, pct:10 },
      { name:'Post-Launch Support',      duration:'2 weeks',                         pct:5  },
    ],
  };
}

/* ── JOHN's system prompt — tight and token-aware ── */
const JOHN_SYSTEM = `You are JOHN, a warm and trusted senior consultant at AIJOHN Technosoft (India, $20–35/hr, senior engineers).
Your job: have a natural, human conversation to understand what the client wants to build, then guide them through 3 simple steps using interactive cards.

CONVERSATION FLOW:
1. Greet warmly, ask what they want to build (1-2 sentences max)
2. After they describe their idea, ask ONE clarifying question — focus on their goal or audience, not tech
3. After their answer, say you have enough context and invite them to pick the project type from the cards
4. After they pick a type, invite them to pick the features they want (simple options, no jargon)
5. After features, ask them how they'd like to work together after launch — show support package cards
6. After package selected, say you're building their estimate now

RULES:
- Keep every reply under 60 words
- Never use bullet points or numbered lists in chat
- Sound like a trusted advisor, not a salesperson — build confidence
- Never ask more than one question at a time
- When prompting card selection, end with exactly: [SHOW_TYPES] or [SHOW_FEATURES] or [SHOW_BUDGET]
- After package selected, end with: [GENERATE_ESTIMATE]
- Total conversation: max 6 exchanges`;

/* ── Smart fallback — used only if Claude API is unavailable ── */
function getFallback(stage) {
  const map = {
    greeting:     `Hey! I'm JOHN from AIJOHN. Great to meet you! Tell me — what are you looking to build? Just describe it in plain English, no technical details needed.`,
    clarify:      `That sounds exciting! Quick question — who's the main audience for this? Knowing that helps me tailor the right approach for you.`,
    showTypes:    `Perfect, I've got a good picture now. Pick the option that best describes what you're building. [SHOW_TYPES]`,
    showFeatures: `Great choice! Now tell me what you'd like your product to do — just pick what feels right. [SHOW_FEATURES]`,
    showBudget:   `Love the selections! One last thing — how would you like us to work together after we launch? [SHOW_BUDGET]`,
    generate:     `Perfect, I have everything I need. Let me put your personalised estimate together now. [GENERATE_ESTIMATE]`,
  };
  return map[stage] || map.clarify;
}

/* ── Call Claude ──
   Dev:  Vite proxies /api/chat → api.anthropic.com (see vite.config.js)
         Body is sent in Anthropic format directly.
   Prod: Vercel serverless function at /api/chat translates and forwards.
────────────────────────────────────────────────── */
async function callJohn(messages) {
  try {
    const res = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Anthropic format (used directly in dev via Vite proxy)
        model:      CLAUDE_MODEL,
        max_tokens: MAX_TOKENS,
        system:     JOHN_SYSTEM,
        messages,
        // Also include wrapper fields for Vercel function in prod
        systemPrompt: JOHN_SYSTEM,
        maxTokens:    MAX_TOKENS,
      }),
    });
    if (!res.ok) {
      console.error('[JOHN] API error', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch (err) {
    console.error('[JOHN] fetch failed:', err);
    return null;
  }
}

const fadeUp = {
  hidden:  { opacity:0, y:20 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ delay:i*0.05, duration:0.38, ease:[0.4,0,0.2,1] } }),
};

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function Estimate() {
  useSEO({
    title: 'Chat with JOHN — Get an Estimate',
    description: 'Chat with JOHN, our AI consultant, to get a personalised project estimate. Timeline, tech stack, and pricing comparison vs North America — in minutes.',
    path: '/estimate',
  });

  /* ── State ── */
  const [phase, setPhase]         = useState('chat');      // 'chat' | 'result'
  const [messages, setMessages]   = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [exchange, setExchange]   = useState(0);           // how many user turns
  const [tokenCount, setTokenCount] = useState(0);        // rough token tracking

  /* ── Collected data ── */
  const [projectType, setProjectType]   = useState([]);   // array — multi-select
  const [features, setFeatures]         = useState([]);
  const [budget, setBudget]             = useState(null);
  const [result, setResult]             = useState(null);

  /* ── UI state for which card selector to show ── */
  const [showCard, setShowCard]         = useState(null);  // null | 'types' | 'features' | 'budget'
  const [featuresConfirmed, setFeaturesConfirmed] = useState(false);

  const [talkingMsgId, setTalkingMsgId] = useState(null);

  const chatEndRef      = useRef(null);
  const chatMessagesRef = useRef(null);
  const inputRef        = useRef(null);
  const talkTimerRef    = useRef(null);
  // Refs so generate-callback always reads latest values (bypasses stale closure)
  const projectTypeRef  = useRef([]);
  const featuresRef     = useRef([]);
  const budgetRef       = useRef(null);

  useEffect(() => {
    if (isTyping) return;
    const last = messages[messages.length - 1];
    if (last?.role === 'assistant') {
      clearTimeout(talkTimerRef.current);
      setTalkingMsgId(last.id);
      talkTimerRef.current = setTimeout(() => setTalkingMsgId(null), 2600);
    }
    return () => clearTimeout(talkTimerRef.current);
  }, [messages, isTyping]);

  useEffect(() => {
    const container = chatMessagesRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, isTyping, showCard]);

  // Keep refs in sync for generate callback
  useEffect(() => { projectTypeRef.current = projectType; }, [projectType]);
  useEffect(() => { featuresRef.current    = features;    }, [features]);
  useEffect(() => { budgetRef.current      = budget;      }, [budget]);

  // Auto-focus input whenever it's visible and idle
  useEffect(() => {
    if (showCard || isTyping) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [showCard, isTyping, messages]);

  /* ── Parse JOHN's response for [SHOW_X] signals ── */
  function parseSignal(text) {
    if (text.includes('[SHOW_TYPES]'))       return 'types';
    if (text.includes('[SHOW_FEATURES]'))    return 'features';
    if (text.includes('[SHOW_BUDGET]'))      return 'budget';
    if (text.includes('[GENERATE_ESTIMATE]')) return 'generate';
    return null;
  }

  function cleanText(text) {
    return text
      .replace('[SHOW_TYPES]', '')
      .replace('[SHOW_FEATURES]', '')
      .replace('[SHOW_BUDGET]', '')
      .replace('[GENERATE_ESTIMATE]', '')
      .trim();
  }

  /* ── Handle JOHN's reply ── */
  async function handleJohnReply(history, stage = null) {
    setIsTyping(true);

    // Rough token counter for display (4 chars ≈ 1 token)
    const usedTokens = history.reduce((sum, m) => sum + Math.ceil((m.content || '').length / 4), 0);
    setTokenCount(Math.min(usedTokens, MAX_TOKENS));

    // Try Claude first
    let text = await callJohn(history);

    // Smart fallback if Claude is unavailable
    if (!text) {
      text = getFallback(stage || 'clarify');
    }

    const signal      = parseSignal(text);
    const cleanedText = cleanText(text);

    // Natural typing delay based on response length
    const delay = Math.min(400 + cleanedText.length * 8, 1400);
    await new Promise(r => setTimeout(r, delay));

    setMessages(prev => [...prev, { role: 'assistant', text: cleanedText, id: Date.now() }]);
    setIsTyping(false);

    if (signal === 'generate') {
      setTimeout(() => {
        const est = calcEstimate(projectTypeRef.current, featuresRef.current, budgetRef.current);
        setResult(est);
        setPhase('result');
      }, 800);
    } else if (signal) {
      setShowCard(signal);
    }
  }

  /* ── Boot JOHN on mount ── */
  useEffect(() => {
    setTimeout(() => {
      setMessages([{ role: 'assistant', text: getFallback('greeting'), id: Date.now() }]);
    }, 400);
  }, []); // intentionally empty — boot greeting once on mount

  /* ── Send user message ── */
  const sendMessage = useCallback(async () => {
    const text = userInput.trim();
    if (!text || isTyping) return;
    setUserInput('');

    const newUserMsg = { role: 'user', text, id: Date.now() };
    setMessages(prev => [...prev, newUserMsg]);
    const nextExchange = exchange + 1;
    setExchange(nextExchange);

    const history = [...messages, newUserMsg].map(m => ({ role: m.role, content: m.text }));
    let stage = 'clarify';
    if (nextExchange >= 2 && !projectTypeRef.current.length) stage = 'showTypes';
    else if (projectTypeRef.current.length && !featuresRef.current.length) stage = 'showFeatures';
    else if (projectTypeRef.current.length && !budgetRef.current) stage = 'showBudget';
    await handleJohnReply(history, stage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, isTyping, messages, exchange]);

  /* ── Toggle a project type (multi-select) ── */
  const toggleType = (typeId) =>
    setProjectType(prev => prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]);

  /* ── Confirm selected project types ── */
  const confirmTypes = useCallback(async () => {
    const types = projectTypeRef.current;
    setShowCard(null);
    const labels = types.map(tId => PROJECT_TYPES.find(p => p.id === tId)?.label).filter(Boolean);
    const selMsg = {
      role: 'user',
      text: labels.length ? `I'm building: ${labels.join(' + ')}` : 'Not sure what type yet — open to suggestions.',
      id: Date.now()
    };
    setMessages(prev => [...prev, selMsg]);
    setExchange(prev => prev + 1);
    const history = [...messages, selMsg].map(m => ({ role: m.role, content: m.text }));
    await handleJohnReply(history, 'showFeatures');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  /* ── Skip a step ── */
  const skipStep = useCallback(async (step) => {
    setShowCard(null);
    let text = '';
    if (step === 'types') {
      setProjectType(['saas']);
      projectTypeRef.current = ['saas'];
      text = "Not sure what type yet — let's keep it flexible for now.";
    } else if (step === 'features') {
      setFeaturesConfirmed(true);
      text = "Not sure about features yet — keeping it simple for now.";
    } else if (step === 'budget') {
      setBudget('care');
      budgetRef.current = 'care';
      text = "Not sure about the support plan — let's figure it out later.";
    }
    const selMsg = { role: 'user', text, id: Date.now() };
    setMessages(prev => [...prev, selMsg]);
    setExchange(prev => prev + 1);
    const history = [...messages, selMsg].map(m => ({ role: m.role, content: m.text }));
    const nextStage = step === 'types' ? 'showFeatures' : step === 'features' ? 'showBudget' : 'generate';
    await handleJohnReply(history, nextStage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  /* ── User confirms features ── */
  const confirmFeatures = useCallback(async () => {
    setShowCard(null);
    setFeaturesConfirmed(true);

    const labels = features.map(fId => FEATURES_SIMPLE.find(f => f.id === fId)?.label).filter(Boolean);
    const selMsg = {
      role: 'user',
      text: labels.length ? `My features: ${labels.join(', ')}` : 'No specific features selected yet — keep it lean.',
      id: Date.now()
    };
    setMessages(prev => [...prev, selMsg]);
    setExchange(prev => prev + 1);

    const history = [...messages, selMsg].map(m => ({ role: m.role, content: m.text }));
    await handleJohnReply(history, 'showBudget');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, features]);

  /* ── User selects budget ── */
  const selectBudget = useCallback(async (budgetId) => {
    const b = SUPPORT_PACKAGES.find(x => x.id === budgetId);
    setBudget(budgetId);
    setShowCard(null);

    const selMsg = { role: 'user', text: `I'd like the ${b.label} package.`, id: Date.now() };
    setMessages(prev => [...prev, selMsg]);
    setExchange(prev => prev + 1);

    const history = [...messages, selMsg].map(m => ({ role: m.role, content: m.text }));
    await handleJohnReply(history, 'generate');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const toggleFeature = (id) =>
    setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const restart = () => {
    setPhase('chat'); setMessages([]); setUserInput(''); setIsTyping(false);
    setExchange(0); setTokenCount(0); setProjectType([]); setFeatures([]);
    setBudget(null); setResult(null); setShowCard(null); setFeaturesConfirmed(false);
    projectTypeRef.current = []; featuresRef.current = []; budgetRef.current = null;
    setTimeout(() => {
      setMessages([{ role: 'assistant', text: getFallback('greeting'), id: Date.now() }]);
    }, 300);
  };

  /* ══════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════ */
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="john-hero">
        <div className="john-hero__bg" />
        <div className="john-hero__overlay" />
        <div className="container john-hero__inner">
          <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}>
            <span className="section-tag" style={{ color:'#7CC2E8', background:'rgba(74,159,212,0.14)', borderColor:'rgba(74,159,212,0.28)' }}>
              <Brain size={12} /> AI-Powered Estimator
            </span>
            <h1 className="john-hero__title">
              Chat with <span className="john-hero__accent">JOHN.</span><br/>
              Get Your Estimate.
            </h1>
            <p className="john-hero__sub">
              Describe your idea. JOHN will ask a couple of smart questions, then generate your personalised plan — timeline, tech stack, and pricing vs the world.
            </p>
            <div className="john-hero__badges">
              {[
                { icon: Zap,          label: 'Powered by Claude Sonnet' },
                { icon: Shield,       label: 'No Obligation'            },
                { icon: TrendingDown, label: 'Save 60–75% vs US/EU'     },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="john-hero__badge"><Icon size={12}/> {label}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CHAT PHASE
      ══════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
      {phase === 'chat' && (
        <motion.section key="chat" className="john-chat-section"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
          <div className="container">
            <div className="john-chat-wrap">

              {/* Chat header */}
              <div className="john-chat-header">
                <div className="john-chat-header__left">
                  <JohnAvatar state={isTyping ? 'thinking' : 'idle'} size="md" />
                  <div>
                    <div className="john-chat-name">JOHN</div>
                    <div className="john-chat-status">
                      <span className="john-dot" />
                      Senior Consultant · AIJOHN Technosoft · $20–35/hr
                    </div>
                  </div>
                </div>
                <div className="john-token-badge" title="Token usage">
                  <Sparkles size={11}/> {tokenCount}/{MAX_TOKENS} tokens
                </div>
              </div>

              {/* Messages */}
              <div className="john-messages" ref={chatMessagesRef}>
                {messages.map((msg) => (
                  <motion.div key={msg.id}
                    className={`john-msg john-msg--${msg.role}`}
                    initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.3 }}>
                    {msg.role === 'assistant' && (
                      <JohnAvatar state={msg.id === talkingMsgId ? 'talking' : 'idle'} size="sm" />
                    )}
                    <div className="john-msg__bubble">
                      {msg.text.split('\n').map((line, i) => {
                        const parts = line.split(/\*\*(.*?)\*\*/g);
                        return (
                          <span key={i}>
                            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
                            {i < msg.text.split('\n').length - 1 && <br/>}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div className="john-msg john-msg--assistant"
                    initial={{ opacity:0 }} animate={{ opacity:1 }}>
                    <JohnAvatar state="thinking" size="sm" />
                    <div className="john-msg__bubble john-typing">
                      <span/><span/><span/>
                    </div>
                  </motion.div>
                )}

                {/* ── Interactive card selectors (appear mid-chat) ── */}
                <AnimatePresence>

                  {/* ── 1. Project type — multi-select image cards ── */}
                  {showCard === 'types' && !isTyping && (
                    <motion.div className="john-card-selector"
                      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:-8 }} transition={{ duration:0.35 }}>
                      <div className="john-card-selector__label">Pick every platform you want to build for ↓ <span className="john-card-selector__hint">select all that apply</span></div>
                      <div className="john-type-grid">
                        {PROJECT_TYPES.map((pt, i) => (
                          <motion.button key={pt.id}
                            className={`john-type-card ${projectType.includes(pt.id) ? 'selected' : ''}`}
                            style={{ '--pt-color': pt.color, '--pt-grad': pt.gradient }}
                            onClick={() => toggleType(pt.id)}
                            custom={i} initial="hidden" animate="visible" variants={fadeUp}
                            whileHover={{ y:-4, scale:1.02 }}>
                            <div className="john-type-card__img">
                              <div className="john-type-card__img-bg" style={{ backgroundImage:`url(${pt.image})` }} />
                              <div className="john-type-card__img-overlay" style={{ background: pt.gradient + 'cc' }} />
                              <span className="john-type-card__emoji">{pt.emoji}</span>
                              {projectType.includes(pt.id) && (
                                <div className="john-type-card__check"><CheckCircle2 size={16}/></div>
                              )}
                            </div>
                            <div className="john-type-card__body">
                              <div className="john-type-card__label">{pt.label}</div>
                              <div className="john-type-card__plain">{pt.plain}</div>
                              <div className="john-type-card__examples">{pt.examples}</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                      <button className="john-confirm-btn" onClick={confirmTypes} disabled={!projectType.length}
                        style={{ opacity: projectType.length ? 1 : 0.45 }}>
                        <CheckCircle2 size={14}/>
                        {projectType.length ? `Continue with ${projectType.length} platform${projectType.length > 1 ? 's' : ''}` : 'Select at least one above'}
                        <ArrowRight size={13}/>
                      </button>
                      <button className="john-skip-btn" onClick={() => skipStep('types')}>
                        <HelpCircle size={12}/> Not sure — skip this step
                      </button>
                    </motion.div>
                  )}

                  {/* ── 2. Features — simple emoji tiles ── */}
                  {showCard === 'features' && !isTyping && (
                    <motion.div className="john-card-selector"
                      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:-8 }} transition={{ duration:0.35 }}>
                      <div className="john-card-selector__label">What should your product be able to do? ↓</div>
                      <div className="john-feat-grid">
                        {FEATURES_SIMPLE.map((item, i) => (
                          <motion.button key={item.id}
                            className={`john-feat-tile ${features.includes(item.id) ? 'selected' : ''}`}
                            onClick={() => toggleFeature(item.id)}
                            custom={i} initial="hidden" animate="visible" variants={fadeUp}
                            whileHover={{ scale:1.03 }}>
                            <div className="john-feat-tile__emoji">{item.emoji}</div>
                            <div className="john-feat-tile__label">{item.label}</div>
                            <div className="john-feat-tile__sub">{item.sub}</div>
                            {features.includes(item.id) && (
                              <div className="john-feat-tile__check"><CheckCircle2 size={13}/></div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <button className="john-confirm-btn" onClick={confirmFeatures}>
                        <CheckCircle2 size={14}/> {features.length ? `Add these ${features.length} feature${features.length > 1 ? 's' : ''}` : 'Keep it lean — no extras'} <ArrowRight size={13}/>
                      </button>
                      <button className="john-skip-btn" onClick={() => skipStep('features')}>
                        <HelpCircle size={12}/> Not sure — skip this step
                      </button>
                    </motion.div>
                  )}

                  {/* ── 3. Support package — replaces raw budget ── */}
                  {showCard === 'budget' && !isTyping && (
                    <motion.div className="john-card-selector"
                      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:-8 }} transition={{ duration:0.35 }}>
                      <div className="john-card-selector__label">How would you like us to work together? ↓</div>
                      <div className="john-pkg-grid">
                        {SUPPORT_PACKAGES.map((pkg, i) => (
                          <motion.button key={pkg.id}
                            className={`john-pkg-card ${budget === pkg.id ? 'selected' : ''}`}
                            style={{ '--pkg-color': pkg.color, '--pkg-grad': pkg.gradient }}
                            onClick={() => selectBudget(pkg.id)}
                            custom={i} initial="hidden" animate="visible" variants={fadeUp}
                            whileHover={{ y:-3 }}>
                            {pkg.badge && <div className="john-pkg-badge">{pkg.badge}</div>}
                            <div className="john-pkg-card__top" style={{ background: pkg.gradient }}>
                              <span className="john-pkg-card__emoji">{pkg.emoji}</span>
                            </div>
                            <div className="john-pkg-card__body">
                              <div className="john-pkg-card__label">{pkg.label}</div>
                              <div className="john-pkg-card__tagline">{pkg.tagline}</div>
                              <ul className="john-pkg-card__perks">
                                {pkg.perks.map(p => (
                                  <li key={p}><CheckCircle2 size={10}/>{p}</li>
                                ))}
                              </ul>
                            </div>
                            {budget === pkg.id && (
                              <div className="john-pkg-selected"><CheckCircle2 size={14}/> Selected</div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <button className="john-skip-btn" onClick={() => skipStep('budget')}>
                        <HelpCircle size={12}/> Not sure — skip this step
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              {!showCard && (
                <div className="john-input-row">
                  <textarea
                    ref={inputRef}
                    className="john-input"
                    rows={1}
                    placeholder="Type your message…"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    disabled={isTyping}
                  />
                  <button className="john-send-btn" onClick={sendMessage} disabled={isTyping || !userInput.trim()}>
                    <Send size={16}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ══════════════════════════════════════════════
          RESULT PHASE
      ══════════════════════════════════════════════ */}
      {phase === 'result' && result && (
        <motion.section key="result" className="john-result-section"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}>
          <div className="container">
            <div className="john-result">

              {/* Header */}
              <div className="john-result__header">
                <motion.div className="john-result__check"
                  initial={{ scale:0 }} animate={{ scale:1 }}
                  transition={{ type:'spring', stiffness:280, damping:20, delay:0.2 }}>
                  <CheckCircle2 size={26}/>
                </motion.div>
                <h2 className="john-result__title">Your Estimate is Ready!</h2>
                <p className="john-result__sub">Based on your conversation with JOHN — here's your personalised build plan.</p>
              </div>

              {/* Savings banner */}
              <motion.div className="john-savings-banner"
                initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.3 }}>
                <TrendingDown size={18}/>
                <span>Save up to <strong>${(result.na.max - result.aijohn.max).toLocaleString()}</strong> building with AIJOHN</span>
                <span className="john-savings-pct">~{Math.round((1 - result.aijohn.max / result.na.max)*100)}% savings</span>
              </motion.div>

              {/* AIJOHN hero card */}
              <motion.div className="john-est-card john-est-card--main"
                initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
                <div className="john-est-card__top">
                  <div className="john-est-card__logo">
                    <span className="john-est-card__logo-ai">AI</span><span className="john-est-card__logo-john">JOHN</span>
                  </div>
                  <span className="john-est-card__tag">
                    <MapPin size={10}/> India · IIT/NIT Engineers · ${AIJOHN_RATE.min}–${AIJOHN_RATE.max}/hr
                  </span>
                </div>
                <div className="john-est-card__price">
                  ${result.aijohn.min.toLocaleString()} – ${result.aijohn.max.toLocaleString()}
                </div>
                <div className="john-est-card__meta-row">
                  <div className="john-est-card__timeline">
                    <Clock size={12}/> {result.weeks} weeks to production
                  </div>
                  {result.pkg && (
                    <div className="john-est-card__pkg-badge" style={{ background: result.pkg.gradient }}>
                      {result.pkg.emoji} {result.pkg.label}
                    </div>
                  )}
                </div>
                <div className="john-est-card__divider"/>
                <ul className="john-est-card__perks">
                  {(result.pkg ? result.pkg.perks : ['Senior IIT/NIT engineers only','Fixed-price guarantee','30-day post-launch support']).map(p => (
                    <li key={p}><CheckCircle2 size={12}/> {p}</li>
                  ))}
                  {!result.pkg && ['Daily standups & Friday live demos','Direct Slack · timezone-flexible'].map(p => (
                    <li key={p}><CheckCircle2 size={12}/> {p}</li>
                  ))}
                </ul>
                <Link to="/contact" className="john-est-card__cta">
                  Start with AIJOHN <ArrowRight size={13}/>
                </Link>
              </motion.div>

              {/* Global market comparison */}
              <motion.div className="john-market-table"
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                viewport={{once:true}} transition={{ duration:0.4 }}>
                <div className="john-section-head"><DollarSign size={15}/> Global Pricing — Same Project</div>
                <p className="john-market-table__sub">Identical scope, vastly different cost depending on where you hire.</p>
                {result.markets.map((m, i) => (
                  <motion.div key={m.region}
                    className={`john-market-row ${m.highlight ? 'john-market-row--highlight' : ''}`}
                    initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{once:true}} transition={{ delay:i*0.05 }}>
                    <div className="john-market-row__left">
                      <span className="john-market-row__flag">{m.flag}</span>
                      <div>
                        <div className="john-market-row__region">{m.region}</div>
                        <div className="john-market-row__rate">{m.rate}</div>
                      </div>
                    </div>
                    <div className="john-market-row__right">
                      <div className="john-market-row__price">${m.min.toLocaleString()} – ${m.max.toLocaleString()}</div>
                      {m.highlight
                        ? <div className="john-market-row__best">✓ Best value</div>
                        : <div className="john-market-row__extra">{Math.round((1 - result.aijohn.max/m.max)*100)}% more expensive</div>
                      }
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Tech stack */}
              <motion.div className="john-stack-card"
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                viewport={{once:true}} transition={{ duration:0.4 }}>
                <div className="john-section-head">
                  <GitBranch size={15}/> Recommended Tech Stack
                  <span className="john-stack-type">{projectType.map(tId => PROJECT_TYPES.find(p => p.id === tId)?.label).filter(Boolean).join(' + ') || 'Your Project'}</span>
                </div>
                <div className="john-stack-groups">
                  {[
                    { label:'Frontend', icon: Globe,  items: result.stack.frontend },
                    { label:'Backend',  icon: Server, items: result.stack.backend  },
                    { label:'Infra',    icon: Cloud,  items: result.stack.infra    },
                    ...(result.stack.ai.length ? [{ label:'AI Layer', icon: Brain, items: result.stack.ai }] : []),
                  ].map(({ label, icon: Icon, items }) => (
                    <div key={label} className="john-stack-group">
                      <div className="john-stack-group__label"><Icon size={11}/> {label}</div>
                      <div className="john-stack-chips">
                        {items.map(item => <span key={item} className="john-stack-chip">{item}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline phases */}
              <motion.div className="john-phases-card"
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                viewport={{once:true}} transition={{ duration:0.4 }}>
                <div className="john-section-head"><BarChart3 size={15}/> Project Timeline — {result.weeks} Weeks</div>
                <div className="john-phases-list">
                  {result.phases.map((phase, i) => (
                    <motion.div key={phase.name} className="john-phase"
                      initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{once:true}} transition={{ delay:i*0.06 }}>
                      <div className="john-phase__dot">{i+1}</div>
                      <div className="john-phase__info">
                        <div className="john-phase__name">{phase.name}</div>
                        <div className="john-phase__dur">{phase.duration}</div>
                      </div>
                      <div className="john-phase__bar-wrap">
                        <motion.div className="john-phase__bar"
                          initial={{ width:0 }} whileInView={{ width:`${phase.pct}%` }}
                          viewport={{once:true}} transition={{ duration:0.7, delay:i*0.07 }}/>
                        <span className="john-phase__pct">{phase.pct}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div className="john-result-cta"
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                viewport={{once:true}}>
                <div className="john-result-cta__glow"/>
                <div className="john-result-cta__content">
                  <h3 className="john-result-cta__title">Ready to make it real?</h3>
                  <p className="john-result-cta__sub">Book a free 30-min call and we'll deliver a fixed-price proposal within 48 hours.</p>
                  <div className="john-result-cta__btns">
                    <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer" className="john-cta-primary">
                      Book Free Scoping Call <ArrowRight size={14}/>
                    </a>
                    <Link to="/contact" className="john-cta-secondary">
                      Send Us Your Idea <Send size={12}/>
                    </Link>
                  </div>
                  <div className="john-result-cta__note">
                    <CheckCircle2 size={11} style={{color:'#34d399'}}/> Reply in 24h &nbsp;·&nbsp;
                    <CheckCircle2 size={11} style={{color:'#34d399'}}/> Fixed-price &nbsp;·&nbsp;
                    <CheckCircle2 size={11} style={{color:'#34d399'}}/> No lock-in
                  </div>
                </div>
              </motion.div>

              <div className="john-restart">
                <button className="john-restart-btn" onClick={restart}>
                  <RefreshCw size={13}/> Start a new estimate
                </button>
              </div>

            </div>
          </div>
        </motion.section>
      )}
      </AnimatePresence>

    </PageWrapper>
  );
}
