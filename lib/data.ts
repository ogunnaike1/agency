export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' },
] as const;

export const INDEX = [
  { label: 'Services', href: '/services', line: 'Four pillars, bought together or separately.' },
  { label: 'Work', href: '/work', line: 'Selected work in products, AI, commerce and creative technology.' },
  { label: 'Process', href: '/process', line: 'Discover, define, build, validate and deliver.' },
  { label: 'Studio', href: '/studio', line: 'Meet the people behind the work and the skills we bring together.' },
  { label: 'Contact', href: '/contact', line: 'Tell us what you are building.' },
] as const;

export type Item = { t: string; draft?: boolean };
export const PILLARS: { title: string; items: Item[] }[] = [
  { title: 'Product engineering', items: ['Web applications and SaaS', 'Mobile applications (iOS and Android)', 'Custom business software', 'APIs and system integrations', 'Database architecture', 'Cloud infrastructure', 'DevOps, testing and deployment'].map((t) => ({ t })) },
  { title: 'Experience and creative technology', items: [...['UI and UX design', 'Product design and prototyping', 'Design systems', 'Motion design and animation', '3D and interactive experiences', 'Creative development and digital storytelling'].map((t) => ({ t })), { t: 'Brand and interface design', draft: true }] },
  { title: 'Data, AI and automation', items: [...['Data analysis and visualisation', 'Business intelligence and dashboards', 'AI integrations and intelligent applications', 'Workflow and process automation', 'AI agents and chatbot integrations'].map((t) => ({ t })), { t: 'Data engineering and pipelines', draft: true }] },
  { title: 'Security and reliability', items: [...['Secure software development', 'Authentication and access control', 'Application security', 'Quality assurance and performance optimisation'].map((t) => ({ t })), { t: 'Infrastructure hardening', draft: true }, { t: 'Authorised security assessments', draft: true }] },
];

// 2 = lead, 1 = support, 0 = none. Columns: Eng, Exp, Data, Sec. Indicative.
export const MATRIX = [
  { name: 'Launch a product', lv: [2, 2, 1, 1] },
  { name: 'Make operations smarter', lv: [1, 0, 2, 1] },
  { name: 'Harden what already exists', lv: [1, 0, 0, 2] },
  { name: 'Add intelligence to a product', lv: [2, 1, 2, 1] },
];

// Portfolio-sourced profiles and work. See PORTFOLIO_SOURCES.md for provenance.
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image?: string;
  portfolio: string;
  github: string;
  linkedin: string;
};

export const TEAM: TeamMember[] = [
  {
    id: 'pelumi-adewara', name: 'Pelumi Adewara', role: 'Product Engineer',
    bio: 'Connects product design with full-stack delivery. Pelumi builds websites, mobile apps and the APIs behind them, with experience across fintech, automotive platforms and marketplaces.',
    skills: ['Product UI', 'React & React Native', 'Node.js & APIs', 'PostgreSQL & Supabase'],
    image: '/team/pelumi-adewara.jpg', portfolio: 'https://pelumi-adewara.vercel.app/',
    github: 'https://github.com/Dave1604', linkedin: 'https://www.linkedin.com/in/pelumi-adewara-077096274',
  },
  {
    id: 'henry-oderinde', name: 'Henry Oderinde', role: 'Software & AI Engineer',
    bio: 'Builds backend services and AI systems for business workflows. Henry works across knowledge-based assistants, agents, financial infrastructure and the secure APIs that connect them.',
    skills: ['Applied AI & RAG', 'Backend & distributed systems', 'Node.js & NestJS', 'Cloud & delivery'],
    portfolio: 'https://henryoderinde.vercel.app/',
    github: 'https://github.com/devhenode', linkedin: 'https://www.linkedin.com/in/henryoderinde',
  },
  {
    id: 'usman-ogunnaike', name: 'Usman Ogunnaike', role: 'Developer & Creative',
    bio: 'Brings development and visual storytelling together. Usman creates websites and apps alongside motion graphics, product animations and 3D architectural visualisations.',
    skills: ['Web & mobile development', 'UI design', 'Motion graphics', '3D visualisation'],
    image: '/team/usman-ogunnaike.jpg', portfolio: 'https://my-portfolio-ten-taupe-82.vercel.app/',
    github: 'https://github.com/ogunnaike1', linkedin: 'https://www.linkedin.com/in/usman-ogunnaike-2932b9225/',
  },
];

export const WORK_CATEGORIES = [
  { id: 'websites', label: 'Websites & commerce' },
  { id: 'applications', label: 'Apps & platforms' },
  { id: 'ai', label: 'AI & automation' },
  { id: 'motion', label: 'Motion graphics' },
  { id: '3d', label: '3D visualisation' },
] as const;
export type WorkCategory = typeof WORK_CATEGORIES[number]['id'];

export type Project = {
  id: string;
  title: string;
  cat: string;
  categories: WorkCategory[];
  desc: string;
  status: string;
  image: string;
  imageAlt: string;
  tags: string[];
  credits: { memberId: string; contribution: string; source: string }[];
  href: string;
  linkLabel: string;
};

// `pillar` must match a PILLARS title; the Work page groups projects by it.
export const PROJECTS = [
  { pillar: 'Experience and creative technology', title: 'The Instrument', cat: '3D and creative development', desc: 'A gimbal from Blender to browser: modelled, rigged and shipped as an interactive real-time piece.', status: 'Experiment · assets to be added' },
  { pillar: 'Data, AI and automation', title: 'Signal board', cat: 'Data and dashboards', desc: 'A dashboard exploring how dense operational data can stay readable.', status: 'Concept · synthetic data' },
  { pillar: 'Data, AI and automation', title: 'Intake to ticket', cat: 'AI and automation', desc: 'A workflow that turns incoming requests into tickets, with a human approval step.', status: 'Concept · not a client project' },
  { pillar: 'Security and reliability', title: 'Access review', cat: 'Security and reliability', desc: 'A permissions-review console that makes who-can-do-what auditable at a glance.', status: 'Concept · not a client project' },
];

export const STAGES = [
  { title: 'Discover', desc: 'We learn the users, the system and the constraints, and agree what success looks like.', out: 'Brief, scope and risks' },
  { title: 'Define', desc: 'Design, architecture and security requirements are shaped together, not handed over.', out: 'Prototype, architecture, plan' },
  { title: 'Build', desc: 'Short iterations from one shared backlog, with a working demo at the end of each.', out: 'Working software, every iteration' },
  { title: 'Validate and deliver', desc: 'Testing, performance and security checks, then a documented handover.', out: 'Release, code, designs, documentation' },
];
export const AGREEMENTS = ['One shared backlog', 'Working demos at the end of iterations', 'Documented decisions', 'Handover of code, designs and documentation'];
export const PRINCIPLES = ['Design and engineering share one backlog.', 'Security is a requirement, not a phase.', 'AI should earn its place.'];
export const AREAS = ['Product engineering', 'Experience and creative technology', 'Data, AI and automation', 'Security and reliability'];
export const TIMES = ['Under 1 month', '1–3 months', '3–6 months', '6+ months', 'Not sure yet'];
export const EMAIL = 'hello@agency.example'; // placeholder until real address supplied
