import React from 'react';
import Navbar from '@/components/Navbar';
import FloatingElements from '@/components/FloatingElements';

// Themed "Learn More" page matching existing hackathon style
const LearnMore: React.FC = () => {
  return (
    <div className="relative min-h-screen home-bg text-hackathon-yellow overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <main className="pt-28 pb-24 container mx-auto px-4">
        <header className="text-center mb-14">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4 drop-shadow-sm">
            Learn <span className="text-hackathon-pink">More</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
            Dive deeper into what makes <span className="text-hackathon-pink font-semibold">SemiColon</span> a unique, fast‑paced, creative hackathon experience. From our mission and judging criteria to resources, this page is your extended guide.
          </p>
        </header>

        <section className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <article key={card.title} className="group relative rounded-2xl border border-hackathon-lightblue/40 bg-white/80 backdrop-blur-sm p-6 flex flex-col shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-hackathon-pink/10 via-transparent to-hackathon-yellow/10 pointer-events-none" />
              <h2 className="font-semibold text-xl mb-3 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-hackathon-pink animate-pulse" />
                {card.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">{card.body}</p>
              {card.points && (
                <ul className="space-y-1.5 text-xs text-slate-500 mb-4">
                  {card.points.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-hackathon-blue/70" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              {card.cta && (
                <a href={card.cta.href} className="inline-flex items-center gap-2 text-hackathon-blue font-medium text-sm hover:text-hackathon-pink transition-colors">
                  {card.cta.label}
                  <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
            </article>
          ))}
        </section>

        <section className="mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Judging Criteria</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {judging.map(c => (
              <div key={c.title} className="rounded-xl border border-hackathon-lightblue/40 bg-white/70 backdrop-blur-sm p-5 flex flex-col hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2 text-lg">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{c.desc}</p>
                <span className="mt-4 inline-block text-xs px-2 py-1 rounded-full bg-hackathon-blue/10 text-hackathon-blue font-medium tracking-wide">{c.weight}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">FAQ Highlights</h2>
          <p className="text-slate-200 text-sm md:text-base mb-6 max-w-2xl">Quick answers to top questions. For the full list, head back to the main page FAQ section.</p>
          <div className="space-y-6 max-w-3xl">
            {faq.map(q => (
              <details key={q.q} className="group border border-hackathon-lightblue/40 rounded-xl bg-white/70 backdrop-blur-sm p-5 hover:shadow-md transition-shadow">
                <summary className="cursor-pointer font-medium text-hackathon-blue flex items-center justify-between">
                  <span>{q.q}</span>
                  <span className="ml-4 text-hackathon-pink group-open:rotate-90 transition-transform">›</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{q.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base mb-6">Register your team now and secure your spot at SemiColon. Innovation, caffeine, and creativity await.</p>
          <a href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-hackathon-pink text-white font-semibold text-sm md:text-base shadow hover:shadow-lg hover:bg-hackathon-blue transition-colors">
            Register Now <span className="text-lg">⚡</span>
          </a>
        </section>
      </main>
      <footer className="mt-24 py-10 text-center text-xs text-white/60">
        <p>© 2025 SemiColon. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Data
const cards = [
  {
    title: 'Our Mission',
    body: 'Foster a collaborative environment where first‑time and experienced builders can rapidly prototype impactful solutions.',
    points: ['Inclusive & beginner friendly', 'Fast iteration culture', 'Real mentorship access'],
  },
  {
    title: 'What You Get',
    body: 'Hands‑on learning, mentorship, networking, team formation support, sponsor interactions, and a platform to showcase talent.',
    points: ['Mentor guidance', 'Practical workshops', 'Showcase stage'],
  },
  {
    title: 'Team Formation',
    body: 'Arrive solo or with friends—our mixer & idea board help you connect with complementary skill sets.',
    points: ['6 members', 'Idea wall', 'Skill tagging'],
  },
  {
    title: 'Resources',
    body: 'Starter APIs, design templates, sample datasets, and optional tooling recommendations to accelerate development.',
    points: ['Curated API list', 'UI kits', 'Data samples'],
    cta: { label: 'Download Starter Pack', href: '#' },
  },
  {
    title: 'Support & Mentors',
    body: 'Domain experts rotate through the floor & virtual channels to unblock teams quickly and refine direction.',
    points: ['Technical reviews', 'Idea validation', 'Demo coaching'],
  },
  {
    title: 'Prizes & Recognition',
    body: 'Category awards emphasize innovation, usability, and real‑world impact—not just polish.',
    points: ['Innovation award', 'Social impact', 'Design & UX'],
  },
];

const judging = [
  { title: 'Innovation', desc: 'Novelty & originality of the concept or approach.', weight: 30 },
  { title: 'Impact', desc: 'Problem relevance and potential real‑world value.', weight: 25 },
  { title: 'Execution', desc: 'Technical depth, stability, and completeness of MVP.', weight: 25 },
  { title: 'Design & UX', desc: 'Clarity, usability, accessibility, and visual cohesion.', weight: 20 },
];

const faq = [
    {
        q: 'Can I join without a team?',
        a: 'Yes. Come solo—our mixer and idea board help you quickly form or join a team (up to 6 members).',
    },
    {
        q: 'Do we keep our IP?',
        a: 'Yes. Your team owns everything you build, except any third‑party licensed assets you include.',
    },
    {
        q: 'Are beginners welcome?',
        a: 'Absolutely. Mentors, starter resources, and workshops support first‑time hackers.',
    },
    {
        q: 'What should we scope?',
        a: 'Aim for a clear, functional MVP that shows core value—depth and clarity beat feature count.',
    },
    {
        q: 'Can we start early?',
        a: 'Ideation is fine, but writing project code before kickoff is not. Boilerplates & public libs are okay.',
    },
];

export default LearnMore;
