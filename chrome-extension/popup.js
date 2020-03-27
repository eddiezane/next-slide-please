const log = (...args) => chrome.extension.getBackgroundPage().console.log('popup.js log', ...args)

let port = chrome.runtime.connect({ name: "popup-channel" });
port.postMessage({ event: 'popup-opened' });
port.onMessage.addListener(function(request, sender, sendResponse) {
    try {
        log('message from content', request)
        switch (request.event) {
            case 'setState':
                const state = request.state
                log('got state', state)
                switch (state.stage) {
                    case 'init':
                        document.getElementById('container').innerHTML = `<span class="w-75 h-75 br-pill bg-gray dib"></span> Loading...`
                        break;
                    case 'connecting':
                        document.getElementById('container').innerHTML = `<span class="w-75 h-75 br-pill bg-gold dib"></span> Connecting...`
                        break;
                    case 'connected':
                        const id = state.id
                        log('connected, got socket id', id)
                        document.getElementById('container').innerHTML = `
                      <span class="w-75 h-75 br-pill bg-green dib"></span> Live
                      <br>
                      Please share the following URL with your presenter:
                      <br><br>
                      <span class="w-100 overflow-scroll code pointer underline green" id="select-on-click">${_NEXT_SLIDE_PLEASE.base}/remote/${id}</span>
                    `
                        addSelectOnClick();
                        break;
                    case 'connection-error':
                        document.getElementById('container').innerHTML = `<span class="w-75 h-75 br-pill bg-red dib"></span> ${ state.error }`
                        break;
                }
                break;
        }
    } catch (err) {
        log('error', err)
    }
});

const addSelectOnClick = () => {
    const el = document.getElementById('select-on-click');
    if (!el) return;

    el.onclick = () => {
        if (document.selection) {
            const range = document.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        } else if (window.getSelection) {
            const range = document.createRange();
            range.selectNodeContents(el);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }

        // copy to clipboard
        navigator.clipboard.writeText(el.innerText)
    }
}