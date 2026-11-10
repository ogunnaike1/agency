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
    image: '/team/henry-oderinde.jpg', portfolio: 'https://henryoderinde.vercel.app/',
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

export const PROJECTS: Project[] = [
  {
    "id": "eldorado-real-estate",
    "title": "Eldorado Real Estate",
    "cat": "Websites · Property",
    "categories": [
      "websites"
    ],
    "desc": "A property website with searchable listings, galleries, maps and appointment booking, supported by an admin dashboard.",
    "status": "Member work · Property website",
    "image": "/work/eldorado-real-estate.jpg",
    "imageAlt": "Eldorado Real Estate — portfolio preview",
    "tags": [
      "Next.js",
      "TypeScript",
      "Supabase"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "UX & UI design, frontend development & admin dashboard",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/websites"
      }
    ],
    "href": "https://www.eldoradolmtd.com/",
    "linkLabel": "Visit website"
  },
  {
    categories: ["websites", "applications", "ai"],
    id: 'qwampay', title: 'QwamPay', cat: 'Fintech · Product engineering & AI',
    desc: 'WhatsApp payments supported by customer-facing websites, an operations portal and AI-assisted support. The team’s contributions span the product interface, backend services and secure conversational banking workflows.',
    status: 'Member work · Fintech platform', image: '/work/qwampay.jpg', imageAlt: 'QwamPay website introducing payments, bills and airtime through WhatsApp',
    tags: ['React', 'Node.js', 'PostgreSQL', 'RAG', 'WhatsApp API'],
    credits: [
      { memberId: 'pelumi-adewara', contribution: 'Marketing, support & admin interfaces; backend contributions', source: 'https://pelumi-adewara.vercel.app/#work' },
      { memberId: 'henry-oderinde', contribution: 'Operations APIs, support AI & access controls', source: 'https://henryoderinde.vercel.app/work/qwampay-software-engineer' },
    ],
    href: 'https://qwampay.com', linkLabel: 'Visit website',
  },
  {
    categories: ["websites"],
    id: 'leave-your-legacy', title: 'Leave Your Legacy', cat: 'Commerce · Creative development',
    desc: 'A premium storefront built around an interactive 3D hero, 360° product views, product filtering and a persistent cart. Editorial layouts and motion bring the shopping experience together.',
    status: 'Member work · E-commerce', image: '/work/leave-your-legacy.jpg', imageAlt: 'Leave Your Legacy fashion e-commerce website',
    tags: ['E-commerce', 'UX & UI design', '3D & motion'],
    credits: [{ memberId: 'usman-ogunnaike', contribution: 'E-commerce development, interface design & 3D motion', source: 'https://my-portfolio-ten-taupe-82.vercel.app/work' }],
    href: 'https://www.leaveyourlegacyfit.com/', linkLabel: 'Visit website',
  },
  {
    categories: ["ai", "applications"],
    id: 'ennylytics', title: 'Ennylytics', cat: 'AI · Business tools',
    desc: 'An AI workspace for business content, combining an LLM chatbot, reusable prompt-building tools and voice conversations with authentication, user libraries and commerce.',
    status: 'Member work · AI workspace', image: '/work/ennylytics.jpg', imageAlt: 'Ennylytics AI workspace website',
    tags: ['LLMs', 'Prompt engineering', 'Voice AI', 'Supabase'],
    credits: [{ memberId: 'henry-oderinde', contribution: 'Full-stack engineering, AI workflows & voice integration', source: 'https://henryoderinde.vercel.app/work/ennylytics-full-stack-engineer' }],
    href: 'https://ennylytics.com', linkLabel: 'Visit website',
  },
  {
    categories: ["websites", "applications"],
    id: 'motoka', title: 'Motoka', cat: 'Automotive · Platform engineering',
    desc: 'A vehicle-document platform with authentication, KYC, vehicle records, payment workflows and automated expiry reminders. The work also covers the public website and a redesigned admin dashboard.',
    status: 'Member work · Vehicle platform', image: '/work/motoka.jpg', imageAlt: 'Motoka website with vehicle paperwork and a plate-number renewal form',
    tags: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'REST APIs'],
    credits: [{ memberId: 'pelumi-adewara', contribution: 'Backend & APIs, admin dashboard and public website', source: 'https://pelumi-adewara.vercel.app/#work' }],
    href: 'https://motoka.ng', linkLabel: 'Visit website',
  },
  {
    categories: ["applications", "websites"],
    id: 'ronsho', title: 'Ronsho', cat: 'Marketplace · Bespoke fashion',
    desc: 'A marketplace that connects customers with tailors and fabric sellers, with tailor discovery, fabric search, fitting requests and orders. In active development ahead of launch.',
    status: 'Member work · Marketplace (in development)', image: '/work/ronsho.jpg', imageAlt: 'Ronsho bespoke fashion marketplace website',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Node.js', 'Supabase'],
    credits: [{ memberId: 'pelumi-adewara', contribution: 'Full-stack development: product interface, APIs and data', source: 'https://pelumi-adewara.vercel.app/#work' }],
    href: 'https://github.com/Dave1604/ronsho', linkLabel: 'View on GitHub',
  },
  {
    categories: ["applications"],
    id: 'study-buddy', title: 'Study Buddy', cat: 'Education · E-learning platform',
    desc: 'A full-stack e-learning platform with student and instructor roles, in-lesson quizzes, progress dashboards and course-length estimates. It also served as a final-year dissertation project.',
    status: 'Member work · E-learning platform', image: '/work/study-buddy.png', imageAlt: 'Study Buddy e-learning platform dashboard',
    tags: ['React', 'Recharts', 'Node.js', 'Express', 'JWT', 'Supabase'],
    credits: [{ memberId: 'pelumi-adewara', contribution: 'Full-stack development, authentication and progress dashboards', source: 'https://pelumi-adewara.vercel.app/#work' }],
    href: 'https://github.com/Dave1604/study-buddy-platform', linkLabel: 'View on GitHub',
  },
  {
    categories: ["websites", "applications"],
    id: 'whos-cuh', title: 'Who’s Cuh?', cat: 'Food delivery · Brand site & admin',
    desc: 'A brand and marketing site for a food-delivery service in Ijebu-Ode and Ijagun, with an admin panel for restaurants and a rider-facing side. The customer app is in development.',
    status: 'Member work · Food delivery platform', image: '/work/whos-cuh.png', imageAlt: 'Who’s Cuh? food delivery website',
    tags: ['React', 'TypeScript', 'Vite', 'Vercel'],
    credits: [{ memberId: 'pelumi-adewara', contribution: 'Marketing site, restaurant admin panel and rider interface', source: 'https://pelumi-adewara.vercel.app/#work' }],
    href: 'https://whos-cuh.vercel.app', linkLabel: 'Visit website',
  },
  {
    categories: ["websites"],
    id: 'skin-essential-plus', title: 'Skin Essential Plus', cat: 'Commerce · Booking & payments',
    desc: 'An e-commerce and booking platform for a spa and skincare brand. A multi-step booking flow, discount codes and Paystack and Monnify integrations connect browsing, appointments and checkout.',
    status: 'Member work · E-commerce & booking', image: '/work/skin-essential-plus.jpg', imageAlt: 'Skin Essential Plus spa and skincare website',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Paystack', 'Monnify'],
    credits: [{ memberId: 'usman-ogunnaike', contribution: 'UX & UI design, commerce development & payment integration', source: 'https://my-portfolio-ten-taupe-82.vercel.app/work' }],
    href: 'https://www.skinessentialplus.com/', linkLabel: 'Visit website',
  },
  {
    categories: ["applications"],
    id: 'banking-api', title: 'Banking API', cat: 'Backend · Financial infrastructure',
    desc: 'A core banking engineering project with a double-entry ledger, idempotent transfers and event-driven processing. Kafka outbox workflows, background retries and concurrent load testing address reliability under pressure.',
    status: 'Engineering project · Public repository', image: '/work/banking-api.jpg', imageAlt: 'GitHub repository preview for Henry Oderinde’s Banking API',
    tags: ['NestJS', 'PostgreSQL', 'Kafka', 'BullMQ', 'Docker', 'k6'],
    credits: [{ memberId: 'henry-oderinde', contribution: 'Backend architecture & implementation', source: 'https://henryoderinde.vercel.app/work/banking-api-backend-engineer' }],
    href: 'https://github.com/devhenode/Banking-API', linkLabel: 'Explore repository',
  },
  {
    categories: ["motion"],
    id: 'solar-explainer', title: 'Salt & Sapphire', cat: 'Motion · Brand storytelling',
    desc: 'An animated solar explainer built around a practical customer question: what solar setup do you need? Motion design turns the service into a clear visual story.',
    status: 'Member work · Animated explainer', image: '/work/solar-explainer.jpg', imageAlt: 'Preview frame from the Salt & Sapphire solar explainer animation',
    tags: ['Motion design', 'Animation', 'Explainer film'],
    credits: [{ memberId: 'usman-ogunnaike', contribution: 'Motion design & animation', source: 'https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics' }],
    href: 'https://my-portfolio-ten-taupe-82.vercel.app/#salt-sapphire-explainer', linkLabel: 'Watch on portfolio',
  },
  {
    categories: ["3d"],
    id: 'interior-concept', title: 'Contemporary Interior', cat: '3D · Architectural visualisation',
    desc: 'A contemporary interior concept explored through realistic lighting, warm materials and an interactive 360° tour. A way to experience a proposed space before it is built.',
    status: 'Concept · Interior visualisation', image: '/work/interior-concept.jpg', imageAlt: 'Rendered contemporary interior with warm materials and considered lighting',
    tags: ['3D modelling', 'Lighting & rendering', '360° tour'],
    credits: [{ memberId: 'usman-ogunnaike', contribution: '3D modelling, lighting, rendering & tour', source: 'https://my-portfolio-ten-taupe-82.vercel.app/work/3d-visuals' }],
    href: 'https://kuula.co/share/collection/7dGtb?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', linkLabel: 'Explore 360° tour',
  },
  {
    "id": "avanti-ristorante",
    "title": "Avanti Ristorante",
    "cat": "Websites · Hospitality",
    "categories": [
      "websites"
    ],
    "desc": "A restaurant website pairing animated visuals with menu search and online table reservations.",
    "status": "Member work · Restaurant website",
    "image": "/work/avanti-ristorante.jpg",
    "imageAlt": "Avanti Ristorante — portfolio preview",
    "tags": [
      "Brand & UX design",
      "Frontend",
      "Reservations API"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "Brand & UX design, frontend & reservations API",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/websites"
      }
    ],
    "href": "https://www.theavantirestaurant.com/",
    "linkLabel": "Visit website"
  },
  {
    "id": "stonechat",
    "title": "StoneChat",
    "cat": "Applications · Real-time communication",
    "categories": [
      "websites",
      "applications"
    ],
    "desc": "A messaging app with file uploads, password recovery, role-based access and an admin analytics dashboard.",
    "status": "Solo project · Messaging platform",
    "image": "/work/stonechat.jpg",
    "imageAlt": "StoneChat — portfolio preview",
    "tags": [
      "React",
      "Node.js",
      "Socket.IO",
      "MongoDB"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "Full-stack development, real-time systems & admin dashboard",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/websites"
      }
    ],
    "href": "https://stone-chatapp.vercel.app/",
    "linkLabel": "Visit website"
  },
  {
    "id": "dortunez-atelier",
    "title": "Dortunez Atelier Film",
    "cat": "Motion · Brand film",
    "categories": [
      "motion"
    ],
    "desc": "A cinematic brand animation exploring reflective chrome shapes.",
    "status": "Member work · Brand film",
    "image": "/work/dortunez-atelier.jpg",
    "imageAlt": "Dortunez Atelier Film — portfolio preview",
    "tags": [
      "Motion design",
      "Animation"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "Motion design & animation",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics"
      }
    ],
    "href": "https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics",
    "linkLabel": "Watch on portfolio"
  },
  {
    "id": "salt-sapphire-advert",
    "title": "Salt & Sapphire Vertical Advert",
    "cat": "Motion · Social advertising",
    "categories": [
      "motion"
    ],
    "desc": "A vertical animated advert designed for mobile viewing and social feeds.",
    "status": "Member work · Vertical advert",
    "image": "/work/salt-sapphire-advert.jpg",
    "imageAlt": "Salt & Sapphire Vertical Advert — portfolio preview",
    "tags": [
      "Motion design",
      "Animation",
      "Social video"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "Motion design & animation",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics"
      }
    ],
    "href": "https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics",
    "linkLabel": "Watch on portfolio"
  },
  {
    "id": "cream-product-animation",
    "title": "Cream Product Animation",
    "cat": "Motion · Product animation",
    "categories": [
      "motion"
    ],
    "desc": "An animated product study combining fluid movement, glass and cream colours.",
    "status": "Member work · Product animation",
    "image": "/work/cream-product-animation.jpg",
    "imageAlt": "Cream Product Animation — portfolio preview",
    "tags": [
      "Motion design",
      "Animation",
      "Product visuals"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "Motion design & animation",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics"
      }
    ],
    "href": "https://my-portfolio-ten-taupe-82.vercel.app/work/motion-graphics",
    "linkLabel": "Watch on portfolio"
  },
  {
    "id": "one-bedroom-interior",
    "title": "One-Bedroom Apartment Interior",
    "cat": "3D · Architectural visualisation",
    "categories": [
      "3d"
    ],
    "desc": "An apartment concept covering living, sleeping, cooking and bathroom spaces, with a 360° tour.",
    "status": "Concept · Apartment visualisation",
    "image": "/work/one-bedroom-interior.jpg",
    "imageAlt": "One-Bedroom Apartment Interior — portfolio preview",
    "tags": [
      "Interior design",
      "3D modelling",
      "Lighting & rendering",
      "360° tour"
    ],
    "credits": [
      {
        "memberId": "usman-ogunnaike",
        "contribution": "Interior design, modelling, lighting, rendering & tour",
        "source": "https://my-portfolio-ten-taupe-82.vercel.app/work/3d-visuals"
      }
    ],
    "href": "https://kuula.co/share/collection/7d02t?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    "linkLabel": "Explore 360° tour"
  },
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
export const EMAIL = 'hello@reforge.example'; // placeholder until real address supplied
