import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

/* ── Icons ── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const QUICK_LINKS = [
  { label: 'Home',       to: '/'           },
  { label: 'Services',   to: '/services'   },
  { label: 'About Us',   to: '/about'      },
  { label: 'Our Team',   to: '/team'       },
  { label: 'Case Study', to: '/case-study' },
  { label: 'Contact',    to: '/contact'    },
];

const SERVICES_NAV = [
  { label: 'AI-Native SaaS',           to: '/services/ai-native-saas'        },
  { label: 'MVP in 6–8 Weeks',         to: '/services/mvp-development'       },
  { label: 'Web App Development',      to: '/services/web-development'       },
  { label: 'Mobile App Development',   to: '/services/mobile-development'    },
  { label: 'Cloud & DevOps',           to: '/services/cloud-devops'          },
  { label: 'Enterprise SaaS',          to: '/services/enterprise-saas'       },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45, ease: [0.4,0,0.2,1] } }),
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">

      {/* ── Partner Banner ── */}
      <div className="footer__partner-banner">
        <div className="container footer__partner-inner">
          <span className="footer__partner-text">
            Part of&nbsp;<strong>ESTORAS GROUP</strong>&nbsp;of Companies
            &nbsp;·&nbsp;<span className="footer__partner-location">Vancouver, Canada</span>
            &nbsp;·&nbsp;
            <a href="https://estorasgroup.com" target="_blank" rel="noopener noreferrer" className="footer__partner-link">estorasgroup.com</a>
          </span>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">

            {/* ── Col 1: AIJOHN ── */}
            <motion.div className="footer__col footer__col--office"
              custom={0} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>

              <Link to="/" className="footer__logo-wrap" aria-label="AIJOHN home">
                <div className="footer__wordmark">
                  <span className="footer__logo-ai">AI</span><span className="footer__logo-john">JOHN</span>
                </div>
                <div className="footer__logo-sub">Technosoft Private Limited</div>
              </Link>

              <p className="footer__brand-desc">
                Elite IIT/NIT engineers delivering AI-native SaaS products at 3× speed — MVP to production in 6–8 weeks.
              </p>

              <div className="footer__socials">
                <a href="https://linkedin.com/company/aijohn" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="LinkedIn"><LinkedInIcon /></a>
                <a href="https://facebook.com/aijohn" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Facebook"><FacebookIcon /></a>
                <a href="https://g.co/kgs/aijohn" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Google"><GoogleIcon /></a>
              </div>

              <div className="footer__office-block">
                <div className="footer__office-label"><MapPinIcon /> India Office</div>
                <address className="footer__office-address">
                  Government Hospital Rd, Near SS Nagar,<br/>
                  Jangareddygudem, Andhra Pradesh 534447
                </address>
                <div className="footer__contact-list">
                  <a href="mailto:contact@aijohn.org" className="footer__contact-item"><MailIcon /> contact@aijohn.org</a>
                  <a href="tel:+917736522887" className="footer__contact-item"><PhoneIcon /> +91-7736522887</a>
                  <a href="https://aijohn.in" target="_blank" rel="noopener noreferrer" className="footer__contact-item"><GlobeIcon /> aijohn.in</a>
                </div>
              </div>

              <div className="footer__map-wrap">
                <a href="https://www.openstreetmap.org/?mlat=17.1941&mlon=81.3030#map=14/17.1941/81.3030"
                  target="_blank" rel="noopener noreferrer" className="footer__map-link footer__map-link--inline">
                  <MapPinIcon /> Open in Maps →
                </a>
              </div>
            </motion.div>

            {/* ── Col 2: ESTORAS ── */}
            <motion.div className="footer__col footer__col--office"
              custom={1} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>

              <div className="footer__estoras-brand">
                <div className="footer__estoras-wordmark">
                  <span className="footer__estoras-e">E</span><span className="footer__estoras-rest">STORAS</span>
                </div>
                <div className="footer__estoras-tag">Group · Sister Company</div>
              </div>

              <p className="footer__brand-desc">
                Technology holding group headquartered in Vancouver, Canada. Invests in and operates high-growth software businesses across North America and Asia.
              </p>

              <div className="footer__estoras-badge">
                <span className="footer__estoras-badge__dot" />
                Parent Company of AIJOHN Technosoft
              </div>

              <div className="footer__office-block">
                <div className="footer__office-label"><MapPinIcon /> Canada Office</div>
                <address className="footer__office-address">
                  800 W Pender St,<br/>
                  Vancouver, BC V6C 2V6, Canada
                </address>
                <div className="footer__contact-list">
                  <a href="https://estorasgroup.com" target="_blank" rel="noopener noreferrer" className="footer__contact-item"><GlobeIcon /> estorasgroup.com</a>
                </div>
              </div>

              <div className="footer__map-wrap">
                <a href="https://www.openstreetmap.org/?mlat=49.2858&mlon=-123.1170#map=16/49.2858/-123.1170"
                  target="_blank" rel="noopener noreferrer" className="footer__map-link footer__map-link--inline">
                  <MapPinIcon /> Open in Maps →
                </a>
              </div>
            </motion.div>

            {/* ── Col 3: Navigation ── */}
            <motion.div className="footer__col footer__col--nav"
              custom={2} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>

              <h3 className="footer__nav-heading">Quick Links</h3>
              <ul className="footer__link-list" role="list">
                {QUICK_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="footer__nav-link">
                      <span className="footer__link-arrow">›</span>{label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="footer__nav-heading footer__nav-heading--mt">Services</h3>
              <ul className="footer__link-list" role="list">
                {SERVICES_NAV.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="footer__nav-link">
                      <span className="footer__link-arrow">›</span>{label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="footer__nav-cta">
                <Link to="/contact" className="btn btn-primary footer__cta-btn">
                  Start a Project →
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {year} AIJOHN Technosoft Private Limited. All rights reserved.
          </p>
          <div className="footer__legal-links">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <span className="footer__legal-sep" aria-hidden="true">·</span>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
