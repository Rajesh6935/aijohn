import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatBot     from './components/ChatBot';

import Home          from './pages/Home';
import Services      from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About     from './pages/About';
import CaseStudy from './pages/CaseStudy';
import Contact   from './pages/Contact';
import Team      from './pages/Team';
import Estimate  from './pages/Estimate';
import WebApp    from './pages/WebApp';
import MobileApp from './pages/MobileApp';

/* ── Animated route switcher ── */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />}      />
        <Route path="/services"   element={<Services />}  />
        <Route path="/services/web-development"        element={<WebApp />}    />
        <Route path="/services/mobile-app-development" element={<MobileApp />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about"      element={<About />}     />
        <Route path="/team"       element={<Team />}      />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/estimate"   element={<Estimate />}  />
        <Route path="/contact"    element={<Contact />}   />
        <Route path="*"           element={<NotFound />}  />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 680,
      easing:   'ease-out-cubic',
      once:     true,
      offset:   60,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
      <ChatBot />
    </Router>
  );
}

/* ── 404 ── */
function NotFound() {
  useEffect(() => {
    document.title = '404 — Not Found | AIJOHN Technosoft';
  }, []);
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: 16,
      textAlign: 'center', padding: '120px 24px 80px',
      background: 'var(--gray-light)',
    }}>
      <span style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--blue-dark)', opacity: 0.12, lineHeight: 1 }}>
        404
      </span>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--navy)', marginTop: -20 }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--gray)', maxWidth: 380 }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <a href="/" className="btn btn-primary" style={{ marginTop: 8, padding: '12px 28px' }}>
        ← Back to Home
      </a>
    </div>
  );
}

export default App;
