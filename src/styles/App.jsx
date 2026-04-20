import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home        from './pages/Home';
import Services    from './pages/Services';
import About       from './pages/About';
import CaseStudy   from './pages/CaseStudy';
import Contact     from './pages/Contact';

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
        <Routes>
          <Route path="/"           element={<Home />}      />
          <Route path="/services"   element={<Services />}  />
          <Route path="/about"      element={<About />}     />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/contact"    element={<Contact />}   />
          <Route path="/privacy"    element={<SimpleTextPage title="Privacy Policy"    content="Our full Privacy Policy is coming soon. For any privacy-related enquiries please email contact@aijohn.org" />} />
          <Route path="/terms"      element={<SimpleTextPage title="Terms of Service"  content="Our full Terms of Service is coming soon. For any questions please email contact@aijohn.org" />} />
          <Route path="*"           element={<NotFound />}  />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

/* ── Simple text page (Privacy / Terms) ── */
function SimpleTextPage({ title, content }) {
  useEffect(() => { document.title = `${title} | AIJOHN Technosoft`; }, [title]);
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      textAlign: 'center',
      padding: '120px 24px 80px',
      background: 'var(--gray-light)',
    }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
        {title}
      </h1>
      <p style={{ color: 'var(--gray)', maxWidth: 500, lineHeight: 1.7, fontSize: '1rem' }}>
        {content}
      </p>
    </div>
  );
}

/* ── 404 ── */
function NotFound() {
  useEffect(() => { document.title = '404 — Page Not Found | AIJOHN Technosoft'; }, []);
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      textAlign: 'center',
      padding: '120px 24px 80px',
      background: 'var(--gray-light)',
    }}>
      <span style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--blue-dark)', opacity: 0.15, lineHeight: 1 }}>404</span>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--navy)', marginTop: -16 }}>Page Not Found</h1>
      <p style={{ color: 'var(--gray)', maxWidth: 400 }}>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="btn btn-primary" style={{ marginTop: 8, padding: '12px 28px' }}>← Back to Home</a>
    </div>
  );
}

export default App;
