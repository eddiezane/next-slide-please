chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'docs.google.com',
                        pathPrefix: '/presentation/',
                    },
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
let state = {
    stage: 'init',
    id: null,
}

const setState = newState => {
    state = newState
    if (ports.content) {
        ports.content.postMessage({
            event: 'setState',
            state,
        })
    }
    if (ports.popup) {
        ports.popup.postMessage({
            event: 'setState',
            state,
        })
    }
}

const log = (...args) => console.log('background.js log', ...args)

chrome.runtime.onConnect.addListener(function(port) {
    log('port connected', port.name, port)
    switch (port.name) {
        case 'content-channel':
            ports.content = port;

            port.onMessage.addListener(function(request, sender, sendResponse) {
                log('message from content', request)
                switch (request.event) {
                    case 'setState':
                        log('got new state', request.state)
                        setState(request.state)
                        break;
                }
            });
            break;
        case 'popup-channel':
            ports.popup = port;

            port.onMessage.addListener(function(request, sender, sendResponse) {
                log('message from popup', request)
                switch (request.event) {
                    case 'popup-opened':
                        setState(state) // re-send current state
                        ports.content.postMessage({ event: 'activate' })
                        break;
                }
            });
            break;
    }
});