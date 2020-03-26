let bkg = chrome.extension.getBackgroundPage()

bkg.console.log("1")

chrome.runtime.sendMessage({ type: 'connect', foo: 'bar' }, response => {
  bkg.console.log('app.js response', response)
});
