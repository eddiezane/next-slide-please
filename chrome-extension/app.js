let bkg = chrome.extension.getBackgroundPage();

window.addEventListener('DOMContentLoaded', (event) => {
    bkg.console.log('1');
    let socket = io('https://cbc643ba.ngrok.io/');

});