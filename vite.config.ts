import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		viteSingleFile(),
		createHtmlPlugin({
			minify: {
				collapseWhitespace: true,
				removeComments: false,
			},
		}),
	],
	define: {
		"import.meta.env.PACKAGE_VERSION": JSON.stringify(pkg.version),
		"import.meta.env.PACKAGE_NAME": JSON.stringify(pkg.name),
		"import.meta.env.PACKAGE_REPOSITORY": JSON.stringify(pkg.repository),
	},
});
