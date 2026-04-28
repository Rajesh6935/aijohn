import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, Mail, Zap, Database, BarChart3, RefreshCw,
  Users, Target, TrendingUp, Bell, Layers, ChevronRight, Cpu,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './MarketingAutoPage.css';

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
    <div className="ma-hscroll-scene" ref={sceneRef}>
      <div className="ma-hscroll-sticky">
        <div className="ma-hscroll-header container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="ma-hscroll-title">{title}</h2>
            {subtitle && <p className="ma-hscroll-sub">{subtitle}</p>}
          </motion.div>
        </div>
        <div className="ma-hscroll-viewport">
          <div className="ma-hscroll-track" ref={trackRef}>
            {items.map((item, i) => renderItem(item, i))}
          </div>
        </div>
        <div className="ma-hscroll-bar">
          <div className="ma-hscroll-bar__fill" style={{ width: `${progress * 100}%` }} />
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
  { Icon: Mail,      color: '#D97706', title: 'Email Campaign Engine',      desc: 'High-volume transactional and marketing email with behavioural triggers, list segmentation, and deliverability monitoring.',     tags: ['SendGrid', 'AWS SES', 'Triggers', 'A/B Testing'] },
  { Icon: Users,     color: '#F59E0B', title: 'CRM Integration',             desc: 'HubSpot, Salesforce, or custom CRM — lead capture, deal pipelines, contact timelines, and multi-channel drip workflows.',       tags: ['HubSpot', 'Salesforce', 'Pipedrive', 'Custom'] },
  { Icon: Target,    color: '#B45309', title: 'Lead Scoring & Routing',      desc: 'ML-based lead scoring that ranks inbound leads by conversion likelihood and routes them to the right rep or sequence.',          tags: ['Scoring models', 'Routing', 'Salesforce', 'CRM'] },
  { Icon: Cpu,       color: '#D97706', title: 'AI-Powered Personalisation', desc: 'LLM-generated personalised content, dynamic subject lines, and AI-optimised send times that lift open and click rates.',       tags: ['LangChain', 'GPT-4o', 'Dynamic content', 'CTR'] },
  { Icon: Zap,       color: '#F59E0B', title: 'Workflow Automation',         desc: 'Multi-step automation flows across email, SMS, push, and in-app — triggered by behaviour, time, or external events.',           tags: ['Zapier', 'Make.com', 'n8n', 'Webhooks'] },
  { Icon: BarChart3, color: '#B45309', title: 'Analytics & Attribution',     desc: 'Unified campaign analytics with multi-touch attribution, cohort analysis, and revenue impact dashboards.',                        tags: ['Mixpanel', 'Amplitude', 'Segment', 'Looker'] },
  { Icon: Bell,      color: '#D97706', title: 'Push & In-App Messaging',    desc: 'Browser push, mobile push, and in-app notifications orchestrated from a single API with audience targeting.',                    tags: ['FCM', 'APNs', 'OneSignal', 'In-app SDK'] },
  { Icon: TrendingUp,color: '#F59E0B', title: 'Retention Engineering',       desc: 'Churn prediction models, win-back sequences, and loyalty mechanics that extend customer lifetime value measurably.',              tags: ['Churn models', 'Win-back', 'LTV', 'Cohorts'] },
];

const PROCESS = [
  { num: '01', Icon: Target,    color: '#D97706', title: 'Funnel Audit',          desc: 'Map every touchpoint in your acquisition and retention funnel, identify drop-off points, and quantify the revenue impact.' },
  { num: '02', Icon: Database,  color: '#F59E0B', title: 'Data Infrastructure',   desc: 'Connect your CRM, product DB, and analytics into a clean customer data layer — the foundation for every automation.' },
  { num: '03', Icon: Mail,      color: '#B45309', title: 'Campaign Architecture',  desc: 'Design lifecycle sequences, trigger rules, and audience segments before writing a single email template.' },
  { num: '04', Icon: Zap,       color: '#D97706', title: 'Build & Integrate',     desc: 'Wire up the automation platform, build email templates, connect APIs, and test every flow end-to-end in staging.' },
  { num: '05', Icon: Cpu,       color: '#F59E0B', title: 'AI Layer',              desc: 'Layer in personalisation, predictive scoring, and LLM-generated copy — calibrated against your audience data.' },
  { num: '06', Icon: BarChart3, color: '#B45309', title: 'Measure & Optimise',    desc: 'Continuous A/B testing, attribution reporting, and funnel optimisation on a monthly cadence.' },
];

const STACK_GROUPS = [
  { label: 'Email & Messaging', items: ['SendGrid', 'AWS SES', 'Mailchimp API', 'Postmark'] },
  { label: 'CRM & Sales',       items: ['HubSpot', 'Salesforce', 'Pipedrive', 'Close'] },
  { label: 'Automation',        items: ['Zapier', 'Make.com', 'n8n', 'LangChain', 'Custom'] },
  { label: 'Analytics',         items: ['Mixpanel', 'Amplitude', 'Segment', 'Looker', 'GA4'] },
];

const STATS = [
  { to: 3,  suffix: 'x',   label: 'Average open rate lift' },
  { to: 45, suffix: '%',   label: 'Reduction in churn' },
  { to: 80, suffix: '%',   label: 'Automation coverage' },
  { to: 6,  suffix: 'wk', label: 'Time to first automation' },
];

export default function MarketingAutoPage() {
  useSEO({
    title: 'Marketing Automation — AIJOHN Technosoft',
    description: 'Email campaigns, CRM integration, AI personalisation, and growth automation built for product teams who need measurable results.',
    path: '/services/marketing-automation',
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(heroScroll, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale   = useTransform(heroScroll, [0, 1], [1, 1.08]);

  return (
    <PageWrapper>

      {/* HERO */}
      <section className="ma-hero" ref={heroRef}>
        <motion.div className="ma-hero__video-wrap" style={{ scale: heroScale }}>
          <video className="ma-hero__video" autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=60">
            <source src="https://cdn.coverr.co/videos/coverr-business-charts-data-analytics-1534/1080p.mp4" type="video/mp4" />
          </video>
          <div className="ma-hero__video-overlay" />
        </motion.div>
        <div className="ma-hero__orb ma-hero__orb--1" />
        <div className="ma-hero__orb ma-hero__orb--2" />
        <div className="ma-hero__grid" />

        <motion.div className="ma-hero__content container" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="ma-hero__breadcrumb" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link to="/services">Services</Link><ChevronRight size={12} /><span>Marketing Automation</span>
          </motion.div>
          <motion.div className="ma-hero__badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.span className="ma-hero__badge-dot" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
            Growth Engineering
          </motion.div>
          <motion.h1 className="ma-hero__h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            Marketing that<br /><span className="ma-hero__h1-glow">works while you sleep.</span>
          </motion.h1>
          <motion.p className="ma-hero__sub" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            Email engines, CRM automation, AI personalisation, and retention systems
            that turn your data into predictable revenue — without manual work.
          </motion.p>
          <motion.div className="ma-hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
            <Link to="/estimate" className="ma-cta-pill ma-cta-pill--primary">Estimate your project <ArrowRight size={14} /></Link>
            <Link to="/contact" className="ma-cta-pill ma-cta-pill--ghost">Talk to an engineer</Link>
          </motion.div>
          <motion.div className="ma-hero__scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <motion.div className="ma-hero__scroll-line" animate={{ scaleY: [0, 1, 0], y: [0, 12, 24] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
            <span>scroll</span>
          </motion.div>
        </motion.div>

        <motion.div className="ma-hero__stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          {STATS.map((s) => (
            <div key={s.label} className="ma-hero__stat">
              <div className="ma-hero__stat-num"><Counter to={s.to} suffix={s.suffix} /></div>
              <div className="ma-hero__stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MANIFESTO */}
      <div className="ma-sticky-scene" style={{ height: '220vh' }}>
        <div className="ma-sticky-inner">
          <div className="ma-manifesto__bg" /><div className="ma-manifesto__orb" />
          <div className="container ma-manifesto__content">
            <motion.p className="ma-manifesto__eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>Our approach</motion.p>
            <motion.h2 className="ma-manifesto__h2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              Marketing automation<br />is an<br /><span className="ma-manifesto__accent">engineering problem.</span>
            </motion.h2>
            <motion.p className="ma-manifesto__body" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }}>
              Most marketing tools are assembled, not designed. We build automation systems the way we build software — with clean data pipelines, reliable triggers, measurable outcomes, and zero tech debt.
            </motion.p>
            <div className="ma-manifesto__badges">
              {['Email Automation', 'CRM', 'AI Copy', 'Lead Scoring', 'Retention', 'Analytics'].map((b, i) => (
                <motion.span key={b} className="ma-manifesto__badge"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.06 }}>{b}</motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <HScrollCarousel items={CAPABILITIES} title="What we automate." subtitle="Eight growth systems, one integrated platform."
        renderItem={(cap, i) => (
          <motion.div key={cap.title} className="ma-hcard" style={{ '--hc': cap.color }}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
            <div className="ma-hcard__glow" />
            <motion.div className="ma-hcard__icon" animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}>
              <cap.Icon size={24} />
            </motion.div>
            <h3 className="ma-hcard__title">{cap.title}</h3>
            <p className="ma-hcard__desc">{cap.desc}</p>
            <div className="ma-hcard__tags">{cap.tags.map(t => <span key={t}>{t}</span>)}</div>
          </motion.div>
        )}
      />

      {/* PROCESS */}
      <section className="ma-process">
        <div className="ma-process__video-wrap">
          <video className="ma-process__video" autoPlay muted loop playsInline>
            <source src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-in-the-dark-3/1080p.mp4" type="video/mp4" />
          </video>
          <div className="ma-process__video-overlay" />
        </div>
        <div className="container ma-process__inner">
          <motion.div className="ma-process__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="ma-process__eyebrow">How we build it</p>
            <h2 className="ma-process__title">From data to<br />revenue-generating automation.</h2>
          </motion.div>
          <div className="ma-process__steps">
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} className="ma-process-step" style={{ '--step-c': step.color }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                <div className="ma-process-step__num">{step.num}</div>
                <div className="ma-process-step__body">
                  <div className="ma-process-step__icon"><step.Icon size={18} /></div>
                  <div>
                    <div className="ma-process-step__title">{step.title}</div>
                    <p className="ma-process-step__desc">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="ma-stack">
        <div className="ma-stack__grid-bg" />
        <div className="ma-stack__orb ma-stack__orb--1" />
        <div className="ma-stack__orb ma-stack__orb--2" />
        <div className="container ma-stack__inner">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="ma-stack__eyebrow">Technology</p>
            <h2 className="ma-stack__title">The platforms that<br />power growth at scale.</h2>
          </motion.div>
          <div className="ma-stack__groups">
            {STACK_GROUPS.map((grp, gi) => (
              <motion.div key={grp.label} className="ma-stack-group"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.5 }}>
                <div className="ma-stack-group__label">{grp.label}</div>
                <div className="ma-stack-group__pills">
                  {grp.items.map((item, ii) => (
                    <motion.span key={item} className="ma-stack-pill"
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
      <section className="ma-cta-section">
        <div className="ma-cta__orb ma-cta__orb--1" /><div className="ma-cta__orb ma-cta__orb--2" /><div className="ma-cta__grid" />
        <div className="container ma-cta__inner">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div className="ma-cta__icon" animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <TrendingUp size={32} />
            </motion.div>
            <h2 className="ma-cta__h2">Ready to make your<br />marketing work harder?</h2>
            <p className="ma-cta__body">Tell us where your funnel leaks. We will show you exactly which automations will have the biggest revenue impact.</p>
            <div className="ma-cta__btns">
              <Link to="/estimate" className="ma-cta-pill ma-cta-pill--primary">Get a project estimate <ArrowRight size={14} /></Link>
              <Link to="/contact" className="ma-cta-pill ma-cta-pill--ghost">Book a strategy call</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
