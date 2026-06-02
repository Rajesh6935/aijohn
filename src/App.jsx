import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import WebApp           from './pages/WebApp';
import MobileApp         from './pages/MobileApp';
import AIMLPage          from './pages/AIMLPage';
import CloudDevOpsPage   from './pages/CloudDevOpsPage';
import MarketingAutoPage from './pages/MarketingAutoPage';
import LegacyModPage     from './pages/LegacyModPage';

/* ── Animated route switcher ── */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />}      />
        <Route path="/services"   element={<Services />}  />
        <Route path="/services/web-development"          element={<WebApp />}           />
        <Route path="/services/mobile-app-development"   element={<MobileApp />}        />
        <Route path="/services/ai-machine-learning"      element={<AIMLPage />}         />
        <Route path="/services/cloud-devops"             element={<CloudDevOpsPage />}  />
        <Route path="/services/marketing-automation"     element={<MarketingAutoPage />}/>
        <Route path="/services/legacy-modernization"     element={<LegacyModPage />}    />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about"      element={<About />}     />
        <Route path="/team"       element={<Team />}      />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/estimate"   element={<Estimate />}  />
        <Route path="/contact"    element={<Contact />}   />
        <Route path="/privacy"    element={<SimpleTextPage title="Privacy Policy"   />} />
        <Route path="/terms"      element={<SimpleTextPage title="Terms of Service" />} />
        <Route path="*"           element={<Navigate to="/" replace />}  />
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

/* ── Privacy / Terms ── */
const LEGAL_CONTENT = {
  'Privacy Policy': {
    updated: 'April 2026',
    sections: [
      {
        title: 'Information We Collect',
        body: `When you contact us or use our Estimate tool, we collect the information you provide: your name, email address, phone number, company name, and project description. We also collect standard web analytics data (page views, referral source, device type) through anonymised tools. We do not use tracking cookies for advertising.`,
      },
      {
        title: 'How We Use Your Information',
        body: `Your information is used solely to respond to your enquiry, scope your project, and send relevant follow-up communications. We do not sell, rent, or share your personal data with third parties for their marketing purposes. Project briefs shared with us are treated as strictly confidential.`,
      },
      {
        title: 'AI Chat (JOHN)',
        body: `Our website includes an AI chat assistant powered by Anthropic Claude. Conversations are processed in real time to generate responses. We do not store individual chat transcripts beyond the session. Do not share sensitive personal or financial data in the chat window.`,
      },
      {
        title: 'Data Retention',
        body: `Contact form submissions are retained for up to 24 months for business continuity. You may request deletion of your data at any time by emailing contact@aijohn.org with subject "Data Deletion Request".`,
      },
      {
        title: 'Security',
        body: `All data is transmitted over HTTPS. Our infrastructure is hosted on AWS with access controls, encryption at rest, and routine security reviews. We follow OWASP best practices across all systems we build and operate.`,
      },
      {
        title: 'Your Rights',
        body: `You have the right to access, correct, or delete your personal data. To exercise any of these rights, contact us at contact@aijohn.org. We aim to respond to all requests within 30 days.`,
      },
      {
        title: 'Contact',
        body: `For any privacy-related questions: contact@aijohn.org · AIJOHN Technosoft Private Limited, Jangareddygudem, Andhra Pradesh 534447, India.`,
      },
    ],
  },
  'Terms of Service': {
    updated: 'April 2026',
    sections: [
      {
        title: 'Acceptance',
        body: `By accessing aijohn.in or engaging AIJOHN Technosoft for services, you agree to these Terms. If you do not agree, do not use this site or our services.`,
      },
      {
        title: 'Services',
        body: `AIJOHN Technosoft provides software engineering, AI integration, cloud infrastructure, and related technology consulting services. All engagements are governed by a separate Statement of Work (SOW) or Master Services Agreement (MSA) signed by both parties. These Terms apply to use of our website and AI chat tools only.`,
      },
      {
        title: 'Intellectual Property',
        body: `All content on this website — including copy, design, graphics, and code — is the property of AIJOHN Technosoft Private Limited and protected under applicable intellectual property law. You may not reproduce or repurpose any content without prior written consent.`,
      },
      {
        title: 'AI Chat Disclaimer',
        body: `The JOHN AI chat assistant provides general guidance only. Responses are AI-generated and do not constitute a binding quote, contract, or legal advice. All project estimates must be confirmed in writing by an AIJOHN representative. Pricing and timelines discussed in chat are indicative only.`,
      },
      {
        title: 'Limitation of Liability',
        body: `To the fullest extent permitted by law, AIJOHN Technosoft shall not be liable for any indirect, incidental, or consequential damages arising from use of this website. Our total liability for any claim arising from website use shall not exceed $100 USD.`,
      },
      {
        title: 'Governing Law',
        body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Andhra Pradesh, India. For clients contracting through Estoras Group (Canada), Canadian law may apply as specified in the signed MSA.`,
      },
      {
        title: 'Changes to These Terms',
        body: `We may update these Terms periodically. The "Last updated" date below reflects the most recent revision. Continued use of the website after changes constitutes acceptance of the revised Terms.`,
      },
      {
        title: 'Contact',
        body: `Questions about these Terms: contact@aijohn.org · AIJOHN Technosoft Private Limited, Jangareddygudem, Andhra Pradesh 534447, India.`,
      },
    ],
  },
};

function SimpleTextPage({ title }) {
  const content = LEGAL_CONTENT[title];
  useEffect(() => {
    document.title = `${title} | AIJOHN Technosoft`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      paddingTop: 120,
      paddingBottom: 100,
    }}>
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 32 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2176AE', marginBottom: 14 }}>
            Legal
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0a0614', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 16 }}>
            {title}
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: 500 }}>
            Last updated: {content?.updated ?? 'April 2026'} · AIJOHN Technosoft Private Limited
          </p>
        </div>

        {/* Sections */}
        {content?.sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0a0614', marginBottom: 12, letterSpacing: '-0.01em' }}>
              {sec.title}
            </h2>
            <p style={{ fontSize: '0.96rem', color: '#4b5563', lineHeight: 1.85 }}>
              {sec.body}
            </p>
          </div>
        ))}

        {/* Footer links */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <a href="/" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2176AE', textDecoration: 'none' }}>← Back to Home</a>
          <a href="/contact" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2176AE', textDecoration: 'none' }}>Contact Us →</a>
        </div>
      </div>
    </div>
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
