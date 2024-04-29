import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { readFileSync } from "fs";

/* Read package.json because process.env.npm_package_version is outdated due to the increment-build script. */
let file = process.env.npm_package_json;
if (!file) {
	file = "./package.json";
}
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		viteSingleFile(),
		createHtmlPlugin({
			minify: false, // TODO: maybe I don't want this afterall?
		}),
	],
	define: {
		"import.meta.env.PACKAGE_VERSION": JSON.stringify(pkg.version),
		"import.meta.env.PACKAGE_NAME": JSON.stringify(pkg.name),
	},
});
