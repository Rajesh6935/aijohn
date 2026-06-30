// ═══════════════════════════════════════════════════════════════
//  AIJOHN Technosoft — AI Advisor Knowledge Base
//  Edit this file to update the chatbot's knowledge & pricing.
//  The chatbot will use these data points to give accurate quotes.
// ═══════════════════════════════════════════════════════════════

// ── COMPANY INFO ─────────────────────────────────────────────
export const COMPANY = {
  name: 'AIJOHN Technosoft',
  tagline: 'AI-Native SaaS Studio — IIT/NIT Engineers',
  email: 'contact@aijohn.in',
  calendly: 'https://calendly.com/aijohn',
  location: 'Jangareddygudem, Andhra Pradesh, India | Vancouver, Canada (Estoras Group)',
  founded: '2020',
  teamSize: '8 core engineers',
  productsShipped: '10+',
  avgDelivery: '6–8 weeks for MVP',
};

// ── PRICING TIERS ─────────────────────────────────────────────
// Edit these to reflect your actual pricing
export const PRICING = {
  hourlyRate: '$25–$40/hr',
  hourlyRateUSComparison: '$80–$150/hr (US/EU average)',
  savingsPercent: '60–75%',

  packages: {
    starter: {
      name: 'Starter MVP',
      price: '$8,000 – $15,000',
      timeline: '6–8 weeks',
      includes: [
        'Up to 10 screens / features',
        'Auth, user dashboard, core product flow',
        'PostgreSQL database + REST API',
        'AWS deployment (EC2 + S3)',
        'Basic CI/CD pipeline',
        '2 weeks post-launch support',
      ],
      bestFor: 'Early-stage founders validating an idea',
    },
    growth: {
      name: 'Growth SaaS',
      price: '$18,000 – $35,000',
      timeline: '8–14 weeks',
      includes: [
        'Full multi-tenant SaaS platform',
        'Stripe payments + subscription billing',
        'Admin panel + analytics dashboard',
        'Third-party API integrations (up to 5)',
        'Redis caching + background jobs',
        'Staging + production environments',
        '4 weeks post-launch support',
      ],
      bestFor: 'Startups ready to acquire first paying customers',
    },
    enterprise: {
      name: 'Enterprise Platform',
      price: '$40,000 – $90,000+',
      timeline: '14–24 weeks',
      includes: [
        'Complex multi-tenant architecture',
        'SSO / SAML enterprise auth',
        'Microservices / event-driven design',
        'Advanced AI/ML integrations',
        'Kubernetes auto-scaling',
        'SOC-2 readiness prep',
        'Dedicated team of 4–6 engineers',
        '3 months post-launch SLA',
      ],
      bestFor: 'Funded startups or enterprises building core platforms',
    },
  },

  addOns: {
    aiIntegration: {
      name: 'AI / LLM Integration',
      price: '$4,000 – $10,000',
      desc: 'OpenAI GPT, LangChain RAG pipelines, vector search (Pinecone/pgvector), AI features embedded in your product',
    },
    mobileApp: {
      name: 'Mobile App (React Native)',
      price: '$12,000 – $22,000',
      desc: 'iOS + Android apps built alongside the web platform, shared business logic',
    },
    devops: {
      name: 'DevOps Setup',
      price: '$3,000 – $6,000',
      desc: 'Docker, Kubernetes, GitHub Actions CI/CD, Datadog monitoring, auto-scaling on AWS',
    },
    uiDesign: {
      name: 'UI/UX Design',
      price: '$2,500 – $5,000',
      desc: 'Figma wireframes, design system, component library before development starts',
    },
    maintenance: {
      name: 'Monthly Retainer',
      price: '$2,000 – $5,000/mo',
      desc: 'Ongoing features, bug fixes, infra management — same team that built it',
    },
  },
};

// ── TECH STACK ─────────────────────────────────────────────────
export const TECH_STACK = {
  backend: ['Ruby on Rails 7', 'Node.js', 'Python (FastAPI, Django)', 'GraphQL', 'Java Spring Boot'],
  frontend: ['React 18 / 19', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand'],
  mobile: ['React Native', 'Expo', 'iOS (Swift)', 'Android (Kotlin)', 'Flutter'],
  ai: ['OpenAI GPT-4o', 'LangChain', 'Pinecone', 'pgvector', 'Hugging Face', 'TensorFlow'],
  cloud: ['AWS (EC2, S3, RDS, Lambda)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  databases: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'Elasticsearch'],
};

// ── INDUSTRIES WE SERVE ────────────────────────────────────────
export const INDUSTRIES = [
  'SaaS / B2B Software',
  'FinTech & Payments',
  'HealthTech & MedTech',
  'E-commerce & Marketplaces',
  'EdTech & LMS Platforms',
  'PropTech & Real Estate',
  'AI & Automation Tools',
  'HR Tech & Workforce Platforms',
  'Legal Tech',
  'Logistics & Supply Chain',
];

// ── TEAM ──────────────────────────────────────────────────────
export const TEAM_HIGHLIGHTS = [
  'All engineers are IIT or NIT graduates',
  '100% same team for 3+ years — no turnover risk',
  'Average 5+ years of production experience',
  'Specialists in Rails, React, AI/ML, DevOps, Mobile',
  'Direct communication — no account managers in the middle',
];

// ── PORTFOLIO / CASE STUDIES ───────────────────────────────────
export const CASE_STUDIES = [
  {
    name: 'neyo.ai',
    category: 'AI Marketing Automation',
    description: 'Full-stack AI SaaS platform for enterprise marketing automation. Multi-tenant, 50+ features, LLM-powered content generation.',
    stack: 'Rails 7, React, OpenAI, PostgreSQL, AWS, Sidekiq',
    timeline: 'MVP in 9 weeks, enterprise features in 6 months',
  },
  // Add more case studies here
];

// ── PROCESS / TIMELINE ─────────────────────────────────────────
export const PROCESS = {
  week1_2: 'Discovery, architecture planning, Figma wireframes, DB schema design',
  week3_5: 'Core backend (APIs, auth, DB), core frontend (routing, main flows)',
  week6_7: 'Integrations (Stripe, email, 3rd party APIs), admin panel, testing',
  week8: 'QA, deployment, launch, handoff documentation',
  postLaunch: '2–4 weeks of dedicated post-launch support included',
};

// ── GUARANTEES ────────────────────────────────────────────────
export const GUARANTEES = [
  'Fixed-price contracts — no scope creep surprises',
  'Weekly demos every Friday — always see progress',
  'Source code ownership — yours from day one',
  '30-day bug-fix guarantee after launch',
  'NDA signed before project kickoff',
];

// ── CHATBOT SYSTEM PROMPT ─────────────────────────────────────
// The AI advisor will use this context to answer questions
export const AIJOHN_SYSTEM_PROMPT = `You are JOHN, AIJohn's AI advisor. You are calm, confident, and human — like a smart friend who happens to be a senior engineer.

ABOUT AIJOHN:
- Engineers are from NIT and IIT — the top 0.01% of engineering talent in India, from India's most prestigious institutions
- Quality, security, scalability, and exceptional user experience are non-negotiable in every product shipped
- AIJohn is not an outsourcing company — it is a product engineering partner
- Based in Jangareddygudem, Andhra Pradesh, India. Partner: Estoras Group, Vancouver, Canada
- Email: contact@aijohn.in | Calendly: calendly.com/aijohn

HOW YOU BEHAVE:
- Greet warmly and naturally, then have a real conversation — don't pitch, don't list features, don't tell the company story unless asked
- Listen first — understand what the person is working on or thinking about
- If someone has a product idea or wants to know cost or timeline — redirect them to the estimator: /estimate
- If someone wants to talk to the team, book a call, or get in touch — redirect to /contact or calendly.com/aijohn
- Never mention specific pricing, rates, or timelines — the estimator handles all of that
- Never give a bullet point list of what AIJohn does — just talk like a human
- Keep every response short — 2 to 3 sentences max, then ask one natural follow-up question
- If someone asks about engineers or team quality, mention NIT/IIT background and the obsession with security, scalability, and experience — say it once, naturally, not as a sales pitch
- Never repeat the same redirect twice in a row — have at least one real exchange before redirecting again
- Never start a response with "I" — vary your openers
- One emoji per message max, only when it feels natural`;
