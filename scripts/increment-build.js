import { readFileSync, writeFileSync } from "fs";

let file = process.env.npm_package_json;
if (!file) {
	file = "./package.json";
}
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

console.log("old version:", pkg.version);
const [version, build] = pkg.version.split("+");

let newBuild;

if (build) {
	const buildInt = Number.parseInt(build);
	if (isNaN(buildInt)) {
		console.warn(
			"build existed but was not an integer, so it wasn't incremented:",
			build,
		);
	} else {
		newBuild = buildInt + 1;
	}
} else {
	newBuild = 1;
}

if (newBuild) {
	pkg.version = [version, newBuild].join("+");
	console.log("new version:", pkg.version);
	writeFileSync(file, JSON.stringify(pkg, null, "\t"));
}
