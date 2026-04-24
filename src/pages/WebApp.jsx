import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Monitor, Tablet, Smartphone, Zap, Shield, Database,
  BarChart3, Brain, Code2, Cloud, RefreshCw, CheckCircle2,
  Layers, Lock, Activity, LayoutDashboard, GitBranch,
  Globe, Search, Cpu, Boxes, Rocket, Wrench, Sparkles,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './WebApp.css';

/* ─────────────────────── animation variants ─────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.52, ease: [0.4, 0, 0.2, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ─────────────────────── Tilt card component ─────────────────────── */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref} className={className} style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse} onMouseLeave={reset}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── data ─────────────────────── */
const TIERS = [
  {
    id: 'mvp',
    icon: Rocket,
    label: 'Startup MVP',
    color: '#2176ae',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0e2545 100%)',
    tagline: 'Idea to working product.',
    desc: 'Built fast, architected right. Everything a founder needs to validate, pitch, and launch — without the technical debt that kills momentum later.',
    features: ['Core feature set', 'Scalable architecture from day one', 'Auth + onboarding UX', 'Mobile-responsive frontend', 'Deploy to production', 'Zero shortcuts on code quality'],
  },
  {
    id: 'product',
    icon: Layers,
    label: 'Product SaaS',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #160b2e 0%, #2d1462 100%)',
    tagline: 'Build the full product.',
    desc: 'Multi-tenant SaaS with everything a growing team needs — billing, analytics, admin, integrations. Designed to handle real users and real scale.',
    features: ['Multi-tenant architecture', 'Stripe billing & subscriptions', 'Analytics dashboards', 'Role-based access control', 'API-first design', 'CI/CD + monitoring'],
  },
  {
    id: 'enterprise',
    icon: Shield,
    label: 'Enterprise Grade',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #051a12 0%, #0a3321 100%)',
    tagline: 'Built for serious scale.',
    desc: 'Complex, high-stakes systems with high availability, security reviews, compliance, and the architectural depth that enterprise clients demand.',
    features: ['Custom high-availability architecture', 'SOC 2 / HIPAA considerations', 'SSO, SAML & enterprise auth', 'Data isolation & multi-region', 'SLA-backed deployment', 'Dedicated engineering support'],
  },
];

const BUILDS = [
  {
    Icon: LayoutDashboard, color: '#2176ae',
    iconAnim: { animate: { scale: [1, 1.05, 1] }, transition: { duration: 3, repeat: Infinity } },
    hoverAnim: { scale: 1.25, rotate: -5 },
    title: 'SaaS Platforms',
    desc: 'Multi-tenant subscription products with workspace isolation, billing, and RBAC — architected to grow from 10 users to 100,000.',
    tags: ['Multi-tenant', 'Subscription billing', 'RBAC', 'Usage metering'],
  },
  {
    Icon: BarChart3, color: '#0891b2',
    iconAnim: { animate: { scaleY: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
    hoverAnim: { scale: 1.25, y: -4 },
    title: 'Analytics Dashboards',
    desc: 'Real-time charts, virtual scrolling for millions of rows, export to CSV/Excel/PDF, and advanced filtering for data-heavy applications.',
    tags: ['Real-time data', 'Large datasets', 'Chart viz', 'Export'],
  },
  {
    Icon: Brain, color: '#7c3aed',
    iconAnim: { animate: { scale: [1, 1.08, 1] }, transition: { duration: 2.2, repeat: Infinity } },
    hoverAnim: { scale: 1.3, rotate: 10 },
    title: 'AI-Powered Apps',
    desc: 'LLM features built into the product — chat interfaces, smart recommendations, document analysis, natural language search.',
    tags: ['OpenAI / Claude', 'RAG pipelines', 'Embeddings', 'AI agents'],
  },
  {
    Icon: Boxes, color: '#059669',
    iconAnim: { animate: { rotate: [0, 5, -5, 0] }, transition: { duration: 4, repeat: Infinity } },
    hoverAnim: { scale: 1.25, rotate: 15 },
    title: 'Internal Tools & CRMs',
    desc: 'Custom admin panels, CRM systems, workflow tools, and dashboards that replace generic software with something that fits exactly.',
    tags: ['Custom workflows', 'Admin UX', 'Integrations', 'Automation'],
  },
  {
    Icon: Globe, color: '#dc2626',
    iconAnim: { animate: { rotate: [0, 360] }, transition: { duration: 14, repeat: Infinity, ease: 'linear' } },
    hoverAnim: { scale: 1.25 },
    title: 'Marketplace Platforms',
    desc: 'Multi-sided platforms with buyers and sellers, payment splits, listing management, reviews, and the operational complexity that comes with it.',
    tags: ['Stripe Connect', 'Listings', 'Search', 'Payments'],
  },
  {
    Icon: Rocket, color: '#d97706',
    iconAnim: { animate: { y: [0, -4, 0] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
    hoverAnim: { scale: 1.3, y: -6, rotate: -15 },
    title: 'MVPs & Startup Products',
    desc: 'Investor-ready products built fast without technical debt. Architecture decisions made upfront so the codebase can actually scale.',
    tags: ['Fast to market', 'Scalable arch', 'Full-stack', 'Launch ready'],
  },
];

const PROCESS = [
  { num: '01', Icon: Search,        title: 'Discovery',         desc: 'Requirements, data model, architecture decisions that are hardest to undo.', color: '#2176ae' },
  { num: '02', Icon: Layers,        title: 'Design',            desc: 'FANG-level UI system — components, tokens, spacing, accessibility.',          color: '#7c3aed' },
  { num: '03', Icon: Code2,         title: 'Frontend',          desc: 'React / Next.js with TypeScript. Component-driven. Tested. Fast.',             color: '#0891b2' },
  { num: '04', Icon: Database,      title: 'Backend',           desc: 'Rails or Node API, database schema, auth, business logic.',                   color: '#059669' },
  { num: '05', Icon: Brain,         title: 'AI Layer',          desc: 'LLM integrations, embeddings, smart features — built in, not added on.',      color: '#7c3aed' },
  { num: '06', Icon: BarChart3,     title: 'Data & Analytics',  desc: 'Charts, exports, filtering, virtual scroll for large datasets.',               color: '#dc2626' },
  { num: '07', Icon: CheckCircle2,  title: 'QA & Testing',      desc: 'Automated tests, cross-browser, load testing, security review.',               color: '#d97706' },
  { num: '08', Icon: Cloud,         title: 'Deploy & Monitor',  desc: 'AWS / Vercel infrastructure, CI/CD, monitoring, alerting.',                   color: '#2176ae' },
];

const CAPABILITIES = [
  { Icon: Code2,          color: '#2176ae', title: 'React / Next.js Frontends',    points: ['TypeScript throughout', 'SSR / SSG / ISR modes', 'Component design systems', 'Core Web Vitals optimised'] },
  { Icon: Database,       color: '#0891b2', title: 'Database Architecture',         points: ['PostgreSQL schema design', 'Redis caching layers', 'Elasticsearch full-text', 'Query optimisation & indexing'] },
  { Icon: Activity,       color: '#7c3aed', title: 'Real-Time Features',            points: ['WebSocket live updates', 'Server-Sent Events', 'Presence & collaboration', 'Notification systems'] },
  { Icon: Lock,           color: '#059669', title: 'Auth & Security',               points: ['OAuth 2.0 / SSO / SAML', 'Role-based access control', '2FA & MFA', 'OWASP top-10 compliance'] },
  { Icon: Layers,         color: '#dc2626', title: 'Multi-Tenant SaaS',             points: ['Workspace isolation', 'Stripe billing integration', 'Usage-based metering', 'Subdomain routing'] },
  { Icon: Brain,          color: '#7c3aed', title: 'AI Integration',                points: ['GPT-4o & Claude API', 'RAG pipeline architecture', 'Vector DB (pgvector, Pinecone)', 'LangChain workflows'] },
  { Icon: BarChart3,      color: '#0891b2', title: 'Analytics & Dashboards',        points: ['Recharts / Chart.js / D3', 'Virtual scroll for 1M+ rows', 'Export: CSV, Excel, PDF', 'Advanced filter & sort UI'] },
  { Icon: Zap,            color: '#d97706', title: 'Performance Engineering',        points: ['<2s LCP targets', 'CDN & edge caching', 'Code splitting & lazy load', 'Bundle size budgets'] },
  { Icon: GitBranch,      color: '#059669', title: 'CI/CD & DevOps',                points: ['GitHub Actions pipelines', 'Docker containerisation', 'Zero-downtime deploys', 'Automated rollbacks'] },
  { Icon: Monitor,        color: '#2176ae', title: 'Responsive & Cross-Browser',     points: ['320px → 2560px breakpoints', 'Chrome, Firefox, Safari, Edge', 'Touch & gesture support', 'WCAG 2.1 AA accessibility'] },
  { Icon: Shield,         color: '#dc2626', title: 'API Design',                     points: ['REST & GraphQL APIs', 'Rate limiting & throttling', 'OpenAPI documentation', 'Webhook systems'] },
  { Icon: Wrench,         color: '#d97706', title: 'Post-Launch Support',            points: ['Production monitoring', 'Error tracking (Sentry)', 'Weekly performance reports', 'Ongoing feature iterations'] },
];

const STACK = [
  { group: 'Frontend',  items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { group: 'Backend',   items: ['Ruby on Rails', 'Node.js', 'FastAPI', 'Python', 'GraphQL', 'REST'] },
  { group: 'Database',  items: ['PostgreSQL', 'Redis', 'Elasticsearch', 'MongoDB', 'pgvector', 'S3'] },
  { group: 'AI / ML',   items: ['OpenAI GPT-4o', 'Claude API', 'LangChain', 'Pinecone', 'Whisper', 'HuggingFace'] },
  { group: 'DevOps',    items: ['AWS', 'Docker', 'GitHub Actions', 'Vercel', 'nginx', 'Terraform'] },
];

const AFTER = [
  { Icon: Activity,  color: '#2176ae', title: 'Monitoring & Alerts',  desc: 'Uptime monitoring, Sentry error tracking, and real-time alerts so you know before your users do.' },
  { Icon: Shield,    color: '#059669', title: 'Security Patches',     desc: 'Dependency updates, CVE monitoring, and proactive security reviews on a regular cadence.' },
  { Icon: Zap,       color: '#d97706', title: 'Performance Tuning',   desc: 'Ongoing query optimisation, cache tuning, and Core Web Vitals tracking to keep the product fast.' },
  { Icon: RefreshCw, color: '#7c3aed', title: 'Feature Iterations',   desc: 'Sprint-based feature work, bug fixes, and UX improvements — the product keeps improving after launch.' },
];

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function WebApp() {
  useSEO({
    title: 'Web App Development — AIJohn',
    description: 'Full-stack web app development from FANG-level design to production. SaaS, dashboards, AI apps, and enterprise systems.',
    path: '/services/web-development',
  });

  return (
    <PageWrapper>

      {/* ══════════════════════  HERO  ══════════════════════ */}
      <section className="wa-hero">
        <div className="wa-hero__noise" />
        <div className="wa-hero__grid" />
        <div className="wa-hero__glow wa-hero__glow--1" />
        <div className="wa-hero__glow wa-hero__glow--2" />
        <div className="wa-hero__glow wa-hero__glow--3" />
        <div className="container wa-hero__inner">
          <motion.div className="wa-hero__copy"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="wa-hero__breadcrumb">
              <Link to="/services">Services</Link><span>/</span><span>Web App Development</span>
            </div>
            <div className="wa-hero__badge">
              <motion.span animate={{ opacity: [0.6,1,0.6] }} transition={{ duration: 2, repeat: Infinity }}>●</motion.span>
              &nbsp;AI-First Engineering
            </div>
            <h1 className="wa-hero__h1">
              Web apps engineered<br />
              <em className="wa-hero__gradient">to FANG standards.</em>
            </h1>
            <p className="wa-hero__sub">
              From the first architecture decision to production and beyond —
              full-stack web applications that are fast, scalable, secure, and
              built to last. AI-powered features included by default.
            </p>
            <div className="wa-hero__btns">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/estimate" className="wa-hero-cta-primary">Estimate your project <ArrowRight size={15}/></Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="wa-hero-cta-secondary">Talk to us</Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Browser mockup */}
          <motion.div className="wa-hero__mockup"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}>
            <motion.div className="wa-browser wa-browser--lg"
              animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="wa-browser__chrome">
                <div className="wa-browser__dots"><span/><span/><span/></div>
                <div className="wa-browser__bar">app.yourstartup.com/dashboard</div>
                <div className="wa-browser__actions"><span/><span/></div>
              </div>
              <div className="wa-browser__screen">
                <div className="wa-app">
                  <div className="wa-app__nav">
                    <div className="wa-app__logo"/>
                    <div className="wa-app__nav-items"><span/><span/><span/><span/></div>
                    <div className="wa-app__search"/>
                    <div className="wa-app__avatar"/>
                  </div>
                  <div className="wa-app__body">
                    <div className="wa-app__sidebar">
                      <div className="wa-app__sb-item wa-app__sb-item--active"/>
                      {[1,2,3,4,5].map(i=><div key={i} className="wa-app__sb-item"/>)}
                    </div>
                    <div className="wa-app__content">
                      <div className="wa-app__metrics">
                        {['blue','green','purple','orange'].map(c=>(
                          <div key={c} className="wa-app__metric">
                            <div className={`wa-app__metric-val wa-app__metric-val--${c}`}/>
                            <div className="wa-app__metric-lbl"/>
                            <div className="wa-app__metric-sub"/>
                          </div>
                        ))}
                      </div>
                      <div className="wa-app__charts">
                        <div className="wa-app__chart-main">
                          <div className="wa-app__chart-label"/>
                          <div className="wa-app__chart-bars">
                            {[55,80,45,90,65,75,88,50,70,95,60,85].map((h,i)=>(
                              <motion.div key={i} className="wa-app__bar"
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.8 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="wa-app__chart-side">
                          <div className="wa-app__donut"/>
                          <div className="wa-app__donut-legend">
                            {['blue','purple','green','orange'].map(c=>(
                              <div key={c} className="wa-app__legend-item">
                                <span className={`wa-app__legend-dot wa-app__legend-dot--${c}`}/>
                                <span className="wa-app__legend-lbl"/>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="wa-app__table">
                        <div className="wa-app__table-head">
                          {[1,2,3,4].map(i=><div key={i} className="wa-app__th"/>)}
                        </div>
                        {[1,2,3,4].map(i=>(
                          <div key={i} className="wa-app__table-row">
                            <div className="wa-app__td wa-app__td--avatar"/>
                            <div className="wa-app__td wa-app__td--text"/>
                            <div className="wa-app__td wa-app__td--tag"/>
                            <div className="wa-app__td wa-app__td--num"/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="wa-device wa-device--tablet"
              animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
              <div className="wa-device__notch"/>
              <div className="wa-device__screen">
                <div className="wa-app wa-app--sm">
                  <div className="wa-app__nav wa-app__nav--sm"/>
                  <div className="wa-app__content" style={{padding:'8px',gap:'6px',display:'flex',flexDirection:'column'}}>
                    <div className="wa-app__metrics wa-app__metrics--2">
                      {['blue','purple'].map(c=>(
                        <div key={c} className="wa-app__metric">
                          <div className={`wa-app__metric-val wa-app__metric-val--${c}`}/>
                          <div className="wa-app__metric-lbl"/>
                        </div>
                      ))}
                    </div>
                    <div className="wa-app__chart-main" style={{flex:1,minHeight:60}}>
                      <div className="wa-app__chart-bars">
                        {[60,85,50,90,70,80].map((h,i)=>(
                          <div key={i} className="wa-app__bar" style={{height:`${h}%`}}/>
                        ))}
                      </div>
                    </div>
                    <div className="wa-app__table">
                      <div className="wa-app__table-head"><div className="wa-app__th"/></div>
                      {[1,2,3].map(i=>(
                        <div key={i} className="wa-app__table-row">
                          <div className="wa-app__td wa-app__td--text"/>
                          <div className="wa-app__td wa-app__td--num"/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="wa-device wa-device--mobile"
              animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <div className="wa-device__notch wa-device__notch--sm"/>
              <div className="wa-device__screen">
                <div className="wa-app wa-app--mobile">
                  <div className="wa-app__nav wa-app__nav--sm"/>
                  <div style={{padding:'6px',display:'flex',flexDirection:'column',gap:'5px',flex:1}}>
                    <div className="wa-app__metric wa-app__metric--full">
                      <div className="wa-app__metric-val wa-app__metric-val--purple" style={{width:'80%'}}/>
                      <div className="wa-app__metric-lbl"/>
                    </div>
                    <div className="wa-app__chart-main" style={{flex:1,minHeight:50}}>
                      <div className="wa-app__chart-bars">
                        {[70,50,90,60,80,55].map((h,i)=>(
                          <div key={i} className="wa-app__bar" style={{height:`${h}%`}}/>
                        ))}
                      </div>
                    </div>
                    {[1,2,3].map(i=>(
                      <div key={i} className="wa-app__table-row" style={{padding:'4px 6px'}}>
                        <div className="wa-app__td wa-app__td--avatar" style={{width:14,height:14}}/>
                        <div className="wa-app__td wa-app__td--text"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════  TIERS  ══════════════════════ */}
      <section className="wa-tiers">
        <div className="wa-tiers__stripe"/>
        <div className="container">
          <motion.div className="wa-tiers__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag wa-section-tag--light">Built for every stage</span>
            <h2 className="wa-section-title wa-section-title--light">MVP. Product. Enterprise.<br/>We build all three.</h2>
          </motion.div>
          <div className="wa-tiers__grid">
            {TIERS.map((tier, i) => (
              <motion.div key={tier.id}
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
                <TiltCard className="wa-tier-card" style={{ '--tier-color': tier.color }}>
                  <div className="wa-tier-card__bg" style={{ background: tier.gradient }}/>
                  <div className="wa-tier-card__glow"/>
                  <div className="wa-tier-card__content">
                    <motion.div className="wa-tier-card__icon"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}>
                      <tier.icon size={24}/>
                    </motion.div>
                    <div className="wa-tier-card__label">{tier.label}</div>
                    <div className="wa-tier-card__tagline">{tier.tagline}</div>
                    <p className="wa-tier-card__desc">{tier.desc}</p>
                    <ul className="wa-tier-card__features">
                      {tier.features.map((f, fi) => (
                        <motion.li key={f}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.06 + 0.3 }}>
                          <CheckCircle2 size={12}/> {f}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div className="wa-tier-card__cta"
                      whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <Link to="/estimate">Get started <ArrowRight size={13}/></Link>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  WHAT WE BUILD  ══════════════════════ */}
      <section className="section wa-builds">
        <div className="wa-builds__orb wa-builds__orb--1"/>
        <div className="wa-builds__orb wa-builds__orb--2"/>
        <div className="wa-builds__dots"/>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div className="wa-builds__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">What we build</span>
            <h2 className="wa-section-title">Six types of web product.<br/>One standard of quality.</h2>
          </motion.div>
          <div className="wa-builds__grid">
            {BUILDS.map((b, i) => (
              <motion.div key={b.title}
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                className="wa-build-card"
                style={{ '--accent': b.color }}>
                <div className="wa-build-card__shimmer"/>
                <div className="wa-build-card__glow-border"/>
                <motion.div className="wa-build-card__icon"
                  {...b.iconAnim}
                  whileHover={b.hoverAnim}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                  <b.Icon size={22}/>
                </motion.div>
                <h3 className="wa-build-card__title">{b.title}</h3>
                <p className="wa-build-card__desc">{b.desc}</p>
                <div className="wa-build-card__tags">
                  {b.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  PROCESS  ══════════════════════ */}
      <section className="wa-process">
        <div className="wa-process__mesh"/>
        <div className="container">
          <motion.div className="wa-process__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">How we work</span>
            <h2 className="wa-section-title wa-section-title--light">From zero to production.<br/>Eight steps, no shortcuts.</h2>
          </motion.div>
          <div className="wa-process__track">
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} className="wa-process-step"
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-30px' }} variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400 } }}
                whileTap={{ scale: 0.96 }}
                style={{ '--step-color': step.color }}>
                <motion.div className="wa-process-step__icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}>
                  <step.Icon size={18}/>
                </motion.div>
                <div className="wa-process-step__num">{step.num}</div>
                <div className="wa-process-step__title">{step.title}</div>
                <p className="wa-process-step__desc">{step.desc}</p>
                {i < PROCESS.length - 1 && <div className="wa-process-step__connector"/>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  EVERY SCREEN  ══════════════════════ */}
      <section className="section wa-screens">
        <div className="wa-screens__circles">
          <div className="wa-screens__circle wa-screens__circle--1"/>
          <div className="wa-screens__circle wa-screens__circle--2"/>
          <div className="wa-screens__circle wa-screens__circle--3"/>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div className="wa-screens__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">Responsive & Cross-Browser</span>
            <h2 className="wa-section-title">Pixel-perfect on every screen,<br/>every browser.</h2>
            <p className="wa-screens__sub">
              We build and test across the full spectrum — 320px mobile to 2560px ultrawide,
              across Chrome, Firefox, Safari, and Edge. Every breakpoint is intentional.
            </p>
          </motion.div>

          <div className="wa-screens__sizes">
            {[
              { Icon: Monitor,    label: 'Desktop', size: '1440px – 2560px', delay: 0 },
              { Icon: Monitor,    label: 'Laptop',  size: '1024px – 1440px', delay: 0.08 },
              { Icon: Tablet,     label: 'Tablet',  size: '768px – 1024px',  delay: 0.16 },
              { Icon: Smartphone, label: 'Mobile',  size: '320px – 768px',   delay: 0.24 },
            ].map(({ Icon, label, size, delay }) => (
              <motion.div key={label} className="wa-screens__size"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <motion.div className="wa-screens__size-icon"
                  whileHover={{ scale: 1.3, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}>
                  <Icon size={18}/>
                </motion.div>
                <div>
                  <div className="wa-screens__size-label">{label}</div>
                  <div className="wa-screens__size-range">{size}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="wa-screens__browsers">
            <span className="wa-screens__browsers-label">Tested on</span>
            {['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave'].map((b, i) => (
              <motion.span key={b} className="wa-screens__browser"
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                {b}
              </motion.span>
            ))}
          </div>

          <div className="wa-screens__features">
            {['Touch & gesture support','WCAG 2.1 AA accessibility','Dark mode compatible',
              'Print stylesheets','RTL language support','PWA-ready architecture'].map((f, i) => (
              <motion.div key={f} className="wa-screens__feat"
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ x: 4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <CheckCircle2 size={14}/> {f}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  CAPABILITIES  ══════════════════════ */}
      <section className="section wa-caps">
        <div className="wa-caps__grid-bg"/>
        <div className="wa-caps__orb"/>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div className="wa-caps__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">Capabilities</span>
            <h2 className="wa-section-title">Everything it takes<br/>to ship a great product.</h2>
          </motion.div>
          <div className="wa-caps__grid">
            {CAPABILITIES.map((cap, i) => (
              <motion.div key={cap.title} className="wa-cap-card"
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-30px' }} variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                style={{ '--cap-color': cap.color }}>
                <div className="wa-cap-card__top-line"/>
                <motion.div className="wa-cap-card__icon"
                  whileHover={{ scale: 1.25, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}>
                  <cap.Icon size={18}/>
                </motion.div>
                <h3 className="wa-cap-card__title">{cap.title}</h3>
                <ul className="wa-cap-card__list">
                  {cap.points.map(p => <li key={p}>{p}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  AI SECTION  ══════════════════════ */}
      <section className="wa-ai">
        <div className="wa-ai__noise" />
        <div className="wa-ai__glow" />
        <div className="wa-ai__glow wa-ai__glow--2"/>
        <div className="wa-ai__grid"/>
        <div className="container">
          <motion.div className="wa-ai__inner"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="wa-ai__left">
              <div className="wa-ai__spark">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles size={16}/>
                </motion.div>
                AI by Default
              </div>
              <h2 className="wa-ai__title">
                We don't add AI as a feature.<br/>
                <em>We build AI into the product.</em>
              </h2>
              <p className="wa-ai__desc">
                Every web app we build is designed from the ground up to support AI features.
                We've shipped LLM-powered products across SaaS, fintech, and healthtech.
                Not demos. Production systems that real users depend on.
              </p>
            </div>
            <div className="wa-ai__features">
              {[
                { Icon: Brain,     label: 'Conversational AI',       desc: 'Chat interfaces, AI assistants, and context-aware Q&A built into your UX.' },
                { Icon: Search,    label: 'Natural Language Search',  desc: 'Semantic search using embeddings — users find what they mean, not just what they type.' },
                { Icon: Cpu,       label: 'Smart Recommendations',   desc: 'Personalised suggestions, next-best-action, and predictive content surfacing.' },
                { Icon: BarChart3, label: 'AI Analytics',            desc: 'Automated insights, anomaly detection, and plain-language summaries of your data.' },
                { Icon: Cloud,     label: 'Document Processing',     desc: 'Extract, classify, and summarise documents with multi-modal AI pipelines.' },
                { Icon: GitBranch, label: 'Workflow Automation',     desc: 'LangChain agents that automate complex multi-step tasks inside your product.' },
              ].map((f, i) => (
                <motion.div key={f.label} className="wa-ai-feat"
                  custom={i} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} variants={fadeUp}
                  whileHover={{ scale: 1.03, x: 4, transition: { type: 'spring', stiffness: 400 } }}
                  whileTap={{ scale: 0.97 }}>
                  <motion.div className="wa-ai-feat__icon"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300 }}>
                    <f.Icon size={16}/>
                  </motion.div>
                  <div>
                    <div className="wa-ai-feat__label">{f.label}</div>
                    <div className="wa-ai-feat__desc">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════  TECH STACK  ══════════════════════ */}
      <section className="section wa-stack">
        <div className="wa-stack__strips"/>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div className="wa-stack__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">Tech Stack</span>
            <h2 className="wa-section-title">The tools we use<br/>to build the products you need.</h2>
          </motion.div>
          <div className="wa-stack__groups">
            {STACK.map((grp, gi) => (
              <motion.div key={grp.group} className="wa-stack__group"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: gi * 0.08, duration: 0.5 }}>
                <div className="wa-stack__group-label">{grp.group}</div>
                <div className="wa-stack__pills">
                  {grp.items.map((item, ii) => (
                    <motion.span key={item} className="wa-stack__pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.07 + ii * 0.04 }}
                      whileHover={{ scale: 1.12, y: -3 }}
                      whileTap={{ scale: 0.95 }}>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  AFTER LAUNCH  ══════════════════════ */}
      <section className="wa-after">
        <div className="wa-after__noise" />
        <div className="wa-after__orb wa-after__orb--1"/>
        <div className="wa-after__orb wa-after__orb--2"/>
        <div className="container">
          <motion.div className="wa-after__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">After Launch</span>
            <h2 className="wa-after__title">We don't disappear after the demo.</h2>
            <p className="wa-after__sub">Shipping is the beginning. We stay involved.</p>
          </motion.div>
          <div className="wa-after__grid">
            {AFTER.map((a, i) => (
              <motion.div key={a.title} className="wa-after-card"
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ scale: 0.97 }}
                style={{ '--after-color': a.color }}>
                <motion.div className="wa-after-card__icon"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                  whileHover={{ scale: 1.3, rotate: 12 }}>
                  <a.Icon size={20}/>
                </motion.div>
                <h3 className="wa-after-card__title">{a.title}</h3>
                <p className="wa-after-card__desc">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════  CTA  ══════════════════════ */}
      <section className="wa-cta">
        <div className="wa-cta__dots"/>
        <div className="wa-cta__orb wa-cta__orb--1"/>
        <div className="wa-cta__orb wa-cta__orb--2"/>
        <div className="container">
          <motion.div className="wa-cta__inner"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <motion.div className="wa-cta__icon"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}>
              <Rocket size={28}/>
            </motion.div>
            <h2 className="wa-cta__title">Ready to build something real?</h2>
            <p className="wa-cta__sub">
              Tell us what you're building. We'll tell you how we'd approach it — no pitch, no fluff.
            </p>
            <div className="wa-cta__btns">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/estimate" className="wa-cta-primary">Estimate your project <ArrowRight size={15}/></Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="wa-cta-secondary">Start a conversation</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
