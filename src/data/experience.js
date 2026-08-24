export const currentRoles = [
  {
    id: 'experlogix',
    title: 'QA Engineer',
    company: 'Experlogix',
    location: 'Dublin',
    start: 'Jul 2024',
    end: 'Present',
    logo: null,
    summary:
      'Sole QA engineer for extended periods on a B2B ecommerce platform serving around 150 customer webshops, each with its own configuration and ERP integration.',
    bullets: [
      'Sole QA engineer for extended periods on a B2B ecommerce platform serving around 150 customer webshops, each with its own configuration and ERP integration (SAP, Business Central, CE, F&O), including full cover during a colleague’s absence.',
      'Introduced the company’s first automated end-to-end test coverage. Designed and built a Cypress suite from scratch across three product areas — webshop, management interface and CPQ portal — now 18 spec files, 55 tests and 24 custom commands.',
      'Built it as a data-driven framework: one spec runs against 13 configured customer sites using per-site capability flags, and handles two divergent checkout implementations from configuration rather than duplicated specs.',
      'Solved the single sign-on authentication barrier that had previously made automated testing impossible on the platform; added accessibility checks with cypress-axe and authored the project’s testing strategy and data-cy selector conventions.',
      'Manual acceptance and regression testing against ticket criteria in a Kanban flow, across VPN-accessed staging environments and local instances restored from customer databases. Set up own SSH-based remote workflow into internal servers.',
      'Contributed to adoption of Azure DevOps Test Plans for structured test-case management.',
    ],
    skills: ['Cypress', 'JavaScript', 'cypress-axe', 'Azure DevOps', 'GitLab CI/CD', 'ERP Integrations'],
  },
  {
    id: 'nuritas',
    title: 'Software Engineer',
    company: 'Nuritas',
    location: 'Dublin',
    start: 'Oct 2021',
    end: 'Oct 2023',
    logo: '/images/NuritasLogo.png',
    summary:
      'Sole frontend developer on Pantry, an internal React and Django REST platform used by 20–30 biologists and data scientists exploring tens of millions of peptide and mass-spectrometry records.',
    bullets: [
      'Sole frontend developer on Pantry, an internal React and Django REST platform used by 20–30 biologists and data scientists to explore tens of millions of peptide and mass-spectrometry records supporting ML-led discovery. Took over the frontend a month into the role when the lead developer left, and maintained and extended it alone for two years.',
      'Shipped React interfaces for the Data Curation team to replace direct SQL access for adding and reviewing datasets.',
      'Designed and prototyped a bulk Excel import mapping a single upload onto a 50-table relational schema with 130+ attributes.',
      'Worked in a Dockerised environment with GitLab and Kanban alongside four backend and DevOps engineers.',
    ],
    skills: ['React', 'Django REST Framework', 'Docker', 'GitLab', 'SQL'],
  },
]

export const earlierRoles = [
  {
    id: 'glofox',
    title: 'Web Implementation Support',
    company: 'Glofox',
    start: 'Aug 2020',
    end: 'Feb 2021',
    logo: '/images/glofox.svg',
    description:
      'Onboarded gym and studio clients onto the booking platform, embedding platform components into customer WordPress and Squarespace sites, and acted as first point of contact for web integration queries. Produced tutorial and support video content.',
  },
  {
    id: 'cloudtech',
    title: 'Software Developer',
    company: 'Cloudtech Ltd',
    start: 'Jan 2020',
    end: 'Aug 2020',
    logo: '/images/cloudtechLogo.png',
    description:
      'Python and Deluge work on Zoho and Salesforce CRM customisations for SME clients, in a two-developer team. Company ceased trading during COVID-19.',
  },
  {
    id: 'covalen',
    title: 'Technical Support Engineer (1st & 2nd Level)',
    company: 'Covalen (formerly Cpl Integrated Services) — contracted to HPE',
    start: 'Jun 2018',
    end: 'Jan 2020',
    logo: '/images/HPELogo.png',
    description:
      'Promoted to second-level support: one of five engineers holding elevated system permissions and acting as escalation point for a support floor of roughly 64 first-line agents. Handled 30–60 technical calls daily, with dedicated support for an investment-sector client. Consistently in the top performance tier.',
  },
  {
    id: 'sonics',
    title: 'AV Technician',
    company: 'Sonics AVI',
    start: 'Aug 2017',
    end: 'Jun 2018',
    logo: '/images/sonicslogo.jpeg',
    description:
      'On-site installations across Dublin office buildings: comms rack builds, Cat5 termination, digital signage, video networks and boardroom AV setup, with remote and on-site support to SLA.',
  },
  {
    id: 'sin',
    title: 'Graphic Designer & Media Manager',
    company: 'Sin Nightclub, Dublin',
    start: 'May 2012',
    end: 'Aug 2017',
    logo: '/images/sinLogo.png',
    description:
      'Full creative control of brand, design and social output over five years. Grew the social following from 5,000 to 225,000, with a peak of 95 million weekly views, and contributed materially to revenue growth. Handled budgeting, event creation and marketing alongside all design production.',
  },
]
