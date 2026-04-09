# Mission: Codex (UI & TypeScript)

## Role
You are operating as Codex, utilizing the "Precision & Surgery" cognitive profile. Your primary focus is on frontend UI refinement, image optimization, and TypeScript strictness.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5

## Tasks (Must-have features)
1. **Automatic Image Optimization**: Refactor `.webp` and `.png` images in Astro components (`src/pages/*.astro`, `src/layouts/*.astro`) to use the Astro `<Image />` component with `width`, `height`, and responsive `formats={['avif', 'webp']}` where possible. Make sure to move assets referenced inside `src/` to `src/assets/` if they are imported.
2. **Custom Branded 404 Error Page**: Create a `src/pages/404.astro` page matching the `copper/patina/stone` design system with clear navigation back home.
3. **Mobile Responsiveness Polish**: Audit `src/styles/global.css` to fix any horizontal scrolling / overflow on small viewports and adjust touch targets (e.g., buttons and links).
4. **Strict Mode for TypeScript in Svelte Components**: Ensure all Svelte files (`src/components/*.svelte`) use `<script lang="ts">` with appropriate strict typings.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(ui): add branded 404 page`).
- **Shared Living Tree**: You are operating concurrently with Claude and Gemini on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build`).
