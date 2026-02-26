// ── Sections ──────────────────────────────────────────────────────────────────

export const sections = [
  { id: 'journey-creation', label: 'Journey Creation' },
  { id: 'component-creation', label: 'Component Creation' },
  { id: 'support', label: 'Support' },
]

// ── Journeys & Stages ────────────────────────────────────────────────────────
// Each journey has ordered stages. Each story maps to one stage via stageId.

export const journeys = [
  {
    id: 'designer',
    name: 'Designer',
    sectionId: 'journey-creation',
    tagline: 'From prompt to PM sign-off to dev handoff',
    emoji: '🎨',
    color: { bg: '#F5F3FF', border: '#D9D8FC', accent: '#6841E6', light: '#EAEAFD', muted: '#6841E614' },
    stages: [
      {
        id: 'ds-generate',
        order: 1,
        name: 'Generate Screen',
        emoji: '✨',
        description: 'Describe the screen in plain language. AI generates it using only components that exist in the system.',
      },
      {
        id: 'ds-refine',
        order: 2,
        name: 'Refine with Intuition',
        emoji: '🎯',
        description: 'Use design judgment to adjust layout and composition through prompts. Every change stays on-system.',
      },
      {
        id: 'ds-pm-review',
        order: 3,
        name: 'PM Review',
        emoji: '📋',
        description: 'Share the generated screen with the Product Manager for approval during design reviews.',
      },
      {
        id: 'ds-handoff',
        order: 4,
        name: 'Dev Handoff',
        emoji: '💻',
        description: 'Share the approved, generated code directly with developers. No redlines. No interpretation gap.',
      },
    ],
  },
  {
    id: 'developer',
    name: 'Developer',
    sectionId: 'journey-creation',
    tagline: 'Discovery, onboarding, and using the system in products',
    emoji: '💻',
    color: { bg: '#F0FDF4', border: '#BBF7D0', accent: '#16A34A', light: '#DCFCE7', muted: '#16A34A14' },
    stages: [
      {
        id: 'sp-discover',
        order: 1,
        name: 'Discover Components',
        emoji: '🔍',
        description: 'Find what exists in the system before building anything new.',
      },
      {
        id: 'sp-use',
        order: 2,
        name: 'Use in Projects',
        emoji: '🏗️',
        description: 'Consume the component library to build product screens with confidence.',
      },
      {
        id: 'sp-versions',
        order: 3,
        name: 'Manage Versions',
        emoji: '📦',
        description: 'Choose when to upgrade components and track what changed between versions.',
      },
    ],
  },
  {
    id: 'dsl',
    name: 'Design System Lead',
    sectionId: 'component-creation',
    tagline: 'From component idea to versioned package in the codebase',
    emoji: '👑',
    color: { bg: '#FFF3E5', border: '#FFCB9E', accent: '#EB740A', light: '#FFE5CC', muted: '#EB740A14' },
    stages: [
      {
        id: 'dsl-spec',
        order: 1,
        name: 'Write Component Spec',
        emoji: '📝',
        description: 'Define the component in a plain .md file covering visual design, variants, states, and usage rules.',
      },
      {
        id: 'dsl-handoff',
        order: 2,
        name: 'Hand off to Developer',
        emoji: '🤝',
        description: 'Pass the spec to the component developer for implementation in .mdc and code.',
      },
      {
        id: 'dsl-review',
        order: 3,
        name: 'Review & Publish',
        emoji: '✅',
        description: 'Review the generated component in the browser before it enters the system.',
      },
      {
        id: 'dsl-version',
        order: 4,
        name: 'Version & Release',
        emoji: '🔄',
        description: 'Publish the component with proper versioning so existing projects are not broken.',
      },
      {
        id: 'dsl-update',
        order: 5,
        name: 'Update Component',
        emoji: '🔧',
        description: 'Edit the .md spec first, then the code follows. Changes roll out on each project\'s own timeline.',
      },
      {
        id: 'dsl-govern',
        order: 6,
        name: 'Govern the System',
        emoji: '🛡️',
        description: 'Maintain quality, enforce rules, and keep the system consistent and trustworthy over time.',
      },
    ],
  },
  {
    id: 'compdev',
    name: 'Component Developer',
    sectionId: 'component-creation',
    tagline: 'Converting specs into packages the whole system depends on',
    emoji: '⚙️',
    color: { bg: '#EFF6FF', border: '#BFDBFE', accent: '#2563EB', light: '#DBEAFE', muted: '#2563EB14' },
    stages: [
      {
        id: 'cd-build',
        order: 1,
        name: 'Build the Component',
        emoji: '🔨',
        description: 'Take the .md spec, convert it to .mdc files, generate the CSS and React code.',
      },
      {
        id: 'cd-tools',
        order: 2,
        name: 'Multi-tool Setup',
        emoji: '🔌',
        description: 'Ensure the system works across AI tools — Cursor, Claude Code, and future tools.',
      },
    ],
  },
  {
    id: 'support-tab',
    name: 'Support',
    sectionId: 'support',
    tagline: 'Onboarding, discovery, and cross-role collaboration',
    emoji: '🌐',
    color: { bg: '#F0F9FF', border: '#BAE6FD', accent: '#0284C7', light: '#E0F2FE', muted: '#0284C714' },
    stages: [
      {
        id: 'sp-onboard',
        order: 1,
        name: 'Onboarding',
        emoji: '🚀',
        description: 'Get new team members up to speed on the system quickly.',
      },
      {
        id: 'sp-collab',
        order: 2,
        name: 'Collaboration',
        emoji: '🤝',
        description: 'How all roles give feedback and communicate across the system.',
      },
    ],
  },
]

// ── Actors ───────────────────────────────────────────────────────────────────

export const actors = [
  {
    name: 'Designer',
    emoji: '🎨',
    color: '#6841E6',
    role: 'Creates screens using AI, refines layout with intuition, shares with PMs, hands off to devs.',
  },
  {
    name: 'Design System Lead',
    emoji: '👑',
    color: '#EB740A',
    role: 'Owns the component spec. Defines visual rules, writes and updates .md files, governs the system.',
  },
  {
    name: 'Component Developer',
    emoji: '⚙️',
    color: '#2563EB',
    role: 'Converts specs into .mdc files and component packages. Maintains the library.',
  },
  {
    name: 'Developer',
    emoji: '💻',
    color: '#16A34A',
    role: 'Receives designer handoff. Integrates generated screens into the product codebase. Uses the component library without modifying it.',
  },
  {
    name: 'Product Manager',
    emoji: '📋',
    color: '#0891B2',
    role: 'Reviews screens shared by designers. Plans work around component availability.',
  },
  {
    name: 'New Joiner',
    emoji: '👋',
    color: '#D18C0A',
    role: 'Designer or developer onboarding onto the system.',
  },
  {
    name: 'QA Engineer',
    emoji: '🔬',
    color: '#DC2626',
    role: 'Validates generated screens against the spec. Role shifts to automated verification.',
  },
]

// ── Stories ──────────────────────────────────────────────────────────────────
// Each story maps to a stageId from the journeys above.

export const stories = [

  // ══ DESIGNER JOURNEY ════════════════════════════════════════════════════

  // Stage: Generate Screen
  {
    id: 'US-02', stageId: 'ds-generate', actor: 'Designer',
    want: 'describe a screen in plain language and have the AI generate it using only components that exist in the system',
    soThat: 'the output is always on-brand and on-system — ready to share with PMs and developers without manual correction',
  },
  {
    id: 'US-03', stageId: 'ds-generate', actor: 'Designer',
    want: 'the AI to follow the correct micro-interaction timings and easing curves from the foundation tokens when generating animated components',
    soThat: 'every screen I create feels consistent with every other screen in the product without manual timing adjustments',
  },
  {
    id: 'US-52', stageId: 'ds-generate', actor: 'Designer',
    want: 'the code the AI generates for my screen to exactly follow the component patterns and file structures defined in the system',
    soThat: 'developers receive predictable, consistent code that mirrors the established codebase patterns without any undocumented deviations',
  },
  {
    id: 'US-56', stageId: 'ds-generate', actor: 'Designer',
    want: 'the AI to include motion and animation specs when generating components',
    soThat: 'interactions feel polished and consistent with the design system without manual animation work',
  },
  {
    id: 'US-57', stageId: 'ds-generate', actor: 'Designer',
    want: 'verify that the latest version of the component package is installed before generating screens',
    soThat: 'I am always using updated components and never work with outdated versions',
  },

  // Stage: Refine with Intuition
  {
    id: 'US-04', stageId: 'ds-refine', actor: 'Designer',
    want: 'make layout adjustments by prompting the AI — "move the button down", "make this two columns", "give this more breathing room"',
    soThat: 'my compositional intuition shapes the page while every adjustment automatically uses the correct spacing tokens',
  },
  {
    id: 'US-05', stageId: 'ds-refine', actor: 'Designer',
    want: 'the AI to flag any layout decision it had to make that is not covered by an existing design system rule',
    soThat: 'I know exactly where the AI improvised so I can decide to accept that choice or refine it through further prompts',
  },
  {
    id: 'US-55', stageId: 'ds-refine', actor: 'Designer',
    want: 'apply the design system rules to an existing AI-generated design that follows a random design pattern',
    soThat: 'I can retrofit any off-system screen to match our component library, spacing tokens, and visual standards without starting from scratch',
  },

  // Stage: PM Review
  {
    id: 'US-06', stageId: 'ds-pm-review', actor: 'Designer',
    want: 'run the AI-generated screen during design reviews with my Product Manager',
    soThat: 'stakeholders see an accurate, system-compliant representation of the final product before development begins',
  },
  {
    id: 'US-07', stageId: 'ds-pm-review', actor: 'Product Manager',
    want: 'review a generated screen shared by the designer and give feedback directly on it',
    soThat: 'the review loop is fast — we refine together through prompts rather than going back to Figma',
  },
  {
    id: 'US-51', stageId: 'ds-pm-review', actor: 'Designer',
    want: 'keep track of previous versions of a generated screen during PM review',
    soThat: 'I can compare iterations and revert to an earlier version if the new direction does not get sign-off',
  },

  // Stage: Dev Handoff
  {
    id: 'US-08', stageId: 'ds-handoff', actor: 'Designer',
    want: 'share the approved generated screen directly with developers after PM sign-off',
    soThat: 'developers receive ready-to-use code that matches the reviewed design — no redlines, no interpretation gap',
  },
  {
    id: 'US-53', stageId: 'ds-handoff', actor: 'Designer',
    want: 'to explicitly flag when a screen contains an element built outside the component library',
    soThat: 'the developer knows it is a deliberate exception and does not mistake it for a missing or broken system component',
  },

  // ══ DESIGN SYSTEM LEAD JOURNEY ══════════════════════════════════════════

  // Stage: Write Component Spec
  {
    id: 'US-09', stageId: 'dsl-spec', actor: 'Design System Lead',
    want: 'write a component spec in plain language (.md file) covering visual design, variants, states, sizes, and usage rules',
    soThat: 'the design intent is captured precisely before any code is written and cannot be misinterpreted',
  },
  {
    id: 'US-10', stageId: 'dsl-spec', actor: 'Design System Lead',
    want: 'include "use when" and "do not use when" rules in every component spec',
    soThat: 'the AI always picks the right component for the right context when generating screens',
  },

  // Stage: Hand off to Developer
  {
    id: 'US-11', stageId: 'dsl-handoff', actor: 'Design System Lead',
    want: 'a clear handoff format for giving a component spec to a developer',
    soThat: 'nothing is lost in translation between design intent and technical implementation',
  },
  {
    id: 'US-12', stageId: 'dsl-handoff', actor: 'Component Developer',
    want: 'to ask the Design System Lead clarifying questions before writing the .mdc file',
    soThat: 'ambiguities in the spec are resolved before code is written rather than discovered during review',
  },

  // Stage: Review & Publish
  {
    id: 'US-13', stageId: 'dsl-review', actor: 'Design System Lead',
    want: 'review the generated component in a browser before it is published to the package',
    soThat: 'I can confirm the visual output matches the spec before it enters the system',
  },
  {
    id: 'US-14', stageId: 'dsl-review', actor: 'Design System Lead',
    want: 'every new component to go through a defined checklist — spec → .mdc → generation → review → registration → publish',
    soThat: 'no component enters the system without proper documentation and visual sign-off',
  },

  // Stage: Version & Release
  {
    id: 'US-15', stageId: 'dsl-version', actor: 'Design System Lead',
    want: 'publish breaking changes only as major version bumps (v1 → v2)',
    soThat: 'consumer projects are never accidentally broken by a component update',
  },
  {
    id: 'US-16', stageId: 'dsl-version', actor: 'Design System Lead',
    want: 'deprecate old component versions with a clear sunset timeline',
    soThat: 'consumer projects have enough time to migrate before old versions stop being supported',
  },
  {
    id: 'US-17', stageId: 'dsl-version', actor: 'Design System Lead',
    want: 'be notified when a developer makes a technical decision that affects how a component looks or behaves',
    soThat: 'design intent is never overridden silently',
  },

  // Stage: Update Component
  {
    id: 'US-18', stageId: 'dsl-update', actor: 'Design System Lead',
    want: 'update a component by editing its .md spec file first before any code changes are made',
    soThat: 'the design intent is always updated first and the spec remains the single source of truth',
  },
  {
    id: 'US-19', stageId: 'dsl-update', actor: 'Component Developer',
    want: 'update the .mdc file to match the Design System Lead\'s spec changes and publish as a new version',
    soThat: 'existing projects are not broken and can upgrade on their own timeline',
  },

  // Stage: Govern the System
  {
    id: 'US-20', stageId: 'dsl-govern', actor: 'Design System Lead',
    want: 'every component spec to be reviewed and approved before it enters the system',
    soThat: 'the system only contains components that meet the design and technical standard',
  },
  {
    id: 'US-21', stageId: 'dsl-govern', actor: 'Design System Lead',
    want: 'a rule that the .md spec must always be updated before any code changes',
    soThat: 'the spec never falls behind the implementation',
  },
  {
    id: 'US-22', stageId: 'dsl-govern', actor: 'Design System Lead',
    want: 'the system to be tool-agnostic — specs live in plain .md files any AI tool can read',
    soThat: 'the system does not break if the team switches from Cursor to Claude Code or any future tool',
  },
  {
    id: 'US-23', stageId: 'dsl-govern', actor: 'Component Developer',
    want: 'a linter (eslint plugin) that scans generated code for hardcoded values',
    soThat: 'I am automatically warned when the AI or a developer has bypassed the token system',
  },
  {
    id: 'US-24', stageId: 'dsl-govern', actor: 'QA Engineer',
    want: 'to validate any generated screen against the design system automatically',
    soThat: 'design QA becomes a pass/fail check rather than a manual visual review',
  },

  // ══ COMPONENT DEVELOPER JOURNEY ═════════════════════════════════════════

  // Stage: Build the Component
  {
    id: 'US-25', stageId: 'cd-build', actor: 'Component Developer',
    want: 'receive a Design System Lead\'s .md spec and convert it into two .mdc files — one for CSS, one for React',
    soThat: 'the AI has precise, enforceable rules to generate the component from',
  },
  {
    id: 'US-26', stageId: 'cd-build', actor: 'Component Developer',
    want: 'every .mdc file to declare strict ownership — which files it generates, reads, and must never touch',
    soThat: 'AI-assisted generation never accidentally modifies unrelated code',
  },
  {
    id: 'US-27', stageId: 'cd-build', actor: 'Component Developer',
    want: 'register every new component in the master index file (design-spec.mdc)',
    soThat: 'the AI always knows the complete set of available components without searching the codebase',
  },
  {
    id: 'US-28', stageId: 'cd-build', actor: 'Component Developer',
    want: 'generate the initial component code by pointing the AI at the .mdc file',
    soThat: 'the first implementation is consistent with the spec from day one',
  },
  {
    id: 'US-29', stageId: 'cd-build', actor: 'Component Developer',
    want: 'to ask the Design System Lead clarifying questions before writing the .mdc file',
    soThat: 'ambiguities are resolved before code is written rather than discovered during review',
  },

  // Stage: Multi-tool Setup
  {
    id: 'US-30', stageId: 'cd-tools', actor: 'Component Developer',
    want: 'component specs to live in plain .md files not tied to any specific AI tool',
    soThat: 'switching tools in future does not require rewriting the entire system',
  },
  {
    id: 'US-31', stageId: 'cd-tools', actor: 'Component Developer',
    want: 'thin .mdc wrapper files that point to the plain .md specs when using Cursor',
    soThat: 'Cursor auto-loads the right rules without duplicating content',
  },
  {
    id: 'US-32', stageId: 'cd-tools', actor: 'Component Developer',
    want: 'a CLAUDE.md file that points to the plain .md specs when using Claude Code in the terminal',
    soThat: 'Claude Code has the same context as Cursor without any manual attachment required',
  },
  {
    id: 'US-33', stageId: 'cd-tools', actor: 'Design System Lead',
    want: 'to add support for a new AI tool by writing a single entry-point file without changing any core .md specs',
    soThat: 'the system can expand to new tools with minimal effort',
  },

  // ══ DEVELOPER JOURNEY ═══════════════════════════════════════════════════

  // Stage: Discover Components
  {
    id: 'US-34', stageId: 'sp-discover', actor: 'Developer',
    want: 'find every available component in one place with its usage rules, variants, and code examples',
    soThat: 'I never build something from scratch that already exists in the system',
  },
  {
    id: 'US-36', stageId: 'sp-discover', actor: 'New Joiner',
    want: 'read the component spec files and immediately understand what each component looks like, when to use it, and when not to',
    soThat: 'I can contribute without needing a handholding session',
  },
  {
    id: 'US-37', stageId: 'sp-discover', actor: 'New Joiner',
    want: 'read the CSS and framework spec files and immediately understand the technical rules for each component',
    soThat: 'I can maintain and extend the system without breaking existing patterns',
  },
  {
    id: 'US-60', stageId: 'sp-discover', actor: 'Developer',
    want: 'to know if I can install a component package anytime later while generating, even if I forgot to use it initially',
    soThat: 'I can add components on-demand without restarting my workflow',
  },

  // Stage: Use in Projects
  {
    id: 'US-39', stageId: 'sp-use', actor: 'Developer',
    want: 'the AI to always use semantic token names (--space-4, --radius-md) and never hardcode pixel values',
    soThat: 'generated code respects the design system and updates automatically when tokens change',
  },
  {
    id: 'US-40', stageId: 'sp-use', actor: 'Developer',
    want: 'the AI to refuse to generate a component that does not exist in the system and instead suggest the closest alternative',
    soThat: 'one-off components never get created outside the design system',
  },
  {
    id: 'US-41', stageId: 'sp-use', actor: 'QA Engineer',
    want: 'generated screens to be automatically verifiable against the design system spec',
    soThat: 'I no longer need to manually check token usage, spacing, and component selection',
  },
  {
    id: 'US-42', stageId: 'sp-use', actor: 'Developer',
    want: 'to give feedback when a generated screen does not feel right',
    soThat: 'the issue can be traced back to a spec gap or rule gap and fixed at the source',
  },
  {
    id: 'US-54', stageId: 'sp-use', actor: 'Developer',
    want: 'to be notified when a designer handoff includes a one-off element that is not part of the component library',
    soThat: 'I can implement it as an explicit exception rather than accidentally treating it as a system component',
  },
  {
    id: 'US-58', stageId: 'sp-use', actor: 'Developer',
    want: 'to be warned if I am generating with an outdated component package version',
    soThat: 'I can update before pushing to production and avoid using deprecated patterns',
  },
  {
    id: 'US-59', stageId: 'sp-use', actor: 'Developer',
    want: 'a clear reason when the AI suggests I should not use a specific component in a given context',
    soThat: 'I understand the design system constraints and can make informed decisions',
  },

  // Stage: Manage Versions
  {
    id: 'US-43', stageId: 'sp-versions', actor: 'Developer',
    want: 'choose which version of a component package my project uses',
    soThat: 'I can upgrade when my team is ready without being forced into breaking changes',
  },
  {
    id: 'US-44', stageId: 'sp-versions', actor: 'Developer',
    want: 'read a changelog in the component\'s .md file that describes exactly what changed in each version',
    soThat: 'I can make an informed decision about when to upgrade',
  },
  {
    id: 'US-45', stageId: 'sp-versions', actor: 'Developer',
    want: 'run a single command that shows me which of my components have newer versions available',
    soThat: 'I can stay informed about updates without manually tracking the changelog',
  },

  // ══ SUPPORT ══════════════════════════════════════════════════════════════

  // Stage: Onboarding
  {
    id: 'US-46', stageId: 'sp-onboard', actor: 'New Joiner',
    want: 'to read the foundation .md file and understand every colour, spacing value, typography token, and animation rule in under an hour',
    soThat: 'I can start contributing to the system on day one',
  },
  {
    id: 'US-47', stageId: 'sp-onboard', actor: 'New Joiner',
    want: 'to read the design-spec.mdc master index and understand the complete component inventory, file structure, and golden rules before touching any code',
    soThat: 'I never accidentally break the system through ignorance',
  },
  {
    id: 'US-48', stageId: 'sp-onboard', actor: 'New Joiner',
    want: 'a getting started guide walking through one complete example — from DSL writing a spec, to developer publishing a component, to designer generating a screen',
    soThat: 'the entire workflow is clear before I have to do it myself',
  },

  // Stage: Collaboration
  {
    id: 'US-49', stageId: 'sp-collab', actor: 'Product Manager',
    want: 'visibility into which components are in progress, published, or deprecated',
    soThat: 'I can plan product work around what is and is not available in the system',
  },
  {
    id: 'US-50', stageId: 'sp-collab', actor: 'Developer',
    want: 'to give feedback when a generated screen does not feel right so it can be traced back to a spec or rule gap',
    soThat: 'issues are fixed at the source rather than patched in isolation',
  },
]
