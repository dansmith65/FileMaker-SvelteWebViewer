<script lang="ts">
	import { mockGoferScript } from "fm-mock";
	import FMGofer from "fm-gofer";
	import svelteLogo from "./assets/svelte.svg";
	import viteLogo from "./assets/vite.svg";
	import Counter from "./lib/Counter.svelte";
	import context from "./lib/context.js";

	if (import.meta.env.DEV) {
		mockGoferScript(context.scriptName, {
			resultFromFM:
				'This text could come from a FileMakser script, but fm-mock lets you develop FileMaker webviewer apps in the browser; even if they call FileMaker scripts! So this text is a "mock" of an actual scripts response. Note that the slow "loading" time is also defined by the mocked script result, which allows you to replicate real-life scenarios where a script might take some time to return a result.',
			logParams: true,
			delay: 1000,
		});
	}

	async function getData(): Promise<string> {
		return FMGofer.PerformScript(
			context.scriptName,
			{
				route: "onload",
				context,
				app: {
					version: import.meta.env.PACKAGE_VERSION,
					name: import.meta.env.PACKAGE_NAME,
				},
			},
			10000,
		).then((res) => {
			if (!res) {
				throw new Error("FileMaker script didn't provide a valid response.");
			}
			// NOTE: you can pars the response as json here, if needed:
			return res;
		});
	}
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

	{#await getData()}
		<p>loading...</p>
	{:then fmData}
		<p class="fmData">{fmData}</p>
	{:catch error}
		<p>Error: {error}</p>
	{/await}
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
