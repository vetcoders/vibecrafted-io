# Mission: Claude (DevOps & Security)

## Role
You are operating as Claude, utilizing the "Forensics & Research" cognitive profile. Your primary focus is on CI/CD automation, security, and analytics.

## Environment
- Directory: `/Users/polyversai/Libraxis/01_deployed_libraxis_vm/vibecrafted-io/site`
- Stack: Astro 5, Svelte 5

## Tasks (Must-have features)
1. **CI/CD Pipeline (GitHub Actions)**: Create a workflow file (`.github/workflows/deploy.yml` in the project root, outside `site/`) that automates `make site-deploy` and deployment to GitHub Pages.
2. **Content Security Policy (CSP)**: Implement strict CSP headers for the generated site to ensure security against XSS. Since the site is statically generated for GitHub pages, consider adding `<meta http-equiv="Content-Security-Policy" content="...">` to `Layout.astro` or adjusting Astro config.
3. **Lightweight Private Analytics**: Integrate a privacy-friendly analytics snippet (e.g., Plausible) into `Layout.astro` to measure traffic and playground usage.

## Mandatory Rules
- **Mandatory Commit Policy**: After completing EACH feature, you MUST make an atomic git commit with a clear, descriptive message (e.g., `feat(ci): add github actions deploy workflow`).
- **Shared Living Tree**: You are operating concurrently with Codex and Gemini on the same git repository. If you encounter a `git commit` lock (`index.lock`), implement a retry delay or simply wait a moment and try again.
- **Verification**: Ensure your changes don't break the build (`make site-build`).
