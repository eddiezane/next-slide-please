let bkg = chrome.extension.getBackgroundPage()

var port = chrome.runtime.connect({ name: "popup-channel" });
port.postMessage({ event: 'popup-opened' });