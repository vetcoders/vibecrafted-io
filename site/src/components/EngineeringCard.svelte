<script lang="ts">
  interface Props {
    num: string;
    title: string;
    body: string;
    detailsLabel: string;
    bullets: string[];
    accent?: 'default' | 'rust' | 'teal';
  }

  let { num, title, body, detailsLabel, bullets, accent = 'default' }: Props = $props();

  let open = $state(false);

  function toggle() {
    open = !open;
  }
</script>

<article class={['engcard', `engcard--${accent}`, open && 'engcard--open']}>
  <button
    type="button"
    class="engcard__head"
    aria-expanded={open}
    aria-controls={`engcard-body-${num}`}
    onclick={toggle}
  >
    <span class="engcard__num">{num}</span>
    <h3 class="engcard__title">{title}</h3>
    <span class="engcard__icon" aria-hidden="true">{open ? '−' : '+'}</span>
  </button>

  <div class="engcard__body">
    <p class="engcard__lead">{body}</p>

    <div
      class="engcard__details"
      id={`engcard-body-${num}`}
      class:engcard__details--open={open}
      aria-hidden={!open}
    >
      <span class="engcard__details-label">{detailsLabel}</span>
      <ul class="engcard__bullets">
        {#each bullets as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>
    </div>
  </div>
</article>

<style>
  .engcard {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--rule-dark);
    border-radius: 2px;
    padding: 0;
    background: rgba(14, 14, 12, 0.4);
    transition: border-color 0.18s ease, background 0.18s ease;
  }

  .engcard:hover {
    border-color: var(--rule-dark);
    background: rgba(14, 14, 12, 0.6);
  }

  .engcard--open {
    border-color: var(--accent);
    background: rgba(14, 14, 12, 0.7);
  }

  .engcard--rust.engcard--open { border-color: var(--accent); }
  .engcard--teal.engcard--open { border-color: var(--accent-2); }

  /* ── Head (clickable button) ─────────────────────────────── */

  .engcard__head {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    gap: 14px;
    padding: 22px 22px 14px;
    background: transparent;
    border: 0;
    text-align: left;
    cursor: pointer;
    color: inherit;
    width: 100%;
    transition: color 0.15s ease;
  }

  .engcard__head:hover {
    color: var(--fg-on-dark);
  }

  .engcard__num {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
    transition: color 0.15s ease;
  }

  .engcard--open .engcard__num { color: var(--accent); }
  .engcard--teal.engcard--open .engcard__num { color: var(--accent-2); }

  .engcard__title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(20px, 1.8vw, 24px);
    line-height: 1.25;
    letter-spacing: -0.015em;
    color: var(--fg-on-dark);
    margin: 0;
  }

  .engcard__icon {
    font-family: var(--font-mono);
    font-size: 16px;
    line-height: 1;
    color: var(--fg-on-dark-mute);
    transition: color 0.18s ease, transform 0.18s ease;
    align-self: center;
    width: 18px;
    text-align: center;
  }

  .engcard--open .engcard__icon {
    color: var(--accent);
  }
  .engcard--teal.engcard--open .engcard__icon {
    color: var(--accent-2);
  }

  /* ── Body (always-visible lead + collapsed details) ──────── */

  .engcard__body {
    padding: 0 22px 22px;
  }

  .engcard__lead {
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
    margin: 0;
  }

  .engcard__details {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.32s ease, opacity 0.18s ease, margin-top 0.18s ease;
    margin-top: 0;
  }

  .engcard__details--open {
    max-height: 800px;
    opacity: 1;
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid var(--rule-dark-soft);
  }

  .engcard__details-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .engcard--teal .engcard__details-label { color: var(--accent-2); }

  .engcard__bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .engcard__bullets li {
    position: relative;
    padding-left: 18px;
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1.55;
    color: var(--fg-on-dark-dim);
  }

  .engcard__bullets li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--fg-on-dark-mute);
  }

  .engcard--open .engcard__bullets li::before {
    background: var(--accent);
  }
  .engcard--teal.engcard--open .engcard__bullets li::before {
    background: var(--accent-2);
  }

  @media (prefers-reduced-motion: reduce) {
    .engcard,
    .engcard__head,
    .engcard__num,
    .engcard__icon,
    .engcard__details {
      transition: none;
    }
  }
</style>
