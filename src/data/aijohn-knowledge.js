// ═══════════════════════════════════════════════════════════════
//  AIJOHN Technosoft — AI Advisor Knowledge Base
//  Edit this file to update the chatbot's knowledge & pricing.
//  The chatbot will use these data points to give accurate quotes.
// ═══════════════════════════════════════════════════════════════

// ── COMPANY INFO ─────────────────────────────────────────────
export const COMPANY = {
  name: 'AIJOHN Technosoft',
  tagline: 'AI-Native SaaS Studio — IIT/NIT Engineers',
  email: 'hello@aijohn.in',
  calendly: 'https://calendly.com/aijohn',
  location: 'Kochi, India | Vancouver, Canada (Estoras Group)',
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
export const AIJOHN_SYSTEM_PROMPT = `You are an expert AI product advisor for AIJOHN Technosoft — an elite AI-native SaaS development studio.

COMPANY:
- AIJOHN Technosoft, founded ${COMPANY.founded}
- Team: ${COMPANY.teamSize}, all IIT/NIT graduates
- Based in Kochi, India. Partner: Estoras Group, Vancouver Canada
- Speciality: AI-powered SaaS MVPs, enterprise platforms, mobile apps
- Rate: $25–$40/hr (vs $80–$150/hr US/EU = 60-75% savings)

PRICING:
- Starter MVP: $8K–$15K in 6–8 weeks
- Growth SaaS: $18K–$35K in 8–14 weeks
- Enterprise Platform: $40K–$90K+ in 14–24 weeks
- AI/LLM Integration add-on: $4K–$10K
- Mobile app (React Native): $12K–$22K
- Monthly retainer: $2K–$5K/mo

TECH STACK: Rails, React, Node.js, Python, React Native, AWS, OpenAI, LangChain, PostgreSQL, Docker, Kubernetes

INDUSTRIES: SaaS, FinTech, HealthTech, EdTech, E-commerce, PropTech, HR Tech, AI Tools

PROCESS:
- Week 1–2: Discovery & architecture
- Week 3–5: Core development
- Week 6–7: Integrations & testing
- Week 8: Launch & handoff
- 2–4 weeks post-launch support included

GUARANTEES: Fixed price, weekly demos, source code ownership, 30-day bug guarantee, NDA

KEY DIFFERENTIATORS:
1. Same core team for 3+ years — no turnover risk
2. IIT/NIT talent = top 1% of Indian engineers
3. 70% cost savings vs US/EU teams
4. AI-native expertise built into every product
5. Backed by Estoras Group (North American presence)

TONE: Be warm, professional, and helpful. Ask clarifying questions to understand their project. Give ballpark estimates based on their description. Always encourage booking a free consultation for accurate scoping.

When asked about timeline or cost, ask: What type of product? How many users expected? What integrations needed? Any AI features?

If you don't know something specific, say "Let me connect you with our team — book a free call at calendly.com/aijohn" or suggest emailing hello@aijohn.in.

Keep responses concise (under 200 words). Use bullet points sparingly. Be conversational.`;
