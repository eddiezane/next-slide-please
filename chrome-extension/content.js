console.log('content.js');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('content message');
        console.log(request);
        sendResponse({ counter: request.counter + 1 });
    });