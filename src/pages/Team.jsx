import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Briefcase, ArrowRight, Users,
  CheckCircle2, Star, Award
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './Team.css';

const TEAM = [
  {
    name: 'Rajesh',
    initials: 'R',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'CEO & Founder',
    dept: 'Leadership',
    avatarGrad: ['#0D1B2A', '#2176AE'],
    education: { degree: 'B.Tech, Computer Science', institution: 'IIT Kharagpur', year: '2013' },
    experience: '10+ years',
    about: 'Rajesh founded AIJOHN after nearly a decade shipping production Rails applications. He has architected and delivered 10+ enterprise SaaS platforms including neyo.ai — a live marketing automation platform serving enterprise clients globally.',
    skills: ['Ruby on Rails', 'SaaS Architecture', 'PostgreSQL', 'AWS', 'AI Integration', 'Team Leadership'],
    speciality: 'Full-Stack · SaaS Architecture',
    featured: true,
  },
  {
    name: 'Priya Nair',
    initials: 'PN',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Lead Backend Engineer',
    dept: 'Engineering',
    avatarGrad: ['#3B0764', '#7C3AED'],
    education: { degree: 'B.Tech, Computer Science & Engineering', institution: 'NIT Calicut', year: '2016' },
    experience: '7 years',
    about: 'Priya leads backend architecture across all client projects. She specializes in high-performance Rails APIs, complex PostgreSQL schemas, and distributed background job systems at scale.',
    skills: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Sidekiq', 'API Design', 'GraphQL'],
    speciality: 'Backend · Databases',
  },
  {
    name: 'Arjun Menon',
    initials: 'AM',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
    role: 'Frontend Lead',
    dept: 'Engineering',
    avatarGrad: ['#065F46', '#059669'],
    education: { degree: 'B.Tech, Computer Science', institution: 'IIT Bombay', year: '2017' },
    experience: '6 years',
    about: 'Arjun drives UI/UX and frontend architecture. He specializes in building fast, accessible, pixel-perfect React interfaces with TypeScript — from design systems to micro-frontends.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Figma'],
    speciality: 'Frontend · UI Systems',
  },
  {
    name: 'Neha Sharma',
    initials: 'NS',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'AI / ML Engineer',
    dept: 'AI',
    avatarGrad: ['#1E40AF', '#0891B2'],
    education: { degree: 'M.Tech, Artificial Intelligence', institution: 'IIT Hyderabad', year: '2019' },
    experience: '4 years',
    about: 'Neha specialises in building production-grade AI systems. She leads all LLM integration work — from RAG pipelines and vector databases to custom ML model training and deployment.',
    skills: ['Python', 'LangChain', 'OpenAI API', 'TensorFlow', 'FastAPI', 'Pinecone'],
    speciality: 'AI/ML · LLM Systems',
  },
  {
    name: 'Vikram Nair',
    initials: 'VN',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    role: 'DevOps & Cloud Architect',
    dept: 'Infrastructure',
    avatarGrad: ['#7C2D12', '#D97706'],
    education: { degree: 'B.Tech, Computer Science', institution: 'NIT Warangal', year: '2015' },
    experience: '8 years',
    about: 'Vikram owns all infrastructure and deployment workflows. He ensures every project launches with zero-downtime CI/CD, auto-scaling, and comprehensive monitoring from day one.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'],
    speciality: 'Cloud · DevOps',
  },
  {
    name: 'Ananya Krishnan',
    initials: 'AK',
    photo: 'https://randomuser.me/api/portraits/women/85.jpg',
    role: 'Full Stack Developer',
    dept: 'Engineering',
    avatarGrad: ['#831843', '#DB2777'],
    education: { degree: 'B.Tech, Computer Science', institution: 'NIT Trichy', year: '2019' },
    experience: '4 years',
    about: 'Ananya works across the full stack with a focus on shipping features end-to-end. She has contributed to neyo.ai and multiple other SaaS products, owning everything from DB schema to polished UI.',
    skills: ['React', 'Ruby on Rails', 'PostgreSQL', 'AWS', 'React Native', 'Tailwind CSS'],
    speciality: 'Full Stack · Mobile',
  },
  {
    name: 'Suresh Kumar',
    initials: 'SK',
    photo: 'https://randomuser.me/api/portraits/men/91.jpg',
    role: 'Mobile Developer',
    dept: 'Mobile',
    avatarGrad: ['#134E4A', '#0D9488'],
    education: { degree: 'B.Tech, Information Technology', institution: 'NIT Surathkal', year: '2018' },
    experience: '5 years',
    about: 'Suresh builds cross-platform mobile apps that feel native on every device. He has shipped multiple apps on iOS and Android using React Native and has deep experience with mobile performance optimisation.',
    skills: ['React Native', 'iOS (Swift)', 'Android (Kotlin)', 'Expo', 'Firebase', 'App Store'],
    speciality: 'Mobile · iOS · Android',
  },
  {
    name: 'Divya Pillai',
    initials: 'DP',
    photo: 'https://randomuser.me/api/portraits/women/26.jpg',
    role: 'QA & Automation Lead',
    dept: 'Quality',
    avatarGrad: ['#1E3A5F', '#2176AE'],
    education: { degree: 'B.Tech, Computer Science', institution: 'NIT Calicut', year: '2017' },
    experience: '6 years',
    about: 'Divya ensures every release is production-ready. She builds automated test suites, manages CI test pipelines, and leads performance and security testing across all client projects.',
    skills: ['RSpec', 'Cypress', 'Jest', 'Playwright', 'k6 Load Testing', 'GitHub Actions'],
    speciality: 'QA · Test Automation',
  },
];

const DEPTS = ['All', 'Leadership', 'Engineering', 'AI', 'Infrastructure', 'Mobile', 'Quality'];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Team() {
  const [activeDept, setActiveDept] = useState('All');
  const [expanded, setExpanded] = useState(null);

  useSEO({
    title: 'Our Team',
    description: 'Meet the AIJOHN Technosoft team — engineers, designers, and product thinkers partnered with Estoras Group to ship enterprise-grade SaaS products.',
    path: '/team',
  });

  const filtered = activeDept === 'All' ? TEAM : TEAM.filter(m => m.dept === activeDept);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero team-hero">
        <div className="page-hero__glow" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="section-tag" style={{ color: 'var(--blue-light)', background: 'rgba(74,159,212,0.12)', borderColor: 'rgba(74,159,212,0.25)' }}>
              <Users size={12} /> Meet the Team
            </span>
            <h1 className="page-hero__title">
              The Engineers<br />
              <span className="page-hero__accent">Behind Every Product</span>
            </h1>
            <p className="page-hero__subtitle">
              IIT and NIT graduates with a shared obsession — shipping software that actually works, on time, every time.
            </p>
            <div className="team-hero__stats">
              {[
                { icon: <Award size={14} />, val: 'IIT & NIT', lbl: 'Grad Engineers' },
                { icon: <Briefcase size={14} />, val: '4–10+', lbl: 'Years Experience' },
                { icon: <CheckCircle2 size={14} />, val: '3+ Yrs', lbl: 'Team Stability' },
                { icon: <Star size={14} />, val: '10+', lbl: 'Products Shipped' },
              ].map(s => (
                <div key={s.lbl} className="team-hero__stat">
                  <span className="team-hero__stat-icon">{s.icon}</span>
                  <span className="team-hero__stat-val">{s.val}</span>
                  <span className="team-hero__stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="team-filter-bar">
        <div className="container team-filter-inner">
          {DEPTS.map(dept => (
            <button key={dept} onClick={() => { setActiveDept(dept); setExpanded(null); }}
              className={`team-filter-btn${activeDept === dept ? ' active' : ''}`}>
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <section className="section team-grid-section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={activeDept} className="team-grid"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26 }}>
              {filtered.map((member, i) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  index={i}
                  isExpanded={expanded === member.name}
                  onToggle={() => setExpanded(expanded === member.name ? null : member.name)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="section team-join-section">
        <div className="container">
          <motion.div className="team-join-card"
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="team-join__glow" />
            <div className="team-join__content">
              <span className="team-join__eyebrow">We're Growing</span>
              <h2 className="team-join__title">Want to Build With Us?</h2>
              <p className="team-join__sub">
                We're always looking for exceptional engineers who want to ship real products
                at speed. IIT/NIT grads preferred. Passion for product required.
              </p>
              <Link to="/contact" className="btn btn-primary team-join__btn">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

/* ── Individual Card ── */
function TeamCard({ member, index, isExpanded, onToggle }) {
  const [grad1, grad2] = member.avatarGrad;
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      className={`team-card${member.featured ? ' team-card--featured' : ''}${isExpanded ? ' team-card--open' : ''}`}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      {member.featured && <div className="team-card__founder-badge"><Star size={11} /> Founder</div>}

      {/* Top: Avatar + Name */}
      <div className="team-card__top">
        <div
          className="team-card__avatar"
          style={{ background: `linear-gradient(135deg, ${grad1} 0%, ${grad2} 100%)` }}
        >
          {member.photo && !imgError ? (
            <img
              src={member.photo}
              alt={member.name}
              className="team-card__photo"
              onError={() => setImgError(true)}
            />
          ) : (
            member.initials
          )}
        </div>
        <div className="team-card__identity">
          <div className="team-card__name">{member.name}</div>
          <div className="team-card__role">{member.role}</div>
          <span className="team-card__speciality">{member.speciality}</span>
        </div>
      </div>

      {/* Education */}
      <div className="team-card__edu">
        <GraduationCap size={13} className="team-card__edu-icon" />
        <div>
          <div className="team-card__edu-inst">{member.education.institution}</div>
          <div className="team-card__edu-deg">{member.education.degree} · {member.education.year}</div>
        </div>
      </div>

      {/* Experience bar */}
      <div className="team-card__exp-row">
        <Briefcase size={12} />
        <span>{member.experience} experience</span>
      </div>

      {/* Skills */}
      <div className="team-card__skills">
        {member.skills.slice(0, isExpanded ? member.skills.length : 4).map(skill => (
          <span key={skill} className="team-card__skill">{skill}</span>
        ))}
        {!isExpanded && member.skills.length > 4 && (
          <span className="team-card__skill team-card__skill--more">+{member.skills.length - 4} more</span>
        )}
      </div>

      {/* Expand toggle */}
      <button className="team-card__toggle" onClick={onToggle}>
        {isExpanded ? 'Show Less ↑' : 'Read Bio ↓'}
      </button>

      {/* Expanded bio */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="team-card__bio-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="team-card__bio">{member.about}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
