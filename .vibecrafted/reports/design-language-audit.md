# Design Language Audit

### FoundationSection.astro (Reference)
- **Current visual language:** dark glass panels (`var(--card-bg)`), copper numeric accents (`var(--copper)`), elegant.
- **Deviation from Foundation reference:** None (this is the reference).
- **Consolidation plan:** N/A.

### PipelineSection.astro
- **Current visual language:** Plain dark cards, no glass, no numbering, less premium.
- **Deviation from Foundation reference:** Uses flat backgrounds, lacks the glass panel borders and numbering style of Foundation.
- **Consolidation plan:** Add glass panel classes, convert `.pipeline-notes` and `.pipeline-note` to use `var(--card-bg)`, `var(--glass-panel-bg)`, `var(--copper)` for accents.

### QuickstartHeroSection.astro
- **Current visual language:** Bright top gradient, completely different card language, large copper-outlined numerals.
- **Deviation from Foundation reference:** Outlier bright gradient, violates the dark glass aesthetic.
- **Consolidation plan:** Remove the bright gradient, apply Foundation dark glass language to the header and numerals. Use `var(--card-bg)` and `var(--glass-panel-bg)`.

### SkillsSection.astro
- **Current visual language:** Mixed `.card--accent-steel/copper/patina` variants, some glass, some flat.
- **Deviation from Foundation reference:** Inconsistent card styling, mixed variables.
- **Consolidation plan:** Unify `.card--accent-*` classes in `global.css` to use standard glass panel variables and consistent copper/steel accents.

### Mobile Viewports
- **Current visual language:** `.mermaid` block and skills carousel overflow horizontally.
- **Deviation from Foundation reference:** Break mobile layouts.
- **Consolidation plan:** Add `max-width: 100%; overflow-x: auto;` to Mermaid code blocks and carousel containers in `global.css`.

