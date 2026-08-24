export const projects = [
  {
    slug: 'multi-site-e2e-test-framework',
    title: 'Multi-site End-to-End Test Framework',
    stack: ['Cypress', 'JavaScript', 'Node'],
    period: '2025–26',
    summary:
      'Test automation framework built from scratch for a multi-tenant ecommerce platform, covering three product areas from a single shared codebase.',
    highlights: [
      {
        title: 'Data-driven architecture',
        detail:
          'One spec set runs against 13 configured customer sites, with per-site capability flags skipping coverage a given site does not have, and two divergent checkout implementations resolved from configuration instead of forked specs.',
      },
      {
        title: 'Custom command layer',
        detail:
          '24 commands over session reuse, authenticated setup and site-config merging, keeping specs declarative and readable.',
      },
      {
        title: 'Geometry-based visual assertion',
        detail:
          'A custom assertion infers rendered layout rows from element bounding-box geometry, allowing a purely visual property to be tested through the DOM.',
      },
      {
        title: 'Accessibility & reliability',
        detail:
          'Accessibility checks via cypress-axe, real-event interaction testing, ESLint and Prettier, and selective video retention on failure only. Documented testing strategy and data-cy selector conventions for the team.',
      },
    ],
    stats: [
      { label: 'Customer sites', value: 13 },
      { label: 'Spec files', value: 18 },
      { label: 'Tests', value: 55 },
      { label: 'Custom commands', value: 24 },
    ],
    repoUrl: null,
  },
]
