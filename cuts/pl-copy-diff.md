# PL Copy — Side by Side

> **Stara (LEFT):** `pl/*.html` z 8 kwietnia 2026 (untracked, pre-reorg snapshot, NIE jest live deploy)
> **Nowa (RIGHT):** `site/src/content/i18n/pl/*.md` + `site/src/lib/i18n/pl.ts` (current source of truth)
>
> Cel: szybki triage co brzmi koślawo, co warto polskim uchem przepisać.

---

## 1. `index.html`

### 1.1 Title / meta

| Stara                                    | Nowa (`pl.ts:82`)                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| `𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — The Founders' Framework` | `vibecrafted. — Release engine dla oprogramowania generowanego przez AI.` |

**Diff:** stary używał angielskiego pozycjonowania _"The Founders' Framework"_. Nowa wprowadza **"Release engine"** jako klucz. Pierwszy kandydat do polonizacji jeśli "Release engine" ma brzmieć po naszemu (Twoja sygnalizacja).

### 1.2 Hero — wordmark + frameworkTitle + lead + quote

**Stara:**

```
𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.
The Founders' Framework
System konwergencji do budowania i wdrażania oprogramowania z agentami AI.
Framework, który napisał swój własny kod przez 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙.
```

**Nowa (`content/i18n/pl/hero.md`):**

```
frameworkTitle: "Release <Accent>engine</Accent> dla oprogramowania generowanego przez AI"
lead: "Doprowadź repo po agentach do wydania, które obca osoba może zainstalować, zrozumieć i użyć."
quote: "Weź repo po agentach. Odsiej vibe od prawdy i doprowadź je do wydania, któremu można zaufać."
evidence: "Dowody"
quickstart: "Otwórz Szybki Start"
```

**Diff:** zmiana axis. Stara mówi _"system konwergencji do budowania i wdrażania"_ (abstrakt). Nowa mówi _"doprowadź repo po agentach do wydania"_ (konkretny pain point — "vibe coding got you to launch, can't ship"). Konkret > abstrakt, ale **"Release engine"** w polskim heroe nadal po angielsku — koślawy hybryd jeśli go nie zostawisz jako brand-term.

### 1.3 Evidence deck — "to nie magia, to inżynieria"

**Stara — nagłówek + lead:**

```
To nie magia. To rygorystyczna inżynieria.
To słownictwo jest wyraziste, bo zostało wykute pod presją czasu.
Pod spodem stoi konkretny model pracy z kontekstem, redukcją wariancji
i ostateczną prawdą przed wydaniem.
```

**Nowa (`content/i18n/pl/evidence.md`):**

```
titleHtml: "To nie magia<br />To rygorystyczna inżynieria"
lead: "Słownictwo jest żywe, bo powstało pod nocną presją. Pod vibem
kryje się rygorystyczny model operacyjny dla kontekstu, redukcji
wariancji i prawdy o produkcie."
```

**Diff:** stary "wykute pod presją czasu" → nowy "nocną presją" (mocniejsze, scenowsze). Stary "ostateczną prawdą przed wydaniem" → nowy "prawdą o produkcie" (krótsze, bardziej operacyjne). Nowa wersja jest cięższa stylistycznie, ma więcej dyscypliny.

### 1.4 Evidence cards — trzy zasady

| #   | Stara                                                                                                                                                                                                                         | Nowa                                                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01  | **AST-Augmented Context.** LLM-y halucynują, kiedy kodują na ślepo. Dzięki wyprowadzeniu pamięci architektonicznej do map AST-augmented 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. utrzymuje modele frontier precyzyjnie osadzone w Twoim kodzie źródłowym. | **Kontekst wzbogacony AST.** LLM-y halucynują, gdy kodują na ślepo. Dzięki eksternalizacji pamięci architektonicznej w mapy AST, 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. utrzymuje modele dokładnie zorientowane w Twoim codebase.                              |
| 02  | **Konwergencja stochastyczna.** Generowanie kodu jest stochastyczne. Pętla Marbles używa priority-weighted denoising loops, żeby bezlitośnie redukować wariancję i doprowadzić system do stanu gotowego do wdrożenia.         | **Stochastyczna konwergencja.** Generowanie kodu jest stochastyczne. Pętla Marbles wykorzystuje priorytetowane pętle odszumiania, aby nieustannie redukować wariancję, wymuszając stan gotowy do wysyłki.                            |
| 03  | **𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙.** Structured Human-AI Collaborative Engineering. Otaczamy stochastyczne generowanie deterministycznymi checkpointami człowieka. Efekt to system, któremu ufasz i który kontrolujesz.                     | **𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙.** Ustrukturyzowana Inżynieria Współpracy Człowiek-AI. Opakowujemy deterministyczne checkpointy ludzkie wokół stochastycznej generacji. Rezultat to system, który kontrolujesz, któremu ufasz i który rozumiesz. |

**Diff:**

- 01: stara mieszała angielski w polski (_"AST-Augmented Context"_ + _"AST-augmented"_ + _"map AST-augmented"_ nadmiar). Nowa spolszczyła do "Kontekst wzbogacony AST" — ładnie. _"codebase"_ w nowej został angielski (jest OK jako termin techniczny, w środowisku PL programistów funkcjonuje).
- 02: stara _"priority-weighted denoising loops"_ — anglicyzm hardcore. Nowa _"priorytetowane pętle odszumiania"_ — polskie, ale "priorytetowane" trochę kanciaste; _"priorytetowo wagowane"_ / _"pętle odszumiania ważone priorytetem"_ bardziej naturalne. _"gotowy do wysyłki"_ w 02 → _"shipowalny stan"_ / _"stan gotowy do wydania"_ spójniejsze z resztą.
- 03: stara _"Structured Human-AI Collaborative Engineering"_ (oryginał angielski jako tagline). Nowa _"Ustrukturyzowana Inżynieria Współpracy Człowiek-AI"_ — to **bardzo formalna, sztywna fraza**. _"Ludzie–AI"_ dash-free byłoby naturalniej, ALE "ustrukturyzowana inżynieria" brzmi jak tłumaczenie naukowego paper-tytułu. Kandydat do przepisania.

### 1.5 Foundation — "Zależności runtime'u" vs "Fundamenty runtime"

| Element | Stara                                                                                                       | Nowa                                                                                                                  |
| ------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| eyebrow | "Zależności runtime'u"                                                                                      | "Fundamenty runtime"                                                                                                  |
| H2      | "Narzędzia pod maską frameworka."                                                                           | "Infrastruktura pod frameworkiem."                                                                                    |
| sub     | "Warstwa, która zakotwicza agentów frontier w prawdzie repozytorium, zamiast w ich własnych halucynacjach." | "To są fundamenty, a nie skille: wzrok, pamięć, artefakty review i narracyjny dowód z runtime dla warstwy agentowej." |

**Diff:** stara mówi _"zależności"_ i _"narzędzia pod maską"_ — pozycjonuje jako tools. Nowa mówi _"fundamenty"_ i _"infrastruktura"_ — pozycjonuje wyżej, jako warstwę architektoniczną. To podbicie statusu — celowe per recent commits "Foundation" branding. Nowy sub _"wzrok, pamięć, artefakty review i narracyjny dowód z runtime"_ — 4 zmysły, ładne. **Mocniejsze.**

| #               | Stara                                                                                                                                                                           | Nowa                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01 loctree      | "Silnik percepcji. AST-augmented architectural memory. Oczy agentów — zmusza LLM-y, żeby zobaczyły pełną strukturę repo, zanim ruszą choćby jeden plik."                        | "Struktura. Strukturalna inteligencja codebase. Mapuje pliki, zależności, huby i blast radius zanim agent dotknie jakiejkolwiek zmiany."                                              |
| 02 aicx         | "Odzysk historii. Indeksuje decyzje, intencje i wyniki z każdej sesji AI. Agenci odzyskują to, co zostało ustalone i dlaczego, dzięki czemu zachowują ciągłość między sesjami." | "Pamięć. Odzyskiwanie decyzji dla warstwy agentowej. CLI `aicx` / serwer `aicx-mcp` indeksują decyzje, intencje i wyniki, żeby sesje mogły odtworzyć co zostało ustalone i dlaczego." |
| 03 prview       | "Audyt i bramka jakości. Generuje trwałe paczki review PR z findings na poziomie linii. To bramka jakości, która zamienia zrzuty z terminala w realne artefakty."               | "Review. Ustrukturyzowane artefakty review. Zamienia zmiany w kodzie w trwałe findingi, które mogą czytać kolejne agenty i ludzie."                                                   |
| 04 ScreenScribe | "Recenzent wizualny. Zamienia narracyjne screencasty w uporządkowane findings inżynieryjne. Spojrzenie skierowane na prawdziwą powierzchnię produktu."                          | "Runtime. Narracyjny review runtime. Zamienia nagrania ekranu z komentarzem w ustrukturyzowane findingi o realnej powierzchni produktu."                                              |

**Diff:**

- Stara nazywała role po polsku poetycko (_"Silnik percepcji"_, _"Odzysk historii"_, _"Audyt i bramka jakości"_, _"Recenzent wizualny"_). Nowa zwięźlej (_"Struktura"_, _"Pamięć"_, _"Review"_, _"Runtime"_) — mocniejsze gestaltowo, każde słowo waży.
- _"AST-augmented architectural memory"_ (anglo) → _"Strukturalna inteligencja codebase"_ (mieszane, "codebase" jako termin OK).
- Nowa explicitnie nazywa CLI i MCP server dla aicx — to konkret zamiast magii.

### 1.6 Pipeline — "Twórz → Domykaj → Wdrażaj" vs "Twórz → Konwerguj → Wypuść"

**Stara nazwy:** Twórz · Domykaj · Wdrażaj
**Nowa nazwy:** Twórz · Konwerguj · Wypuść

**Diff:** stara _"Domykaj"_ / _"Wdrażaj"_ — bardziej operacyjne, taskowe. Nowa _"Konwerguj"_ / _"Wypuść"_ — mocniejsze, axisowe. _"Wdrażaj"_ dla finalnego release etapu mówi "wdrożenie internal" (jak SaaS deploy). _"Wypuść"_ mówi "publiczne wydanie" — semantyka inna, **nowa lepiej oddaje że to release, nie deploy**.

Karty etapów — body texts:

| Etap              | Stara                                                                                                                   | Nowa                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Twórz             | "Rozrysuj architekturę, zainicjuj kontekst i uruchom workflow ERI. Wymuś na agentach szacunek do AST i historii."       | "Zaplanuj architekturę, zainicjuj kontekst i uruchom workflow ERi. Zmuś agentów do respektowania AST i historii." |
| Domykaj/Konwerguj | "Systematycznie redukuj entropię pętlami Marbles, aż wszystkie problemy P0, P1 i P2 zostaną domknięte."                 | "Systematycznie redukuj entropię przez pętle Marbles, aż wszystkie problemy P0, P1 i P2 zostaną rozwiązane."      |
| Wdrażaj/Wypuść    | "Przeaudytuj powierzchnię produktu przez DoU, dopoleruj przez Decorate i domknij przez Hydrate przed finalnym Release." | "Zaudytuj powierzchnię produktu z DoU, wypoleruj z Decorate i zapakuj z Hydrate przed finalnym Release."          |

**Diff drobny:**

- _"ERI"_ (caps) → _"ERi"_ (lowercase i) — branding decyzja.
- _"Wymuś"_ → _"Zmuś"_ — mocniejsze, troszkę bardziej brutalne.
- _"dopoleruj"_ → _"wypoleruj"_ — naturalniej polskie.
- _"przez Hydrate"_ → _"z Hydrate"_ — bardziej casualnie.

### 1.7 Skills section — "Pakiet skilli / 16 workflow dla założycieli"

Stara wymieniała 16 kart skilli w jednym karuzeli. Wszystkie skille (vc-scaffold/init/workflow/agents/research/partner/justdo/followup/marbles/review/prune/delegate/dou/decorate/hydrate/release).

Nowa: nie wyciągnąłem w tym przebiegu kompletnej skills sekcji z `pl.ts` — najprawdopodobniej żyje w `pl.ts` `sections.skills`. **TODO:** osobny przebieg jeśli chcesz inspekcji skills cards.

### 1.8 Marbles section

**Stara:** nie miała osobnej sekcji marbles (była tylko w pipeline opis).

**Nowa (`marbles.md`):**

```
label: "Marbles"
title: "Odszumiaj aż koło się zapełni"
sub: "Agenci AI to stochastyczne papugi. Każda generacja wprowadza szum.
     Nie da się tego obejść promptem. Iterujesz."
heading: "Izomorfizm"
formulas:
  - "Dyfuzja obrazu: szum → odszumienie × N → obraz"
  - "Dyfuzja kodu:  chaos → redukcja_entropii × N → produkt"
steps: Krok 0–N (Czysty szum → Init → Implementacja → DoU < próg = DoD)
note: "Nie ma ustalonej liczby pętli. Pętla działa aż P0=P1=P2=0 i koło
       się wypełni."
portal: card prowadzący do /pl/framework/ playgroundu
```

**Diff:** to **nowa zawartość**, nie istniała w starym single-pagerze. _"Agenci AI to stochastyczne papugi"_ — sharp tagline, dobrze brzmi po polsku. _"Odszumiaj aż koło się zapełni"_ — odważne, krótkie.

### 1.9 DoU section

**Stara:** brak osobnej sekcji DoU.

**Nowa (`dou.md`):**

```
title: "Definicja niezrobionego"
quote: "Agenci AI rozwiązali najtrudniejszą część tworzenia oprogramowania:
       sprawienie, żeby rzecz działała. Nie rozwiązali jeszcze drugiej
       najtrudniejszej: sprawienie, żeby była osiągalna."
lead: "Problem rzadko dotyczy jakości kodu. To brutalna przestrzeń
      między działającym systemem a produktem, który obcy mogą odkryć,
      zainstalować, któremu zaufają i za który zapłacą."
diagnosticLabel: "Diagnostyka założyciela:"
checklist:
  ✅ Testy przechodzą
  ✅ Architektura jest solidna
  ✅ README istnieje
  ❌ Nikt nie znajdzie tego w Google
  ❌ Nikt nie zainstaluje bez toolchaina
  ❌ Nikt nie może za to zapłacić
summary: "Punkty 4–6 to Definicja Niezrobionego. Faza 3 wymusza wejście
         systemu na rynek."
```

**Diff:** nowy materiał. Bardzo mocna sekcja — checklist z trzema ✅ i trzema ❌ to ostry visual punch. _"sprawienie, żeby była osiągalna"_ — to dobre tłumaczenie _"making it reachable"_.

### 1.10 Get / install section

| Element            | Stara                                                                                            | Nowa                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| eyebrow/title      | (brak osobnej sekcji w starej; był tylko sticky bar z curl bash command i big "Instalacja" link) | "Pobierz 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍." / "Zainstaluj release engine. Uruchom workflow."                  |
| sub                | —                                                                                                | "Zainstaluj panel kontrolny i wejdź w pierwszy workflow prowadzący do realnego release." |
| installWizardLabel | —                                                                                                | "Otwórz prowadzony instalator"                                                           |
| Krok 01            | —                                                                                                | "Zainstaluj panel kontrolny"                                                             |
| Krok 02            | —                                                                                                | "Wejdź przez command deck"                                                               |
| Krok 03            | —                                                                                                | "Napędzaj prawdziwą pracę"                                                               |
| Krok 04            | —                                                                                                | "Konwerguj aż przestanie kłamać"                                                         |

**Diff:** sekcja install dostała pełen zestaw kart. Krok 04 tagline _"Konwerguj aż przestanie kłamać"_ — bardzo mocne, w duchu kroniki "kod kłamie / convergence". Trzymaj.

---

## 2. `framework.html`

**Stara:** placeholder. Cała widoczna treść:

```
𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — Demo | The Founders' Framework
Przejdź framework krok po kroku i zobacz, jak to działa w praktyce.
```

Pusta strona, tytuł "Demo".

**Nowa (`/pl/framework/`):** to jest **playground page** — interaktywna tablica konwergencji marbles. Title w mdx pages frontmatter: _"Framework Playground | Release Engine for AI-Built Software"_ (PL meta nadal anglo, l.2 `framework.mdx`). Komponentowo: hero playground + section framework + … (do uzupełnienia jeśli chcesz dłuższy raport).

**Diff:** ze stałej "Demo" strony zrobił się playground. **Major upgrade**, ale title PL nadal po angielsku.

---

## 3. `faq.html`

### 3.1 Hero + lead + quote

**Stara:**

```
FAQ
Pytania, które padają na początku.
Tutaj wyjaśniamy, jak działa 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — bez zmuszania Cię do
przekopywania repo, konfiguracji shella czy licencji.
Framework, który stworzył sam siebie.
```

**Nowa (`faqHero.md`):**

```
label: "FAQ"
title: "Pytania, które padają na początku"
lead: "Tutaj wyjaśniamy, jak działa 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — bez zmuszania Cię
      do przekopywania repo, konfiguracji shella czy licencji."
quote: "Installer, docs i command deck muszą obiecywać dokładnie to samo."
primaryLabel: "Szybki start"
secondaryLabel: "Wróć do przeglądu"
```

**Diff:** stara mówiła _"Framework, który stworzył sam siebie"_ — claim brand-grade. Nowa _"Installer, docs i command deck muszą obiecywać dokładnie to samo"_ — claim techniczny, o spójności surface'u. **Inny ton.** Stary brand-y, nowy operacyjny. To shift jednoznaczny — w stronę "no hype, ground truth".

### 3.2 FAQ items

Stary FAQ miał ~13 pytań w grupach: Instalacja (4), Skille/agenci (4), Praca z frameworkiem (3), Licencja (3). Łącznie 14.

Nowy FAQ (`faqContent.md`) ma 16 pytań w 4 grupach:

- **Instalacja (4):** te same 4 pytania (bez zmian semantycznych)
- **Skille/agenci/zależności (5):** +1 pytanie nowe — _"Jak przepchnąć `screenscribe review` przez wczesną walidację modeli?"_ (granular, runtime)
- **Praca z frameworkiem (3):** te same 3
- **Licencja (3):** te same 3

Drobne zmiany w odpowiedziach:

- Pytanie _"Co dokładnie sprawdza `vibecrafted doctor`?"_ — stara mówi _"opcjonalne zależności takie jak loctree, aicx i prview"_. Nowa: _"wymagane fundamenty (loctree-mcp i aicx-mcp), narzędzia dowodowe takie jak prview i ScreenScribe"_. Promote z opcjonalnego do wymaganego — **to ważna zmiana semantyki**.
- Pytanie _"Czy mogę używać 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez loctree albo aicx?"_ z starej → nowe brzmienie _"Czy loctree i aicx są wymagane?"_ z odpowiedzią _"Nie uczciwie. (...) Jeśli któregoś brakuje, najpierw napraw warstwę fundamentów."_ — **mocniejsze, "nie uczciwie" to konkret postawy**.

**Diff:** FAQ urósł z 14 do 16 pytań, dwa kluczowe shifts: loctree/aicx z opcjonalnych → fundamenty, plus dodano screenscribe review gate (granular runtime contract).

---

## 4. `quickstart.html`

### 4.1 Hero

**Stara:**

```
Szybki start
Od zera do pierwszej pętli 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.
Zainstaluj framework, sprawdź środowisko i uruchom pierwszy workflow
w realnym repozytorium. Chodzi o szybki sygnał, nie o długie ustawianie
środowiska.
Framework, który stworzył sam siebie.
```

**Nowa (`quickstartHero.md`):**

```
label: "Szybki start"
title: "Od zera do pierwszej pętli 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍"
lead: "Zainstaluj framework, sprawdź środowisko i uruchom pierwszy
      workflow w realnym repozytorium. Chodzi o szybki sygnał, nie
      o długie ustawianie środowiska."
quote: "Od repo po agentach do wydania, które ktoś obcy może zainstalować."
```

**Diff:** lead identyczny (1:1). Quote się zmieniła:

- Stara: _"Framework, który stworzył sam siebie."_
- Nowa: _"Od repo po agentach do wydania, które ktoś obcy może zainstalować."_

Ten sam shift co w FAQ hero: brand-grade → operacyjny, ground-truth, "obca osoba" jako miernik.

### 4.2 6 kroków

| Krok | Stary tytuł / komenda                                                                       | Nowy tytuł / komenda                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | "Zainstaluj 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. lokalnie" / `curl -fsSL https://vibecrafted.io/install.sh \| bash` | identyczny + dopisek _"Bezpośredniej ścieżki `\| bash` używaj tylko wtedy, gdy celowo wybierasz compact automation zamiast guided kickoffu."_     |
| 2    | "Sprawdź, czy wszystko jest gotowe" / `vibecrafted doctor`                                  | identyczny                                                                                                                                        |
| 3    | "Wejdź w realne repo" / `cd $VIBECRAFTED_ROOT/twoj-projekt; vc-init claude`                 | identyczny tytuł, komenda zmieniona: `vibecrafted init claude` (drop `vc-init`, use `vibecrafted init`)                                           |
| 4    | "Uruchom pierwsze realne zadanie" / `vc-justdo codex "..."` / `vc-workflow claude "..."`    | identyczny tytuł, komendy: `vibecrafted justdo codex --prompt "..."` / `vibecrafted workflow claude --prompt "..."`                               |
| 5    | "Uruchom flotę..." / 3× `vibecrafted ... implement`                                         | identyczny                                                                                                                                        |
| 6    | "Domknij pętlę..." / `vc-dou claude; vc-hydrate codex; vc-release codex`                    | identyczny tytuł, komendy: `vibecrafted dou claude --prompt "..."; decorate; hydrate; release` — **dodany decorate**, **dodane `--prompt`** flags |

**Diff:** kroki 3, 4, 6 mają **przesunięte CLI surface**. Stare `vc-*` shortcut'y są częściowo zastąpione przez `vibecrafted <verb>` long-form. **To rzeczywista zmiana kontraktu CLI** — operatorów ze starą dokumentacją trzeba ostrzec.

### 4.3 Resources

| Stara                                                                    | Nowa                                                                                         |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| "Opcjonalnie, ale bardzo przydatne: loctree, aicx, prview, ScreenScribe" | "Wymagane fundamenty: loctree i aicx" + "Zalecane narzędzia dowodowe: prview i ScreenScribe" |

**Diff:** ten sam shift co w FAQ doctor. loctree/aicx promote do "wymagane fundamenty", prview/ScreenScribe stays "zalecane dowodowe". **Konsystentnie z reality (loctree+aicx jako fundament w doctor check, prview/ScreenScribe jako tooling)**.

---

## Tematy do polerowania (priorytety mojego ucha)

1. **"Release engine dla oprogramowania generowanego przez AI"** — anglicyzm wbity w polski hero/title/eyebrow. To główny koślawy element copy. Albo full polonize (Silnik wydań / Manufaktura wydań / Pipeline wydań), albo zostawić jako brand-term i resztę PL copy zaprojektować wokół niego.
2. **"Ustrukturyzowana Inżynieria Współpracy Człowiek-AI"** (evidence card 03) — naukowo-paper'owe, kanciaste. Kandydat do przepisania na konwersacyjne polskie zdanie.
3. **"Priorytetowane pętle odszumiania"** (evidence card 02) — "priorytetowane" nie istnieje naturalnie w polskim. _"Pętle odszumiania ważone priorytetem"_ / _"odszumianie z priorytetem"_.
4. **Framework page meta title** w `framework.mdx:2` nadal po angielsku (_"Framework Playground | Release Engine for AI-Built Software"_).
5. **"Zaaudytuj"** (pipeline-card "Wypuść") — naturalniejszy polski wariant: _"Przeaudytuj"_ (jak w starej) albo _"Zrób audyt"_.
6. **"Wypoleruj z Decorate i zapakuj z Hydrate"** — czytelne, ale można rozważyć _"przez"_ zamiast _"z"_ jeśli reszta dokumentu używa narzędzia-jako-instrumentu (_"przez Decorate"_).

## Co stare miało lepiej

- Stara _"Wdrażaj"_ przez chwilę myliło z "deploy", ale brzmiało zadaniowo. Nowa _"Wypuść"_ jest semantycznie poprawniejsza dla release.
- Stara karta foundation **loctree: "Silnik percepcji"** miała poetycki ładunek. Nowa "Struktura" jest sucha, ale to jest też świadomy choice ("4 zmysły" framing).

## Co nowe ma jednoznacznie lepiej

- Hero positioning _"repo po agentach → wydanie któremu można zaufać"_ > stara _"system konwergencji"_.
- Cała sekcja **DoU manifest** (nowy materiał) — checklist 3✅/3❌ to natychmiastowy chwyt.
- Marbles section z izomorfizmem dyfuzja-obraz / dyfuzja-kod.
- FAQ shift loctree+aicx z "opcjonalne" → "fundamenty" — uczciwiej i bliżej runtime truth.
- Quote replacement _"Framework, który stworzył sam siebie"_ → _"Installer, docs i command deck muszą obiecywać dokładnie to samo"_ / _"Od repo po agentach do wydania, które ktoś obcy może zainstalować"_ — przesunięcie z brand-y na ground-truth. Spójne z całą doktryną _"perception over memory, ground truth"_.
