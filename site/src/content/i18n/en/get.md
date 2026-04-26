---
# Get — install / bootstrap section with command bars and inline links.
# Rendered by: site/src/components/sections/GetSection.astro

# Section eyebrow / title / subhead.
label: "Get 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍."
title: "Install the release engine. Start the loop."
sub: "Bootstrap the control plane with the public install path, verify your local surface, and enter the first shippable workflow through the command deck."

# Big orange CTA below the cards. Locale-specific install wizard.
installWizardHref: "/en/install/"
installWizardLabel: "Open Guided Installer"

# Install steps. body MAY contain inline <code>...</code> markup and HTML
# entities (&mdash;, etc.) — the component renders body via set:html. command
# is the literal shell command shown inside the copy bar.
cards:
  - step: "01"
    title: "Bootstrap the control plane"
    body: "Stage the framework locally with the public bootstrap path. If you want the browser-guided installer, use <code>make vibecrafted</code> from the repo."
    command: "curl -fsSL https://vibecrafted.io/install.sh | bash"
  - step: "02"
    title: "Enter through the command deck"
    body: "The main front door is now <code>vibecrafted</code>. Daily skill surfaces are exposed as direct <code>vc-*</code> commands."
    command: "vibecrafted help && vibecrafted init claude"
  - step: "03"
    title: "Drive the real work"
    body: "Examine the codebase, research ground truth, and delegate implementation to parallel agents &mdash; all in one pipeline."
    command: 'vibecrafted workflow claude --prompt "Plan and implement auth module"'
  - step: "04"
    title: "Converge until it stops lying"
    body: "The marbles loop finds what is still wrong and eliminates it. Each pass sharpens the surface."
    command: "vibecrafted marbles codex --count 3 --depth 3"

# Inline links pill row at the bottom of the section.
links:
  - href: "/en/quickstart/"
    label: "Quick Start"
  - href: "/en/faq/"
    label: "FAQ"
  - href: "https://github.com/VetCoders/vibecrafted"
    label: "GitHub"
---
