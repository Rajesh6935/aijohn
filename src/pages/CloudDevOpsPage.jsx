import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, Cloud, Server, Shield, Zap, Activity, GitBranch,
  Layers, Database, RefreshCw, Monitor, ChevronRight, Lock, Terminal,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './CloudDevOpsPage.css';

/* ─── Scroll progress ─── */
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
    <div className={`cd-hscroll-scene cd-hscroll-scene--${theme}`} ref={sceneRef}>
      <div className="cd-hscroll-sticky">
        <div className="cd-hscroll-header container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="cd-hscroll-title">{title}</h2>
            {subtitle && <p className="cd-hscroll-sub">{subtitle}</p>}
          </motion.div>
        </div>
        <div className="cd-hscroll-viewport">
          <div className="cd-hscroll-track" ref={trackRef}>
            {items.map((item, i) => renderItem(item, i))}
          </div>
        </div>
        <div className="cd-hscroll-bar">
          <div className="cd-hscroll-bar__fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Canvas particle network (dark sections) ─── */
function ParticleField({ color = '#0891B2' }) {
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
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = color + Math.floor((1 - dist / 120) * 55).toString(16).padStart(2, '0');
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
  return <canvas ref={canvasRef} className="cd-particle-canvas" />;
}

/* ─── Flowing beam grid (light sections) ─── */
function FlowGrid({ accent = '#0891B2' }) {
  return (
    <div className="cd-flow-grid">
      <div className="cd-flow-grid__layer" />
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="cd-flow-grid__beam"
          style={{ left: `${10 + i * 15}%`, '--beam-color': accent }}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'linear', delay: i * 0.5 }} />
      ))}
    </div>
  );
}

/* ─── Architecture diagram node ─── */
function DiagramNode({ label, sublabel, color, delay = 0, pulse = false }) {
  return (
    <motion.div className="cd-diag-node" style={{ '--nc': color }}
      initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {pulse && (
        <motion.div className="cd-diag-node__pulse"
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, delay }} />
      )}
      <div className="cd-diag-node__dot" />
      <div className="cd-diag-node__label">{label}</div>
      {sublabel && <div className="cd-diag-node__sub">{sublabel}</div>}
    </motion.div>
  );
}

function DiagramLine({ vertical = false, delay = 0 }) {
  return (
    <motion.div className={`cd-diag-line ${vertical ? 'cd-diag-line--v' : 'cd-diag-line--h'}`}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }} />
  );
}

/* ══════════ DATA ══════════ */
const CLOUD_PROVIDERS = [
  { name: 'Amazon Web Services', abbr: 'AWS', color: '#FF9900', emoji: '🟠',
    strength: 'EKS · RDS · Lambda · CloudFront',
    desc: 'Our primary cloud. Deep expertise in EKS, RDS Aurora, Lambda, SQS, and CloudFront. Most clients start here for breadth of managed services.',
    tags: ['EKS', 'Aurora RDS', 'Lambda', 'CloudFront', 'S3'] },
  { name: 'Google Cloud Platform', abbr: 'GCP', color: '#4285F4', emoji: '🔵',
    strength: 'GKE · BigQuery · Cloud Run',
    desc: 'Best-in-class for ML workloads, BigQuery analytics, and GKE. Our go-to when your team is already on Google Workspace or needs data warehouse scale.',
    tags: ['GKE', 'BigQuery', 'Cloud Run', 'Pub/Sub', 'Vertex AI'] },
  { name: 'DigitalOcean', abbr: 'DO', color: '#0080FF', emoji: '🌊',
    strength: 'DOKS · Managed DBs · Simplicity',
    desc: 'Right-sized for startups and mid-stage products. Managed Kubernetes (DOKS), Postgres, and App Platform at a fraction of AWS cost.',
    tags: ['DOKS', 'Managed DB', 'App Platform', 'Spaces', 'VPC'] },
  { name: 'Multi-Cloud', abbr: 'Hybrid', color: '#0891B2', emoji: '☁️',
    strength: 'No lock-in · Terraform · Federation',
    desc: 'Terraform-managed multi-cloud deployments that span providers. Active–active failover, federated identity, and unified cost dashboards.',
    tags: ['Terraform', 'Pulumi', 'Zero lock-in', 'Federation', 'FinOps'] },
];

const CAPABILITIES = [
  { Icon: Cloud,     color: '#0891B2', title: 'Multi-Cloud Architecture',  desc: 'AWS, GCP, and DigitalOcean environments designed for resilience, cost efficiency, and zero vendor lock-in. Active–active multi-region from day one.', tags: ['AWS', 'GCP', 'DigitalOcean', 'Multi-region'] },
  { Icon: GitBranch, color: '#06B6D4', title: 'CI/CD & GitOps Pipelines',  desc: 'Automated build, test, and deploy pipelines with trunk-based development, staged rollouts, canary deploys, and automated rollback triggers.', tags: ['GitHub Actions', 'ArgoCD', 'Helm', 'GitOps'] },
  { Icon: Server,    color: '#0E7490', title: 'Kubernetes Orchestration',  desc: 'Production-grade K8s on EKS or GKE with horizontal auto-scaling, namespace isolation, RBAC, network policies, and cost-optimised node pools.', tags: ['EKS', 'GKE', 'Helm', 'RBAC', 'HPA'] },
  { Icon: Layers,    color: '#0891B2', title: 'Infrastructure as Code',    desc: 'Full infrastructure lifecycle managed in Terraform — state backends, reusable modules, automated drift detection, and PR-based plan previews.', tags: ['Terraform', 'Pulumi', 'Ansible', 'CDK'] },
  { Icon: Monitor,   color: '#06B6D4', title: 'Observability Stack',       desc: 'Unified logs, metrics, and traces with Datadog or Grafana. SLO dashboards, anomaly detection, and PagerDuty on-call alerting, pre-configured.', tags: ['Datadog', 'Grafana', 'Prometheus', 'Sentry'] },
  { Icon: Lock,      color: '#0E7490', title: 'Security Hardening',        desc: 'Zero-trust networking, Vault secret management, container image scanning, WAF, and SOC 2 / ISO 27001 compliance controls.', tags: ['Vault', 'Trivy', 'WAF', 'Zero-trust'] },
  { Icon: Database,  color: '#0891B2', title: 'Database Reliability',      desc: 'PostgreSQL and MySQL with multi-AZ replication, automated failover, PITR backups, connection pooling, and query performance dashboards.', tags: ['RDS', 'Aurora', 'PgBouncer', 'Failover'] },
  { Icon: Zap,       color: '#06B6D4', title: 'Performance & Cost',        desc: 'CDN tuning, caching strategy, query analysis, and right-sizing that typically cut cloud spend 40–60% without touching reliability.', tags: ['CloudFront', 'Redis', 'FinOps', 'CDN'] },
];

const PROCESS = [
  { num: '01', Icon: Activity,  color: '#0891B2', title: 'Audit & Discovery',    desc: 'Map your current infrastructure, identify bottlenecks, security gaps, and cost waste. No changes until you approve the findings report.' },
  { num: '02', Icon: Layers,    color: '#06B6D4', title: 'Architecture Design',  desc: 'Right-size the cloud footprint — region selection, networking topology, database tier, and estimated monthly cost before we write a line of IaC.' },
  { num: '03', Icon: GitBranch, color: '#0E7490', title: 'IaC & Pipeline Setup', desc: 'Terraform modules codify every resource. CI/CD pipelines automate deploy on merge with environment promotion gates and plan previews on PR.' },
  { num: '04', Icon: Server,    color: '#0891B2', title: 'Container & K8s',      desc: 'Dockerise services, configure K8s manifests, set resource limits and requests, and wire horizontal pod autoscaling to custom metrics.' },
  { num: '05', Icon: Monitor,   color: '#06B6D4', title: 'Observability',        desc: 'Instrument with structured logs and metrics. SLO dashboards and PagerDuty alerts go live before your users do — never after.' },
  { num: '06', Icon: RefreshCw, color: '#0E7490', title: 'Handover & Runbooks',  desc: 'Full documentation, on-call runbooks, and team training so your engineers own the system with total confidence from day one.' },
];

const STACK_GROUPS = [
  { label: 'Cloud Providers',  items: ['AWS', 'Google Cloud', 'DigitalOcean', 'Azure'] },
  { label: 'Containers & K8s', items: ['Docker', 'Kubernetes', 'Helm', 'ECS', 'EKS', 'GKE'] },
  { label: 'IaC & Automation', items: ['Terraform', 'Pulumi', 'Ansible', 'AWS CDK'] },
  { label: 'Observability',    items: ['Datadog', 'Grafana', 'Prometheus', 'Sentry', 'Loki'] },
];

const STATS = [
  { to: 99, suffix: '.9%',  label: 'SLA uptime delivered' },
  { to: 60, suffix: '%',    label: 'Average cost reduction' },
  { to: 12, suffix: 'x',   label: 'Faster deployments' },
  { to: 5,  suffix: 'min', label: 'Mean time to recover' },
];

/* ════════════ PAGE ════════════ */
export default function CloudDevOpsPage() {
  useSEO({
    title: 'Cloud & DevOps Engineering — AIJOHN Technosoft',
    description: 'Production cloud infrastructure and DevOps. AWS, GCP, Kubernetes, Terraform, CI/CD, and observability.',
    path: '/services/cloud-devops',
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  return (
    <PageWrapper>

      {/* ══════ 1. HERO — Dark cyan, particle network ══════ */}
      <section className="cd-hero" ref={heroRef}>
        <ParticleField color="#0891B2" />
        <motion.div className="cd-hero__orb cd-hero__orb--1"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="cd-hero__orb cd-hero__orb--2"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        <motion.div className="cd-hero__orb cd-hero__orb--3"
          animate={{ x: [0, 30, -60, 0], y: [0, -30, 50, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }} />
        <div className="cd-hero__grid" />
        <motion.div className="cd-hero__scan-line"
          animate={{ y: ['-100vh', '100vh'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }} />

        <motion.div className="cd-hero__content container" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="cd-hero__breadcrumb" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link to="/services">Services</Link><ChevronRight size={12} /><span>Cloud &amp; DevOps</span>
          </motion.div>
          <motion.div className="cd-hero__badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.span className="cd-hero__badge-dot" animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            Infrastructure Engineering
          </motion.div>
          <motion.h1 className="cd-hero__h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            Infrastructure that<br /><span className="cd-hero__h1-glow">never sleeps.</span>
          </motion.h1>
          <motion.p className="cd-hero__sub" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            Multi-cloud architecture, Kubernetes orchestration, GitOps pipelines,
            and full-stack observability — engineered for teams who cannot afford downtime.
          </motion.p>
          <motion.div className="cd-hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
            <Link to="/estimate" className="cd-cta-pill cd-cta-pill--primary">Estimate your infrastructure <ArrowRight size={14} /></Link>
            <Link to="/contact" className="cd-cta-pill cd-cta-pill--ghost">Talk to an engineer</Link>
          </motion.div>
          <motion.div className="cd-hero__scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <motion.div className="cd-hero__scroll-line" animate={{ scaleY: [0, 1, 0], y: [0, 14, 28] }} transition={{ duration: 1.6, repeat: Infinity }} />
            <span>scroll</span>
          </motion.div>
        </motion.div>

        <motion.div className="cd-hero__stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          {STATS.map((s) => (
            <div key={s.label} className="cd-hero__stat">
              <div className="cd-hero__stat-num"><Counter to={s.to} suffix={s.suffix} /></div>
              <div className="cd-hero__stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════ 2. CLOUD PROVIDERS — White, flowing beams ══════ */}
      <section className="cd-providers">
        <FlowGrid accent="#0891B2" />
        <motion.div className="cd-providers__blob cd-providers__blob--1"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="cd-providers__blob cd-providers__blob--2"
          animate={{ x: [0, -30, 50, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />

        <div className="container cd-providers__inner">
          <motion.div className="cd-providers__head" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="cd-providers__eyebrow">Cloud Platforms</span>
            <h2 className="cd-providers__h2">We work across every<br />major cloud.</h2>
            <p className="cd-providers__lead">Not locked to one provider. We select — or combine — the right cloud for your workload, compliance requirements, and budget.</p>
          </motion.div>

          <div className="cd-providers__grid">
            {CLOUD_PROVIDERS.map((p, i) => (
              <motion.div key={p.abbr} className="cd-provider-card" style={{ '--pc': p.color }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}>
                {/* Slow-moving animated brand-color radial gradient */}
                <motion.div className="cd-provider-card__animated-bg"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                  transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${p.color}18, transparent 70%)` }} />
                <motion.div className="cd-provider-card__glow"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7 }} />
                <div className="cd-provider-card__accent" />
                <div className="cd-provider-card__header">
                  <motion.div className="cd-provider-card__logo-wrap"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}>
                    {p.emoji}
                  </motion.div>
                  <div>
                    <div className="cd-provider-card__name">{p.name}</div>
                    <div className="cd-provider-card__abbr">{p.abbr}</div>
                  </div>
                </div>
                <div className="cd-provider-card__strength">{p.strength}</div>
                <p className="cd-provider-card__desc">{p.desc}</p>
                <div className="cd-provider-card__tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 3. K8s ARCHITECTURE — Dark, animated diagram ══════ */}
      <section className="cd-arch">
        <ParticleField color="#06B6D4" />
        <motion.div className="cd-arch__orb cd-arch__orb--1"
          animate={{ x: [0, -60, 40, 0], y: [0, 40, -50, 0], scale: [1, 1.12, 0.92, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="cd-arch__orb cd-arch__orb--2"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }} />
        <div className="cd-arch__grid" />

        <div className="container cd-arch__inner">
          <motion.div className="cd-arch__head" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="cd-arch__eyebrow">How it connects</span>
            <h2 className="cd-arch__h2">Production Kubernetes<br />architecture, visualised.</h2>
            <p className="cd-arch__lead">Every system we deploy follows this layered topology — from developer push to production pod, every hop is automated, observable, and recoverable.</p>
          </motion.div>

          <div className="cd-arch__diagram">
            {/* Layer 1: Client */}
            <div className="cd-arch__row">
              <div className="cd-arch__layer-label" style={{ color: '#f1f5f9' }}>Client Layer</div>
              <div className="cd-arch__nodes">
                <DiagramNode label="Client Browser" sublabel="React / Next.js" color="#e2e8f0" delay={0.1} />
              </div>
            </div>
            <div className="cd-arch__connector-row cd-arch__connector-row--center">
              <DiagramLine vertical delay={0.25} />
            </div>
            {/* Layer 2: Network — amber */}
            <div className="cd-arch__row">
              <div className="cd-arch__layer-label" style={{ color: '#fcd34d' }}>Network Layer</div>
              <div className="cd-arch__nodes">
                <DiagramNode label="CDN" sublabel="CloudFront / Fastly" color="#F59E0B" delay={0.4} pulse />
                <DiagramLine delay={0.5} />
                <DiagramNode label="WAF / DDoS" sublabel="AWS Shield · WAF" color="#F59E0B" delay={0.6} pulse />
                <DiagramLine delay={0.7} />
                <DiagramNode label="Load Balancer" sublabel="ALB · NGINX" color="#F59E0B" delay={0.8} pulse />
              </div>
            </div>
            <div className="cd-arch__connector-row cd-arch__connector-row--center">
              <DiagramLine vertical delay={0.95} />
            </div>
            {/* Layer 3: Compute — blue */}
            <div className="cd-arch__row">
              <div className="cd-arch__layer-label" style={{ color: '#67e8f9' }}>Compute Layer</div>
              <div className="cd-arch__nodes">
                <DiagramNode label="App Server" sublabel="ECS · K8s Pod" color="#0891B2" delay={1.1} pulse />
                <DiagramLine delay={1.2} />
                <DiagramNode label="API Gateway" sublabel="Kong · AWS APIGW" color="#0891B2" delay={1.3} pulse />
                <DiagramLine delay={1.4} />
                <DiagramNode label="Microservices" sublabel="Auth · Orders · AI" color="#0891B2" delay={1.5} pulse />
              </div>
            </div>
            <div className="cd-arch__connector-row cd-arch__connector-row--center">
              <DiagramLine vertical delay={1.65} />
            </div>
            {/* Layer 4: Data — green */}
            <div className="cd-arch__row">
              <div className="cd-arch__layer-label" style={{ color: '#6ee7b7' }}>Data Layer</div>
              <div className="cd-arch__nodes">
                <DiagramNode label="PostgreSQL" sublabel="Aurora Multi-AZ" color="#10B981" delay={1.8} />
                <DiagramLine delay={1.9} />
                <DiagramNode label="Redis Cache" sublabel="Elasticache" color="#10B981" delay={2.0} />
                <DiagramLine delay={2.1} />
                <DiagramNode label="S3 / Storage" sublabel="Objects · Backups" color="#10B981" delay={2.2} />
              </div>
            </div>
            <div className="cd-arch__connector-row cd-arch__connector-row--center">
              <DiagramLine vertical delay={2.35} />
            </div>
            {/* Layer 5: Observability — purple */}
            <div className="cd-arch__row">
              <div className="cd-arch__layer-label" style={{ color: '#c4b5fd' }}>Observability</div>
              <div className="cd-arch__nodes">
                {['Monitoring', 'Alerting', 'Tracing', 'Cost Dashboards'].map((n, i) => (
                  <DiagramNode key={n} label={n} color="#7C3AED" delay={2.5 + i * 0.1} pulse />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ 4. CAPABILITIES CAROUSEL — Light ══════ */}
      <HScrollCarousel theme="light" items={CAPABILITIES}
        title="Eight DevOps disciplines."
        subtitle="Every capability production-tested, not prototype-grade."
        renderItem={(cap, i) => (
          <motion.div key={cap.title} className="cd-hcard cd-hcard--light" style={{ '--hc': cap.color }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
            <div className="cd-hcard__accent-line" />
            {/* Animated badge in top-right */}
            <motion.div className="cd-hcard__corner-badge"
              animate={{ rotate: [0, 15, -15, 0] }}
              whileHover={{ rotate: 360, scale: 1.25 }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
              <cap.Icon size={12} />
            </motion.div>
            <motion.div className="cd-hcard__icon cd-hcard__icon--light"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}>
              <cap.Icon size={22} />
            </motion.div>
            <h3 className="cd-hcard__title cd-hcard__title--light">{cap.title}</h3>
            <p className="cd-hcard__desc cd-hcard__desc--light">{cap.desc}</p>
            <div className="cd-hcard__tags cd-hcard__tags--light">{cap.tags.map(t => <span key={t}>{t}</span>)}</div>
          </motion.div>
        )}
      />

      {/* ══════ 5. PROCESS — Dark, particle, step icons ══════ */}
      <section className="cd-process">
        <ParticleField color="#0E7490" />
        <div className="cd-process__gradient" />
        <div className="container cd-process__inner">
          <motion.div className="cd-process__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="cd-process__eyebrow">How we deliver</p>
            <h2 className="cd-process__title">Six steps to<br />production-grade infra.</h2>
          </motion.div>
          <div className="cd-process__steps">
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} className="cd-process-step" style={{ '--step-c': step.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ background: 'rgba(8,145,178,0.10)', transition: { duration: 0.2 } }}>
                <div className="cd-process-step__num">{step.num}</div>
                <div className="cd-process-step__body">
                  <motion.div className="cd-process-step__icon"
                    animate={{ boxShadow: [`0 0 0 0 ${step.color}44`, `0 0 0 14px ${step.color}00`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
                    <step.Icon size={18} />
                  </motion.div>
                  <div>
                    <div className="cd-process-step__title">{step.title}</div>
                    <p className="cd-process-step__desc">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 6. TECH STACK — White, animated blobs ══════ */}
      <section className="cd-stack">
        <FlowGrid accent="#0891B2" />
        <motion.div className="cd-stack__blob cd-stack__blob--1"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 25, 0], scale: [1, 1.2, 0.88, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="cd-stack__blob cd-stack__blob--2"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }} />

        <div className="container cd-stack__inner">
          <motion.div className="cd-stack__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="cd-stack__eyebrow">Technology</span>
            <h2 className="cd-stack__title">The toolchain that<br />runs at scale.</h2>
          </motion.div>
          <div className="cd-stack__groups">
            {STACK_GROUPS.map((grp, gi) => (
              <motion.div key={grp.label} className="cd-stack-group"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 200 } }}>
                <div className="cd-stack-group__label">{grp.label}</div>
                <div className="cd-stack-group__pills">
                  {grp.items.map((item, ii) => (
                    <motion.span key={item} className="cd-stack-pill"
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: gi * 0.07 + ii * 0.05 }}
                      whileHover={{ x: 8, color: '#0891B2', background: 'rgba(8,145,178,0.10)', transition: { duration: 0.15 } }}>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 7. CTA — Dark, particles + orbs ══════ */}
      <section className="cd-cta-section">
        <ParticleField color="#06B6D4" />
        <motion.div className="cd-cta__orb cd-cta__orb--1"
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="cd-cta__orb cd-cta__orb--2"
          animate={{ x: [0, -50, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
        <div className="cd-cta__grid" />

        <div className="container cd-cta__inner">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div className="cd-cta__icon"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0], boxShadow: ['0 0 0 0 #0891B244', '0 0 40px 10px #0891B222', '0 0 0 0 #0891B244'] }}
              transition={{ duration: 4, repeat: Infinity }}>
              <Cloud size={32} />
            </motion.div>
            <h2 className="cd-cta__h2">Ready to build infra<br />you can depend on?</h2>
            <p className="cd-cta__body">
              Tell us your current setup and scaling goals. We outline a cloud architecture
              that fits your team, traffic pattern, and monthly budget — no fluff.
            </p>
            <div className="cd-cta__btns">
              <Link to="/estimate" className="cd-cta-pill cd-cta-pill--primary">Get a project estimate <ArrowRight size={14} /></Link>
              <Link to="/contact" className="cd-cta-pill cd-cta-pill--ghost">Book a technical call</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
