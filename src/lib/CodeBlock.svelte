<script lang="ts">
	// A labelled block of shell commands (or plain file content) with a copy button.
	// Styles are the global .code primitives in site.css.
	export interface CodeLine {
		cmd: string;
		note?: string;
	}

	let {
		label,
		lines,
		plain = false,
		oncopy,
		class: klass = ''
	}: {
		label: string;
		lines: Array<string | CodeLine>;
		/** File content rather than commands: no `$` prompt. */
		plain?: boolean;
		oncopy?: () => void;
		class?: string;
	} = $props();

	const rows = $derived(lines.map((l) => (typeof l === 'string' ? { cmd: l } : l)));

	let copied = $state(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(rows.map((r) => r.cmd).join('\n'));
			oncopy?.();
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div class={['code', klass]}>
	<div class="code-top">
		<span>{label}</span>
		<button type="button" onclick={copy}>{copied ? 'copied ✓' : 'copy'}</button>
	</div>
	<div class="code-body">
		{#each rows as r (r.cmd)}
			<span class={['ln', !plain && 'cmd']}
				>{r.cmd}{#if r.note}<span class="note">{'  # ' + r.note}</span>{/if}</span
			>
		{/each}
	</div>
</div>
