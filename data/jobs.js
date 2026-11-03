/*
  Open roles and comment settings. Edit this file to add, change or close roles.

  Comments use giscus (https://giscus.app), which stores them in this repo's
  GitHub Discussions. Until DISCUSSIONS.categoryId is filled in, each role's
  "Comments" button links to GitHub Discussions instead of showing a thread.
*/
window.SITE_CONFIG = {
  repo: 'karriprakash/Portfolio.github.io',
  repoId: 'R_kgDOGI2qIg',
  // From https://giscus.app after enabling Discussions: the "Open roles" category id.
  categoryId: '',
  category: 'Open roles',
  // Discussion category slug for the "Share an idea" form (.github/DISCUSSION_TEMPLATE/ideas.yml).
  ideasCategorySlug: 'ideas'
};

window.OPEN_ROLES = [
  {
    id: 'telugu-content-reviewer',
    title: 'Telugu content reviewer',
    project: 'OmniVideo',
    type: 'Volunteer · Remote · Beginner-friendly',
    summary: 'Read the Telugu summaries, hooks and captions OmniVideo writes, and fix anything that does not sound natural.',
    tasks: ['Review AI-written Telugu text against the English', 'Suggest better hooks and phrases', 'Flag anything offensive or wrong'],
    skills: ['Telugu', 'English']
  },
  {
    id: 'idea-intake-volunteer',
    title: 'Idea intake volunteer',
    project: 'Open Family',
    type: 'Volunteer · Remote · Beginner-friendly',
    summary: 'Help turn ideas that arrive by phone call, voice note or WhatsApp into clear idea records, while keeping contributors private.',
    tasks: ['Write up what problem an idea solves and for whom', 'Ask one friendly follow-up question when an idea is unclear', 'Never share a contributor’s phone, email or location'],
    skills: ['Telugu or English', 'Listening', 'Writing']
  },
  {
    id: 'mypgspace-frontend',
    title: 'Frontend contributor',
    project: 'MyPGspace',
    type: 'Volunteer · Remote',
    summary: 'Improve the owner dashboard and tenant portal of the PG & hostel management app.',
    tasks: ['Pick up UI issues in the React app', 'Make screens work well on small phones', 'Improve accessibility and empty states'],
    skills: ['React', 'TypeScript', 'CSS']
  },
  {
    id: 'android-tester',
    title: 'Android app tester',
    project: 'OmniVideo',
    type: 'Volunteer · Remote · Beginner-friendly',
    summary: 'Try the OmniVideo Android app on your own phone and report what breaks or confuses you.',
    tasks: ['Follow a short test checklist', 'Report bugs with screenshots', 'Tell us which steps were hard to understand'],
    skills: ['An Android phone', 'Attention to detail']
  },
  {
    id: 'mcp-tool-builder',
    title: 'MCP tool builder',
    project: 'cc-ai-cam-mcp',
    type: 'Volunteer · Remote',
    summary: 'Turn a one-line project idea into a tested MCP server using the mcp-from-idea skill.',
    tasks: ['Scaffold a new MCP with npm run new-mcp', 'Write tools and smoke tests', 'Document how to connect it'],
    skills: ['TypeScript', 'Node.js']
  },
  {
    id: 'docs-writer',
    title: 'Guides & docs writer',
    project: 'All projects',
    type: 'Volunteer · Remote · Beginner-friendly',
    summary: 'Write simple, step-by-step guides so a first-time contributor can get started without help.',
    tasks: ['Write "your first contribution" guides', 'Turn setup steps into short checklists', 'Translate key guides into Telugu'],
    skills: ['Clear writing', 'Telugu or English']
  }
];
