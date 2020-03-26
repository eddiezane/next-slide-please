const log = (...args) => chrome.extension.getBackgroundPage().console.log('popup.js log', ...args)
const base = 'https://dfc9f01a.ngrok.io'

var port = chrome.runtime.connect({ name: "popup-channel" });
port.postMessage({ event: 'popup-opened' });
port.onMessage.addListener(function(request, sender, sendResponse) {
    log('message from content', request)
    switch (request.event) {
        case 'setSocketId':
            const id = request.id
            log('got socket id', id)
            log(document.getElementById('container'))
            document.getElementById('container').innerHTML = `
Please share the following URL with your presenter:
<br><br>
<span class="w-100 overflow-scroll">${base}/remote/${id}</span>
  `
            break;
    }
});