import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Menu, Phone, ChevronDown,
  Globe, Smartphone, Brain, Cloud, Megaphone, RefreshCw, Calculator
} from 'lucide-react';
import './Navbar.css';

const SERVICES_DROPDOWN = [
  { icon: Globe,       color: '#2176AE', label: 'Web App Development',   sub: 'React · Rails · Node.js',      to: '/services' },
  { icon: Smartphone,  color: '#7C3AED', label: 'Mobile App Development', sub: 'iOS · Android · React Native', to: '/services' },
  { icon: Brain,       color: '#0891B2', label: 'AI & Machine Learning',  sub: 'GPT-4o · LangChain · RAG',     to: '/services' },
  { icon: Cloud,       color: '#059669', label: 'Cloud & DevOps',         sub: 'AWS · Docker · Kubernetes',    to: '/services' },
  { icon: Megaphone,   color: '#D97706', label: 'Marketing Automation',   sub: 'Email · CRM · Drip',           to: '/services' },
  { icon: RefreshCw,   color: '#DC2626', label: 'Legacy Modernisation',   sub: 'Migration · Refactor · Lift',  to: '/services' },
];

const NAV_LINKS = [
  { label: 'Home',       to: '/'           },
  { label: 'Services',   to: '/services',  hasDropdown: true },
  { label: 'About',      to: '/about'      },
  { label: 'Team',       to: '/team'       },
  { label: 'Case Study', to: '/case-study' },
  { label: 'Estimate',   to: '/estimate'   },
  { label: 'Contact',    to: '/contact'    },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const location                            = useLocation();
  const dropdownRef                         = useRef(null);
  const dropdownTimeout                     = useRef(null);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 30), []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const openDropdown  = () => { clearTimeout(dropdownTimeout.current); setDropdownOpen(true);  };
  const closeDropdown = () => { dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120); };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo — white version on dark hero, original on scrolled white bar */}
        <Link to="/" className="navbar__logo" aria-label="AIJOHN home">
          <img
            src={scrolled ? '/aijohn-logo.png' : '/aijohn-logo-white.png'}
            alt="AIJOHN Technosoft"
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, to, hasDropdown }) =>
            hasDropdown ? (
              <div
                key={to}
                className="navbar__dropdown-wrap"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
                ref={dropdownRef}
              >
                <Link
                  to={to}
                  className={`navbar__link navbar__link--has-arrow${isActive(to) ? ' navbar__link--active' : ''}`}
                >
                  {label}
                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="navbar__chevron"
                  >
                    <ChevronDown size={13} strokeWidth={2.5} />
                  </motion.span>
                  {isActive(to) && (
                    <motion.span layoutId="nav-underline" className="navbar__link-underline"
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }} />
                  )}
                </Link>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="navbar__dropdown"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="navbar__dropdown-inner">
                        <div className="navbar__dropdown-header">
                          <span className="navbar__dropdown-title">Our Services</span>
                          <Link to="/services" className="navbar__dropdown-all">View all →</Link>
                        </div>
                        <div className="navbar__dropdown-grid">
                          {SERVICES_DROPDOWN.map(({ icon: Icon, color, label: sLabel, sub, to: sTo }) => (
                            <Link key={sLabel} to={sTo} className="navbar__dropdown-item"
                              style={{ '--dd-color': color }}>
                              <div className="navbar__dropdown-item__icon">
                                <Icon size={16} />
                              </div>
                              <div>
                                <div className="navbar__dropdown-item__label">{sLabel}</div>
                                <div className="navbar__dropdown-item__sub">{sub}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="navbar__dropdown-footer">
                          <Link to="/estimate" className="navbar__dropdown-cta">
                            <Calculator size={14} /> Get a Free Estimate →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={to} to={to} className={`navbar__link${isActive(to) ? ' navbar__link--active' : ''}`}>
                {label}
                {isActive(to) && (
                  <motion.span layoutId="nav-underline" className="navbar__link-underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }} />
                )}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer" className="navbar__cta">
          <Phone size={14} strokeWidth={2.5} />
          Book a Free Call
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen
              ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.18}}><X size={22}/></motion.span>
              : <motion.span key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.18}}><Menu size={22}/></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-menu" className="navbar__mobile"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.4,0,0.2,1] }}>
            <nav className="navbar__mobile-links">
              {NAV_LINKS.map(({ label, to, hasDropdown }, i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}>
                  {hasDropdown ? (
                    <>
                      <button
                        className={`navbar__mobile-link navbar__mobile-link--services${mobileServices ? ' open' : ''}`}
                        onClick={() => setMobileServices(s => !s)}
                      >
                        {label}
                        <motion.span animate={{ rotate: mobileServices ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={15} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {mobileServices && (
                          <motion.div className="navbar__mobile-submenu"
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                            {SERVICES_DROPDOWN.map(({ icon: Icon, color, label: sLabel, to: sTo }) => (
                              <Link key={sLabel} to={sTo} className="navbar__mobile-sublink"
                                style={{ '--dd-color': color }} onClick={() => setMenuOpen(false)}>
                                <Icon size={14} style={{ color }} /> {sLabel}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={to} className={`navbar__mobile-link${isActive(to) ? ' active' : ''}`}>
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.045 }}>
                <a href="https://calendly.com/aijohn" target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary navbar__mobile-cta">
                  <Phone size={14}/> Book a Free Call
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
