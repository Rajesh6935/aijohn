import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, RefreshCw, Shield, Activity, Zap, Database,
  Layers, GitBranch, Code2, CheckCircle2, Server, ChevronRight,
  Lock, BarChart3, Cpu,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './LegacyModPage.css';

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

function HScrollCarousel({ items, renderItem, title, subtitle }) {
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
    <div className="lm-hscroll-scene" ref={sceneRef}>
      <div className="lm-hscroll-sticky">
        <div className="lm-hscroll-header container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="lm-hscroll-title">{title}</h2>
            {subtitle && <p className="lm-hscroll-sub">{subtitle}</p>}
          </motion.div>
        </div>
        <div className="lm-hscroll-viewport">
          <div className="lm-hscroll-track" ref={trackRef}>
            {items.map((item, i) => renderItem(item, i))}
          </div>
        </div>
        <div className="lm-hscroll-bar">
          <div className="lm-hscroll-bar__fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = (ts) => { if (!start) start = ts; const p = Math.min((ts - start) / 1600, 1); setCount(Math.floor(p * to)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [isInView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const CAPABILITIES = [
  { Icon: Activity,  color: '#DC2626', title: 'Legacy Assessment',         desc: 'Full technical audit — architecture mapping, dependency graph, security posture, and a risk-scored migration roadmap before we write a line of code.', tags: ['Architecture review', 'Risk scoring', 'Debt map'] },
  { Icon: GitBranch, color: '#EF4444', title: 'Strangler Fig Migration',   desc: 'Incremental replacement using the strangler fig pattern — new services replace old ones piece by piece, with both systems live during transition.',  tags: ['Strangler Fig', 'API gateway', 'Dual-write', 'Feature flags'] },
  { Icon: Server,    color: '#B91C1C', title: 'Re-platforming',            desc: 'Lift and modernise — move from monolith to modular services on modern infrastructure without a full rewrite, reducing risk and timeline.',            tags: ['Containerisation', 'Cloud migration', 'Microservices'] },
  { Icon: Code2,     color: '#DC2626', title: 'Full Greenfield Rebuild',   desc: 'When the legacy system is beyond saving, we design and build a modern replacement — clean architecture, comprehensive tests, zero data loss.',       tags: ['New architecture', 'Data migration', 'Parallel run'] },
  { Icon: Database,  color: '#EF4444', title: 'Data Migration',            desc: 'Schema design, ETL pipelines, data validation, and cutover strategies for moving production data with zero corruption and verified integrity.',       tags: ['ETL', 'Schema design', 'Validation', 'Cutover'] },
  { Icon: Shield,    color: '#B91C1C', title: 'Security Modernisation',    desc: 'Address CVEs, upgrade authentication systems, enforce least-privilege, and bring legacy apps to current security standards.',                       tags: ['CVE remediation', 'Auth upgrade', 'OWASP', 'RBAC'] },
  { Icon: Layers,    color: '#DC2626', title: 'API Layer Design',          desc: 'Build a clean REST or GraphQL API layer over legacy internals — decoupling the frontend, enabling mobile, and preparing for future integrations.',     tags: ['REST', 'GraphQL', 'API gateway', 'Versioning'] },
  { Icon: Cpu,       color: '#EF4444', title: 'Performance Overhaul',      desc: 'N+1 query elimination, caching strategy, connection pooling, and infrastructure right-sizing that can multiply throughput without a rewrite.',       tags: ['Query optimisation', 'Caching', 'Profiling', 'Load test'] },
];

const PROCESS = [
  { num: '01', Icon: Activity,  color: '#DC2626', title: 'Discovery & Audit',     desc: 'We map the full system — codebase quality, dependencies, data flows, security risks, and a frank assessment of what to keep vs. replace.' },
  { num: '02', Icon: Layers,    color: '#EF4444', title: 'Migration Strategy',    desc: 'Choose the right pattern — strangler fig, re-platform, or rebuild — based on your risk tolerance, timeline, and team capacity.' },
  { num: '03', Icon: GitBranch, color: '#B91C1C', title: 'Parallel Architecture', desc: 'Stand up the new system alongside the old. API gateway routes traffic incrementally, both systems validated with real data.' },
  { num: '04', Icon: Database,  color: '#DC2626', title: 'Data Migration',        desc: 'ETL pipelines run in parallel. Data is validated, reconciled, and verified before a single byte of production traffic shifts.' },
  { num: '05', Icon: RefreshCw, color: '#EF4444', title: 'Cutover & Validation',  desc: 'Feature-flag controlled cutover with monitoring at every step. Rollback is one flag flip away until confidence is complete.' },
  { num: '06', Icon: Shield,    color: '#B91C1C', title: 'Legacy Decommission',   desc: 'Clean shutdown of legacy systems, archival of data, documentation of the new architecture, and runbooks for your team.' },
];

const STACK_GROUPS = [
  { label: 'From (Legacy)',    items: ['PHP / Laravel', 'Java EE', '.NET Framework', 'Ruby on Rails', 'jQuery'] },
  { label: 'To (Modern)',      items: ['Node.js', 'Python FastAPI', 'Next.js', 'React', 'TypeScript'] },
  { label: 'Data & Migration', items: ['PostgreSQL', 'Redis', 'Kafka', 'dbt', 'Airbyte'] },
  { label: 'Infra & DevOps',   items: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS'] },
];

const STATS = [
  { to: 40, suffix: '+', label: 'Legacy systems modernised' },
  { to: 0,  suffix: '',  label: 'Data loss incidents, ever' },
  { to: 65, suffix: '%', label: 'Average performance gain' },
  { to: 6,  suffix: 'mo', label: 'Median migration timeline' },
];

export default function LegacyModPage() {
  useSEO({
    title: 'Legacy Modernisation — AIJOHN Technosoft',
    description: 'Migrate legacy systems without downtime. Strangler fig migrations, re-platforming, greenfield rebuilds, and data migration with zero data loss.',
    path: '/services/legacy-modernization',
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(heroScroll, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale   = useTransform(heroScroll, [0, 1], [1, 1.08]);

  return (
    <PageWrapper>

      {/* HERO */}
      <section className="lm-hero" ref={heroRef}>
        <motion.div className="lm-hero__video-wrap" style={{ scale: heroScale }}>
          <video className="lm-hero__video" autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=60">
            <source src="https://cdn.coverr.co/videos/coverr-coding-on-a-laptop-at-night-3/1080p.mp4" type="video/mp4" />
          </video>
          <div className="lm-hero__video-overlay" />
        </motion.div>
        <div className="lm-hero__orb lm-hero__orb--1" />
        <div className="lm-hero__orb lm-hero__orb--2" />
        <div className="lm-hero__grid" />

        <motion.div className="lm-hero__content container" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="lm-hero__breadcrumb" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link to="/services">Services</Link><ChevronRight size={12} /><span>Legacy Modernisation</span>
          </motion.div>
          <motion.div className="lm-hero__badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.span className="lm-hero__badge-dot" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
            Migration Engineering
          </motion.div>
          <motion.h1 className="lm-hero__h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            Escape your legacy.<br /><span className="lm-hero__h1-glow">Without the big bang.</span>
          </motion.h1>
          <motion.p className="lm-hero__sub" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            Incremental migration strategies that keep your product live, your data intact,
            and your team in control — from strangler fig to full rebuild, done right.
          </motion.p>
          <motion.div className="lm-hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
            <Link to="/estimate" className="lm-cta-pill lm-cta-pill--primary">Estimate your migration <ArrowRight size={14} /></Link>
            <Link to="/contact" className="lm-cta-pill lm-cta-pill--ghost">Talk to an engineer</Link>
          </motion.div>
          <motion.div className="lm-hero__scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <motion.div className="lm-hero__scroll-line" animate={{ scaleY: [0, 1, 0], y: [0, 12, 24] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
            <span>scroll</span>
          </motion.div>
        </motion.div>

        <motion.div className="lm-hero__stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          {STATS.map((s) => (
            <div key={s.label} className="lm-hero__stat">
              <div className="lm-hero__stat-num"><Counter to={s.to} suffix={s.suffix} /></div>
              <div className="lm-hero__stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MANIFESTO */}
      <div className="lm-sticky-scene" style={{ height: '220vh' }}>
        <div className="lm-sticky-inner">
          <div className="lm-manifesto__bg" /><div className="lm-manifesto__orb" />
          <div className="container lm-manifesto__content">
            <motion.p className="lm-manifesto__eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>Our method</motion.p>
            <motion.h2 className="lm-manifesto__h2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              There is no<br /><span className="lm-manifesto__accent">big bang migration.</span><br />Only careful steps.
            </motion.h2>
            <motion.p className="lm-manifesto__body" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }}>
              We have seen big bang rewrites fail. We use incremental strategies — strangler fig, feature-flag cutover, parallel runs — that keep your product live at every step and give your team a rollback option until the last moment.
            </motion.p>
            <div className="lm-manifesto__badges">
              {['Zero Downtime', 'Strangler Fig', 'Data Integrity', 'Incremental', 'Rollback-safe', 'Tested'].map((b, i) => (
                <motion.span key={b} className="lm-manifesto__badge"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.06 }}>{b}</motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <HScrollCarousel items={CAPABILITIES} title="What we modernise." subtitle="Eight migration capabilities, zero compromises on safety."
        renderItem={(cap, i) => (
          <motion.div key={cap.title} className="lm-hcard" style={{ '--hc': cap.color }}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
            <div className="lm-hcard__glow" />
            <motion.div className="lm-hcard__icon" animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}>
              <cap.Icon size={24} />
            </motion.div>
            <h3 className="lm-hcard__title">{cap.title}</h3>
            <p className="lm-hcard__desc">{cap.desc}</p>
            <div className="lm-hcard__tags">{cap.tags.map(t => <span key={t}>{t}</span>)}</div>
          </motion.div>
        )}
      />

      {/* PROCESS */}
      <section className="lm-process">
        <div className="lm-process__video-wrap">
          <video className="lm-process__video" autoPlay muted loop playsInline>
            <source src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-in-the-dark-3/1080p.mp4" type="video/mp4" />
          </video>
          <div className="lm-process__video-overlay" />
        </div>
        <div className="container lm-process__inner">
          <motion.div className="lm-process__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="lm-process__eyebrow">How we migrate</p>
            <h2 className="lm-process__title">Six steps.<br />Zero surprises.</h2>
          </motion.div>
          <div className="lm-process__steps">
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} className="lm-process-step" style={{ '--step-c': step.color }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                <div className="lm-process-step__num">{step.num}</div>
                <div className="lm-process-step__body">
                  <div className="lm-process-step__icon"><step.Icon size={18} /></div>
                  <div>
                    <div className="lm-process-step__title">{step.title}</div>
                    <p className="lm-process-step__desc">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="lm-stack">
        <div className="lm-stack__grid-bg" />
        <div className="lm-stack__orb lm-stack__orb--1" />
        <div className="lm-stack__orb lm-stack__orb--2" />
        <div className="container lm-stack__inner">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="lm-stack__eyebrow">Technology</p>
            <h2 className="lm-stack__title">Where we take<br />legacy systems.</h2>
          </motion.div>
          <div className="lm-stack__groups">
            {STACK_GROUPS.map((grp, gi) => (
              <motion.div key={grp.label} className="lm-stack-group"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.5 }}>
                <div className="lm-stack-group__label">{grp.label}</div>
                <div className="lm-stack-group__pills">
                  {grp.items.map((item, ii) => (
                    <motion.span key={item} className="lm-stack-pill"
                      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: gi * 0.07 + ii * 0.04 }}
                      whileHover={{ scale: 1.1, y: -3 }}>{item}</motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lm-cta-section">
        <div className="lm-cta__orb lm-cta__orb--1" /><div className="lm-cta__orb lm-cta__orb--2" /><div className="lm-cta__grid" />
        <div className="container lm-cta__inner">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div className="lm-cta__icon" animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <RefreshCw size={32} />
            </motion.div>
            <h2 className="lm-cta__h2">Ready to modernise<br />without the risk?</h2>
            <p className="lm-cta__body">Tell us about your legacy system. We will tell you which migration path is right, what the risks are, and how long it will take — honestly.</p>
            <div className="lm-cta__btns">
              <Link to="/estimate" className="lm-cta-pill lm-cta-pill--primary">Get a migration estimate <ArrowRight size={14} /></Link>
              <Link to="/contact" className="lm-cta-pill lm-cta-pill--ghost">Book a technical call</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
