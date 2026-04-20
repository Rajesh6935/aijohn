import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Smartphone, Brain, Cloud, Megaphone, RefreshCw,
  ChevronDown, CheckCircle2, ArrowRight, Zap, Shield, Clock,
  Layers, Code2
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import './Services.css';

/* Icon continuous-animation specs per service */
const ICON_ANIMS = [
  /* Globe      */ { rotate: [0, 360],             transition: { duration: 12, repeat: Infinity, ease: 'linear' } },
  /* Smartphone */ { y: [0, -7, 0],               transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
  /* Brain      */ { scale: [1, 1.12, 1],          transition: { duration: 2.0, repeat: Infinity, ease: 'easeInOut' } },
  /* Cloud      */ { x: [0, 6, 0, -6, 0],         transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } },
  /* Megaphone  */ { rotate: [-6, 6, -6],          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
  /* RefreshCw  */ { rotate: [0, 360],             transition: { duration: 6, repeat: Infinity, ease: 'linear' } },
];

const SERVICES = [
  {
    Icon: Globe, color: '#2176AE', slug: 'web-development',
    title: 'Web App Development',
    tag: 'React · Rails · Node',
    short: 'Full-stack SaaS products from MVP to enterprise scale — beautifully built and performant.',
    bullets: [
      'Custom React frontends with TypeScript',
      'Ruby on Rails & Node.js API backends',
      'PostgreSQL database design & optimisation',
      'Multi-tenant architecture for SaaS',
      'REST & GraphQL APIs',
      'OAuth 2.0, SSO, 2FA security',
    ],
  },
  {
    Icon: Smartphone, color: '#7C3AED', slug: 'mobile-development',
    title: 'Mobile App Development',
    tag: 'iOS · Android · React Native',
    short: 'Cross-platform apps that feel native on every device, built once and shipped everywhere.',
    bullets: [
      'React Native for iOS & Android',
      'Native iOS (Swift) development',
      'Native Android (Kotlin) development',
      'App Store & Google Play submission',
      'Push notifications & offline support',
      'Mobile-first UI/UX design',
    ],
  },
  {
    Icon: Brain, color: '#0891B2', slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    tag: 'OpenAI · LangChain · RAG',
    short: 'Practical AI that ships to production and drives real ROI — not just demos.',
    bullets: [
      'GPT-4o / Claude AI integrations',
      'LangChain RAG pipelines',
      'Custom ML model training & deployment',
      'Intelligent chatbots & virtual agents',
      'Predictive analytics dashboards',
      'Vector database (pgvector, Pinecone)',
    ],
  },
  {
    Icon: Cloud, color: '#059669', slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    tag: 'AWS · Docker · Kubernetes',
    short: 'Infrastructure that scales automatically, stays up, and never lets your team down.',
    bullets: [
      'AWS (EC2, RDS, S3, Lambda, CloudFront)',
      'Docker containerisation & Kubernetes',
      'CI/CD pipeline setup (GitHub Actions)',
      'Zero-downtime blue-green deployments',
      'Infrastructure as Code (Terraform)',
      '24/7 monitoring & incident response',
    ],
  },
  {
    Icon: Megaphone, color: '#D97706', slug: 'marketing-automation',
    title: 'Marketing Automation',
    tag: 'Email · CRM · Drip',
    short: 'End-to-end marketing platforms like our flagship neyo.ai — built for conversions.',
    bullets: [
      'Email campaign engines (A/B tested)',
      'Drip automation workflow builders',
      'Multi-tenant CRM systems',
      'Campaign analytics & reporting',
      'HubSpot, Salesforce, Zapier integrations',
      'GDPR-compliant data handling',
    ],
  },
  {
    Icon: RefreshCw, color: '#DC2626', slug: 'legacy-modernisation',
    title: 'Legacy Modernisation',
    tag: 'Migration · Refactor · Lift',
    short: 'Transform aging codebases into scalable modern systems with zero business disruption.',
    bullets: [
      'Legacy PHP/Java → Rails/Node migration',
      'Monolith to microservices decomposition',
      'Database migration & schema redesign',
      'API-first architecture transformation',
      'Zero-downtime migration strategy',
      'Comprehensive test suite coverage',
    ],
  },
];

const TECH_BADGES = [
  'Ruby on Rails','React','PostgreSQL','AWS','Node.js','TypeScript',
  'Docker','Redis','React Native','LangChain','Kubernetes','GraphQL',
  'Next.js','Terraform','OpenAI',
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.4,0,0.2,1] } }),
};

export default function Services() {
  const [expanded, setExpanded] = useState(null);
  useEffect(() => { document.title = 'Services | AIJOHN Technosoft'; }, []);

  const toggle = (i) => setExpanded(prev => (prev === i ? null : i));

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero svc-hero">
        <div className="page-hero__glow" />
        <div className="svc-hero__bg" aria-hidden="true" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.65 }}>
            <span className="section-tag" style={{ color:'var(--blue-light)', background:'rgba(74,159,212,0.12)', borderColor:'rgba(74,159,212,0.25)' }}>
              <Zap size={12} /> What We Offer
            </span>
            <h1 className="page-hero__title">
              Services Built for<br />
              <span className="page-hero__accent">Real Products</span>
            </h1>
            <p className="page-hero__subtitle">
              Six core specialities. All delivered by the same stable team that's been shipping together for 3+ years.
            </p>
            <div style={{ display:'flex', gap:20, flexWrap:'wrap', marginTop:28 }}>
              {[
                { Icon: Zap,    label: '6–8 Week MVPs' },
                { Icon: Shield, label: 'Enterprise-grade' },
                { Icon: Clock,  label: '3+ Yr Team Stability' },
              ].map(({ Icon, label }) => (
                <span key={label} style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.6)', fontSize:'0.85rem', fontWeight:500 }}>
                  <CheckCircle2 size={14} style={{ color:'#34d399' }} /> {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section svc-grid-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up" style={{ marginBottom: 52 }}>
            <span className="section-tag"><Layers size={12} /> Our Specialities</span>
            <h2 className="section-title">What We Build Best</h2>
            <p className="section-subtitle">Click any service to see exactly what's included. Every service is delivered by senior engineers — no juniors, no ramp-up.</p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((svc, i) => {
              const { Icon, color, title, tag, short, bullets, slug } = svc;
              const isOpen = expanded === i;
              const anim = ICON_ANIMS[i];
              return (
                <motion.div
                  key={title}
                  className={`svc-card${isOpen ? ' svc-card--open' : ''}`}
                  style={{ '--svc-color': color }}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                >
                  {/* Glow background on open */}
                  <div className="svc-card__glow" />

                  {/* Icon */}
                  <div className="svc-card__icon-wrap">
                    <motion.div
                      className="svc-card__icon"
                      animate={anim}
                      transition={anim.transition}
                    >
                      <Icon size={26} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <span className="svc-card__tag">{tag}</span>
                  <h3 className="svc-card__title">{title}</h3>
                  <p className="svc-card__short">{short}</p>

                  {/* Expand toggle */}
                  <button
                    className="svc-card__toggle"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{isOpen ? 'Less detail' : 'What\'s included'}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display:'flex', alignItems:'center' }}
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  {/* Expandable bullet list */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="svc-card__body"
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4,0,0.2,1] }}
                      >
                        <div className="svc-card__divider" />
                        <ul className="svc-card__bullets">
                          {bullets.map((b, bi) => (
                            <motion.li
                              key={b}
                              className="svc-card__bullet"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: bi * 0.055, duration: 0.25 }}
                            >
                              <CheckCircle2 size={13} className="svc-card__bullet-check" />
                              {b}
                            </motion.li>
                          ))}
                        </ul>
                        <Link
                          to={`/services/${svc.slug}`}
                          className="svc-card__details-link"
                          onClick={e => e.stopPropagation()}
                        >
                          View Full Details <ArrowRight size={13} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Badges */}
      <section className="section svc-tech-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag"><Code2 size={12} /> Technologies</span>
            <h2 className="section-title">Our Core Tech Stack</h2>
          </div>
          <div className="svc-tech-grid">
            {TECH_BADGES.map((t, i) => (
              <motion.div
                key={t}
                className="svc-tech-badge"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.04, transition: { duration: 0.18 } }}
              >
                <CheckCircle2 size={13} className="svc-tech-check" /> {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section svc-cta-section">
        <div className="container">
          <motion.div
            className="svc-cta-card"
            initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div className="svc-cta__glow" />
            <div className="svc-cta__content">
              <span className="svc-cta__eyebrow">Not sure what you need?</span>
              <h2 className="svc-cta-title">We'll Figure It Out Together</h2>
              <p className="svc-cta-sub">Tell us about your product in a free 30-minute call. We'll map out exactly what you need and what it'll cost — no fluff, no pressure.</p>
              <Link to="/contact" className="btn-hero-primary svc-cta-btn">
                Get a Free Scoping Call <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
