import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Shield, Users, MessageCircle, ArrowRight, CheckCircle2, Award, Clock, TrendingUp
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './About.css';

const fadeUp = {
  hidden:  { opacity:0, y:28 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ delay: i*0.08, duration:0.5, ease:[0.4,0,0.2,1] } }),
};

const STATS = [
  { icon:<Clock size={22}/>, value:'10+',    label:'Years Experience',   color:'#2176AE' },
  { icon:<Award size={22}/>, value:'IIT/NIT', label:'Grad Engineers',    color:'#7C3AED' },
  { icon:<Users size={22}/>, value:'3+ Yrs',  label:'Team Stability',    color:'#0891B2' },
  { icon:<CheckCircle2 size={22}/>, value:'100%', label:'Full-Service',  color:'#059669' },
];

const VALUES = [
  { icon:<Zap size={22}/>,           color:'#2176AE', title:'Speed Without Compromise',
    desc:'We deliver MVPs in 6–8 weeks because we have done it 10+ times. Speed comes from experience, not shortcuts.' },
  { icon:<Shield size={22}/>,        color:'#7C3AED', title:'Enterprise-Grade by Default',
    desc:'Every project starts with security, scalability, and maintainability built in. Zero technical debt from day one.' },
  { icon:<Users size={22}/>,         color:'#0891B2', title:'We Are Your Team',
    desc:'We join your Slack, attend your standups, and treat your product like it is ours. No vendor distance.' },
  { icon:<MessageCircle size={22}/>, color:'#059669', title:'Radical Transparency',
    desc:'Weekly demos, live progress trackers, honest timelines. You always know exactly where things stand.' },
];

export default function About() {
  useSEO({
    title: 'About',
    description: 'AIJOHN Technosoft partners with Estoras Group (Canada) to build AI-native SaaS products in 6-8 weeks. Fixed price, weekly demos, and zero surprises.',
    path: '/about',
  });
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="page-hero__glow"/>
        <div className="container page-hero__inner">
          <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:0.65}}>
            <span className="section-tag" style={{color:'var(--blue-light)',background:'rgba(74,159,212,0.12)',borderColor:'rgba(74,159,212,0.25)'}}>
              Our Story
            </span>
            <h1 className="page-hero__title">We Are AIJOHN<br/><span className="page-hero__accent">Built to Build</span></h1>
            <p className="page-hero__subtitle">
              A team of IIT/NIT-grad engineers who believe world-class software should not cost a fortune or take forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Band */}
      <div className="about-stats-band">
        <div className="container">
          <div className="about-stats-row">
            {STATS.map((s,i) => (
              <motion.div key={s.label} className="about-stat-item"
                custom={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
                <div className="about-stat-icon" style={{'--stat-color': s.color}}>{s.icon}</div>
                <div>
                  <div className="about-stat-val">{s.value}</div>
                  <div className="about-stat-lbl">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="section about-story-section">
        <div className="container about-story-layout">
          <motion.div data-aos="fade-right">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">Founded to Prove a Point</h2>
            <p className="about-body">
              AIJOHN Technosoft was founded with a simple but bold belief — that Indian engineering talent,
              when given the right structure and culture, can outperform any team in the world at a fraction of the cost.
            </p>
            <p className="about-body">
              Over the past 4+ years, we have built and shipped more than 10 production-grade SaaS products. Our
              most significant is <strong>neyo.ai</strong> — a full enterprise marketing automation platform we built
              from zero, still running today with 99.9% uptime, serving thousands of users across multiple tenants.
            </p>
            <p className="about-body">
              We are not a body-shopping agency. We are a product engineering firm that takes ownership.
              Our longest client engagement is 3+ years — that is the kind of partnership we build.
            </p>
            <Link to="/team" className="btn btn-primary" style={{marginTop:28,display:'inline-flex'}}>
              Meet the Team <ArrowRight size={15}/>
            </Link>
          </motion.div>

          <motion.div className="about-proof-col" data-aos="fade-left">
            <div className="about-proof-card">
              <div className="about-proof-card__label">Flagship Product</div>
              <div className="about-proof-card__product">neyo.ai</div>
              <p className="about-proof-card__desc">Enterprise marketing automation platform — built from zero and running live at staging.neyo.ai for 3+ years.</p>
              <div className="about-proof-stats">
                {[['3+','Years Live'],['99.9%','Uptime'],['Multi','Tenant'],['0','Downtime Deploys']].map(([v,l])=>(
                  <div key={l} className="about-proof-stat">
                    <span className="about-proof-stat__val">{v}</span>
                    <span className="about-proof-stat__lbl">{l}</span>
                  </div>
                ))}
              </div>
              <a href="https://staging.neyo.ai" target="_blank" rel="noopener noreferrer" className="about-proof-link">
                <TrendingUp size={13}/> View live at staging.neyo.ai
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="section about-founder-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">Meet the Founder</h2>
          </div>
          <motion.div className="about-founder-card"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}}>
            <div className="about-founder-avatar">R</div>
            <div className="about-founder-info">
              <div className="about-founder-name">Rajesh</div>
              <div className="about-founder-role">CEO & Founder · AIJOHN Technosoft</div>
              <div className="about-founder-exp">
                <span className="about-exp-badge"><Clock size={11}/> 9+ Years Experience</span>
                <span className="about-exp-badge"><Award size={11}/> Full-Stack Expert</span>
              </div>
              <p className="about-founder-bio">
                Rajesh built AIJOHN from the ground up after nearly a decade of shipping production Rails applications.
                He has led the architecture and delivery of 10+ enterprise SaaS platforms, including neyo.ai.
                His philosophy: move fast, build right, and treat every client like a co-founder.
              </p>
              <div className="about-founder-tags">
                {['Ruby on Rails','SaaS Architecture','AI Integration','AWS','PostgreSQL','Team Leadership'].map(t=>(
                  <span key={t} className="about-founder-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-center" data-aos="fade-up">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">How We Work</h2>
          </div>
          <div className="about-values-grid">
            {VALUES.map((v,i) => (
              <motion.div key={v.title} className="about-value-card"
                custom={i} initial="hidden" whileInView="visible" viewport={{once:true, margin:'-60px'}} variants={fadeUp}
                style={{'--val-color': v.color}}>
                <div className="about-value-icon">{v.icon}</div>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission-section">
        <div className="about-mission__glow"/>
        <div className="container">
          <motion.div className="about-mission-inner"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="about-mission-eyebrow">Our Mission</span>
            <blockquote className="about-mission-quote">
              "We believe world-class software should not cost a fortune. We bring India's best
              engineering talent to global startups — and we prove it with every product we ship."
            </blockquote>
            <cite className="about-mission-cite">— Rajesh, CEO & Founder, AIJOHN Technosoft</cite>
          </motion.div>
        </div>
      </section>

      {/* Estoras */}
      <section className="section about-estoras-section">
        <div className="container">
          <motion.div className="about-estoras-card"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}}>
            <span className="about-estoras-badge">🤝 Strategic Partnership</span>
            <h2 className="about-estoras-title">Proudly Partnered with Estoras Group</h2>
            <p className="about-estoras-desc">
              AIJOHN Technosoft is the exclusive technology partner of <strong>Estoras Group</strong>, Vancouver, Canada.
              This partnership gives us North American enterprise reach and the trust of an established investment group.
            </p>
            <a href="https://estorasgroup.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit estorasgroup.com <ArrowRight size={15}/>
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
