console.log('hi');
window.addEventListener('DOMContentLoaded', (event) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, { counter: 1 }, function handler(response) {
            console.log('respnonse', response);
        });
    });
});