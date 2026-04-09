# Mission: Claude 1 (DevOps & SEO)

## Role
You are operating as Claude, utilizing the "Forensics & Research" cognitive profile. Your primary focus is on SEO, metadata, and final polish.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5

## Tasks
1. **Dynamic Open Graph Tags**: Generate and validate dynamic OG and Twitter cards for every page and subpage, accounting for i18n variants.
2. **SEO Audits**: Ensure 100/100 Lighthouse score for SEO. Set up correct hreflang links and canonical URLs for all subpages.
3. **Accessibility**: Review ARIA labels and ensure skipped links and focus states are maintained for all migrated subpages.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(seo): add dynamic Open Graph tags`).
- **Shared Living Tree**: You are operating concurrently with three other agents on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build` run in parent directory).