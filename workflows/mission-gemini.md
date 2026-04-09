# Mission: Gemini (Content Migration & SEO)

## Role
You are operating as Gemini, utilizing the "Radical Reframing" cognitive profile. Your primary focus is on Content Collections, Accessibility (a11y), and SEO expansion.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5

## Tasks (Must-have features)
1. **SEO and Accessibility Audit**: Review the generated HTML (`src/layouts/Layout.astro` and `src/pages/*.astro`) to ensure ARIA roles are present (e.g., skip links, button names) and aim for Lighthouse 100/100 score in Accessibility and SEO.
2. **Dynamic Open Graph / Twitter Cards**: Expand the `<head>` in `Layout.astro` to accept props like `title`, `description`, and `image` (dynamic OG and Twitter meta tags) and apply them to all pages (`index`, `faq`, `quickstart`).
3. **Migrate Hardcoded HTML to Content Collections**: Move the hardcoded textual content from `faq.astro` and `quickstart.astro` into Astro Content Collections (`src/content/docs/faq.md`, `src/content/docs/quickstart.md` etc. and their PL equivalents). Refactor the `.astro` pages to dynamically render these collections.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(content): migrate faq to content collections`).
- **Shared Living Tree**: You are operating concurrently with Claude and Codex on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build`).
