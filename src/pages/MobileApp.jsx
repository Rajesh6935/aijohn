import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Smartphone, Apple, Zap, Shield, Database,
  BarChart3, Brain, Code2, Cloud, RefreshCw, CheckCircle2,
  Lock, Activity, GitBranch, Globe, Cpu, Rocket, Wrench,
  Sparkles, Bell, CreditCard, MapPin, Camera, Users,
  ShoppingBag, Heart, Briefcase, Star, Server,
  PlayCircle, Package, Layers, Send, Wifi, Eye,
  Gauge, KeyRound, CloudCog, MonitorSmartphone,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './MobileApp.css';

/* ── animation helpers ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.52, ease: [0.4, 0, 0.2, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

/* ── tilt card ── */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 300, damping: 30 });
  const handle = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  return (
    <motion.div ref={ref} className={className} style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handle} onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
      {children}
    </motion.div>
  );
}

/* ══════════════════ DATA ══════════════════ */

const QUALITY_PILLARS = [
  { value: '120fps', label: 'ProMotion & fluid rendering on every frame',  icon: Gauge   },
  { value: '<1.5s',  label: 'Cold-start launch time — no user left waiting', icon: Zap    },
  { value: '256-bit',label: 'AES encryption on all locally stored data',    icon: Lock    },
  { value: '99.9%',  label: 'Uptime SLA across all maintained apps',        icon: Activity },
];

const APP_TYPES = [
  {
    icon: ShoppingBag, color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#4c1d95,#7C3AED)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=70',
    title: 'E-Commerce & Retail',
    desc: 'Instant product discovery, cart management, real-time inventory sync, smart push offers, and one-tap checkout that converts browsers into buyers.',
    tags: ['Real-time inventory', 'Smart push offers', 'One-tap checkout', 'Deep linking'],
  },
  {
    icon: MapPin, color: '#EC4899',
    gradient: 'linear-gradient(135deg,#9d174d,#EC4899)',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=70',
    title: 'On-Demand & Delivery',
    desc: 'Sub-second real-time GPS tracking, smart driver-rider matching via WebSockets, and live push notifications that keep every user in the loop.',
    tags: ['Live GPS WebSocket', 'Driver matching', 'Status push alerts', 'Geofencing'],
  },
  {
    icon: CreditCard, color: '#0891B2',
    gradient: 'linear-gradient(135deg,#0e4a6e,#0891B2)',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=70',
    title: 'Fintech & Banking',
    desc: 'SSL-pinned API calls, biometric vault authentication, encrypted local storage, and audit-ready transaction logs — security at every layer.',
    tags: ['SSL pinning', 'Biometric vault', 'Encrypted storage', 'Audit logs'],
  },
  {
    icon: Heart, color: '#10B981',
    gradient: 'linear-gradient(135deg,#064e3b,#10B981)',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=70',
    title: 'Health & Fitness',
    desc: 'HealthKit and Google Fit integration, background health data sync, wearable connectivity, and HIPAA-aware data handling throughout.',
    tags: ['HealthKit & Fit', 'Wearable sync', 'Background fetch', 'HIPAA aware'],
  },
  {
    icon: Briefcase, color: '#D97706',
    gradient: 'linear-gradient(135deg,#78350f,#D97706)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=70',
    title: 'Enterprise & B2B',
    desc: 'Offline-first architecture with deterministic sync, MDM-compatible builds, SSO via SAML, and zero-trust API access from the first commit.',
    tags: ['Offline-first DB', 'SSO / SAML', 'MDM ready', 'Zero-trust APIs'],
  },
  {
    icon: Brain, color: '#6366F1',
    gradient: 'linear-gradient(135deg,#3730a3,#6366F1)',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=70',
    title: 'AI-Powered Mobile',
    desc: 'On-device ML models, edge inference with Core ML and ML Kit, LLM chat interfaces that run without sending sensitive data to the cloud.',
    tags: ['On-device inference', 'Core ML / ML Kit', 'Edge AI', 'LLM chat UI'],
  },
];

const PLATFORMS = [
  {
    id: 'ios',
    logo: Apple,
    label: 'iOS — iPhone & iPad',
    color: '#a855f7',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=480&q=80',
    highlight: 'SwiftUI · Metal · ProMotion',
    points: [
      'SwiftUI with Metal-backed 120fps rendering',
      'Instruments profiling — zero memory leaks shipped',
      'APNs push with rich media & deep-link routing',
      'Face ID / Touch ID with Secure Enclave storage',
      'App Clips, Widgets & Live Activities',
      'StoreKit 2 in-app subscriptions & purchases',
    ],
    stat: { value: '120fps', label: 'ProMotion on iPhone 15 Pro — every frame accounted for' },
  },
  {
    id: 'android',
    logo: PlayCircle,
    label: 'Android — Samsung, Pixel & more',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=480&q=80',
    highlight: 'Jetpack Compose · Material 3',
    points: [
      'Jetpack Compose with recomposition tracing',
      'Baseline Profiles for instant startup optimisation',
      'FCM push — rich, actionable, perfectly timed',
      'Biometric Prompt API with hardware-backed keys',
      'WorkManager for reliable background tasks',
      'Adaptive layouts for tablets, foldables & TVs',
    ],
    stat: { value: '0 jank', label: 'Recomposition-traced Compose UI — no dropped frames' },
  },
  {
    id: 'cross',
    logo: Layers,
    label: 'Cross-Platform — React Native',
    color: '#4A9FD4',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=480&q=80',
    highlight: 'New Architecture · JSI · Reanimated 3',
    points: [
      'New Architecture (JSI) — synchronous native calls',
      'Reanimated 3 worklets running on UI thread',
      'Hermes engine with bytecode pre-compilation',
      'Expo EAS with OTA updates, no store wait',
      'Unified TypeScript codebase, 70%+ code reuse',
      'Platform-specific UI components where it matters',
    ],
    stat: { value: 'JSI', label: 'JavaScript Interface — native speed, no async bridge bottleneck' },
  },
];

const TECH_STACK = [
  { group: 'Cross-Platform',  color: '#4A9FD4', items: ['React Native', 'Expo / EAS', 'TypeScript', 'Reanimated 3', 'Zustand', 'TanStack Query'] },
  { group: 'iOS Native',      color: '#a855f7', items: ['Swift 5.9', 'SwiftUI', 'UIKit', 'Metal', 'Instruments', 'XCTest'] },
  { group: 'Android Native',  color: '#10B981', items: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Hilt DI', 'Room DB', 'Espresso'] },
  { group: 'Backend APIs',    color: '#EC4899', items: ['Node.js', 'FastAPI', 'GraphQL', 'REST / gRPC', 'WebSockets', 'SSE'] },
  { group: 'Security & Auth', color: '#D97706', items: ['JWT + Refresh', 'OAuth 2.0', 'SSL Pinning', 'AES-256', 'Biometric Vault', 'OWASP Top-10'] },
  { group: 'Infra & CI/CD',   color: '#6366F1', items: ['AWS / GCP', 'Docker', 'GitHub Actions', 'Fastlane', 'Sentry', 'Crashlytics'] },
];

const PROCESS = [
  { num: '01', Icon: Globe,        color: '#7C3AED', title: 'Discovery & Architecture',    desc: 'User flows, data model, API contract design, and the hardest architectural decisions — done before a single line of code.' },
  { num: '02', Icon: Layers,       color: '#EC4899', title: 'Interactive Prototype',        desc: 'Figma prototype wired to real gestures. You approve the feel before we build it.' },
  { num: '03', Icon: Shield,       color: '#0891B2', title: 'Security Design Review',       desc: 'Threat model, data classification, and API security patterns agreed upfront — not bolted on at launch.' },
  { num: '04', Icon: Code2,        color: '#10B981', title: 'Agile Sprint Builds',          desc: '2-week sprints with daily builds on TestFlight / Play Internal. You see progress every day.' },
  { num: '05', Icon: Server,       color: '#D97706', title: 'Backend Integration & APIs',   desc: 'Real-time WebSocket events, REST endpoints, GraphQL resolvers — connected, tested, and documented.' },
  { num: '06', Icon: Bell,         color: '#6366F1', title: 'Notifications & Real-Time',    desc: 'APNs + FCM push, deep-link routing, in-app live updates via WebSockets or Server-Sent Events.' },
  { num: '07', Icon: Gauge,        color: '#EC4899', title: 'Performance & QA Hardening',   desc: 'Instruments / Perfetto profiling, 20+ real device matrix, memory leak hunting, launch-time tuning.' },
  { num: '08', Icon: RefreshCw,    color: '#7C3AED', title: 'Launch & Ongoing Maintenance', desc: 'App Store submission, OTA update pipeline, crash monitoring, and a maintenance plan that keeps the app healthy long-term.' },
];

const BACKEND_FEATURES = [
  {
    Icon: Wifi, color: '#4A9FD4',
    title: 'Real-Time Data Sync',
    desc: 'WebSocket connections keep your app live — chat messages, order status, stock prices, map positions — all updating instantly without polling.',
    points: ['WebSocket / Socket.io', 'Server-Sent Events', 'GraphQL Subscriptions', 'Firebase Realtime DB'],
  },
  {
    Icon: Server, color: '#7C3AED',
    title: 'API Architecture',
    desc: 'Clean REST and GraphQL APIs designed around mobile data needs — paginated, cached, and shaped so the app never fetches more than it needs.',
    points: ['REST & GraphQL APIs', 'Response caching layers', 'Cursor-based pagination', 'Mobile-first data shaping'],
  },
  {
    Icon: Database, color: '#10B981',
    title: 'Offline-First Storage',
    desc: 'Apps that work without a connection. WatermelonDB or SQLite stores data locally, background sync resolves conflicts when connectivity returns.',
    points: ['WatermelonDB / SQLite', 'Conflict resolution logic', 'Background sync queue', 'MMKV fast key-value store'],
  },
  {
    Icon: Bell, color: '#EC4899',
    title: 'Push Notification System',
    desc: 'Segmented push via APNs and FCM — rich media, action buttons, deep-link routing, scheduled sends, and delivery analytics per user cohort.',
    points: ['APNs & FCM integration', 'Rich media & actions', 'Deep-link on open', 'Delivery & open tracking'],
  },
  {
    Icon: Lock, color: '#D97706',
    title: 'Secure Auth Pipeline',
    desc: 'JWT access + refresh token rotation, biometric unlock, OAuth 2.0 with PKCE, and secure keychain/keystore storage — zero tokens in plain text.',
    points: ['JWT + refresh rotation', 'OAuth 2.0 / PKCE', 'Keychain / Keystore', 'Token revocation on logout'],
  },
  {
    Icon: CloudCog, color: '#6366F1',
    title: 'Cloud File & Media',
    desc: 'Presigned S3 uploads direct from device, CDN-served images with progressive loading, video processing, and cloud storage cost management.',
    points: ['S3 presigned uploads', 'CDN image pipeline', 'Video transcoding', 'Storage lifecycle rules'],
  },
];

const SECURITY_POINTS = [
  { Icon: Lock,     color: '#D97706', title: 'SSL Certificate Pinning',    desc: 'Pins the server certificate in the app bundle so no MITM attack can intercept API traffic — even on compromised networks.' },
  { Icon: KeyRound, color: '#7C3AED', title: 'Keychain & Keystore Vaults', desc: 'Tokens, keys, and sensitive data live in hardware-backed OS vaults — never in AsyncStorage, SharedPreferences, or plain files.' },
  { Icon: Eye,      color: '#EC4899', title: 'Screenshot & Screen Record Blocking', desc: 'Sensitive screens (PIN entry, card details) are flagged to prevent OS-level screenshots and screen recording.' },
  { Icon: Shield,   color: '#10B981', title: 'OWASP Mobile Top-10 Compliance', desc: 'Every build is reviewed against OWASP M1–M10: improper credential usage, insecure data storage, reverse engineering resistance.' },
  { Icon: Cpu,      color: '#0891B2', title: 'Code Obfuscation & Hardening', desc: 'ProGuard / R8 minification on Android, Swift bytecode hardening on iOS — critical logic is non-trivially reversible.' },
  { Icon: Activity, color: '#6366F1', title: 'Runtime Integrity Checks',    desc: 'Root / jailbreak detection, emulator detection, and tamper-detection hooks that respond to suspicious runtime environments.' },
];

const MAINTENANCE_ITEMS = [
  { Icon: RefreshCw, color: '#4A9FD4', title: 'OTA Updates via Expo EAS',     desc: 'Ship JS-layer fixes and content updates instantly — no App Store review wait. Critical patches reach users in minutes.' },
  { Icon: Activity,  color: '#EC4899', title: 'Crash Monitoring & Alerting',  desc: 'Sentry + Crashlytics give us symbolicated crash reports in real-time. We know about a crash before your users report it.' },
  { Icon: Shield,    color: '#10B981', title: 'Dependency Security Patching',  desc: 'Weekly automated CVE scans. Vulnerable dependencies patched and released on a predictable cadence — not when something breaks.' },
  { Icon: BarChart3, color: '#D97706', title: 'Performance Health Reports',    desc: 'Monthly reports on ANR rate, crash-free sessions, launch time, and memory — with recommendations, not just numbers.' },
  { Icon: Code2,     color: '#7C3AED', title: 'Feature Iteration Sprints',     desc: 'Ongoing sprint-based feature work after launch. The product keeps evolving with user feedback and your business roadmap.' },
  { Icon: Server,    color: '#6366F1', title: 'Backend & API Maintenance',     desc: 'The server side is ours to maintain too — dependency updates, database query tuning, API versioning, and infrastructure scaling.' },
];

const CAPABILITIES = [
  { Icon: Gauge,    color: '#7C3AED', title: '120fps ProMotion Rendering',  points: ['Reanimated 3 UI-thread worklets', 'Metal / Skia rendering pipeline', 'Frame-budget profiling', 'No dropped frames policy'] },
  { Icon: MapPin,   color: '#EC4899', title: 'Maps & Live Location',        points: ['Google Maps / Apple MapKit', 'Live GPS WebSocket tracking', 'Geofencing & background updates', 'Route optimisation'] },
  { Icon: Camera,   color: '#0891B2', title: 'Camera & AR',                 points: ['Custom camera with Metal preview', 'ARKit / ARCore overlays', 'Barcode & QR scanning', 'CDN media pipeline'] },
  { Icon: Bell,     color: '#D97706', title: 'Push Notification Engine',    points: ['APNs rich push + actions', 'FCM multi-platform delivery', 'Scheduled & behavioural triggers', 'Deep-link on notification open'] },
  { Icon: Shield,   color: '#10B981', title: 'Security & Auth',             points: ['SSL pinning on all endpoints', 'Face ID / Touch ID + Secure Enclave', 'AES-256 encrypted local storage', 'OWASP M1–M10 coverage'] },
  { Icon: Database, color: '#6366F1', title: 'Offline & Sync',              points: ['WatermelonDB / SQLite', 'Background sync with conflict resolution', 'MMKV fast key-value cache', 'Queue-on-disconnect retry'] },
  { Icon: Brain,    color: '#7C3AED', title: 'On-Device AI',                points: ['Core ML & ML Kit inference', 'TFLite models, no cloud round-trip', 'Vision: face, text, object', 'On-device NLP processing'] },
  { Icon: Wifi,     color: '#EC4899', title: 'Real-Time & WebSockets',      points: ['Socket.io / native WS client', 'Live presence & typing indicators', 'Event-driven state updates', 'Reconnect & queue handling'] },
  { Icon: CreditCard,color: '#D97706',title: 'Payments & Subscriptions',    points: ['Stripe Mobile SDK', 'Apple Pay & Google Pay', 'StoreKit 2 subscriptions', 'Refund & dispute hooks'] },
  { Icon: MonitorSmartphone,color:'#10B981',title:'Adaptive Layouts',       points: ['iPhone, iPad, Foldables', 'Dynamic Type & accessibility', 'Dark mode & theming tokens', 'RTL & i18n-ready'] },
  { Icon: GitBranch,color: '#0891B2', title: 'CI/CD Pipeline',              points: ['Fastlane + GitHub Actions', 'Expo EAS cloud builds', 'TestFlight / Play Internal track', 'Zero-downtime OTA releases'] },
  { Icon: Users,    color: '#6366F1', title: 'Social & Messaging',          points: ['In-app chat (Sendbird / custom)', 'Feed, likes, comments', 'User profiles & follow graph', 'Content moderation hooks'] },
];

/* ══════════════════ PAGE ══════════════════ */
export default function MobileApp() {
  useSEO({
    title: 'Mobile App Development — iOS & Android | AIJOHN',
    description: 'Expert iOS & Android mobile app development. 120fps performance, bank-grade security, real-time backend integration. React Native, Swift, Kotlin.',
    path: '/services/mobile-app-development',
  });

  return (
    <PageWrapper>

      {/* ══════════ HERO ══════════ */}
      <section className="ma-hero">
        <div className="ma-hero__stripes" />
        <div className="ma-hero__grid" />
        <div className="ma-hero__glow ma-hero__glow--1" />
        <div className="ma-hero__glow ma-hero__glow--2" />
        <div className="ma-hero__glow ma-hero__glow--3" />

        <div className="container ma-hero__inner">

          {/* Copy */}
          <motion.div className="ma-hero__copy"
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>

            <div className="ma-hero__breadcrumb">
              <Link to="/services">Services</Link>
              <span>/</span>
              <span>Mobile App Development</span>
            </div>

            <div className="ma-hero__badge">
              <Smartphone size={12} /> iOS · Android · React Native
            </div>

            <h1 className="ma-hero__h1">
              High-Performance Apps.<br/>
              <span className="ma-hero__accent">Zero Compromise.</span>
            </h1>
            <p className="ma-hero__sub">
              AIJOHN builds iOS and Android apps engineered to be fast, secure,
              and maintainable — 120fps animations, bank-grade security, real-time
              backend integration, and a team that stays with you after launch.
            </p>

            <div className="ma-hero__badges-row">
              <span className="ma-hero__pill ma-hero__pill--ios"><Apple size={12}/> App Store Ready</span>
              <span className="ma-hero__pill ma-hero__pill--android"><PlayCircle size={12}/> Google Play Ready</span>
              <span className="ma-hero__pill ma-hero__pill--rn"><Zap size={12}/> 120fps Smooth</span>
            </div>

            <div className="ma-hero__actions">
              <Link to="/estimate" className="ma-btn-primary">
                Get a Project Estimate <ArrowRight size={15}/>
              </Link>
              <Link to="/contact" className="ma-btn-outline">
                Talk to an Engineer <Send size={13}/>
              </Link>
            </div>

            <div className="ma-hero__trust">
              <CheckCircle2 size={12} color="#10B981"/> Senior engineers only &nbsp;·&nbsp;
              <CheckCircle2 size={12} color="#10B981"/> Maintained long-term &nbsp;·&nbsp;
              <CheckCircle2 size={12} color="#10B981"/> Clean, documented code
            </div>
          </motion.div>

          {/* Phone visuals */}
          <div className="ma-hero__phones">
            <motion.div className="ma-phone ma-phone--android"
              initial={{ opacity: 0, x: 40, rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}>
              <div className="ma-phone__label ma-phone__label--android">
                <PlayCircle size={12}/> Android
              </div>
              <img
                src="https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=380&q=85"
                alt="Android app by AIJOHN"
                className="ma-phone__img"
              />
              <div className="ma-phone__overlay" />
            </motion.div>

            <motion.div className="ma-phone ma-phone--iphone"
              initial={{ opacity: 0, x: -20, rotate: -4 }} animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}>
              <div className="ma-phone__label ma-phone__label--ios">
                <Apple size={12}/> iPhone
              </div>
              <img
                src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=380&q=85"
                alt="iOS iPhone app by AIJOHN"
                className="ma-phone__img"
              />
              <div className="ma-phone__overlay" />
            </motion.div>

            <motion.div className="ma-float-badge ma-float-badge--1"
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Gauge size={13} color="#a855f7"/> 120fps ProMotion
            </motion.div>
            <motion.div className="ma-float-badge ma-float-badge--2"
              animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
              <Lock size={13} color="#10B981"/> SSL Pinned + Encrypted
            </motion.div>
            <motion.div className="ma-float-badge ma-float-badge--3"
              animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <Star size={13} color="#f59e0b"/> 4.9★ App Store
            </motion.div>
          </div>

        </div>
        <div className="ma-hero__fade" />
      </section>

      {/* ══════════ QUALITY PILLARS STRIP ══════════ */}
      <section className="ma-stats-strip">
        <div className="ma-stats-strip__stripes" />
        <div className="container">
          <div className="ma-stats-grid">
            {QUALITY_PILLARS.map(({ value, label, icon: Icon }, i) => (
              <motion.div key={label} className="ma-stat"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Icon size={20} className="ma-stat__icon" />
                <div className="ma-stat__value">{value}</div>
                <div className="ma-stat__label">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHAT WE BUILD ══════════ */}
      <section className="ma-section ma-section--dark">
        <div className="ma-section__stripes" />
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Package size={13}/> App Categories</div>
            <h2 className="ma-section-h2">Built for Every Industry.<br/><span className="ma-accent">Engineered for Every User.</span></h2>
            <p className="ma-section-sub">
              Each vertical has its own performance requirements, security constraints, and real-time
              data needs. We understand both the domain and the technology to serve it right.
            </p>
          </motion.div>

          <div className="ma-apps-grid">
            {APP_TYPES.map((app, i) => (
              <motion.div key={app.title} className="ma-app-card"
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}>
                <div className="ma-app-card__img-wrap">
                  <div className="ma-app-card__img" style={{ backgroundImage: `url(${app.image})` }} />
                  <div className="ma-app-card__img-overlay" style={{ background: app.gradient + 'cc' }} />
                  <div className="ma-app-card__icon-wrap" style={{ background: app.gradient }}>
                    <app.icon size={22} color="#fff"/>
                  </div>
                </div>
                <div className="ma-app-card__body">
                  <div className="ma-app-card__title">{app.title}</div>
                  <div className="ma-app-card__desc">{app.desc}</div>
                  <div className="ma-app-card__tags">
                    {app.tags.map(t => (
                      <span key={t} className="ma-app-card__tag" style={{ borderColor: app.color + '40', color: app.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PERFORMANCE SECTION ══════════ */}
      <section className="ma-perf">
        <div className="ma-perf__bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1400&q=60')` }} />
        <div className="ma-perf__overlay" />
        <div className="ma-perf__stripes" />
        <div className="container ma-perf__inner">

          <motion.div className="ma-perf__copy"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Gauge size={13}/> Performance Philosophy</div>
            <h2 className="ma-perf__h2">
              Every Frame Matters.<br/>
              <span className="ma-accent">We Engineer for 120fps.</span>
            </h2>
            <p className="ma-perf__sub">
              Most agencies ship apps that pass the demo. We ship apps that users describe
              as "buttery smooth." The difference is measurable — and it comes from
              disciplined engineering choices made at every layer of the stack.
            </p>
          </motion.div>

          <div className="ma-perf__cards">
            {[
              { Icon: Gauge,    color: '#a855f7', title: '120fps on ProMotion Displays',  body: 'Reanimated 3 moves all animations to the UI thread. Zero JS bridge calls during gesture — the frame rate never drops.' },
              { Icon: Zap,      color: '#10B981', title: '<1.5s Cold Start, Always',       body: 'Hermes bytecode pre-compilation, lazy module loading, and Baseline Profiles eliminate startup jank entirely.' },
              { Icon: Cpu,      color: '#4A9FD4', title: 'JSI — Synchronous Native Calls', body: 'The New Architecture replaces the async bridge with JSI. Native modules respond synchronously on the same thread.' },
              { Icon: Activity, color: '#EC4899', title: 'Zero Memory Leak Tolerance',     body: 'Every release is Instruments / Perfetto profiled. We catch leaks during development, not after your users report slowdowns.' },
            ].map((card, i) => (
              <motion.div key={card.title} className="ma-perf-card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="ma-perf-card__icon" style={{ background: card.color + '18', color: card.color }}>
                  <card.Icon size={22}/>
                </div>
                <div className="ma-perf-card__title">{card.title}</div>
                <div className="ma-perf-card__body">{card.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PLATFORM DEEP DIVE ══════════ */}
      <section className="ma-section ma-section--light">
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Smartphone size={13}/> Platform Expertise</div>
            <h2 className="ma-section-h2 ma-section-h2--dark">
              Deep Native Mastery.<br/><span className="ma-accent">On Every Platform.</span>
            </h2>
            <p className="ma-section-sub ma-section-sub--dark">
              We don't wrap web views and call it a mobile app. Whether native Swift,
              native Kotlin, or React Native's New Architecture — we go deep into each
              platform's rendering pipeline, memory model, and API surface.
            </p>
          </motion.div>

          <div className="ma-platforms">
            {PLATFORMS.map((p) => (
              <TiltCard key={p.id} className="ma-platform-card">
                <div className="ma-platform-card__photo-wrap">
                  <img src={p.image} alt={p.label} className="ma-platform-card__photo" />
                  <div className="ma-platform-card__photo-overlay" style={{ background: `linear-gradient(180deg, transparent 30%, ${p.color}22 100%)` }} />
                  <div className="ma-platform-card__highlight-badge" style={{ background: p.color + '18', borderColor: p.color + '44', color: p.color }}>
                    {p.highlight}
                  </div>
                </div>
                <div className="ma-platform-card__body">
                  <div className="ma-platform-card__icon" style={{ background: p.color + '18', color: p.color }}>
                    <p.logo size={20}/>
                  </div>
                  <div className="ma-platform-card__label">{p.label}</div>
                  <ul className="ma-platform-card__points">
                    {p.points.map(pt => (
                      <li key={pt}><CheckCircle2 size={11} style={{ color: p.color }}/> {pt}</li>
                    ))}
                  </ul>
                  <div className="ma-platform-card__stat">
                    <span className="ma-platform-card__stat-val" style={{ color: p.color }}>{p.stat.value}</span>
                    <span className="ma-platform-card__stat-label">{p.stat.label}</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BACKEND INTEGRATION ══════════ */}
      <section className="ma-section ma-section--dark">
        <div className="ma-section__stripes ma-section__stripes--diagonal" />
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Server size={13}/> Backend Integration</div>
            <h2 className="ma-section-h2">The App Is One Half.<br/><span className="ma-accent">The Backend Is the Other.</span></h2>
            <p className="ma-section-sub">
              We build and integrate the server side too. Real-time APIs, push notification
              infrastructure, secure auth pipelines, cloud storage, and offline sync —
              everything wired correctly from day one.
            </p>
          </motion.div>

          <div className="ma-backend-grid">
            {BACKEND_FEATURES.map((feat, i) => (
              <motion.div key={feat.title} className="ma-backend-card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}>
                <div className="ma-backend-card__icon" style={{ background: feat.color + '15', color: feat.color }}>
                  <feat.Icon size={22}/>
                </div>
                <div className="ma-backend-card__title">{feat.title}</div>
                <div className="ma-backend-card__desc">{feat.desc}</div>
                <ul className="ma-backend-card__points">
                  {feat.points.map(p => (
                    <li key={p}><CheckCircle2 size={10} style={{ color: feat.color }}/> {p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECURITY ══════════ */}
      <section className="ma-security">
        <div className="ma-security__bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=55')` }} />
        <div className="ma-security__overlay" />
        <div className="ma-security__stripes" />
        <div className="container ma-security__inner">
          <motion.div className="ma-security__head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Shield size={13}/> Security Architecture</div>
            <h2 className="ma-security__h2">
              Security Is Designed In.<br/>
              <span className="ma-accent">Not Added After.</span>
            </h2>
            <p className="ma-security__sub">
              We threat-model every app before writing a single API call. From network transport
              to local storage to code hardening — every vector is covered.
            </p>
          </motion.div>

          <div className="ma-security__grid">
            {SECURITY_POINTS.map((s, i) => (
              <motion.div key={s.title} className="ma-security-card"
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="ma-security-card__icon" style={{ background: s.color + '18', color: s.color }}>
                  <s.Icon size={20}/>
                </div>
                <div className="ma-security-card__title">{s.title}</div>
                <div className="ma-security-card__desc">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TECH STACK ══════════ */}
      <section className="ma-section ma-section--dark ma-section--stack">
        <div className="ma-section__stripes" />
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Code2 size={13}/> Technology</div>
            <h2 className="ma-section-h2">The Stack We<br/><span className="ma-accent">Build With</span></h2>
            <p className="ma-section-sub">
              Production-proven tools chosen for performance, long-term maintainability,
              and deep community support — not because they're trendy.
            </p>
          </motion.div>

          <div className="ma-stack-grid">
            {TECH_STACK.map((group, i) => (
              <motion.div key={group.group} className="ma-stack-group"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="ma-stack-group__label" style={{ color: group.color }}>{group.group}</div>
                <div className="ma-stack-chips">
                  {group.items.map(item => (
                    <span key={item} className="ma-stack-chip" style={{ borderColor: group.color + '30', color: group.color }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section className="ma-section ma-section--light">
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><GitBranch size={13}/> How We Work</div>
            <h2 className="ma-section-h2 ma-section-h2--dark">
              From Idea to<br/><span className="ma-accent">App Store Live</span>
            </h2>
            <p className="ma-section-sub ma-section-sub--dark">
              A disciplined process built from 40+ app launches. Architecture decisions
              upfront, security reviewed before build, performance validated before ship.
            </p>
          </motion.div>

          <div className="ma-process-grid">
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} className="ma-process-step"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="ma-process-step__num" style={{ color: step.color, borderColor: step.color + '30', background: step.color + '10' }}>{step.num}</div>
                <div className="ma-process-step__icon" style={{ background: step.color + '12', color: step.color }}><step.Icon size={18}/></div>
                <div className="ma-process-step__content">
                  <div className="ma-process-step__title">{step.title}</div>
                  <div className="ma-process-step__desc">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MAINTENANCE ══════════ */}
      <section className="ma-section ma-section--dark">
        <div className="ma-section__stripes ma-section__stripes--diagonal" />
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Wrench size={13}/> Long-Term Maintenance</div>
            <h2 className="ma-section-h2">We Don't Just Launch.<br/><span className="ma-accent">We Stay.</span></h2>
            <p className="ma-section-sub">
              The launch is day one, not the finish line. AIJOHN maintains the apps we build —
              patching, monitoring, iterating, and scaling so you never deal with a stale codebase.
            </p>
          </motion.div>

          <div className="ma-maintenance-grid">
            {MAINTENANCE_ITEMS.map((item, i) => (
              <motion.div key={item.title} className="ma-maintenance-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}>
                <div className="ma-maintenance-card__icon" style={{ background: item.color + '15', color: item.color }}>
                  <item.Icon size={20}/>
                </div>
                <div className="ma-maintenance-card__title">{item.title}</div>
                <div className="ma-maintenance-card__desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CAPABILITIES GRID ══════════ */}
      <section className="ma-section ma-section--light">
        <div className="container">
          <motion.div className="ma-section-head"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag"><Cpu size={13}/> Full Capabilities</div>
            <h2 className="ma-section-h2 ma-section-h2--dark">Every Feature.<br/><span className="ma-accent">Done Properly.</span></h2>
            <p className="ma-section-sub ma-section-sub--dark">
              The hard parts of mobile — payments, GPS, camera, biometrics, offline sync —
              are exactly where most apps fail. We've shipped every one of these, correctly, across dozens of apps.
            </p>
          </motion.div>

          <motion.div className="ma-cap-grid ma-cap-grid--light"
            initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={stagger}>
            {CAPABILITIES.map((cap) => (
              <motion.div key={cap.title} className="ma-cap-card ma-cap-card--light" variants={fadeUp}
                whileHover={{ y: -4 }}>
                <div className="ma-cap-card__icon" style={{ background: cap.color + '15', color: cap.color }}>
                  <cap.Icon size={20}/>
                </div>
                <div className="ma-cap-card__title ma-cap-card__title--dark">{cap.title}</div>
                <ul className="ma-cap-card__points ma-cap-card__points--dark">
                  {cap.points.map(p => (
                    <li key={p}><CheckCircle2 size={10} style={{ color: cap.color }}/> {p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ SHOWCASE STRIP ══════════ */}
      <section className="ma-showcase">
        <div className="ma-showcase__stripes" />
        <div className="ma-showcase__photos">
          {[
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=70',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=70',
            'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=400&q=70',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=70',
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=70',
          ].map((src, i) => (
            <motion.div key={i} className="ma-showcase__photo-wrap"
              initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <img src={src} alt="Mobile app" className="ma-showcase__photo" />
              <div className="ma-showcase__photo-overlay" />
            </motion.div>
          ))}
        </div>
        <div className="ma-showcase__caption">Precision engineering. Real devices. Real users.</div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="ma-cta">
        <div className="ma-cta__stripes" />
        <div className="ma-cta__glow" />
        <div className="container ma-cta__inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="ma-section-tag" style={{ justifyContent: 'center' }}><Sparkles size={13}/> Let's Build</div>
            <h2 className="ma-cta__h2">Your Users Deserve<br/>an App That Just Works</h2>
            <p className="ma-cta__sub">
              Tell us what you want to build — iOS, Android, or both. We'll send you
              a tailored technical approach and timeline within 24 hours.
            </p>
            <div className="ma-cta__btns">
              <Link to="/estimate" className="ma-btn-primary ma-btn-primary--lg">
                Get a Project Estimate <ArrowRight size={15}/>
              </Link>
              <Link to="/contact" className="ma-btn-ghost">
                Talk to an Engineer <Send size={13}/>
              </Link>
            </div>
            <div className="ma-cta__trust">
              <span><CheckCircle2 size={12} color="#10B981"/> Senior engineers only</span>
              <span><CheckCircle2 size={12} color="#10B981"/> Clean, documented code</span>
              <span><CheckCircle2 size={12} color="#10B981"/> Maintained after launch</span>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
