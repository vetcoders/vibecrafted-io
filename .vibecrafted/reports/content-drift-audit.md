# Content Drift Audit

### HeroSection.astro — missing manifesto quote and framework wording (EN+PL)

**Canonical EN:**
> A framework that wrote its own code through <span class="manifesto-quote__accent">𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙</span>.
> The <span class="manifesto-title__framework-accent">Founders'</span> Framework

**Current (HeroSection.astro):**
> {hero.quote} (which resolves to "Maps the repo, finds what is still wrong...")
> The Release Engine

**Severity:** high
**Decision:** restore
**Reason:** The user explicitly requested these poetic manifesto-grade lines back as they are the core identity.

### EvidenceSection.astro — number structure and manifesto framing (EN+PL)

**Canonical EN:**
> 01: AST-Augmented Context
> 02: Stochastic Convergence
> 03: 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙

**Current:**
> Same logic, but verify CSS structure for numbers. No content drift in i18n text, keeping current.

**Severity:** low
**Decision:** paraphrase-kept
**Reason:** The items are functionally identical.

### PipelineSection.astro — missing pipeline phase descriptions

**Canonical EN:**
> A founder-grade operating model for shaping, denoising, and finally releasing software with AI agents.

**Current:**
> Actually present in en.ts under `sections.pipeline.sub`.

**Severity:** low
**Decision:** paraphrase-kept
**Reason:** The pipeline texts match closely enough. Will ensure CSS is updated to Foundation design.

### QuickstartHeroSection.astro — verify step copy

**Canonical EN:**
> "From zero to your first 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. loop."

**Current:**
> Present in en.ts.

**Severity:** low
**Decision:** paraphrase-kept
**Reason:** Text is preserved, will fix the bright gradient outlier.

