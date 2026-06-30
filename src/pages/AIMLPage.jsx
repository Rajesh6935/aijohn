import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, Brain, Database, Activity, Search,
  Layers, Cloud, RefreshCw, Eye, BarChart3,
  ChevronRight, MessageSquare, Workflow, Network, Cpu,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './AIMLPage.css';

/* ─── Scroll progress hook ─── */
function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
  return progress;
}

/* ─── Counter ─── */
function Counter({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Horizontal carousel ─── */
function HScrollCarousel({ items, renderItem, title, subtitle, theme = 'dark' }) {
  const sceneRef = useRef(null);
  const trackRef = useRef(null);
  const progress = useScrollProgress(sceneRef);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxShift = track.scrollWidth - track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${progress * Math.max(0, maxShift)}px)`;
  }, [progress]);
  return (
    <div className={`ai-hscroll-scene ai-hscroll-scene--${theme}`} ref={sceneRef}>
      <div className="ai-hscroll-sticky">
        <div className="ai-hscroll-header container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="ai-hscroll-title">{title}</h2>
            {subtitle && <p className="ai-hscroll-sub">{subtitle}</p>}
          </motion.div>
        </div>
        <div className="ai-hscroll-viewport">
          <div className="ai-hscroll-track" ref={trackRef}>
            {items.map((item, i) => renderItem(item, i))}
          </div>
        </div>
        <div className="ai-hscroll-bar">
          <div className="ai-hscroll-bar__fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Animated canvas particles for hero ─── */
function ParticleField({ color = '#7C3AED' }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = color + Math.floor((1 - dist / 120) * 60).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [color]);
  return <canvas ref={canvasRef} className="ai-particle-canvas" />;
}

/* ─── Animated flowing grid for light sections ─── */
function FlowGrid({ accent = '#7C3AED' }) {
  return (
    <div className="ai-flow-grid">
      <div className="ai-flow-grid__layer" />
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="ai-flow-grid__beam"
          style={{ left: `${10 + i * 15}%`, '--beam-color': accent }}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'linear', delay: i * 0.5 }} />
      ))}
    </div>
  );
}

/* ─── Diagram node ─── */
function DiagramNode({ label, sublabel, color, delay = 0, pulse = false }) {
  return (
    <motion.div className="ai-diag-node" style={{ '--nc': color }}
      initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {pulse && (
        <motion.div className="ai-diag-node__pulse"
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, delay }} />
      )}
      <div className="ai-diag-node__dot" />
      <div className="ai-diag-node__label">{label}</div>
      {sublabel && <div className="ai-diag-node__sub">{sublabel}</div>}
    </motion.div>
  );
}

function DiagramLine({ vertical = false, delay = 0 }) {
  return (
    <motion.div className={`ai-diag-line ${vertical ? 'ai-diag-line--v' : 'ai-diag-line--h'}`}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }} />
  );
}

/* ══════════ DATA ══════════ */
const MODELS = [
  { name: 'Claude Opus 4', maker: 'Anthropic', color: '#7C3AED',
    bestFor: 'Reasoning & Code',
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Anthropic logo">
        <rect width="28" height="28" rx="8" fill="#7C3AED" fillOpacity="0.15"/>
        <path d="M14 6L19.5 19H8.5L14 6Z" fill="#7C3AED" stroke="#7C3AED" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M10 14h8" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    strength: 'Reasoning · Code · Safety',
    desc: 'Anthropic\'s most powerful model. Exceptional at complex multi-step reasoning, agentic coding, and enterprise-grade safe deployments. Our default for autonomous workflows.',
    tags: ['Tool Use', 'Long Context', 'Code Gen', 'Vision'] },
  { name: 'GPT-4o', maker: 'OpenAI', color: '#10A37F',
    bestFor: 'Multimodal Tasks',
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="OpenAI logo">
        <rect width="28" height="28" rx="8" fill="#10A37F" fillOpacity="0.15"/>
        <path d="M14 5C9.029 5 5 9.029 5 14s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 3a6 6 0 0 1 0 12A6 6 0 0 1 14 8zm0 3a3 3 0 0 0 0 6 3 3 0 0 0 0-6z" fill="#10A37F"/>
      </svg>
    ),
    strength: 'Speed · Multimodal · Ecosystem',
    desc: 'Fast, natively multimodal, massively adopted. Ideal for customer-facing features needing real-time streaming audio, image, and text responses in a single API call.',
    tags: ['Streaming', 'Vision', 'Function Calling', 'Audio'] },
  { name: 'Gemini 2.0 Flash', maker: 'Google DeepMind', color: '#4285F4',
    bestFor: 'Long Context',
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Google Gemini logo">
        <rect width="28" height="28" rx="8" fill="#4285F4" fillOpacity="0.15"/>
        <path d="M14 6L16.5 12.5L23 14L16.5 15.5L14 22L11.5 15.5L5 14L11.5 12.5L14 6Z" fill="#4285F4"/>
      </svg>
    ),
    strength: '1M Context · Speed · Multimodal',
    desc: 'Google\'s fastest frontier model with a massive context window and native multimodal understanding. Our pick for document-heavy RAG and real-time, low-latency use cases.',
    tags: ['1M Context', 'Grounding', 'Multimodal', 'Fast'] },
  { name: 'Llama 3.3 70B', maker: 'Meta · Self-hosted', color: '#0082FB',
    bestFor: 'Open Source / On-Prem',
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Meta Llama logo">
        <rect width="28" height="28" rx="8" fill="#0082FB" fillOpacity="0.15"/>
        <path d="M8 10c0-2.21 1.343-4 3-4s3 1.79 3 4v8c0 2.21-1.343 4-3 4S8 20.21 8 18v-8z" fill="#0082FB" fillOpacity="0.7"/>
        <path d="M14 12c0-1.657.895-3 2-3s2 1.343 2 3v4c0 1.657-.895 3-2 3s-2-1.343-2-3v-4z" fill="#0082FB"/>
      </svg>
    ),
    strength: 'Privacy · Cost · Control',
    desc: 'Open-source powerhouse for regulated industries. Deploy in your VPC — data never leaves your cloud. Ideal for HIPAA, GDPR, and financial services compliance.',
    tags: ['On-Prem', 'HIPAA-ready', 'LoRA Fine-tune', 'Low Cost'] },
];

const CAPABILITIES = [
  { Icon: MessageSquare, color: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1677442135968-6db3b0025e95?auto=format&fit=crop&w=600&q=60',
    title: 'LLM Integration & Chat',
    desc: 'Multi-provider LLM routing with automatic fallback, streaming, cost controls, and context window management. We wire GPT-4o, Claude, and Gemini into a single abstraction layer.',
    tags: ['OpenAI', 'Claude', 'Gemini', 'Streaming'] },
  { Icon: Database, color: '#9333EA',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=60',
    title: 'RAG Pipelines',
    desc: 'Retrieval-augmented generation giving your model grounded answers from your own data. Chunking, embedding, reranking, and citation with sub-100ms retrieval.',
    tags: ['pgvector', 'Pinecone', 'Reranking', 'RAGAS eval'] },
  { Icon: Search, color: '#6D28D9',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60',
    title: 'Vector Search at Scale',
    desc: 'Semantic search across millions of documents. Hybrid BM25 + dense retrieval with Pinecone, pgvector, or Weaviate — sub-100ms at scale.',
    tags: ['Pinecone', 'Weaviate', 'Hybrid Search', 'FAISS'] },
  { Icon: Workflow, color: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=60',
    title: 'AI Agents & Automation',
    desc: 'Autonomous agents with tool use, persistent memory, and goal-directed execution. LangGraph multi-agent orchestration for complex multi-step tasks.',
    tags: ['LangGraph', 'Tool Use', 'Memory', 'Multi-agent'] },
  { Icon: Cpu, color: '#9333EA',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=60',
    title: 'Fine-tuning & Alignment',
    desc: 'Domain-specific adaptation using LoRA and QLoRA on AWS SageMaker or local GPU. Instruction tuning, RLHF, and DPO for models that behave exactly as required.',
    tags: ['LoRA', 'QLoRA', 'SageMaker', 'HuggingFace'] },
  { Icon: Eye, color: '#6D28D9',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=600&q=60',
    title: 'Computer Vision',
    desc: 'Image classification, object detection, OCR, document parsing, and video analysis. From annotated dataset to production API with confidence scoring.',
    tags: ['YOLO', 'GPT-4V', 'Tesseract', 'OpenCV'] },
  { Icon: BarChart3, color: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=60',
    title: 'Predictive Analytics',
    desc: 'Time-series forecasting, churn prediction, fraud detection, and demand planning — trained on your data, deployed as real-time inference APIs.',
    tags: ['XGBoost', 'LSTM', 'Prophet', 'Scikit-learn'] },
  { Icon: Network, color: '#9333EA',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=60',
    title: 'MLOps & Model Serving',
    desc: 'Model registry, CI/CD for ML, A/B testing, canary deploys, drift detection, and cost dashboards. We run your models like production software.',
    tags: ['MLflow', 'vLLM', 'Ray Serve', 'Prometheus'] },
];

const PROCESS = [
  { num: '01', Icon: Search,    color: '#7C3AED', title: 'Problem Framing',     desc: 'Define measurable success metrics, identify the right AI approach, and scope feasibility within your data and budget. Output: AI brief + eval criteria.' },
  { num: '02', Icon: Database,  color: '#9333EA', title: 'Data Audit',          desc: 'Inventory your data assets, assess quality, identify gaps, and design the collection or labelling strategy. We audit before we train — always.' },
  { num: '03', Icon: Layers,    color: '#6D28D9', title: 'Architecture Design',  desc: 'Choose model type, embedding strategy, retrieval architecture, and serving infrastructure matched to your traffic, latency, and cost targets.' },
  { num: '04', Icon: Activity,  color: '#7C3AED', title: 'Train & Evaluate',    desc: 'Train, evaluate, and iterate with RAGAS, BLEU, and domain-specific metrics. Benchmarks are contractually defined and verified before we ship.' },
  { num: '05', Icon: Cloud,     color: '#9333EA', title: 'Production Deploy',   desc: 'Containerised models, autoscaling API endpoints, load balancers, monitoring dashboards, and cost alerting — go live with confidence.' },
  { num: '06', Icon: RefreshCw, color: '#6D28D9', title: 'Monitor & Iterate',   desc: 'Track output drift, latency, cost per call, and user feedback. Retrain on cadence as new data arrives. AI systems are living products.' },
];

const STACK_GROUPS = [
  { label: 'LLM & Foundation',   items: ['Claude Opus 4', 'GPT-4o', 'Gemini 2.0 Flash', 'Llama 3.3 70B', 'Mistral Large'] },
  { label: 'Orchestration',      items: ['LangChain', 'LangGraph', 'LlamaIndex', 'Semantic Kernel', 'CrewAI'] },
  { label: 'Vector & Retrieval', items: ['Pinecone', 'pgvector', 'Weaviate', 'Chroma', 'FAISS', 'Qdrant'] },
  { label: 'Training & Infra',   items: ['HuggingFace', 'SageMaker', 'PyTorch', 'vLLM', 'Ray Serve', 'MLflow'] },
];

const STATS = [
  { to: 50,  suffix: '+',   label: 'AI systems in production' },
  { to: 98,  suffix: '%',   label: 'Eval benchmark pass rate' },
  { to: 4,   suffix: 'x',   label: 'Faster than in-house' },
  { to: 100, suffix: 'ms', prefix: '<', label: 'Avg retrieval latency' },
];

/* ════════════ PAGE ════════════ */
export default function AIMLPage() {
  useSEO({
    title: 'AI & Machine Learning — AIJOHN Technosoft',
    description: 'Production AI. LLM integration with Claude, GPT-4o, Gemini. RAG pipelines, vector search, AI agents, fine-tuning, MLOps.',
    path: '/services/ai-machine-learning',
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  return (
    <PageWrapper>

      {/* ══════ 1. HERO — Dark, animated particles + circuit lines ══════ */}
      <section className="ai-hero" ref={heroRef}>
        {/* Animated particle network */}
        <ParticleField color="#7C3AED" />
        {/* Animated gradient orbs */}
        <motion.div className="ai-hero__orb ai-hero__orb--1"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="ai-hero__orb ai-hero__orb--2"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        <motion.div className="ai-hero__orb ai-hero__orb--3"
          animate={{ x: [0, 30, -60, 0], y: [0, -30, 50, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }} />
        {/* Animated grid */}
        <div className="ai-hero__grid" />
        {/* Scanning line */}
        <motion.div className="ai-hero__scan-line"
          animate={{ y: ['-100vh', '100vh'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }} />

        <motion.div className="ai-hero__content container" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="ai-hero__breadcrumb" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link to="/services">Services</Link><ChevronRight size={12} /><span>AI &amp; Machine Learning</span>
          </motion.div>
          <motion.div className="ai-hero__badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.span className="ai-hero__badge-dot" animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            Production AI Engineering
          </motion.div>
          <motion.h1 className="ai-hero__h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            AI that works.<br /><span className="ai-hero__h1-glow">In production.</span>
          </motion.h1>
          <motion.p className="ai-hero__sub" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            We integrate Claude, GPT-4o, and Gemini into products that actually ship —
            with RAG pipelines, autonomous agents, fine-tuned models, and the MLOps to keep everything running at scale.
          </motion.p>
          <motion.div className="ai-hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
            <Link to="/estimate" className="ai-cta-pill ai-cta-pill--primary">Estimate your AI project <ArrowRight size={14} /></Link>
            <Link to="/contact" className="ai-cta-pill ai-cta-pill--ghost">Talk to an engineer</Link>
          </motion.div>
          <motion.div className="ai-hero__scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <motion.div className="ai-hero__scroll-line" animate={{ scaleY: [0, 1, 0], y: [0, 14, 28] }} transition={{ duration: 1.6, repeat: Infinity }} />
            <span>scroll</span>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div className="ai-hero__stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          {STATS.map((s) => (
            <div key={s.label} className="ai-hero__stat">
              <div className="ai-hero__stat-num"><Counter to={s.to} suffix={s.suffix} prefix={s.prefix || ''} /></div>
              <div className="ai-hero__stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════ 2. LLM MODELS — White, flowing beams background ══════ */}
      <section className="ai-models">
        <FlowGrid accent="#7C3AED" />
        {/* Animated gradient blobs */}
        <motion.div className="ai-models__blob ai-models__blob--1"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="ai-models__blob ai-models__blob--2"
          animate={{ x: [0, -30, 50, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />

        <div className="container ai-models__inner">
          <motion.div className="ai-models__head" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="ai-models__eyebrow">LLM Integrations</span>
            <h2 className="ai-models__h2">We work with every<br />frontier model.</h2>
            <p className="ai-models__lead">Not locked to one vendor. We select — or blend — the right model for your latency, cost, safety, and capability requirements.</p>
          </motion.div>

          <div className="ai-models__grid">
            {MODELS.map((m, i) => (
              <motion.div key={m.name} className="ai-model-card" style={{ '--mc': m.color }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}>
                <motion.div className="ai-model-card__glow"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7 }} />
                <div className="ai-model-card__accent" />
                <div className="ai-model-card__header">
                  <motion.div className="ai-model-card__logo-wrap"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.8 }}>
                    {m.logo}
                  </motion.div>
                  <div>
                    <div className="ai-model-card__name">{m.name}</div>
                    <div className="ai-model-card__maker">{m.maker}</div>
                  </div>
                </div>
                <div className="ai-model-card__best-for">Best for: <strong>{m.bestFor}</strong></div>
                <div className="ai-model-card__strength">{m.strength}</div>
                <p className="ai-model-card__desc">{m.desc}</p>
                <div className="ai-model-card__tags">{m.tags.map(t => <span key={t}>{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 3. ARCHITECTURE — Dark, animated nodes, pulsing lines ══════ */}
      <section className="ai-arch">
        <ParticleField color="#9333EA" />
        <motion.div className="ai-arch__orb ai-arch__orb--1"
          animate={{ x: [0, -60, 40, 0], y: [0, 40, -50, 0], scale: [1, 1.12, 0.92, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="ai-arch__orb ai-arch__orb--2"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }} />
        <div className="ai-arch__grid" />

        <div className="container ai-arch__inner">
          <motion.div className="ai-arch__head" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="ai-arch__eyebrow">How it connects</span>
            <h2 className="ai-arch__h2">Production AI architecture,<br />explained visually.</h2>
            <p className="ai-arch__lead">Every system we build follows this layered approach — inputs flow through your retrieval layer, get enriched with context, hit the right LLM, and return structured outputs.</p>
          </motion.div>

          <div className="ai-arch__diagram">
            <div className="ai-arch__row">
              <div className="ai-arch__layer-label">Data Sources</div>
              <div className="ai-arch__nodes">
                {['Your Docs', 'SQL DB', 'APIs', 'PDFs / Web'].map((n, i) => (
                  <DiagramNode key={n} label={n} color="#7C3AED" delay={0.1 + i * 0.1} />
                ))}
              </div>
            </div>
            <div className="ai-arch__connector-row">
              {[0,1,2,3].map(i => <DiagramLine key={i} vertical delay={0.5 + i * 0.06} />)}
            </div>
            <div className="ai-arch__row">
              <div className="ai-arch__layer-label">Ingestion & Embedding</div>
              <div className="ai-arch__nodes">
                <DiagramNode label="Chunker" sublabel="LlamaIndex" color="#9333EA" delay={0.7} pulse />
                <DiagramLine delay={0.8} />
                <DiagramNode label="Embeddings" sublabel="text-embedding-3" color="#9333EA" delay={0.9} pulse />
                <DiagramLine delay={1.0} />
                <DiagramNode label="Vector DB" sublabel="Pinecone / pgvector" color="#9333EA" delay={1.1} pulse />
              </div>
            </div>
            <div className="ai-arch__connector-row ai-arch__connector-row--center">
              <DiagramLine vertical delay={1.2} />
            </div>
            <div className="ai-arch__row">
              <div className="ai-arch__layer-label">Retrieval + LLM Router</div>
              <div className="ai-arch__nodes ai-arch__nodes--llm">
                <DiagramNode label="Query Rewriter" sublabel="LangGraph" color="#6D28D9" delay={1.3} />
                <DiagramLine delay={1.4} />
                <DiagramNode label="Retriever" sublabel="Hybrid BM25 + Dense" color="#6D28D9" delay={1.5} />
                <DiagramLine delay={1.6} />
                <div className="ai-arch__llm-cluster">
                  {[
                    { cls: 'claude',  label: 'Claude',  emoji: '🟣' },
                    { cls: 'gpt',     label: 'GPT-4o',  emoji: '⚫' },
                    { cls: 'gemini',  label: 'Gemini',  emoji: '🔵' },
                  ].map((m, i) => (
                    <motion.div key={m.cls} className={`ai-arch__llm-badge ai-arch__llm-badge--${m.cls}`}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 1.65 + i * 0.12, type: 'spring' }}
                      animate={{ boxShadow: ['0 0 0 0 transparent', `0 0 18px 3px ${m.cls === 'claude' ? '#7C3AED44' : m.cls === 'gpt' ? '#10b98144' : '#3b82f644'}`, '0 0 0 0 transparent'] }}
                      whileHover={{ scale: 1.06 }}>
                      <span>{m.emoji}</span> {m.label}
                      <motion.span className="ai-arch__llm-ping"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ai-arch__connector-row ai-arch__connector-row--center">
              <DiagramLine vertical delay={1.9} />
            </div>
            <div className="ai-arch__row">
              <div className="ai-arch__layer-label">Structured Output & Observability</div>
              <div className="ai-arch__nodes">
                {['Streaming API', 'Citations', 'Guardrails', 'Traces / Cost'].map((n, i) => (
                  <DiagramNode key={n} label={n} color="#7C3AED" delay={2.0 + i * 0.1} pulse />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ 4. CAPABILITIES CAROUSEL — Apple-style with image backgrounds ══════ */}
      <HScrollCarousel theme="light" items={CAPABILITIES}
        title="Eight AI disciplines."
        subtitle="Every capability production-tested, not prototype-grade."
        renderItem={(cap, i) => (
          <motion.div key={cap.title} className="ai-hcard ai-hcard--apple" style={{ '--hc': cap.color }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
            {/* Background image */}
            <div className="ai-hcard__bg-img" style={{ backgroundImage: `url(${cap.image})` }} />
            {/* Gradient overlay */}
            <div className="ai-hcard__bg-grad" style={{ '--hc': cap.color }} />
            {/* Shimmer border */}
            <div className="ai-hcard__shimmer-border" />
            {/* Content */}
            <div className="ai-hcard__content">
              <motion.div className="ai-hcard__icon ai-hcard__icon--apple"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}>
                <cap.Icon size={22} />
              </motion.div>
              <h3 className="ai-hcard__title ai-hcard__title--apple">{cap.title}</h3>
              <p className="ai-hcard__desc ai-hcard__desc--apple">{cap.desc}</p>
              <div className="ai-hcard__tags ai-hcard__tags--apple">{cap.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </motion.div>
        )}
      />

      {/* ══════ 5. PROCESS — Dark, pulsing step icons, animated connector ══════ */}
      <section className="ai-process">
        <ParticleField color="#6D28D9" />
        <div className="ai-process__gradient" />
        <div className="container ai-process__inner">
          <motion.div className="ai-process__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="ai-process__eyebrow">How we work</p>
            <h2 className="ai-process__title">From problem<br />to production AI.</h2>
          </motion.div>
          <div className="ai-process__steps">
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} className="ai-process-step" style={{ '--step-c': step.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ background: 'rgba(124,58,237,0.12)', transition: { duration: 0.2 } }}>
                <div className="ai-process-step__num">{step.num}</div>
                <div className="ai-process-step__body">
                  <motion.div className="ai-process-step__icon"
                    animate={{ boxShadow: [`0 0 0 0 ${step.color}44`, `0 0 0 14px ${step.color}00`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
                    <step.Icon size={18} />
                  </motion.div>
                  <div>
                    <div className="ai-process-step__title">{step.title}</div>
                    <p className="ai-process-step__desc">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 6. TECH STACK — White, animated pill highlights ══════ */}
      <section className="ai-stack">
        <FlowGrid accent="#7C3AED" />
        <motion.div className="ai-stack__blob ai-stack__blob--1"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 25, 0], scale: [1, 1.2, 0.88, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="ai-stack__blob ai-stack__blob--2"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }} />

        <div className="container ai-stack__inner">
          <motion.div className="ai-stack__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="ai-stack__eyebrow">Technology</span>
            <h2 className="ai-stack__title">The toolchain that<br />ships production AI.</h2>
          </motion.div>
          <div className="ai-stack__groups">
            {STACK_GROUPS.map((grp, gi) => (
              <motion.div key={grp.label} className="ai-stack-group"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 200 } }}>
                <div className="ai-stack-group__label">{grp.label}</div>
                <div className="ai-stack-group__pills">
                  {grp.items.map((item, ii) => (
                    <motion.span key={item} className="ai-stack-pill"
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: gi * 0.07 + ii * 0.05 }}
                      whileHover={{ x: 8, color: '#7C3AED', background: 'rgba(124,58,237,0.1)', transition: { duration: 0.15 } }}>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 7. CTA — Dark, particles + animated orbs ══════ */}
      <section className="ai-cta-section">
        <ParticleField color="#9333EA" />
        <motion.div className="ai-cta__orb ai-cta__orb--1"
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="ai-cta__orb ai-cta__orb--2"
          animate={{ x: [0, -50, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
        <div className="ai-cta__grid" />

        <div className="container ai-cta__inner">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div className="ai-cta__icon"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0], boxShadow: ['0 0 0 0 #7C3AED44', '0 0 40px 10px #7C3AED22', '0 0 0 0 #7C3AED44'] }}
              transition={{ duration: 4, repeat: Infinity }}>
              <Brain size={32} />
            </motion.div>
            <h2 className="ai-cta__h2">Have an AI problem<br />worth solving?</h2>
            <p className="ai-cta__body">
              Tell us what you are trying to build. We will tell you whether Claude, GPT-4o, or Gemini
              is the right fit — and what the data requirements, timeline, and cost look like.
            </p>
            <div className="ai-cta__btns">
              <Link to="/estimate" className="ai-cta-pill ai-cta-pill--primary">Get a project estimate <ArrowRight size={14} /></Link>
              <Link to="/contact" className="ai-cta-pill ai-cta-pill--ghost">Book a technical call</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
