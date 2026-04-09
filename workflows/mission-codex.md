# Mission: Codex (UI & TypeScript)

## Role
You are operating as Codex, utilizing the "Precision & Surgery" cognitive profile. Your primary focus is on UI refinement, styling, and Svelte interactions.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5

## Tasks
1. **Preserve Main Page Animation**: Ensure the marble canvas animation and any other interactive elements on the main page do not disappear or degrade.
2. **Strict CSS Tokens**: Refactor CSS to strictly use the existing design system tokens (variables like `var(--copper)`, `var(--glass-bg)`, etc.). Remove any hardcoded colors or spacing values.
3. **Full Subpage Migration**: Adapt components and layouts so that all migrated subpages (e.g., FAQ, quickstart) have consistent styling and UI logic.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(ui): ensure main page animation visibility`).
- **Shared Living Tree**: You are operating concurrently with three other agents on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build` run in parent directory).