chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    //pageUrl: { hostEquals: 'developer.chrome.com' },
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }])
    })
})

let ports = {
    content: null,
    popup: null,
}

const log = (...args) => console.log('background.js log', ...args)

chrome.runtime.onConnect.addListener(function(port) {
    log('connected', port)
    switch (port.name) {
        case 'content-channel':
            ports.content = port;

            port.onMessage.addListener(function(request, sender, sendResponse) {
                console.log('background.js message from content', request)
            });
            break;
        case 'popup-channel':
            ports.popup = port;

            port.onMessage.addListener(function(request, sender, sendResponse) {
                switch (request.event) {
                    case 'popup-opened':
                        ports.content.postMessage({ event: 'addEventListeners' })
                        break;
                }
            });
            break;
    }
});