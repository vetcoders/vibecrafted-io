---
# Get — sekcja install / bootstrap z paskami komend i inline linkami.
# Renderowane przez: site/src/components/sections/GetSection.astro

# Eyebrow / tytuł / podtytuł sekcji.
label: "Pobierz 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍."
title: "Zainstaluj silnik release'u. Uruchom pętlę."
sub: "Zbootstrapuj control plane przez publiczną ścieżkę instalacji, zweryfikuj lokalną powierzchnię i wejdź w pierwszy workflow prowadzący do realnego shipu."

# Duża pomarańczowa CTA pod kartami. Wizard installa specyficzny dla locale.
installWizardHref: "/pl/install/"
installWizardLabel: "Otwórz prowadzony instalator"

# Kroki instalacji. body MOŻE zawierać inline <code>...</code> i encje HTML
# (&mdash;, itd.) — komponent renderuje body przez set:html. command to
# literalna komenda shell pokazywana w pasku copy.
cards:
  - step: "01"
    title: "Zbootstrapuj control plane"
    body: "Zainstaluj framework lokalnie przez publiczną ścieżkę bootstrapu. Jeśli chcesz browser-guided installer, użyj <code>make vibecrafted</code> w repo."
    command: "curl -fsSL https://vibecrafted.io/install.sh | bash"
  - step: "02"
    title: "Wejdź przez command deck"
    body: "Główne drzwi wejściowe to teraz <code>vibecrafted</code>. Codzienne powierzchnie skilli są dostępne jako bezpośrednie komendy <code>vc-*</code>."
    command: "vibecrafted help && vibecrafted init claude"
  - step: "03"
    title: "Napędzaj prawdziwą pracę"
    body: "Zbadaj codebase, odtwórz ground truth i deleguj implementację do równoległych agentów &mdash; wszystko w jednym pipeline."
    command: 'vibecrafted workflow claude --prompt "Plan and implement auth module"'
  - step: "04"
    title: "Konwerguj aż przestanie kłamać"
    body: "Pętla marbles znajduje to, co wciąż jest źle i eliminuje to. Każde przejście wyostrza powierzchnię."
    command: "vibecrafted marbles codex --count 3 --depth 3"

# Inline linki pill row na dole sekcji.
links:
  - href: "/pl/quickstart/"
    label: "Szybki start"
  - href: "/pl/faq/"
    label: "FAQ"
  - href: "https://github.com/VetCoders/vibecrafted"
    label: "GitHub"
---
