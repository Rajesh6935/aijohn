import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Globe, MapPin, Calendar, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import './Contact.css';

const BUDGET_OPTIONS = [
  { value:'', label:'Select your budget range' },
  { value:'$10K–$25K', label:'$10,000 – $25,000' },
  { value:'$25K–$50K', label:'$25,000 – $50,000' },
  { value:'$50K–$100K', label:'$50,000 – $100,000' },
  { value:'$100K+', label:'$100,000+' },
];

const INFO_ITEMS = [
  { icon:<Mail size={18}/>, color:'#2176AE', label:'Email', value:'contact@aijohn.org', href:'mailto:contact@aijohn.org' },
  { icon:<Phone size={18}/>, color:'#7C3AED', label:'Phone', value:'+91 77365 22887', href:'tel:+917736522887' },
  { icon:<Globe size={18}/>, color:'#0891B2', label:'Website', value:'aijohn.in', href:'https://aijohn.in' },
  { icon:<MapPin size={18}/>, color:'#059669', label:'Location', value:'Kochi, Kerala, India', href:null },
];

export default function Contact() {
  useEffect(() => { document.title = 'Contact | AIJOHN Technosoft'; }, []);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', description:'', budget:'' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.description.trim()) e.description = 'Please describe your project';
    if (!form.budget) e.budget = 'Please select a budget range';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY');
      setStatus('success');
      setForm({ name:'', company:'', email:'', phone:'', description:'', budget:'' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="page-hero contact-hero">
        <div className="page-hero__glow"/>
        <div className="container page-hero__inner">
          <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:0.65}}>
            <span className="section-tag" style={{color:'var(--blue-light)',background:'rgba(74,159,212,0.12)',borderColor:'rgba(74,159,212,0.25)'}}>
              Get in Touch
            </span>
            <h1 className="page-hero__title">Let's Build<br/><span className="page-hero__accent">Something Together</span></h1>
            <p className="page-hero__subtitle">Tell us about your project. We'll get back within 24 hours with honest thoughts on scope, timeline, and cost.</p>
          </motion.div>
        </div>
      </section>

      {/* Layout */}
      <section className="section contact-body">
        <div className="container contact-layout">

          {/* Info */}
          <motion.div className="contact-info" initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{duration:0.5, delay:0.1}}>
            <h2 className="contact-info__title">Reach Us Directly</h2>
            <p className="contact-info__sub">Prefer to skip the form? We respond to every serious inquiry within 24 hours.</p>

            <div className="contact-info-items">
              {INFO_ITEMS.map(item => (
                <div key={item.label} className="contact-info-item" style={{'--info-color': item.color}}>
                  <div className="contact-info-item__icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-item__label">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="contact-info-item__value contact-info-item__value--link">{item.value}</a>
                      : <span className="contact-info-item__value">{item.value}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-estoras">
              <span className="contact-estoras__badge">🤝 Strategic Partner</span>
              <div className="contact-estoras__name">Estoras Group</div>
              <div className="contact-estoras__loc"><MapPin size={11}/> Vancouver, Canada</div>
              <p className="contact-estoras__desc">North American clients are served through our Estoras Group partnership — global delivery, enterprise accountability.</p>
            </div>

            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary contact-calendly">
              <Calendar size={16}/> Book a Free 30-Min Call
            </a>
          </motion.div>

          {/* Form */}
          <motion.div className="contact-form-col" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:0.5, delay:0.15}}>
            <div className="contact-form-card">
              <div className="contact-form-card__hdr">
                <h2 className="contact-form-card__title">Tell Us About Your Project</h2>
                <p className="contact-form-card__sub">We'll review and respond within 24 hours.</p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" className="contact-success"
                    initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.38}}>
                    <div className="contact-success__icon"><CheckCircle2 size={32}/></div>
                    <h3 className="contact-success__title">Message Sent!</h3>
                    <p className="contact-success__body">We'll get back to you within 24 hours!</p>
                    <button className="btn btn-primary" onClick={() => setStatus('idle')}>Send Another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate
                    initial={{opacity:1}} exit={{opacity:0}}>
                    <div className="cf-row">
                      <div className="cf-group">
                        <label className="cf-label" htmlFor="cf-name">Full Name *</label>
                        <input id="cf-name" className={`cf-input${errors.name?' cf-input--err':''}`}
                          type="text" name="name" placeholder="John Smith" value={form.name} onChange={handleChange}/>
                        {errors.name && <span className="cf-err">{errors.name}</span>}
                      </div>
                      <div className="cf-group">
                        <label className="cf-label" htmlFor="cf-company">Company</label>
                        <input id="cf-company" className="cf-input" type="text" name="company"
                          placeholder="Acme Inc." value={form.company} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="cf-row">
                      <div className="cf-group">
                        <label className="cf-label" htmlFor="cf-email">Email Address *</label>
                        <input id="cf-email" className={`cf-input${errors.email?' cf-input--err':''}`}
                          type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange}/>
                        {errors.email && <span className="cf-err">{errors.email}</span>}
                      </div>
                      <div className="cf-group">
                        <label className="cf-label" htmlFor="cf-phone">Phone Number</label>
                        <input id="cf-phone" className="cf-input" type="tel" name="phone"
                          placeholder="+1 555 000 0000" value={form.phone} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="cf-group">
                      <label className="cf-label" htmlFor="cf-budget">Budget Range *</label>
                      <select id="cf-budget" className={`cf-input cf-select${errors.budget?' cf-input--err':''}`}
                        name="budget" value={form.budget} onChange={handleChange}>
                        {BUDGET_OPTIONS.map(o => (
                          <option key={o.value} value={o.value} disabled={o.value===''}>{o.label}</option>
                        ))}
                      </select>
                      {errors.budget && <span className="cf-err">{errors.budget}</span>}
                    </div>
                    <div className="cf-group">
                      <label className="cf-label" htmlFor="cf-desc">Project Description *</label>
                      <textarea id="cf-desc" className={`cf-input cf-textarea${errors.description?' cf-input--err':''}`}
                        name="description" rows={5}
                        placeholder="Tell us what you're building, the problem it solves, and where you are right now..."
                        value={form.description} onChange={handleChange}/>
                      {errors.description && <span className="cf-err">{errors.description}</span>}
                    </div>
                    {status==='error' && (
                      <div className="cf-err-banner">Something went wrong. Email us at contact@aijohn.org</div>
                    )}
                    <button type="submit" className="btn btn-primary cf-submit" disabled={status==='loading'}>
                      {status==='loading'
                        ? <span className="cf-spinner"/>
                        : <><Send size={15}/>Send Message</>}
                    </button>
                    <p className="cf-note">Or email us directly at <a href="mailto:contact@aijohn.org">contact@aijohn.org</a></p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
