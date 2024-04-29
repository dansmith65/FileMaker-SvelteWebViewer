<script lang="ts">
	import { onMount } from "svelte";
	import { mockGoferScript } from "fm-mock";
	import FMGofer from "fm-gofer";
	import svelteLogo from "./assets/svelte.svg";
	import viteLogo from "./assets/vite.svg";
	import Counter from "./lib/Counter.svelte";
	import context from "./lib/context.js";

	let loading = true;
	let fmData = "";

	if (import.meta.env.DEV) {
		mockGoferScript(context.scriptName, {
			resultFromFM:
				'This text could come from a FileMakser script, but fm-mock lets you develop FileMaker webviewer apps in the browser; even if they call FileMaker scripts! So this text is a "mock" of an actual scripts response. Note that the slow "loading" time is also defined by the mocked script result, which allows you to replicate real-life scenarios where a script might take some time to return a result.',
			logParams: true,
			delay: 3000,
		});
	}

	onMount(async () => {
		const res = await FMGofer.PerformScript(
			context.scriptName,
			{
				context,
				app: {
					version: import.meta.env.PACKAGE_VERSION,
					name: import.meta.env.PACKAGE_NAME,
				},
				route: "onload",
			},
		).catch((error) => {
			console.error(error);
		});
		loading = false;
		if (import.meta.env.DEV) {
			console.log("FileMaker script response:", res);
		}
		fmData = res;
	});
</script>

<main>
	<div>
		<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
			<img src={viteLogo} class="logo" alt="Vite Logo" />
		</a>

		<a href="https://svelte.dev" target="_blank" rel="noreferrer">
			<img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
		</a>
	</div>
	<h1>FileMaker + Vite + Svelte + TS</h1>

	<div class="card">
		<Counter />
	</div>

	{#if loading}
		<p>loading...</p>
	{:else if fmData}
		<p class="fmData">{fmData}</p>
	{:else}
		<p>
			TODO: FM failed to respond to wv before timeout. Add a component to use in
			this case.
		</p>
	{/if}
</main>

<style>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.fmData {
		border-radius: 4px;
		border: 1px solid #cfcfcf;
		padding: 0.6em 1.2em;
		background-color: #f9f9f9;
		font-family: monospace;
	}
</style>
