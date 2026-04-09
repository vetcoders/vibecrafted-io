# Mission: Claude 2 (Logic & i18n Routing)

## Role
You are operating as Claude, utilizing the "Forensics & Research" cognitive profile. Your primary focus is on i18n routing logic and strict audits.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5

## Tasks
1. **i18n Routing Logic**: Ensure full i18n support works smoothly across all subpages. Fix routing, language toggle links, and ensure the correct collections are loaded based on the current locale path.
2. **Strict CSS Audit**: Verify that all components strictly follow the design system tokens. Flag and fix any hardcoded colors or spacing values that were missed.
3. **Accessibility (Lighthouse)**: Fix any remaining touch targets and accessibility warnings reported by Lighthouse to ensure 100/100 across the site.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(i18n): wire up routing logic for content collections`).
- **Shared Living Tree**: You are operating concurrently with three other agents on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build` run in parent directory).