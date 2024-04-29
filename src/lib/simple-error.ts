let container: HTMLDivElement;

function createContainer() {
	container = document.createElement("div");
	container.style.cssText = `
		position: fixed;
		top: 0;
		width: 100%;
		padding: 0.5rem;
		box-sizing:border-box;
		background-color: darkred;
		color: white;
		z-index: 1000;
	`;
	document.body.appendChild(container);
}

function simpleError(error: any) {
	console.error(error);
	if (!container) createContainer();
	const el = document.createElement("p");
	el.style.cssText = `
		padding: 0.5rem 0;
		margin: 0;
	`;
	el.textContent = error;
	container.appendChild(el);
}

export default simpleError;
