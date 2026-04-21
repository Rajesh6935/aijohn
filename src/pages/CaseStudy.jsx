import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, Users, BarChart3, GitBranch, Lock, Plug, ExternalLink,
  CheckCircle2, AlertCircle, ArrowRight, Server, Code2, Database, Cloud, Cpu
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './CaseStudy.css';

const fadeUp = {
  hidden:  { opacity:0, y:28 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ delay: i*0.09, duration:0.5, ease:[0.4,0,0.2,1] } }),
};

const STATS = [
  { value:'3+',         label:'Years in Production', color:'#2176AE' },
  { value:'99.9%',      label:'Uptime',              color:'#059669' },
  { value:'Multi-Tenant', label:'Architecture',      color:'#7C3AED' },
  { value:'0',          label:'Downtime Deploys',    color:'#D97706' },
];

const STACK = [
  { icon:<Server size={18}/>,   cat:'Backend',  items:['Ruby on Rails 7','Sidekiq','Action Mailer','REST API'] },
  { icon:<Code2 size={18}/>,    cat:'Frontend', items:['React 18','Redux Toolkit','Tailwind CSS','Chart.js'] },
  { icon:<Database size={18}/>, cat:'Database', items:['PostgreSQL 15','Redis 7','Multi-tenant schemas','Migrations'] },
  { icon:<Cloud size={18}/>,    cat:'Cloud',    items:['AWS EC2','S3 + CloudFront','RDS + SES','Auto-scaling'] },
];

const FEATURES = [
  { icon:<Mail size={22}/>,    color:'#2176AE', title:'Email Campaign Engine',    desc:'Millions of segmented emails with A/B testing, open/click tracking, and automated follow-ups.' },
  { icon:<Users size={22}/>,   color:'#7C3AED', title:'Multi-Tenant CRM',         desc:'Each client organisation has isolated data, custom fields, pipeline stages, and role-based permissions.' },
  { icon:<GitBranch size={22}/>,color:'#0891B2',title:'Drip Automations',         desc:'Visual workflow builder for complex conditional sequences triggered by user behaviour.' },
  { icon:<BarChart3 size={22}/>,color:'#059669',title:'Analytics & Reporting',    desc:'Real-time dashboards for campaign performance, deliverability, and revenue attribution.' },
  { icon:<Plug size={22}/>,    color:'#D97706', title:'Third-Party Integrations', desc:'Native integrations with Salesforce, HubSpot, Zapier, and 20+ other platforms.' },
  { icon:<Lock size={22}/>,    color:'#DC2626', title:'Enterprise Security',       desc:'SOC2-ready audit logs, 2FA, SSO, and GDPR-compliant data handling from day one.' },
];

const CHALLENGES = [
  { challenge:'Deliver a full-featured enterprise platform in under 16 weeks with a 5-person team.',
    solution:'Used modular Rails engines + React micro-frontends so each feature was independently buildable, testable, and deployable.' },
  { challenge:'Handle high-volume email delivery (millions/month) without hitting provider limits.',
    solution:'Built a Redis-backed queue with Sidekiq, dynamic throttling, and automatic failover between SES, SendGrid, and Mailgun.' },
  { challenge:'True multi-tenancy — each customer\'s data completely isolated, zero cross-tenant leakage.',
    solution:'Implemented PostgreSQL schema-based multi-tenancy with Apartment gem, automated provisioning and teardown.' },
  { challenge:'Zero-downtime deploys for a live platform with 24/7 users across time zones.',
    solution:'Blue-green deployment on AWS with health checks, migration safety gates, and automated rollback triggers.' },
];

export default function CaseStudy() {
  useSEO({
    rawTitle: 'neyo.ai Case Study | AIJOHN Technosoft',
    description: 'How AIJOHN Technosoft built neyo.ai, an AI-powered outbound sales platform — from zero to production with RAG pipelines, multi-tenant architecture, and real customer growth.',
    path: '/case-study',
  });
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero cs-hero">
        <div className="page-hero__glow"/>
        <div className="container page-hero__inner">
          <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:0.65}}>
            <div className="cs-hero__badges">
              <span className="cs-badge cs-badge--client">Client Project</span>
              <a href="https://staging.neyo.ai" target="_blank" rel="noopener noreferrer" className="cs-badge cs-badge--live">
                <span className="cs-badge__dot"/> Live at staging.neyo.ai <ExternalLink size={11}/>
              </a>
            </div>
            <h1 className="page-hero__title">neyo.ai<br/><span className="page-hero__accent">Enterprise Marketing Automation</span></h1>
            <p className="page-hero__subtitle">Built from zero by AIJOHN in under 16 weeks — running in production for 3+ years with 99.9% uptime.</p>
            <div className="cs-hero__meta">
              {['📅 Delivered 2021','⏱ 16-week build','👥 5-person team','🌍 North American market'].map(m=>(
                <span key={m} className="cs-meta-chip">{m}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div className="cs-stats-band">
        <div className="container">
          <div className="cs-stats-grid">
            {STATS.map((s,i) => (
              <motion.div key={s.label} className="cs-stat-card"
                custom={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
                style={{'--cs-color': s.color}}>
                <span className="cs-stat-num">{s.value}</span>
                <span className="cs-stat-lbl">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="section cs-overview-section">
        <div className="container cs-overview-layout">
          <motion.div data-aos="fade-right">
            <span className="section-tag">The Challenge</span>
            <h2 className="section-title">Build an Enterprise Platform.<br/>In 16 Weeks. From Scratch.</h2>
            <p className="cs-body">Our client needed a full marketing automation platform to compete in the North American market. They had a vision and a tight timeline — but no engineering team.</p>
            <p className="cs-body">We embedded a 5-person team, ran 2-week sprints, and shipped a production-ready multi-tenant SaaS platform with email campaigns, CRM, drip automations, and analytics — on time and within budget.</p>
            <p className="cs-body">Three years later, neyo.ai is still running live, still growing, and still maintained exclusively by our team.</p>
          </motion.div>
          <div className="cs-sidebar" data-aos="fade-left">
            {[['Industry','B2B SaaS / MarTech'],['Team Size','5 Engineers (Full Stack)'],['Build Time','16 Weeks to Production'],['Engagement','3+ Years Ongoing'],['Market','North America']].map(([k,v])=>(
              <div key={k} className="cs-sidebar-row">
                <span className="cs-sidebar-key">{k}</span>
                <span className="cs-sidebar-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section cs-stack-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag">Technology</span>
            <h2 className="section-title">The Stack We Chose and Why</h2>
          </div>
          <div className="cs-stack-grid">
            {STACK.map((s,i) => (
              <motion.div key={s.cat} className="cs-stack-card"
                custom={i} initial="hidden" whileInView="visible" viewport={{once:true, margin:'-60px'}} variants={fadeUp}>
                <div className="cs-stack-card__cat">
                  <div className="cs-stack-card__cat-icon">{s.icon}</div>
                  {s.cat}
                </div>
                <ul className="cs-stack-list">
                  {s.items.map(item=>(
                    <li key={item} className="cs-stack-item">
                      <CheckCircle2 size={13} className="cs-stack-check"/>{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section cs-features-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag">What We Built</span>
            <h2 className="section-title">Platform Features</h2>
          </div>
          <div className="cs-features-grid">
            {FEATURES.map((f,i) => (
              <motion.div key={f.title} className="cs-feature-card"
                custom={i} initial="hidden" whileInView="visible" viewport={{once:true, margin:'-60px'}} variants={fadeUp}
                style={{'--feat-color': f.color}}>
                <div className="cs-feature-icon">{f.icon}</div>
                <h3 className="cs-feature-title">{f.title}</h3>
                <p className="cs-feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section cs-challenges-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag">Problem Solving</span>
            <h2 className="section-title">Hard Problems We Solved</h2>
          </div>
          <div className="cs-challenges-list">
            {CHALLENGES.map((c,i) => (
              <motion.div key={i} className="cs-challenge-row"
                custom={i} initial="hidden" whileInView="visible" viewport={{once:true, margin:'-60px'}} variants={fadeUp}>
                <div className="cs-challenge-half cs-challenge-half--problem">
                  <AlertCircle size={16} className="cs-ch-icon cs-ch-icon--problem"/>
                  <div>
                    <div className="cs-ch-label">Challenge</div>
                    <p className="cs-ch-text">{c.challenge}</p>
                  </div>
                </div>
                <div className="cs-challenge-arrow">→</div>
                <div className="cs-challenge-half cs-challenge-half--solution">
                  <CheckCircle2 size={16} className="cs-ch-icon cs-ch-icon--solution"/>
                  <div>
                    <div className="cs-ch-label cs-ch-label--solution">Solution</div>
                    <p className="cs-ch-text">{c.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="cs-quote-section">
        <div className="cs-quote__glow"/>
        <div className="container">
          <motion.div className="cs-quote-inner"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="cs-quote-mark">"</span>
            <blockquote className="cs-quote-text">
              AIJOHN didn't just deliver code — they delivered a product. They understood the business,
              pushed back when our ideas were wrong, and shipped something we're still proud of three years later.
            </blockquote>
            <cite className="cs-quote-cite">— Product Lead, neyo.ai</cite>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cs-cta-section">
        <div className="container">
          <motion.div className="cs-cta-card"
            initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
            <h2 className="cs-cta-title">Ready to Build Your SaaS?</h2>
            <p className="cs-cta-sub">We'll tell you exactly how we'd build it and what it would cost — in a free 30-minute call.</p>
            <div className="cs-cta-actions">
              <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{padding:'14px 32px',fontSize:'1rem'}}>
                Book Free Consultation <ArrowRight size={16}/>
              </a>
              <Link to="/services" className="btn btn-outline-white" style={{padding:'14px 32px',fontSize:'1rem'}}>
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
