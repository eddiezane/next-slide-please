chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            //pageUrl: { hostEquals: 'developer.chrome.com' },
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('yoooo in background message', request)
  sendResponse({ message: 'yo i am response' })
})
