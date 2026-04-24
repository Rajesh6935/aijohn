import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ChevronLeft, ChevronRight,
  Globe, Code2, Smartphone, Cloud, Cpu, Brain, Rocket, Bot,
  Building2, Users, TrendingUp, ShoppingCart, Sparkles, Zap,
  Shield, Award, Server, Layers, BarChart3, Search, Star, MessageSquare
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import ParticleCanvas from '../components/ParticleCanvas';
import TextCycler from '../components/TextCycler';
import { useSEO } from '../utils/seo';
import './Home.css';

/* ── Hero Slides ────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    accent: '#4A9FD4',
    tag: 'AI SaaS Studio',
    line1: 'AI SaaS Agency.',
    line2: 'We Build Together.',
    desc: 'Elite IIT/NIT engineers delivering AI-native products at 3× speed — MVP to production in 6–8 weeks.',
    showVideo:  true,
    showCycler: true,
    duration: 13000,
    cta1: { label: 'Book a Free Call', to: '/contact' },
    cta2: { label: 'AI Estimator',     to: '/estimate', zap: true },
  },
  {
    id: 1,
    bg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    accent: '#818CF8',
    tag: 'Rapid MVP Delivery',
    line1: 'MVP in 6–8 Weeks.',
    line2: 'Zero Surprises.',
    desc: 'From first wireframe to deployed product in 6–8 weeks. Fixed price, daily standups, zero fluff.',
    showVideo:  false,
    showCycler: false,
    duration: 6000,
    cta1: { label: 'See How We Work',  to: '/services' },
    cta2: { label: 'Get an Estimate',  to: '/estimate', zap: true },
  },
  {
    id: 2,
    bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    accent: '#34D399',
    tag: 'Enterprise AI Products',
    line1: 'Enterprise Grade.',
    line2: 'Startup Speed.',
    desc: 'AI-native platforms architected for 100K+ users, SOC-2 compliance, and global infrastructure from day one.',
    showVideo:  false,
    showCycler: false,
    duration: 6000,
    cta1: { label: 'View Our Services', to: '/services' },
    cta2: { label: 'Meet the Team',     to: '/team' },
  },
];

/* ── Hero Cycler Words ──────────────────────────────────────────── */
const HERO_CYCLER_ITEMS = [
  { text: 'MVPs',           color: '#F87171' },
  { text: 'AI SaaS',        color: '#818CF8' },
  { text: 'Web Apps',       color: '#60A5FA' },
  { text: 'Mobile Apps',    color: '#34D399' },
  { text: 'SaaS Platforms', color: '#FBBF24' },
  { text: 'AI Tools',       color: '#F472B6' },
  { text: 'Automations',    color: '#38BDF8' },
  { text: 'E-commerce',     color: '#f97316' },
];

/* ── Constants ──────────────────────────────────────────────────── */
const WHO_SERVE_ITEMS = [
  { text: 'Funded Startups',   color: '#4A9FD4' },
  { text: 'SaaS Companies',    color: '#2563eb' },
  { text: 'AI Builders',       color: '#16a34a' },
  { text: 'Enterprise Teams',  color: '#0891b2' },
  { text: 'Product Founders',  color: '#f97316' },
  { text: 'VC-Backed Teams',   color: '#0891b2' },
];

const MARQUEE_ITEMS = [
  { icon: <Rocket size={13}/>, value: '10+',     label: 'AI SaaS Products Shipped' },
  { icon: <Zap size={13}/>,    value: '6–8 Wks', label: 'MVP to Production'        },
  { icon: <BarChart3 size={13}/>, value: '70%',  label: 'Cost Savings vs US/EU'    },
  { icon: <Users size={13}/>,  value: '3+ Yrs',  label: 'Zero Team Turnover'       },
  { icon: <Shield size={13}/>, value: '99.9%',   label: 'Uptime SLA Delivered'     },
  { icon: <Award size={13}/>,  value: 'IIT/NIT', label: 'Top 1% Engineers'         },
  { icon: <Brain size={13}/>,  value: '$62B',    label: 'AI SaaS Market by 2025'   },
  { icon: <Globe size={13}/>,  value: '35%',     label: 'AI SaaS Annual Growth'    },
];

const TRUST_ITEMS = [
  'IIT Delhi Engineers', 'AWS Partner Network', 'IIT Bombay Alumni',
  'OpenAI Platform', 'NIT Warangal Engineers', 'Stripe Integrated',
  'IIT Madras Alumni', 'Google Cloud Ready', 'NIT Calicut Engineers',
  'Backed by Estoras Group · Canada', 'NIT Surathkal Alumni', 'Techstars Community',
];

const BUILD_CARDS = [
  {
    icon: Brain, color: '#2563eb',
    title: 'AI-Native SaaS',
    tag: 'GPT-4o · LangChain',
    desc: 'LLM features, AI pipelines, vector search, and intelligent workflows that actually ship to production.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=60',
    slug: 'ai-native-saas',
  },
  {
    icon: Rocket, color: '#f97316',
    title: 'MVP in 6–8 Weeks',
    tag: '0 → Live, Fast',
    desc: 'Validated product in your market before competitors blink. Architected to scale from day one.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60',
    slug: 'mvp-development',
  },
  {
    icon: Globe, color: '#0891b2',
    title: 'Web App Development',
    tag: 'React · Node.js',
    desc: 'Pixel-perfect, high-performance full-stack web applications built for speed and reliability.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=60',
    slug: 'web-development',
  },
  {
    icon: Smartphone, color: '#16a34a',
    title: 'Mobile App Development',
    tag: 'iOS · Android',
    desc: 'Native-quality mobile apps shipped in parallel with your web product. One team, full stack.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=60',
    slug: 'mobile-development',
  },
  {
    icon: Cloud, color: '#0891b2',
    title: 'Cloud & DevOps',
    tag: 'AWS · Kubernetes',
    desc: 'Zero-downtime infrastructure, auto-scaling, CI/CD pipelines, and 99.9% uptime SLAs.',
    img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=60',
    slug: 'cloud-devops',
  },
  {
    icon: Building2, color: '#2563eb',
    title: 'Enterprise SaaS',
    tag: 'Multi-tenant · SOC-2',
    desc: 'Complex platforms for 100K+ users. Microservices, Kubernetes, enterprise security baked in.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=60',
    slug: 'enterprise-saas',
  },
];

const PROCESS_STEPS = [
  {
    num: '01', Icon: Search, color: '#4A9FD4',
    week: 'Week 1',
    title: 'Discovery & Jira Setup',
    badges: ['Jira Board', 'Figma', 'Notion'],
    desc: 'We scope your product, define user stories, and build a full Jira project — epics, milestones, and sprint backlog — before a single line of code is written.',
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=50',
  },
  {
    num: '02', Icon: Layers, color: '#0891b2',
    week: 'Week 1–2',
    title: 'Architecture Sprint',
    badges: ['System Design', 'API Contracts', 'ERD'],
    desc: 'Senior IIT/NIT engineers design your full system: DB schema, microservices map, and API contracts. Each module gets its own Jira epic so you track everything.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=50',
  },
  {
    num: '03', Icon: Code2, color: '#16a34a',
    week: 'Weeks 2–6',
    title: 'Agile Build Sprints',
    badges: ['2-Week Sprints', 'Daily Standups', 'Friday Demos'],
    desc: '2-week agile sprints with daily check-ins and a live product demo every Friday. Your Jira board shows real-time progress — no black-box development, ever.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=50',
  },
  {
    num: '04', Icon: Rocket, color: '#f97316',
    week: 'Week 7–8',
    title: 'QA, Launch & Handover',
    badges: ['CI/CD', 'Load Testing', '30-Day Support'],
    desc: 'Automated tests, load testing, zero-downtime production deploy, and a full handover doc. 30-day post-launch engineering support is included on every project.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=50',
  },
];

const WHO_SERVE = [
  { icon: Rocket,       color: '#2563eb', title: 'SaaS Startups',             desc: 'Launch fast. Architecture that scales with your growth, no re-platforming needed.',      img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=60' },
  { icon: TrendingUp,   color: '#0891b2', title: 'Growing Tech Companies',    desc: 'Faster AI features, solid infra — your engineers, never a bottleneck.',                  img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=60' },
  { icon: ShoppingCart, color: '#f97316', title: 'E-commerce & Marketplaces', desc: 'High-traffic architecture for millions of transactions with zero downtime.',             img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=60' },
  { icon: Sparkles,     color: '#2563eb', title: 'Enterprises Adding AI',     desc: 'Production-grade GPT-4o integrations with measurable ROI and enterprise security.',      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=60' },
  { icon: Brain,        color: '#16a34a', title: 'Healthcare & HealthTech',   desc: 'HIPAA-compliant platforms, patient portals and AI-assisted diagnostics.',                img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60' },
  { icon: Users,        color: '#0891b2', title: 'EdTech & Learning',         desc: 'AI tutors, live class infra and adaptive assessments for real outcomes.',                  img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=60' },
  { icon: Shield,       color: '#16a34a', title: 'FinTech & Banking',         desc: 'Secure payment platforms, lending apps and open-banking integrations.',                    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=60' },
  { icon: Building2,    color: '#f97316', title: 'Real Estate & PropTech',    desc: 'AI-powered valuations, virtual tours and smart contract workflows.',                      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=60' },
];

const TECH_GROUPS = [
  {
    label: 'AI & Machine Learning',
    Icon: Brain,
    color: '#2563eb',
    bg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60',
    desc: 'LLMs, AI pipelines, RAG & vector search',
    techs: [
      { name: 'GPT-4o',      img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
      { name: 'Claude AI',   img: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg' },
      { name: 'LangChain',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'OpenAI API',  img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
      { name: 'Pinecone',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'HuggingFace', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    ],
  },
  {
    label: 'Frontend & Mobile',
    Icon: Smartphone,
    color: '#2176AE',
    bg: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=60',
    desc: 'Web, iOS, Android — pixel-perfect UIs',
    techs: [
      { name: 'React',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'React Native', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Flutter',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Swift',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
      { name: 'TypeScript',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Vue.js',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Tailwind CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    label: 'Backend & Data',
    Icon: Server,
    color: '#059669',
    bg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=60',
    desc: 'Scalable APIs, databases & real-time systems',
    techs: [
      { name: 'Node.js',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Ruby on Rails',img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg' },
      { name: 'PostgreSQL',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'GraphQL',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
      { name: 'Kafka',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    Icon: Cloud,
    color: '#0891B2',
    bg: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=60',
    desc: 'Auto-scaling, CI/CD & 99.9% uptime SLA',
    techs: [
      { name: 'AWS',          img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Google Cloud', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Docker',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Terraform',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
      { name: 'GitHub Actions',img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Nginx',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
      { name: 'DigitalOcean', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg' },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote: "AIJOHN built the core AI platform for Neyo.ai with a level of depth and speed I hadn't seen from any dev partner before. They didn't just execute — they architected. Senior engineers, zero hand-holding needed. Genuinely felt like co-founders.",
    author: 'Chris', role: 'Founder & CEO', company: 'Neyo.ai', stage: 'AI SaaS · neyo.ai',
    rating: 5, initials: 'CD', color: '#4A9FD4',
  },
  {
    quote: "ROSOR needed a solid engineering team fast — AIJOHN delivered clean architecture, fast turnaround, and zero drama. They understood our product vision immediately and shipped exactly what we needed. Highly recommend them to any serious founder.",
    author: 'Alex', role: 'Founder', company: 'ROSOR', stage: 'PropTech · rosor.ca',
    rating: 5, initials: 'AL', color: '#0891b2',
  },
  {
    quote: "We came with a rough concept and they returned a full architecture doc in 3 days. The MVP was live in 6 weeks, on budget. Our investors were genuinely impressed with the speed and the code quality. Best engineering partner we've worked with.",
    author: 'Marcus Osei', role: 'Founder & CEO', company: 'Logiflex', stage: 'Pre-Seed · AI SaaS',
    rating: 5, initials: 'MO', color: '#16a34a',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.55, ease: [0.4, 0, 0.2, 1] } }),
};

/* ── Page ────────────────────────────────────────────────────────── */
export default function Home() {
  useSEO({
    rawTitle: 'AIJOHN Technosoft | AI-Native SaaS Studio',
    description: 'AIJOHN Technosoft is an AI-native SaaS studio shipping enterprise products in 6-8 weeks. Fixed-price MVPs, AI features, and cloud platforms built for production — not demos.',
    path: '/',
  });
  return (
    <PageWrapper>
      <HeroSection />
      <TrustBarSection />
      <StatsMarquee />
      <WhatWeBuildSection />
      <ProcessSection />
      <WhoWeServeSection />
      <TechStackSection />
      <TestimonialsSection />
      <EstorasSection />
      <HomeCTASection />
    </PageWrapper>
  );
}

/* ── Hero — Carousel with Cinematic Video ───────────────────────── */
function HeroSection() {
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Auto-advance: video slide waits for onEnded; other slides use timeout */
  useEffect(() => {
    if (current.showVideo) return; // video's onEnded handles the transition
    const t = setTimeout(() => setSlide(s => (s + 1) % SLIDES.length), current.duration);
    return () => clearTimeout(t);
  }, [slide, current.duration, current.showVideo]);

  /* Reset + replay video whenever slide 0 becomes active */
  useEffect(() => {
    if (current.showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [slide, current.showVideo]);

  const handleVideoEnded = useCallback(() => {
    setSlide(s => (s + 1) % SLIDES.length);
  }, []);

  const goTo = useCallback((i)  => { setSlide(i); }, []);
  const prev = useCallback(() => setSlide(s => (s + SLIDES.length - 1) % SLIDES.length), []);
  const next = useCallback(() => setSlide(s => (s + 1) % SLIDES.length), []);

  return (
    <section className="home-hero">
      {/* Slide background images — never shown on video slide */}
      {SLIDES.map((s, i) => (
        <div key={s.id}
          className={`hero-slide-bg${(i === slide && !s.showVideo) ? ' hero-slide-bg--active' : ''}`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Cinematic video — full opacity on slide 0, hidden on others */}
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay muted playsInline preload="auto"
        onEnded={handleVideoEnded}
        style={{
          opacity: current.showVideo ? 1 : 0,
          transition: videoReady ? 'opacity 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Blue cinematic overlay */}
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-fade-bottom" aria-hidden="true" />

      {/* Slide content */}
      <div className="home-hero__content">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={slide} className="home-hero__inner"
              initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(3px)' }}
              transition={{ duration: 0.72, ease: [0.22, 0.61, 0.36, 1] }}>

              {/* Slide tag pill */}
              <div className="home-hero__slide-tag" style={{ '--accent': current.accent }}>
                <span className="home-hero__slide-tag-dot" />{current.tag}
              </div>

              {/* ① 2-line headline — reduced size */}
              <h1 className="home-hero__title">
                <span className="home-hero__line1">{current.line1}</span>
                <span className="home-hero__line2">{current.line2}</span>
              </h1>

              {/* ② 1 description line */}
              <p className="home-hero__desc">{current.desc}</p>

              {/* ③ We Build [cycling] — only on slide 0 */}
              {current.showCycler && (
                <div className="home-hero__build-row">
                  <span className="home-hero__build-label">We Build</span>
                  <TextCycler items={HERO_CYCLER_ITEMS} interval={2000} className="home-hero__inline-cycler" />
                </div>
              )}

              {/* ④ CTAs — per-slide */}
              <div className="home-hero__ctas">
                <Link to={current.cta1.to} className="btn-hero-primary">
                  {current.cta1.label}
                  <span className="btn-hero-primary__arrow-wrap"><ArrowRight size={16} /></span>
                </Link>
                <Link to={current.cta2.to} className="btn-hero-outline">
                  {current.cta2.label} {current.cta2.zap && <Zap size={14} />}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next nav */}
      <button className="hero-nav hero-nav--prev" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button className="hero-nav hero-nav--next" onClick={next} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      {/* Slide dots */}
      <div className="hero-dots" role="tablist">
        {SLIDES.map((s, i) => (
          <button key={i} role="tab" aria-selected={i === slide} aria-label={`Slide ${i + 1}`}
            className={`hero-dot${i === slide ? ' hero-dot--active' : ''}`}
            style={{ '--accent': s.accent }} onClick={() => goTo(i)} />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line">
          <motion.div className="hero-scroll-fill"
            animate={{ scaleY: [0, 1, 1, 0], y: ['0%', '0%', '0%', '100%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1] }} />
        </div>
        <span className="hero-scroll-label">Scroll</span>
      </div>
    </section>
  );
}

/* ── Trust Bar ────────────────────────────────────────────────────── */
function TrustBarSection() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div className="trust-bar">
      <div className="trust-bar__track">
        {items.map((item, i) => (
          <div key={i} className="trust-bar__item">
            <span className="trust-bar__dot" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Marquee ────────────────────────────────────────────────── */
function StatsMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="stats-marquee">
      <div className="stats-marquee__track">
        {items.map((it, i) => (
          <div key={i} className="stats-marquee__item">
            <span className="stats-marquee__icon">{it.icon}</span>
            <span className="stats-marquee__val">{it.value}</span>
            <span className="stats-marquee__lbl">{it.label}</span>
            <span className="stats-marquee__sep">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── What We Build — Image Tiles ──────────────────────────────────── */
function WhatWeBuildSection() {
  return (
    <section className="section home-build-section">
      {/* Background texture */}
      <div className="home-build-section__bg" aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-center" data-aos="fade-up">
          <span className="section-tag dark-tag"><Layers size={12} /> Our Services</span>
          <h2 className="section-title dark-title">Everything You Need to Ship</h2>
          <p className="section-subtitle dark-subtitle">Six specialties, one obsession — delivering AI products that actually go to production.</p>
        </div>
        <div className="home-build-grid">
          {BUILD_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link to={`/services/${c.slug}`} key={c.title} className="home-build-card-link">
                <motion.div
                  className="home-build-card"
                  style={{ '--card-color': c.color }}
                  custom={i} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                >
                  {/* Background image */}
                  <div className="home-build-card__bg" style={{ backgroundImage: `url(${c.img})` }} />
                  {/* Color-tinted overlay */}
                  <div className="home-build-card__overlay" />
                  {/* Content */}
                  <div className="home-build-card__content">
                    <motion.div className="home-build-card__icon-wrap"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
                      <Icon size={24} />
                    </motion.div>
                    <span className="home-build-card__tag">{c.tag}</span>
                    <h3 className="home-build-card__title">{c.title}</h3>
                    <p className="home-build-card__desc">{c.desc}</p>
                    <div className="home-build-card__cta">
                      Explore →
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Process ──────────────────────────────────────────────────────── */
function ProcessSection() {
  const pipeline = [
    { label: 'Discovery', sub: 'Wk 1',    color: '#4A9FD4', pct: '12%' },
    { label: 'Architect', sub: 'Wk 1–2',  color: '#0891b2', pct: '13%' },
    { label: 'Build Sprints', sub: 'Wks 2–6', color: '#16a34a', pct: '62%' },
    { label: 'Launch',    sub: 'Wk 7–8',  color: '#f97316', pct: '13%' },
  ];
  return (
    <section className="section home-process-section">
      <div className="home-process__bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-center" data-aos="fade-up">
          <span className="section-tag"><Zap size={12} /> How We Work</span>
          <h2 className="section-title">From Idea to Live Product<br/>in 8 Weeks</h2>
          <p className="section-subtitle">No long planning phases. No spec documents that gather dust. Working software, every sprint.</p>
        </div>

        {/* 8-Week Pipeline Timeline */}
        <div className="home-process-pipeline" data-aos="fade-up">
          <div className="home-process-pipeline__label">⚡ 8-Week MVP Pipeline</div>
          <div className="home-process-pipeline__track">
            {pipeline.map((seg) => (
              <div
                key={seg.label}
                className="home-process-pipeline__seg"
                style={{ width: seg.pct, '--seg-color': seg.color }}
              >
                <span className="home-process-pipeline__seg-label">{seg.label}</span>
                <span className="home-process-pipeline__seg-sub">{seg.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="home-process-grid">
          {PROCESS_STEPS.map((step, i) => {
            const { Icon, color, num, week, title, badges, desc, img } = step;
            return (
              <motion.div
                key={title} className="home-process-card"
                style={{ '--proc-color': color }}
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                {img && <div className="home-process-card__bg" style={{ backgroundImage: `url(${img})` }} />}
                <div className="home-process-card__top-row">
                  <div className="home-process-card__num">{num}</div>
                  <span className="home-process-card__week">{week}</span>
                </div>
                <motion.div className="home-process-card__icon"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
                  <Icon size={22} />
                </motion.div>
                <h3 className="home-process-card__title">{title}</h3>
                <p className="home-process-card__desc">{desc}</p>
                <div className="home-process-card__badges">
                  {badges.map(b => <span key={b} className="home-process-card__badge">{b}</span>)}
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className="home-process-card__connector" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Who We Serve — 8-tile image grid ─────────────────────────── */
function WhoWeServeSection() {
  return (
    <section className="home-serve-section">
      <div className="home-serve-mesh" aria-hidden="true" />
      <div className="container home-serve__inner">
        <div className="section-center home-serve__header" data-aos="fade-up">
          <span className="section-tag home-serve__tag"><Globe size={12} /> Who We Serve</span>
          <h2 className="section-title home-serve__title">
            Built for{' '}
            <TextCycler items={WHO_SERVE_ITEMS} interval={2000} className="home-serve__cycler" />
          </h2>
          <p className="section-subtitle home-serve__subtitle">
            From pre-seed AI startups to enterprise teams — we adapt to your stage and move at your pace.
          </p>
        </div>
        <div className="home-serve-grid">
          {WHO_SERVE.map((w, i) => {
            const Icon = w.icon;
            return (
              <Link to="/contact" key={w.title} className="home-serve-card-link">
                <motion.div
                  className="home-serve-card"
                  style={{ '--serve-color': w.color }}
                  custom={i} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                >
                  <div className="home-serve-card__bg" style={{ backgroundImage: `url(${w.img})` }} />
                  <div className="home-serve-card__overlay" />
                  <div className="home-serve-card__content">
                    <motion.div className="home-serve-card__icon-wrap"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
                      <Icon size={20} />
                    </motion.div>
                    <h3 className="home-serve-card__title">{w.title}</h3>
                    <p className="home-serve-card__desc">{w.desc}</p>
                    <div className="home-serve-card__cta">Explore →</div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Tech Stack — 3 Groups ──────────────────────────────────────────── */
function TechStackSection() {
  return (
    <section className="section home-stack-section">
      <div className="home-stack__bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-center" data-aos="fade-up">
          <span className="section-tag"><Cpu size={12} /> Technologies</span>
          <h2 className="section-title">The Stack We Ship In</h2>
          <p className="section-subtitle">Battle-tested, AI-ready technologies chosen for reliability, scale, and speed.</p>
        </div>
        <div className="home-tech-groups">
          {TECH_GROUPS.map((group, gi) => {
            const GroupIcon = group.Icon;
            return (
              <motion.div
                key={group.label} className="home-tech-group"
                style={{ '--group-color': group.color, '--group-bg': `url(${group.bg})` }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: gi * 0.12, duration: 0.5 }}
              >
                {/* Group header */}
                <div className="home-tech-group__hdr">
                  <div className="home-tech-group__icon"><GroupIcon size={18} /></div>
                  <div>
                    <div className="home-tech-group__label">{group.label}</div>
                    <div className="home-tech-group__desc">{group.desc}</div>
                  </div>
                </div>
                {/* Tech pills */}
                <div className="home-tech-group__pills">
                  {group.techs.map((tech, ti) => (
                    <motion.div key={tech.name} className="home-tech-pill"
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08 + ti * 0.035, duration: 0.28 }}
                      whileHover={{ y: -3, scale: 1.06, transition: { duration: 0.16 } }}
                    >
                      <img src={tech.img} alt={tech.name} className="home-tech-pill__img"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <span className="home-tech-pill__name">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="section home-testi-section">
      <div className="home-testi__bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-center" data-aos="fade-up">
          <span className="section-tag dark-tag"><MessageSquare size={12} /> Client Stories</span>
          <h2 className="section-title dark-title">Trusted by Builders Worldwide</h2>
          <p className="section-subtitle dark-subtitle">Real feedback from real product teams — not cherry-picked marketing quotes.</p>
        </div>
        <div className="home-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.author} className="home-testi-card"
              style={{ '--testi-color': t.color }}
              custom={i} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}>
              <div className="home-testi-card__glow" />
              <div className="home-testi-card__stars">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="home-testi-card__star" />
                ))}
              </div>
              <blockquote className="home-testi-card__quote">"{t.quote}"</blockquote>
              <div className="home-testi-card__author">
                <div className="home-testi-card__avatar" style={{ background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}88 100%)` }}>
                  {t.initials}
                </div>
                <div>
                  <div className="home-testi-card__name">{t.author}</div>
                  <div className="home-testi-card__role">{t.role}, {t.company}</div>
                  <div className="home-testi-card__stage">{t.stage}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Estoras — Part of Group Banner ───────────────────────────────── */
function EstorasSection() {
  return (
    <section className="home-estoras-section">
      <div className="home-estoras__glow" aria-hidden="true" />
      <div className="container">
        <motion.div className="home-estoras__inner"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}>

          {/* Left — brand identity */}
          <div className="home-estoras__brand">
            <p className="home-estoras__part-of">Part of</p>
            <h2 className="home-estoras__group-name">ESTORAS<br/>GROUP</h2>
            <p className="home-estoras__group-sub">of Companies</p>
            <p className="home-estoras__location">
              <span className="home-estoras__location-dot" aria-hidden="true" />
              Vancouver, Canada
            </p>
            <div className="home-estoras__rule" />
            <div className="home-estoras__stats">
              {[
                { val: '15+',   lbl: 'Months Together', cls: '' },
                { val: 'N.A.',  lbl: 'Market Presence', cls: 'home-estoras__stat-val--teal' },
                { val: 'F500',  lbl: 'Client Caliber',  cls: 'home-estoras__stat-val--green' },
              ].map(s => (
                <div key={s.lbl} className="home-estoras__stat">
                  <span className={`home-estoras__stat-val ${s.cls}`}>{s.val}</span>
                  <span className="home-estoras__stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — copy */}
          <div className="home-estoras__copy">
            <p className="home-estoras__copy-tag">Strategic Alliance · Canada</p>
            <p className="home-estoras__copy-body">
              AIJOHN Technosoft is a member of the Estoras Group of Companies — a
              Vancouver-based enterprise bringing Fortune-500-level trust, North American
              legal presence, and executive relationships to every client engagement.
            </p>
            <p className="home-estoras__copy-body">
              Your product is built with the rigour of a global firm, the speed of an elite
              engineering team, and the accountability of a Canadian-backed signed contract.
            </p>
            <a href="https://estorasgroup.com" target="_blank" rel="noopener noreferrer"
              className="home-estoras__link">
              estorasgroup.com <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────────────── */
function HomeCTASection() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (y - 0.5) * -14,
      ry: (x - 0.5) * 18,
      sx: x * 100,
      sy: y * 100,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });
  }, []);

  return (
    <section className="section home-cta-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}
          style={{ opacity: 1, transform: 'none' }}
        >
          <div
            ref={cardRef}
            className={`home-cta-card${tilt.active ? ' home-cta-card--tilted' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              '--spotlight-x': `${tilt.sx}%`,
              '--spotlight-y': `${tilt.sy}%`,
            }}
          >
            <div className="home-cta__glow" />
            <div className="home-cta__spotlight" />
            <ParticleCanvas className="home-cta__particles" />

            {/* Floating blobs that shift with tilt */}
            <div className="home-cta__blob home-cta__blob--1"
              style={{ transform: `translate(${tilt.ry * -1.2}px, ${tilt.rx * 1.2}px)` }} />
            <div className="home-cta__blob home-cta__blob--2"
              style={{ transform: `translate(${tilt.ry * 0.8}px, ${tilt.rx * -0.8}px)` }} />

            <div className="home-cta__content">
              <span className="home-cta__eyebrow">Let's Build Together</span>
              <h2 className="home-cta__title home-cta__title--sm">
                Ready to Ship Your{' '}
                <TextCycler
                  items={[
                    { text: 'AI SaaS?',    color: '#4A9FD4' },
                    { text: 'MVP?',        color: '#7CC2E8' },
                    { text: 'AI Product?', color: '#90d4f7' },
                  ]}
                  interval={2200}
                />
              </h2>
              <p className="home-cta__sub">Free 30-minute consultation. Fixed-price projects. Honest scoping with real timelines.</p>
              <div className="home-cta__actions">
                <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer" className="home-cta__btn-primary">
                  Book a Free Call
                  <span className="home-cta__btn-primary__arrow"><ArrowRight size={16} /></span>
                </a>
                <Link to="/estimate" className="home-cta__btn-secondary">
                  AI Estimator <Zap size={14} />
                </Link>
              </div>
              <p className="home-cta__note">
                <CheckCircle2 size={13} style={{ color: '#34d399' }} /> Response within 24 hours &nbsp;•&nbsp;
                <CheckCircle2 size={13} style={{ color: '#34d399' }} /> Fixed-price guarantee
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
