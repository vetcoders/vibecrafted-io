---
title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Quick Start | VetCoders"
description: "Install the Vibecrafted framework, verify the control plane, and run your first convergence loop in under five minutes."
---
<div class="docs-shell">
            <section class="docs-hero fade-up">
                <div class="section-label">Quick Start</div>
                <h1 class="manifesto-title">From zero to your first𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. loop.</h1>
                <p class="manifesto-lead"> Install the framework, verify the control plane, then run a real workflow inside a live repository. The goal is first signal fast, not endless setup. </p>
                <p class="manifesto-quote"> Created by itself through the 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙. </p>
                <div class="manifesto-actions">
                    <a class="btn-solid" href="/">Back to Overview</a>
                    <a class="btn-outline" href="https://github.com/VetCoders/vibecrafted">View on GitHub</a>
                </div>
            </section>
            <section class="fade-up">
                <div class="docs-grid docs-grid--steps">
                    <article class="docs-card">
                        <p class="docs-kicker">Step 1</p>
                        <h3>Install the framework</h3>
                        <p>Use the public bootstrap path. It stages a local snapshot under <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code> and runs the orchestrator from that local copy. </p>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>curl -fsSL https://vibecrafted.io/install.sh | bash</code></pre>
                        </div>
                        <p class="docs-note">Open a new terminal when the install finishes, or source the installed helper file directly in your current shell.</p>
                    </article>
                    <article class="docs-card">
                        <p class="docs-kicker">Step 2</p>
                        <h3>Run the doctor</h3>
                        <p>Check the staged control plane, shell helpers, and optional foundations before you blame the workflow.</p>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>vibecrafted doctor</code></pre>
                        </div>
                        <p class="docs-note">If something is yellow, the doctor tells you what is missing instead of leaving you to guess.</p>
                    </article>
                    <article class="docs-card">
                        <p class="docs-kicker">Step 3</p>
                        <h3>Bootstrap context inside a real repo</h3>
                        <p>Move into the project you actually care about, then give the agent the prompt that forces context gathering before edits.</p>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>cd $VIBECRAFTED_ROOT/your-project
vibecrafted init claude</code></pre>
                        </div>
                        <p class="docs-note"><code>vibecrafted init</code> is the main front door. It reads history, maps structure, and runs quality gates before implementation starts.</p>
                    </article>
                    <article class="docs-card">
                        <p class="docs-kicker">Step 4</p>
                        <h3>Hand over a real task</h3>
                        <p>Once the context is anchored, run the full delivery path or a narrower workflow depending on how much control you want.</p>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>vibecrafted justdo codex --prompt "Add user authentication with JWT"</code></pre>
                        </div>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>vibecrafted workflow claude --prompt "Plan and implement auth module"</code></pre>
                        </div>
                        <p class="docs-note">Use <code>vibecrafted justdo</code> for end-to-end ownership. Use <code>vibecrafted workflow</code> when you want explicit Examine -> Research -> Implement structure. </p>
                    </article>
                    <article class="docs-card">
                        <p class="docs-kicker">Step 5</p>
                        <h3>Spawn the fleet when one model is not enough</h3>
                        <p>External agent helpers are there for parallel fieldwork and durable artifacts, not for theatre.</p>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>vibecrafted codex implement .vibecrafted/plans/my-plan.md
vibecrafted claude research .vibecrafted/plans/my-plan.md
vibecrafted gemini implement .vibecrafted/plans/my-plan.md</code></pre>
                        </div>
                    </article>
                    <article class="docs-card">
                        <p class="docs-kicker">Step 6</p>
                        <h3>Close the loop before you call it done</h3>
                        <p>Shipping in𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. means code quality, product-surface truth, and packaging truth.</p>
                        <div class="code-block">
                            <button class="copy-btn" type="button">Copy</button>
                            <pre><code>vibecrafted dou claude --prompt "Audit launch readiness"
vibecrafted hydrate codex --prompt "Package the product"
vibecrafted release codex --prompt "Prepare release steps"</code></pre>
                        </div>
                        <p class="docs-note">The framework is complete when a stranger can discover, understand, install, and trust the thing, not when your tests stop yelling.</p>
                    </article>
                </div>
            </section>
            <section class="fade-up">
                <div class="docs-columns">
                    <article class="resource-card">
                        <p class="resource-kicker">What you need</p>
                        <h3>Minimal prerequisites</h3>
                        <ul class="resource-list">
                            <li>macOS or Linux</li>
                            <li>Git, Python 3.10+, and <code>make</code></li>
                            <li>One or more agent CLIs: Codex, Claude, or Gemini</li>
                            <li>Optional but high-value foundations: loctree, aicx, prview, ScreenScribe</li>
                        </ul>
                    </article>
                    <article class="resource-card">
                        <p class="resource-kicker">What you get</p>
                        <h3>Operational surfaces after install</h3>
                        <ul class="resource-list">
                            <li>A central skill store under <code>$VIBECRAFTED_ROOT/.vibecrafted/skills/</code></li>
                            <li>Artifacts grouped by repo and date under <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code> </li>
                            <li>Shell helpers for spawning, observing, marbles, DoU, hydrate, and release</li>
                            <li>A staging-friendly control plane under <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code> </li>
                        </ul>
                    </article>
                </div>
                <div class="docs-inline-links">
                    <a href="/presence/faq/">Answered FAQ</a>
                    <a href="https://github.com/VetCoders/vibecrafted/blob/main/docs/FOUNDATION.md">Foundation Stack</a>
                    <a href="https://github.com/VetCoders/vibecrafted/blob/main/docs/QUICK_START.md">Markdown
                        Version</a>
                </div>
            </section>
        </div>