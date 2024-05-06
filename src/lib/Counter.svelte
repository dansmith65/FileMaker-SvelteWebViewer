<script lang="ts">
	import FMGofer from "fm-gofer";
	import context from "./context.js";

	let count: number = 0;

	const increment = () => {
		count += 1;
		return FMGofer.PerformScript(
			context.scriptName,
			{
				route: "incremented",
				context,
				count,
			},
			10000,
		);
	};
</script>

<button on:click={increment}>
	count is {count}
</button>
