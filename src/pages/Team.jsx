import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Briefcase, ArrowRight, Users,
  CheckCircle2, Star, Award, Play, X
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './Team.css';

const TEAM = [
  {
    name: 'Rajesh Mallelli',
    initials: 'RM',
    photo: '/team/rajesh.png',
    role: 'Founder & CEO',
    dept: 'Engineering',
    avatarGrad: ['#0D1B2A', '#2176AE'],
    education: { degree: 'M.Tech, Computer Science & Engineering', institution: 'NIT Calicut', year: '2013' },
    experience: '10+ years',
    about: 'Rajesh founded AIJOHN after nearly a decade shipping production Rails applications. He has architected and delivered 10+ enterprise SaaS platforms including neyo.ai — a live marketing automation platform serving enterprise clients globally.',
    skills: ['Ruby on Rails', 'React', 'AWS', 'Machine Learning', 'AI', 'SaaS Architecture'],
    speciality: 'Full-Stack · SaaS Architecture',
    featured: true,
  },
  {
    name: 'Katta Leela Chinta Rao',
    initials: 'KL',
    photo: '/team/leela.png',
    role: 'Director',
    dept: 'Leadership',
    avatarGrad: ['#0D1B2A', '#1E3A8A'],
    education: { degree: 'Operations & Finance', institution: 'Strategic Management', year: '' },
    experience: '10+ years',
    about: 'Katta Leela Chinta Rao serves as Director, overseeing operations, financial strategy, and organizational growth. He works closely with the leadership team to ensure seamless delivery and operational excellence across all projects.',
    skills: ['Operations', 'Strategy', 'Finance', 'Executive Management', 'Leadership'],
    speciality: 'Operations · Strategy · Finance',
  },
  {
    name: 'Patrick Klein',
    initials: 'PK',
    photo: '/team/Patrick.jpg',
    role: 'Director, Estoras Group',
    dept: 'Leadership',
    avatarGrad: ['#1E293B', '#475569'],
    education: { degree: 'IT Consulting & Strategy', institution: 'Estoras Group', year: 'Vancouver' },
    experience: '15+ years',
    about: 'Patrick is a Director at Estoras Group, focusing on strategic planning and innovation. With an IT consulting background including Microsoft Dynamics, Zoho One, and Salesforce, he empowers the team to drive efficiency and profitability.',
    skills: ['Strategy', 'Executive Management', 'Project Management', 'Innovation Development', 'Marketing Strategy', 'IT Consulting'],
    speciality: 'Strategy · Executive Management',
  },
  {
    name: 'Rahul Chakravorthy',
    initials: 'RC',
    photo: '/team/rahul.png',
    role: 'Solution Architect',
    dept: 'Engineering',
    avatarGrad: ['#047857', '#10B981'],
    education: { degree: 'B.Tech, Computer Science', institution: 'IIT Delhi', year: '2016' },
    experience: '10 years',
    about: 'Rahul is a seasoned Solution Architect with a decade of experience in building enterprise-grade React applications. An alumnus of IIT Delhi, he specializes in frontend architecture, performance optimization, and scalable web UI systems.',
    skills: ['React', 'TypeScript', 'Next.js', 'Solution Architecture', 'System Design', 'Performance Optimization'],
    speciality: 'React · Solution Architecture',
  },
  {
    name: 'Adarsh RK',
    initials: 'AR',
    photo: '/team/adarsh.png',
    role: 'Lead Architect',
    dept: 'Engineering',
    avatarGrad: ['#312E81', '#4F46E5'],
    education: { degree: 'B.Tech, Computer Science', institution: 'NIT Calicut', year: '2016' },
    experience: '10 years',
    about: 'Adarsh is a Lead Architect with a decade of experience building high-performance full-stack web applications. An alumnus of NIT Calicut, he specializes in React, Node.js, MERN, and MEAN stacks, designing robust systems from database to UI.',
    skills: ['React', 'Node.js', 'MERN Stack', 'MEAN Stack', 'System Architecture', 'Database Design'],
    speciality: 'Full-Stack · Lead Architecture',
  },
  {
    name: 'Krishna Chaitanya',
    initials: 'KC',
    photo: '/team/krishna.png',
    role: 'Tech Delivery Manager',
    dept: 'Leadership',
    avatarGrad: ['#581C87', '#9333EA'],
    education: { degree: 'M.Tech, Computer Science & Engineering', institution: 'NIT Calicut', year: '2016' },
    experience: '10 years',
    about: 'Krishna Chaitanya is a Tech Delivery Manager with a decade of experience orchestrating project execution and technical solutions. An alumnus of NIT Calicut with an M.Tech in CSE, he specializes in SAP, agile delivery, and managing cross-functional technical teams.',
    skills: ['SAP', 'Delivery Management', 'Agile Methodology', 'Project Management', 'Tech Leadership', 'Software Engineering'],
    speciality: 'SAP · Tech Delivery Management',
  },
  {
    name: 'Nani Geddam',
    initials: 'NG',
    photo: '/team/nani.png',
    role: 'Finance Manager',
    dept: 'Leadership',
    avatarGrad: ['#7C2D12', '#D97706'],
    education: { degree: 'MBA, Finance', institution: 'Business School', year: '2014' },
    experience: '12+ years',
    about: 'Nani Geddam is a Finance Manager with over 12 years of experience in corporate finance and banking. Having previously served as an HDFC Bank Manager, he manages financial planning, capital structure, and risk analysis at AIJOHN, ensuring fiscal discipline and strategic growth.',
    skills: ['Finance', 'Banking', 'Financial Management', 'Risk Assessment', 'Strategic Planning', 'Asset Management'],
    speciality: 'Finance · Wealth & Risk Management',
  },
  {
    name: 'Paras Asati',
    initials: 'PA',
    photo: '/team/paras.jpeg',
    role: 'Engineering Lead',
    dept: 'Engineering',
    avatarGrad: ['#0D1B2A', '#1E40AF'],
    education: { degree: 'B.Tech, Computer Science', institution: 'IIIT Allahabad', year: '2015' },
    experience: '8+ years',
    about: 'Paras is an Engineering Lead with a strong track record of architecting high-performance backend platforms. An alumnus of IIIT Allahabad and former Tech Lead at Housing.com, he specializes in scalable backend development, database architecture, and microservices.',
    skills: ['Backend Development', 'System Design', 'Scalability', 'Microservices', 'Database Architecture', 'Python', 'Node.js'],
    speciality: 'Backend · System Architecture',
  },
  {
    name: 'Lokesh Prasad',
    initials: 'LP',
    photo: '/team/lokesh.png',
    role: 'DevOps Engineer',
    dept: 'Infrastructure',
    avatarGrad: ['#7C2D12', '#EA580C'],
    education: { degree: 'B.Sc', institution: 'Andhra University', year: '2022' },
    experience: '3+ years',
    about: 'Lokesh Prasad is a DevOps Engineer with over 3 years of experience in cloud infrastructure and deployment automation. He specializes in designing CI/CD pipelines, managing containerized applications with Docker and Kubernetes, and orchestrating cloud services to ensure high availability and scalability.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux', 'Terraform', 'GitHub Actions'],
    speciality: 'Cloud · Infrastructure',
  },
  {
    name: 'Anu Adamalli',
    initials: 'AA',
    photo: '/team/anu.png',
    role: 'QA Engineer',
    dept: 'Quality',
    avatarGrad: ['#1E3A8A', '#2176AE'],
    education: { degree: 'MBA & B.Sc', institution: 'Science & Management Graduate', year: '2022' },
    experience: '3+ years',
    about: 'Anu Adamalli is a QA Engineer with over 3 years of experience in software quality assurance and testing. With a strong background combining business management (MBA) and scientific analysis (B.Sc), she excels at writing comprehensive test plans, identifying critical defects, and executing manual and automated test suites to ensure high product quality.',
    skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'API Testing', 'Jira', 'Test Cases', 'QA Methodologies'],
    speciality: 'QA · Testing',
  },
  {
    name: 'Yasaswini Dasari',
    initials: 'YD',
    photo: '/team/yash.png',
    role: 'Backend Developer',
    dept: 'Engineering',
    avatarGrad: ['#3B0764', '#7C3AED'],
    education: { degree: 'B.Tech, Computer Science & Engineering', institution: 'Gudlavalleru Engineering College', year: '2023' },
    experience: '2+ years',
    about: 'Yasaswini Dasari is a Backend Developer with over 2 years of experience specializing in Ruby on Rails. A B.Tech graduate in Computer Science from Gudlavalleru Engineering College, she excels at designing RESTful APIs, optimizing database queries, and building scalable server-side features.',
    skills: ['Ruby on Rails', 'PostgreSQL', 'REST APIs', 'ActiveRecord', 'Git', 'Backend Development'],
    speciality: 'Backend · Ruby on Rails',
  },
  {
    name: 'Sailaja',
    initials: 'S',
    photo: '/team/shailu.png',
    role: 'Frontend Developer',
    dept: 'Engineering',
    avatarGrad: ['#065F46', '#059669'],
    education: { degree: 'B.Tech, Computer Science & Engineering', institution: 'Gudlavalleru Engineering College', year: '2023' },
    experience: '2+ years',
    about: 'Sailaja is a Frontend Developer with over 2 years of experience specializing in React. A CSE graduate from Gudlavalleru Engineering College, she is passionate about building responsive, pixel-perfect user interfaces and creating seamless digital experiences.',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Redux', 'Git', 'Responsive Design'],
    speciality: 'Frontend · React',
  },
  {
    name: 'Ranjitha S',
    initials: 'RS',
    photo: '/team/ranjitha.jpeg',
    role: 'Senior UI Developer & React Consultant',
    dept: 'Engineering',
    avatarGrad: ['#0D1B2A', '#831843'],
    education: { degree: 'B.E., Instrumentation Technology', institution: 'Bapuji Institute of Engineering & Technology', year: '2015' },
    experience: '10+ years',
    about: 'Ranjitha S is a Senior UI Developer and React Consultant with a decade of experience across frontend and full-stack technologies. A graduate of Bapuji Institute of Engineering & Technology, she is highly skilled in React.js, TypeScript, Next.js, and Java Spring Boot, designing high-quality user experiences and scalable applications.',
    skills: ['React.js', 'JavaScript', 'TypeScript', 'Next.js', 'Java', 'Spring Boot', 'UX Design', 'HTML & CSS'],
    speciality: 'Senior UI · React · Full-Stack',
  },
  {
    name: 'Ankita Agrawal',
    initials: 'AA',
    photo: '/team/ankita.jpg',
    role: 'Senior Software Engineer & React Consultant',
    dept: 'Engineering',
    avatarGrad: ['#1E40AF', '#0891B2'],
    education: { degree: 'Master’s Degree, Computer Software Engineering', institution: 'Gujarat Technological University (GTU)', year: '2014' },
    experience: '11+ years',
    about: 'Ankita Agrawal is a Senior Software Engineer and React Consultant with over 11 years of experience in building high-scale applications. Previously a Senior Software Engineer at Employment Hero, she specializes in React, TypeScript, Next.js, and software engineering best practices.',
    skills: ['React.js', 'TypeScript', 'Next.js', 'Software Engineering', 'System Architecture', 'Frontend Development'],
    speciality: 'Senior Software Engineer · React',
  },
  {
    name: 'Suzen Sujala',
    initials: 'SS',
    photo: '/team/susan.png',
    role: 'Operations Manager',
    dept: 'Leadership',
    avatarGrad: ['#134E4A', '#0D9488'],
    education: { degree: 'B.Tech & MBA', institution: 'Engineering & Management Graduate', year: '2018' },
    experience: '8+ years',
    about: 'Suzen Sujala is an Operations Manager with over 8 years of experience in business operations and project coordination. Combining engineering logic (B.Tech) with business acumen (MBA), she oversees daily operations, team collaboration, and client deliverables, ensuring efficient execution workflows.',
    skills: ['Operations', 'Project Management', 'Business Strategy', 'Team Management', 'Process Optimization', 'Client Relations'],
    speciality: 'Operations · Management',
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
  const [showVideo, setShowVideo] = useState(false);

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
            <div className="team-hero__actions" style={{ marginTop: '28px' }}>
              <button onClick={() => setShowVideo(true)} className="btn btn-outline-white team-video-btn" style={{ gap: '10px' }}>
                <Play size={16} fill="currentColor" /> Play Team Video
              </button>
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

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              className="video-modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="video-modal-close" onClick={() => setShowVideo(false)}>
                <X size={20} />
              </button>
              <video
                src="/team-video.mp4"
                controls
                autoPlay
                className="team-video-player"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <span className="team-card__dept-badge">{member.dept}</span>

      {/* Top: Avatar + Name */}
      <div className="team-card__top">
        <div className="team-card__avatar-container">
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
          <div className="team-card__edu-deg">{member.education.degree}{member.education.year ? ` · ${member.education.year}` : ''}</div>
        </div>
      </div>

      {/* Experience bar */}
      <div className="team-card__exp-row">
        <Briefcase size={12} className="team-card__exp-icon" />
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
