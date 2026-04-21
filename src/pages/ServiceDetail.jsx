import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Clock, Shield, Star, ArrowLeft } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './ServiceDetail.css';

const SERVICE_DATA = {
  'ai-native-saas': {
    title: 'AI-Native SaaS Development',
    subtitle: 'Production-grade LLM products, RAG systems & intelligent workflows',
    tag: 'AI & Machine Learning',
    accent: '#7C3AED',
    hero: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1920&q=80',
    what: 'We build AI-first SaaS products that go from prototype to production — not just demos. From GPT-4o integrations and LangChain pipelines to vector search with Pinecone and fine-tuned models, every feature ships to real users.',
    deliverables: [
      'LLM-powered features with GPT-4o / Claude API',
      'RAG (Retrieval-Augmented Generation) pipelines',
      'Vector databases — Pinecone, Weaviate, pgvector',
      'AI chat interfaces & assistant UX',
      'Automated AI workflows with LangChain',
      'Model fine-tuning & evaluation pipelines',
    ],
    timeline: '6–10 weeks to production',
    stack: 'Python · LangChain · OpenAI · Pinecone · FastAPI · React',
    cases: [
      { label: 'AI analytics dashboard', time: '7 weeks' },
      { label: 'RAG knowledge base', time: '5 weeks' },
      { label: 'Conversational AI SaaS', time: '9 weeks' },
    ],
  },
  'mvp-development': {
    title: 'MVP in 6–8 Weeks',
    subtitle: 'From wireframe to live product — fixed price, zero surprises',
    tag: 'Rapid MVP Delivery',
    accent: '#2176AE',
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    what: 'Our MVP process is built for speed without cutting corners. Week 1: architecture. Weeks 2–6: sprints with daily standups and Friday demos. Week 7–8: QA, deploy, launch support. Fixed price means no surprise invoices.',
    deliverables: [
      'Full product architecture document',
      'Working MVP deployed to production',
      'Mobile-responsive frontend (React / Next.js)',
      'REST or GraphQL API backend',
      'Database design & migrations',
      '30-day post-launch support included',
    ],
    timeline: '6–8 weeks guaranteed',
    stack: 'React · Node.js / Rails · PostgreSQL · AWS · Docker',
    cases: [
      { label: 'SaaS MVP for FinTech', time: '6 weeks' },
      { label: 'Marketplace platform', time: '8 weeks' },
      { label: 'AI-powered HR tool', time: '7 weeks' },
    ],
  },
  'web-development': {
    title: 'Web App Development',
    subtitle: 'Pixel-perfect, high-performance full-stack web applications',
    tag: 'Web Development',
    accent: '#0891B2',
    hero: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1920&q=80',
    what: 'Enterprise-grade web applications built with React, Next.js, Ruby on Rails, and Node.js. We handle everything from beautiful UI systems to complex backend logic, real-time features, and scalable data architecture.',
    deliverables: [
      'React / Next.js frontend with design system',
      'Full-stack backend (Node.js / Rails / Python)',
      'Real-time features (WebSockets / SSE)',
      'Third-party API integrations',
      'CI/CD pipeline & automated testing',
      'Performance optimisation (Core Web Vitals)',
    ],
    timeline: '8–14 weeks for full product',
    stack: 'React · Next.js · Node.js · Rails · PostgreSQL · Redis',
    cases: [
      { label: 'B2B SaaS dashboard', time: '10 weeks' },
      { label: 'Real-time collaboration tool', time: '12 weeks' },
      { label: 'E-commerce platform', time: '9 weeks' },
    ],
  },
  'mobile-development': {
    title: 'Mobile App Development',
    subtitle: 'iOS & Android apps shipped in parallel with your web product',
    tag: 'Mobile Development',
    accent: '#059669',
    hero: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80',
    what: 'Native-quality mobile apps for iOS and Android using React Native and Flutter — sharing code with your web app where possible, native where it matters. One team, full stack, shipped together.',
    deliverables: [
      'Cross-platform app (React Native / Flutter)',
      'iOS & Android App Store submissions',
      'Push notifications & deep linking',
      'Offline-first architecture where needed',
      'Native device features (camera, GPS, biometrics)',
      'App performance profiling & optimisation',
    ],
    timeline: '8–12 weeks to App Store',
    stack: 'React Native · Flutter · Swift · Kotlin · Expo · Firebase',
    cases: [
      { label: 'HealthTech patient app', time: '10 weeks' },
      { label: 'Delivery tracking app', time: '8 weeks' },
      { label: 'Social commerce app', time: '12 weeks' },
    ],
  },
  'cloud-devops': {
    title: 'Cloud Architecture & DevOps',
    subtitle: 'Zero-downtime infra, auto-scaling, and 99.9% uptime SLAs',
    tag: 'Cloud & DevOps',
    accent: '#D97706',
    hero: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1920&q=80',
    what: 'We design and operate cloud infrastructure on AWS, GCP, and DigitalOcean — with full CI/CD pipelines, auto-scaling groups, container orchestration with Kubernetes, and proactive monitoring so you never wake up to a down server.',
    deliverables: [
      'AWS / GCP / DigitalOcean architecture design',
      'Kubernetes cluster setup & management',
      'CI/CD pipeline (GitHub Actions / CircleCI)',
      'Infrastructure as Code (Terraform)',
      'Observability: logs, metrics, alerts (Datadog / Grafana)',
      'Security audits & SOC-2 readiness',
    ],
    timeline: '2–4 weeks for infra setup',
    stack: 'AWS · GCP · Docker · Kubernetes · Terraform · GitHub Actions',
    cases: [
      { label: 'Zero-downtime migration', time: '3 weeks' },
      { label: 'Auto-scaling infra for 100K users', time: '4 weeks' },
      { label: 'SOC-2 compliance setup', time: '6 weeks' },
    ],
  },
  'enterprise-saas': {
    title: 'Enterprise SaaS Platforms',
    subtitle: 'Multi-tenant platforms for 100K+ users with enterprise security',
    tag: 'Enterprise',
    accent: '#DC2626',
    hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    what: 'Complex multi-tenant SaaS platforms with enterprise-grade security, SOC-2 compliance, SSO/SAML integration, role-based access, and the micro-services architecture needed to support Fortune 500 customers.',
    deliverables: [
      'Multi-tenant architecture with data isolation',
      'SSO / SAML / OAuth 2.0 enterprise auth',
      'Role-based access control (RBAC)',
      'Audit logging & compliance reporting',
      'SLA-backed 99.9% uptime infrastructure',
      'White-labelling & custom domain support',
    ],
    timeline: '12–20 weeks for full platform',
    stack: 'React · Microservices · Kubernetes · PostgreSQL · Redis · Stripe',
    cases: [
      { label: 'Enterprise HR platform', time: '16 weeks' },
      { label: 'Multi-tenant FinTech SaaS', time: '18 weeks' },
      { label: 'B2B workflow automation', time: '14 weeks' },
    ],
  },
  'ai-machine-learning': {
    title: 'AI & Machine Learning',
    subtitle: 'Practical AI that ships to production and drives real ROI',
    tag: 'AI & Machine Learning',
    accent: '#0891B2',
    hero: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1920&q=80',
    what: 'We build AI-first products that go beyond demos — GPT-4o integrations, LangChain RAG pipelines, vector search, fine-tuned models, and intelligent workflows all deployed to real users in production environments.',
    deliverables: [
      'GPT-4o / Claude AI integrations',
      'LangChain RAG pipelines with Pinecone / pgvector',
      'Custom ML model training & deployment',
      'Intelligent chatbots & virtual agents',
      'Predictive analytics dashboards',
      'AI workflow automation with LangChain',
    ],
    timeline: '6–12 weeks to production',
    stack: 'Python · LangChain · OpenAI · Pinecone · FastAPI · React',
    cases: [
      { label: 'AI analytics SaaS', time: '8 weeks' },
      { label: 'RAG knowledge base platform', time: '6 weeks' },
      { label: 'Predictive analytics dashboard', time: '10 weeks' },
    ],
  },
  'marketing-automation': {
    title: 'Marketing Automation',
    subtitle: 'End-to-end marketing platforms built for conversions',
    tag: 'Email · CRM · Drip',
    accent: '#D97706',
    hero: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1920&q=80',
    what: 'We build full-stack marketing automation platforms including campaign engines, drip workflow builders, multi-tenant CRM systems, and deep analytics — the same architecture behind our flagship neyo.ai product.',
    deliverables: [
      'Email campaign engines with A/B testing',
      'Drip automation workflow builders',
      'Multi-tenant CRM systems',
      'Campaign analytics & ROI reporting',
      'HubSpot, Salesforce, Zapier integrations',
      'GDPR-compliant data handling & consent flows',
    ],
    timeline: '8–14 weeks for full platform',
    stack: 'React · Node.js · PostgreSQL · Redis · SendGrid · Stripe',
    cases: [
      { label: 'Email automation SaaS', time: '10 weeks' },
      { label: 'Multi-tenant CRM', time: '14 weeks' },
      { label: 'Campaign analytics dashboard', time: '8 weeks' },
    ],
  },
  'legacy-modernisation': {
    title: 'Legacy Modernisation',
    subtitle: 'Transform aging codebases into scalable modern systems',
    tag: 'Migration · Refactor · Lift',
    accent: '#DC2626',
    hero: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
    what: 'We migrate legacy PHP, Java, and monolithic systems to modern, scalable architectures with zero business disruption. Our strangler-fig migration approach keeps your product live throughout the entire transformation.',
    deliverables: [
      'Legacy PHP/Java → Rails/Node migration',
      'Monolith to microservices decomposition',
      'Database migration & schema redesign',
      'API-first architecture transformation',
      'Zero-downtime migration strategy',
      'Comprehensive test suite & documentation',
    ],
    timeline: '6–20 weeks depending on scope',
    stack: 'Node.js · Rails · PostgreSQL · Docker · Kubernetes · AWS',
    cases: [
      { label: 'PHP monolith → microservices', time: '16 weeks' },
      { label: 'Java ERP modernisation', time: '20 weeks' },
      { label: 'Database migration & API rebuild', time: '8 weeks' },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = SERVICE_DATA[slug];

  useSEO(
    svc
      ? {
          title: svc.title,
          description: svc.subtitle,
          path: `/services/${slug}`,
        }
      : {
          rawTitle: 'Service Not Found | AIJOHN Technosoft',
          description: 'The service page you requested could not be found. Browse all AIJOHN Technosoft services instead.',
          path: '/services',
        }
  );

  if (!svc) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 16 }}>Service Not Found</h1>
            <Link to="/services" className="btn btn-primary">← All Services</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="svc-hero" style={{ '--svc-accent': svc.accent }}>
        <div className="svc-hero__bg" style={{ backgroundImage: `url(${svc.hero})` }} />
        <div className="svc-hero__overlay" />
        <div className="container svc-hero__inner">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Link to="/services" className="svc-hero__back"><ArrowLeft size={14} /> All Services</Link>
            <span className="svc-hero__tag">{svc.tag}</span>
            <h1 className="svc-hero__title">{svc.title}</h1>
            <p className="svc-hero__sub">{svc.subtitle}</p>
            <div className="svc-hero__meta">
              <span className="svc-hero__meta-item"><Clock size={14} /> {svc.timeline}</span>
              <span className="svc-hero__meta-item"><Zap size={14} /> Fixed-price guarantee</span>
              <span className="svc-hero__meta-item"><Shield size={14} /> IIT/NIT engineers only</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="svc-body">
        <div className="container svc-body__grid">
          {/* Left: What we do + deliverables */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="svc-body__heading">What We Deliver</h2>
            <p className="svc-body__what">{svc.what}</p>
            <div className="svc-deliverables">
              {svc.deliverables.map(d => (
                <div key={d} className="svc-deliverable">
                  <CheckCircle2 size={16} className="svc-deliverable__icon" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats card */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="svc-card" style={{ '--svc-accent': svc.accent }}>
              <div className="svc-card__section">
                <div className="svc-card__label">Timeline</div>
                <div className="svc-card__val"><Clock size={16} /> {svc.timeline}</div>
              </div>
              <div className="svc-card__section">
                <div className="svc-card__label">Tech Stack</div>
                <div className="svc-card__stack">{svc.stack}</div>
              </div>
              <div className="svc-card__section">
                <div className="svc-card__label">Recent Projects</div>
                {svc.cases.map(c => (
                  <div key={c.label} className="svc-card__case">
                    <Star size={12} className="svc-card__star" />
                    <span>{c.label}</span>
                    <span className="svc-card__case-time">{c.time}</span>
                  </div>
                ))}
              </div>
              <Link to="/estimate" className="svc-card__cta">
                Get a Free Estimate <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta" style={{ '--svc-accent': svc.accent }}>
        <div className="container svc-cta__inner">
          <h2 className="svc-cta__title">Ready to start your {svc.tag} project?</h2>
          <p className="svc-cta__sub">Free 30-min consultation. Fixed-price quote within 48 hours.</p>
          <div className="svc-cta__btns">
            <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer" className="btn-hero-primary">
              Book a Free Call <ArrowRight size={15} />
            </a>
            <Link to="/services" className="btn-hero-outline">← All Services</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
