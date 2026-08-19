<script lang="ts">
  type FieldLabels = {
    name: string;
    email: string;
    company: string;
    teamSize: string;
    githubOrg: string;
    seatsEstimate: string;
    buyingMoment: string;
    notes: string;
    required: string;
  };

  type Placeholders = {
    name: string;
    email: string;
    company: string;
    teamSize: string;
    githubOrg: string;
    seatsEstimate: string;
    notes: string;
    buyingMoment: string;
  };

  type Errors = {
    name: string;
    email: string;
    company: string;
    teamSize: string;
    seatsEstimate: string;
    buyingMoment: string;
  };

  type Moment = { value: string; label: string };
  type NextStep = { title: string; body: string };

  interface Props {
    fields: FieldLabels;
    placeholders: Placeholders;
    moments: Moment[];
    errors: Errors;
    submit: string;
    submitPay: string;
    localNote: string;
    stripeNote: string;
    noStripeNote: string;
    successTitle: string;
    successStripe: string;
    successStripeBlocked: string;
    successLocal: string;
    nextLabel: string;
    next: NextStep[];
    stripePaymentLink?: string;
  }

  let {
    fields,
    placeholders,
    moments,
    errors: errorCopy,
    submit,
    submitPay,
    localNote,
    stripeNote,
    noStripeNote,
    successTitle,
    successStripe,
    successStripeBlocked,
    successLocal,
    nextLabel,
    next,
    stripePaymentLink = '',
  }: Props = $props();

  let name = $state('');
  let email = $state('');
  let company = $state('');
  let teamSize = $state('');
  let githubOrg = $state('');
  let seatsEstimate = $state('');
  let buyingMoment = $state('');
  let notes = $state('');
  let fieldErrors = $state<Record<string, string>>({});
  let done = $state(false);
  let stripeOpened = $state(false);

  const hasStripe = $derived(Boolean(stripePaymentLink && stripePaymentLink.startsWith('http')));
  const ctaLabel = $derived(hasStripe ? submitPay : submit);

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = errorCopy.name;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = errorCopy.email;
    if (!company.trim()) nextErrors.company = errorCopy.company;
    if (!teamSize.trim()) nextErrors.teamSize = errorCopy.teamSize;
    if (!seatsEstimate.trim()) nextErrors.seatsEstimate = errorCopy.seatsEstimate;
    if (!buyingMoment) nextErrors.buyingMoment = errorCopy.buyingMoment;
    fieldErrors = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(event: Event) {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      teamSize: teamSize.trim(),
      githubOrg: githubOrg.trim(),
      seatsEstimate: seatsEstimate.trim(),
      buyingMoment,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      source: 'vibecrafted-io-pilot',
    };

    try {
      const key = 'vc.pilot.leads';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      const list = Array.isArray(prev) ? prev : [];
      list.push(payload);
      localStorage.setItem(key, JSON.stringify(list.slice(-50)));
    } catch {
      // ignore storage failures
    }

    if (hasStripe) {
      const win = window.open(stripePaymentLink, '_blank', 'noopener,noreferrer');
      stripeOpened = Boolean(win);
    }

    done = true;
  }
</script>

{#if done}
  <div class="pf-success" role="status">
    <h3 class="pf-success__title">{successTitle}</h3>
    <p class="pf-success__body">
      {#if hasStripe}
        {stripeOpened ? successStripe : successStripeBlocked}
      {:else}
        {successLocal}
      {/if}
    </p>
    <div class="pf-next">
      <span class="pf-kicker">{nextLabel}</span>
      <ol class="pf-next__list">
        {#each next as step}
          <li>
            <strong>{step.title}</strong>
            <p>{step.body}</p>
          </li>
        {/each}
      </ol>
    </div>
  </div>
{:else}
  <form class="pf" onsubmit={onSubmit} novalidate>
    <div class="pf-grid">
      <label class="pf-field">
        <span class="pf-label">{fields.name} <em>· {fields.required}</em></span>
        <input class="pf-input" type="text" bind:value={name} placeholder={placeholders.name} autocomplete="name" />
        {#if fieldErrors.name}<span class="pf-error">{fieldErrors.name}</span>{/if}
      </label>
      <label class="pf-field">
        <span class="pf-label">{fields.email} <em>· {fields.required}</em></span>
        <input class="pf-input" type="email" bind:value={email} placeholder={placeholders.email} autocomplete="email" />
        {#if fieldErrors.email}<span class="pf-error">{fieldErrors.email}</span>{/if}
      </label>
      <label class="pf-field">
        <span class="pf-label">{fields.company} <em>· {fields.required}</em></span>
        <input class="pf-input" type="text" bind:value={company} placeholder={placeholders.company} autocomplete="organization" />
        {#if fieldErrors.company}<span class="pf-error">{fieldErrors.company}</span>{/if}
      </label>
      <label class="pf-field">
        <span class="pf-label">{fields.teamSize} <em>· {fields.required}</em></span>
        <input class="pf-input" type="text" bind:value={teamSize} placeholder={placeholders.teamSize} />
        {#if fieldErrors.teamSize}<span class="pf-error">{fieldErrors.teamSize}</span>{/if}
      </label>
      <label class="pf-field">
        <span class="pf-label">{fields.githubOrg}</span>
        <input class="pf-input" type="text" bind:value={githubOrg} placeholder={placeholders.githubOrg} />
      </label>
      <label class="pf-field">
        <span class="pf-label">{fields.seatsEstimate} <em>· {fields.required}</em></span>
        <input class="pf-input" type="text" bind:value={seatsEstimate} placeholder={placeholders.seatsEstimate} inputmode="numeric" />
        {#if fieldErrors.seatsEstimate}<span class="pf-error">{fieldErrors.seatsEstimate}</span>{/if}
      </label>
      <label class="pf-field pf-field--full">
        <span class="pf-label">{fields.buyingMoment} <em>· {fields.required}</em></span>
        <select class="pf-input" bind:value={buyingMoment}>
          <option value="">{placeholders.buyingMoment}</option>
          {#each moments as moment}
            <option value={moment.value}>{moment.label}</option>
          {/each}
        </select>
        {#if fieldErrors.buyingMoment}<span class="pf-error">{fieldErrors.buyingMoment}</span>{/if}
      </label>
      <label class="pf-field pf-field--full">
        <span class="pf-label">{fields.notes}</span>
        <textarea class="pf-input pf-textarea" rows="5" bind:value={notes} placeholder={placeholders.notes}></textarea>
      </label>
    </div>

    <div class="pf-actions">
      <button class="pf-submit" type="submit">{ctaLabel}</button>
      <p class="pf-note">{hasStripe ? stripeNote : noStripeNote} {localNote}</p>
    </div>
  </form>
{/if}

<style>
  .pf,
  .pf-success {
    width: 100%;
  }

  .pf-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .pf-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .pf-field--full {
    grid-column: 1 / -1;
  }

  .pf-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .pf-label em {
    font-style: normal;
    color: var(--accent);
  }

  .pf-input,
  .pf-textarea {
    width: 100%;
    min-height: 44px;
    padding: 0.7rem 0.85rem;
    border: 1px solid rgba(var(--v2-paper-rgb), 0.18);
    border-radius: 2px;
    background: rgba(var(--v2-paper-rgb), 0.04);
    color: var(--fg-on-dark);
    font: inherit;
    font-size: 0.95rem;
  }

  .pf-textarea {
    min-height: 8rem;
    resize: vertical;
    line-height: 1.5;
  }

  .pf-input:focus,
  .pf-textarea:focus {
    outline: none;
    border-color: rgba(var(--v2-accent-rgb), 0.65);
  }

  .pf-error {
    font-size: 0.8rem;
    color: var(--accent-red, #c0392b);
  }

  .pf-actions {
    margin-top: 1.25rem;
    display: grid;
    gap: 0.75rem;
  }

  .pf-submit {
    min-height: 48px;
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--accent);
    background: rgba(var(--v2-accent-rgb), 0.18);
    color: var(--fg-on-dark);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .pf-submit:hover,
  .pf-submit:focus-visible {
    background: rgba(var(--v2-accent-rgb), 0.3);
  }

  .pf-note {
    margin: 0;
    color: var(--fg-on-dark-mute);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .pf-success__title {
    margin: 0 0 0.6rem;
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 1.8rem;
    color: var(--fg-on-dark);
  }

  .pf-success__body {
    margin: 0 0 1.4rem;
    color: var(--fg-on-dark-dim);
    line-height: 1.5;
  }

  .pf-kicker {
    display: block;
    margin-bottom: 0.7rem;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-on-dark-mute);
  }

  .pf-next__list {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.8rem;
    color: var(--fg-on-dark-dim);
  }

  .pf-next__list strong {
    color: var(--fg-on-dark);
  }

  .pf-next__list p {
    margin: 0.25rem 0 0;
    line-height: 1.45;
  }

  @media (max-width: 720px) {
    .pf-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
