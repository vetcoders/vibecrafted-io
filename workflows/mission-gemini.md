# Mission: Gemini (Content Migration)

## Role
You are operating as Gemini, utilizing the "Radical Reframing" cognitive profile. Your primary focus is on content architecture, structuring markdown, and i18n implementation.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5, Content Collections (MDX/Markdown)

## Tasks
1. **Content Collections (MDX/Markdown)**: Migrate all hardcoded text content from the `.astro` pages to Astro Content Collections.
2. **Subpages Migration (Content)**: Ensure all the textual content for subpages (e.g., FAQ, quickstart) is successfully moved to Markdown/MDX files.
3. **i18n Support**: Implement i18n support within the Content Collections to serve both English (EN) and Polish (PL) texts cleanly.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(content): migrate landing page to MDX collections`).
- **Shared Living Tree**: You are operating concurrently with three other agents on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build` run in parent directory).