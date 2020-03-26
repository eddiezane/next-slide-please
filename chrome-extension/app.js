let bkg = chrome.extension.getBackgroundPage()

window.addEventListener("DOMContentLoaded", event => {
  bkg.console.log("1")

  chrome.runtime.sendMessage({ type: 'connect' }, response => {
  });

  // let socket = io('https://cbc643ba.ngrok.io/');
})
