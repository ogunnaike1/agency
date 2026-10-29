export const NAV = ['Capabilities', 'Work', 'Process', 'Studio', 'Contact'] as const;

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

export const PROJECTS = [
  { title: 'The Instrument', cat: '3D and creative development', desc: 'A gimbal from Blender to browser: modelled, rigged and shipped as an interactive real-time piece.', status: 'Experiment · assets to be added' },
  { title: 'Signal board', cat: 'Data and dashboards', desc: 'A dashboard exploring how dense operational data can stay readable.', status: 'Concept · synthetic data' },
  { title: 'Access review', cat: 'Security and reliability', desc: 'A permissions-review console that makes who-can-do-what auditable at a glance.', status: 'Concept · not a client project' },
  { title: 'Intake to ticket', cat: 'AI and automation', desc: 'A workflow that turns incoming requests into tickets, with a human approval step.', status: 'Concept · not a client project' },
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
