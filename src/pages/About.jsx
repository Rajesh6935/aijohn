import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, MapPin, GraduationCap, Briefcase, Globe, Users,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useSEO } from '../utils/seo';
import './About.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  }),
};

const VALUES = [
  {
    num: '01',
    title: 'We think like co-founders, not contractors.',
    body: `When we take on a project, we don't just execute a list of tasks — we ask why.
           We push back when something doesn't make sense. We think about what happens
           six months after launch, not just on demo day. The people who built this company
           care deeply about outcomes, and that attitude shows up in every decision we make.`,
  },
  {
    num: '02',
    title: 'Craft is non-negotiable.',
    body: `We care deeply about how things are built, not just that they get built.
           Architecture decisions, code quality, database design, deployment pipelines —
           these aren't afterthoughts. They're where most long-term problems begin or end.
           We make decisions we're proud to stand behind a year later.`,
  },
  {
    num: '03',
    title: "Honest, always — especially when it's uncomfortable.",
    body: `If a timeline is tight, we say so. If an approach has a flaw, we raise it.
           If we made a mistake, we own it immediately. We've seen what happens when
           engineering teams sugar-coat problems and ship half-truths. We'd rather have a
           difficult conversation at week two than a failed launch at week twelve.`,
  },
  {
    num: '04',
    title: 'Senior from day one. Always.',
    body: `We have never staffed a project with juniors and hoped for the best.
           Every engagement gets genuine attention from engineers who are actually great at this.
           The person you meet in the first call is the person who builds your product.
           That's a promise most agencies can't make. We make it every time.`,
  },
  {
    num: '05',
    title: 'Build for the long run.',
    body: `The best software is designed thinking three years ahead — not for the next
           investor demo. We make architectural decisions that age well, write code that
           the next engineer can understand, and document what needs documenting. Technical
           debt isn't inevitable. It's a choice. We choose differently.`,
  },
];

const TEAM = [
  {
    photo: '/team/rajesh.png',
    name: 'Rajesh Mallelli',
    role: 'Founder & CEO',
    school: 'M.Tech · NIT Calicut',
    focus: 'Architecture · Product · Leadership',
  },
  {
    photo: '/team/rahul.png',
    name: 'Rahul',
    role: 'Engineering',
    school: 'IIT (ISM) Dhanbad',
    focus: 'Full-Stack · Systems Design',
  },
  {
    photo: '/team/krishna.png',
    name: 'Krishna',
    role: 'Engineering',
    school: 'NIT Calicut',
    focus: 'Frontend · UI Engineering',
  },
  {
    photo: '/team/adarsh.png',
    name: 'Adarsh',
    role: 'Engineering',
    school: 'NIT Calicut',
    focus: 'Backend · Infrastructure',
  },
];

export default function About() {
  useSEO({
    title: 'About — AIJohn',
    description: 'AIJohn is an AI-first product engineering company. We build the software you\'ve been imagining — designed, architected, and shipped end to end.',
    path: '/about',
  });

  return (
    <PageWrapper>

      {/* ══════════════════════
          HERO
      ══════════════════════ */}
      <section className="ab-hero">
        <div className="ab-hero__noise" />
        <div className="ab-hero__grid" />
        <div className="container ab-hero__inner">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="ab-hero__eyebrow">About AIJohn</p>
            <h1 className="ab-hero__h1">
              We build the software<br />
              <em className="ab-hero__gradient">you've been imagining.</em>
            </h1>
            <p className="ab-hero__sub">
              A team of IIT and NIT engineers who came together with one belief:
              that world-class AI software should be within reach of every founder —
              not just those with the right zip code or the right budget.
              We don't just build. We think, architect, and ship alongside you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          IDENTITY STRIP
      ══════════════════════ */}
      <div className="ab-identity">
        <div className="container">
          <div className="ab-identity__row">
            {[
              { label: 'Type',      value: 'AI Product Engineering' },
              { label: 'Founded',   value: '2022'                   },
              { label: 'Based in',  value: 'Bengaluru, India'       },
              { label: 'Partner',   value: 'Estoras Group · Canada' },
            ].map(({ label, value }) => (
              <div key={label} className="ab-identity__item">
                <span className="ab-identity__label">{label}</span>
                <span className="ab-identity__value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════
          MISSION
      ══════════════════════ */}
      <section className="ab-mission">
        <div className="container">
          <motion.div className="ab-mission__inner"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <span className="ab-mission__label">Why we exist</span>
            <blockquote className="ab-mission__quote">
              We didn't start AIJohn to be the cheapest option on someone's vendor list.
              We started it to be the partner that founders actually needed — one that
              treats your product like it's their own, asks the hard questions no one else
              will, and doesn't disappear after the launch.
            </blockquote>
            <cite className="ab-mission__cite">— Rajesh Mallelli, Founder & CEO</cite>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          OUR STORY
      ══════════════════════ */}
      <section className="section ab-story">
        <div className="container ab-story__layout">

          <motion.div className="ab-story__left"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="section-tag">Our Story</span>
            <h2 className="ab-story__title">Four engineers. One conviction.</h2>
          </motion.div>

          <motion.div className="ab-story__body"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p>
              Four years ago, a group of engineers from IIT and NIT Calicut made a decision.
              They had all spent years building serious software — production systems, AI platforms,
              products that real companies and real users depended on. And somewhere along the way,
              they started asking the same question: why does engineering this good have to be
              so hard to access?
            </p>
            <p>
              Rajesh had spent nearly a decade in engineering, most recently as Head of IT at Neyo,
              where he led the architecture and ground-up development of Neyo.ai: an AI-powered
              marketing automation platform built entirely from scratch. Owning every layer of a
              product — from database schema to deployment pipeline — shaped everything about how
              he thought engineering should work. So he made the call: build something that proved the point.
            </p>
            <p>
              The team came together around that conviction. Rahul from IIT Dhanbad, Krisha and
              Adarsh from NIT Calicut — engineers who had been building alongside each other and
              knew what it meant to genuinely care about craft. AIJohn wasn't a plan hatched in a
              boardroom. It was four engineers who'd been together for years deciding to do
              something different, together.
            </p>
            <p>
              Today AIJohn operates across India and Canada, working with startups, agencies,
              and consultants who need more than a vendor — they need a technical partner who
              shows up, thinks hard, and ships products they're proud of. We've built AI-powered
              SaaS platforms, fintech products, healthtech tools, and digital wealth systems.
              Each one with the same standard: something we'd put our name on.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════
          TEAM
      ══════════════════════ */}
      <section className="section ab-team">
        <div className="container">
          <motion.div className="ab-team__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">The People</span>
            <h2 className="ab-team__title">Built by people who've done this before.</h2>
            <p className="ab-team__sub">
              Four years together. One shared conviction that the quality of engineering
              a company gets shouldn't be determined by its geography.
            </p>
          </motion.div>

          <div className="ab-team__grid">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} className="ab-team-card"
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
                <div className="ab-team-card__photo">
                  <img src={member.photo} alt={member.name} />
                </div>
                <div className="ab-team-card__body">
                  <div className="ab-team-card__name">{member.name}</div>
                  <div className="ab-team-card__role">{member.role}</div>
                  <div className="ab-team-card__school">
                    <GraduationCap size={11}/> {member.school}
                  </div>
                  <div className="ab-team-card__focus">{member.focus}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          FOUNDER
      ══════════════════════ */}
      <section className="section ab-founder">
        <div className="container">

          <motion.div className="ab-founder__top"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="section-tag">Founder</span>
          </motion.div>

          <motion.div className="ab-founder-card"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>

            <div className="ab-founder-card__left">
              <div className="ab-founder-avatar">
                <img src="/team/rajesh.png" alt="Rajesh Mallelli" />
              </div>
              <div className="ab-founder-meta">
                <div className="ab-founder-name">Rajesh Mallelli</div>
                <div className="ab-founder-title">Founder & CEO · AIJohn</div>
                <div className="ab-founder-also">
                  <Briefcase size={12}/> GM, Estoras Group · Canada
                </div>
              </div>
              <div className="ab-founder-facts">
                <div className="ab-founder-fact">
                  <GraduationCap size={13}/>
                  <span>M.Tech in Computer Science<br/><strong>NIT Calicut</strong></span>
                </div>
                <div className="ab-founder-fact">
                  <Briefcase size={13}/>
                  <span>9+ years engineering experience<br/><strong>Fintech · Healthtech · AI</strong></span>
                </div>
                <div className="ab-founder-fact">
                  <MapPin size={13}/>
                  <span>Bengaluru, India</span>
                </div>
              </div>
            </div>

            <div className="ab-founder-card__right">
              <p>
                Rajesh started AIJohn because he believed — and still believes — that great engineering
                shouldn't be gated by geography or budget. He wanted to build something that proved it.
                And he wanted to build it with people he'd worked alongside for years, people who shared
                the same obsession with craft.
              </p>
              <p>
                His background spans nearly a decade of building production AI and SaaS systems across
                fintech, healthtech, and digital wealth platforms. Before starting AIJohn, he was Head of IT at
                Neyo, where he led the full architecture and development of Neyo.ai — from the first
                design decision to the production deployment. Owning an entire product end to end,
                alone, with no safety net: that experience shaped everything about how AIJohn operates.
              </p>
              <p>
                He also serves as General Manager of Estoras Group in Canada — a role that connects
                AIJohn's engineering capability to a global network of clients and partners. Not a title.
                A responsibility he takes seriously every day.
              </p>
              <p>
                His philosophy: move carefully, build right, and treat every client's product with the
                same care you'd want applied to your own. Every time, no exceptions.
              </p>

              <blockquote className="ab-founder-quote">
                "I love architecting and building end-to-end systems. There is something deeply satisfying
                about taking an idea from a blank screen to a live product that real people use.
                That is what AIJohn exists to do — for every founder who deserves that quality of
                thinking applied to their product."
              </blockquote>

              <div className="ab-founder-skills">
                {['Ruby on Rails', 'React / Next.js', 'SaaS Architecture', 'AI Integration',
                  'AWS', 'PostgreSQL', 'Product Strategy', 'Team Leadership'].map(s => (
                  <span key={s} className="ab-skill">{s}</span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          VALUES
      ══════════════════════ */}
      <section className="ab-values">
        <div className="container">
          <motion.div className="ab-values__head"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">What we believe</span>
            <h2 className="ab-values__title">How we actually work.</h2>
            <p className="ab-values__sub">
              Not a list of brand attributes. The actual principles that show up in how we
              make decisions, communicate, and build — every single day.
            </p>
          </motion.div>

          <div className="ab-values__list">
            {VALUES.map((v, i) => (
              <motion.div key={v.num} className="ab-value"
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
                <span className="ab-value__num">{v.num}</span>
                <div className="ab-value__content">
                  <h3 className="ab-value__title">{v.title}</h3>
                  <p className="ab-value__body">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          WHAT WE BUILD (brief)
      ══════════════════════ */}
      <section className="section ab-work">
        <div className="container ab-work__layout">
          <motion.div className="ab-work__left"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-tag">The Work</span>
            <h2 className="ab-work__title">What we build.</h2>
          </motion.div>
          <motion.div className="ab-work__right"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <p>
              We build AI-powered SaaS platforms, web and mobile applications, startup MVPs,
              CRM integrations, and the internal tools that make companies run. The stack varies
              by project — Rails, React, Node.js, Next.js, FastAPI, AWS — but the approach never does.
              We own the full engineering lifecycle, from architecture to deployment.
            </p>
            <p>
              We work best with founders and agencies who want a technical partner that thinks,
              not just one that executes. If you want someone to rubber-stamp a spec, we're probably
              not the right fit. If you want someone who'll tell you when the spec is wrong,
              we might be exactly what you need.
            </p>
            <Link to="/services" className="ab-work__link">
              See our services <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          ESTORAS
      ══════════════════════ */}
      <section className="section ab-estoras">
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: 36 }}>
            <span className="section-tag">Strategic Partnership</span>
          </motion.div>

          <div className="ab-estoras-split">

            <motion.div className="ab-estoras-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="ab-estoras-card__inner">
                <div className="ab-estoras-card__left">
                  <span className="ab-estoras__tag">Estoras Group</span>
                  <h2 className="ab-estoras__title">Vancouver, Canada</h2>
                  <p className="ab-estoras__desc">
                    AIJohn is the exclusive technology partner of Estoras Group — a Canadian investment
                    and business development group. Estoras holds a strategic stake in AIJohn and supports
                    our global sales and partnership operations.
                  </p>
                  <p className="ab-estoras__desc">
                    Rajesh serves as General Manager of Estoras Group, which means the connection between
                    AIJohn's engineering capability and Estoras' business network runs through the same
                    person. It's a structural alignment that gives clients confidence in the quality
                    of the work and the stability of the partnership.
                  </p>
                  <a href="https://estorasgroup.com" target="_blank" rel="noopener noreferrer" className="ab-estoras__link">
                    estorasgroup.com <ArrowRight size={13}/>
                  </a>
                </div>
                <div className="ab-estoras-card__right">
                  <div className="ab-estoras__flag">🇨🇦</div>
                  <div className="ab-estoras__facts">
                    <div className="ab-estoras__fact"><Globe size={13}/> India + Canada operations</div>
                    <div className="ab-estoras__fact"><Users size={13}/> Global sales partnership</div>
                    <div className="ab-estoras__fact"><Briefcase size={13}/> Strategic stake in AIJohn</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="ab-patrick-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
              <div className="ab-patrick-card__top">
                <div className="ab-patrick-avatar">P</div>
                <div>
                  <div className="ab-patrick-name">Patrick Kleine</div>
                  <div className="ab-patrick-role">Co-Founder & Strategic Partner · AIJohn</div>
                  <div className="ab-patrick-loc"><MapPin size={11}/> Vancouver, British Columbia</div>
                </div>
              </div>
              <p className="ab-patrick-bio">
                Patrick is the strategic co-founder who guides AIJohn's business direction and
                global partnerships. As founder of Estoras Group, he brings deep expertise in
                strategy, executive management, and IT consulting — including enterprise implementations
                of Microsoft Dynamics and Salesforce — to every business decision AIJohn makes.
              </p>
              <p className="ab-patrick-bio">
                A driver for Scuderia Estoras on the racetrack, Patrick brings the same precision
                and high-performance mindset to the boardroom. His role at AIJohn spans strategic
                planning, international client relationships, and ensuring the business grows with
                the same rigor we apply to engineering.
              </p>
              <div className="ab-patrick-skills">
                {['Strategy', 'Executive Management', 'IT Consulting', 'Microsoft Dynamics',
                  'Salesforce', 'Innovation Development', 'Marketing Strategy'].map(s => (
                  <span key={s} className="ab-skill">{s}</span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════
          VISION / CLOSE
      ══════════════════════ */}
      <section className="ab-vision">
        <div className="ab-vision__noise" />
        <div className="container">
          <motion.div className="ab-vision__inner"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <span className="ab-vision__eyebrow">Where we're going</span>
            <h2 className="ab-vision__title">
              We're here to prove that the best engineering talent isn't defined
              by zip code — and the best products aren't defined by budget.
              Your vision deserves to be built. Let's build it together.
            </h2>
            <p className="ab-vision__sub">
              Whether you're a founder with an idea or an agency that needs a real technical partner —
              we'd like to hear from you.
            </p>
            <div className="ab-vision__btns">
              <Link to="/contact" className="ab-vision-cta-primary">Get in touch <ArrowRight size={14}/></Link>
              <Link to="/estimate" className="ab-vision-cta-secondary">Estimate your project</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
