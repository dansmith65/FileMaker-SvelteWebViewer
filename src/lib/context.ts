import simpleError from "./simple-error";

type Context = {
	layoutName: string;
	layoutNumber: number;
	recordId: number;
	scriptName: string;
	webViewerName: string;
	windowName: string;
	currentTimeUTCMilliseconds: number;
};

let context: Context;

if (import.meta.env.DEV) {
	/**
	 * Since FileMaker isn't available to add this context data; use this sample data while developing.
	 */
	context = {
		layoutName: "WebViewer",
		layoutNumber: 2,
		recordId: 3,
		scriptName: "WV: filemaker-sveltewebviewer",
		webViewerName: "webviewer",
		windowName: "FileMaker-SvelteWebViewer",
		currentTimeUTCMilliseconds: Date.now() + 62135596800000,
	};
} else {
	/**
	 * FileMaker should add a JSON Object like with Context type to a script tag like:
	 *     "<script id='FILEMAKER_CONTEXT' type='application/json'>" & $context & "</script>"
	 */
	try {
		const el = document.querySelector("#FILEMAKER_CONTEXT");
		if (!el) throw new Error("FILEMAKER_CONTEXT not found");
		const text = el.textContent;
		if (!text) throw new Error("FILEMAKER_CONTEXT was empty");
		context = JSON.parse(text);
	} catch (error) {
		simpleError(error);
	}
}

export default context;
