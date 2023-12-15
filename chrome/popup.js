const addURLButton = document.getElementById('inject-file');
const injectFunction = document.getElementById('inject-function');

async function getCurrentTab() {
	const queryOptions = { active: true, currentWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

addURLButton.addEventListener('click', async () => {
	const tab = await getCurrentTab();

	console.log(tab.url, tab.title)
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['content-script.js']
	});
});

function showAlert(givenName) {
	alert(`Hello, ${givenName}`);
}

injectFunction.addEventListener('click', async () => {
	const tab = await getCurrentTab();

	const name = 'World';
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: showAlert,
		args: [name]
	});
});
