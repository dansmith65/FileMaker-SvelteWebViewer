/**
 *modeled after: https://github.com/integrating-magic/js-dev-environment/blob/main/scripts/upload.js
 */

import path from "node:path";
import url from "node:url";
import open from "open";
import config from "../filemaker.config.js";

const { server, file, uploadScript } = config;
console.log("config", config);

const pathToHtml = path.join(import.meta.dirname, "..", "dist", "index.html");
console.log("pathToHtml", pathToHtml);

const fmpUrl = url.format({
	slashes: true,
	protocol: "fmp",
	hostname: server,
	pathname: file,
	query: {
		script: uploadScript,
		param: JSON.stringify({
			htmlName: process.env.npm_package_name,
			version: process.env.npm_package_version,
			pathToHtml,
		}),
	},
});
console.log("fmpUrl", fmpUrl);

open(fmpUrl);
