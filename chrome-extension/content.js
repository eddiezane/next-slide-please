const log = (...args) => console.log("content.js log", ...args)
log("started")

let socket = null;
let port = chrome.runtime.connect({ name: "content-channel" })
log('port connected')

const setState = state => {
    port.postMessage({
        event: 'setState',
        state,
    })
}

const setUpEventListeners = () => {
    log("hooking into fullscreen")
    document.addEventListener("fullscreenchange", function(event) {
        log("fullscreenchange", event)
        setTimeout(() => {
            log("adding socket.io keydown listener")
            const frame = document
                .querySelector(".punch-present-iframe")
                .contentWindow.document.querySelector(".punch-viewer-content")
            log('found frame', frame)

            socket.on('ext:keydown', event => {
                log('ext:keydown', event)
                switch (event.key) {
                    case 'ArrowLeft':
                        frame.dispatchEvent(makeKeyEvent('prev'))
                        break
                    case 'ArrowRight':
                        frame.dispatchEvent(makeKeyEvent('next'))
                        break
                }
            })
        }, 2000)
    })
}

const setUpSocket = () => {
    if (socket) {
        if (socket.connected) {
            // already connected
            return;
        }

        // clean up a little
        socket.disconnect && socket.disconnect();
    }

    log('connecting to socket.io on', _NEXT_SLIDE_PLEASE.base)
    setState({
        stage: 'connecting',
    })
    socket = io(_NEXT_SLIDE_PLEASE.base, {
        timeout: 3000,
    })

    // 
    socket.on("connect", () => {
        log("socket connected")
        setState({
            stage: 'connected',
            id: socket.id,
        })

        setUpEventListeners()
    })

    //
    socket.on('disconnect', () => {
        log("socket disconnected")
        setState({
            stage: 'connection-error',
            error: 'Disconncted.',
        })
    });

    //
    socket.on('connect_error', (err) => {
        log("socket connect_error", err)
        setState({
            stage: 'connection-error',
            error: 'Connection error.',
        })
    });

    //
    socket.on('connect_timeout', (err) => {
        log("socket connect_timeout", err)
        setState({
            stage: 'connection-error',
            error: 'Connection error.',
        })
    });
}

port.onMessage.addListener(function(msg) {
    log("message", msg)
    switch (msg.event) {
        case "activate":
            setUpSocket()
            break
    }
})

let keys = {
    prev: {
        name: "ArrowLeft",
        code: 37
    },
    next: {
        name: "ArrowRight",
        code: 39
    }
}

let makeKeyEvent = type => {
    const key = keys[type]
    if (!key) log(`ignoring unknown key ${type}`)

    return new KeyboardEvent("keydown", {
        altKey: false,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        charCode: 0,
        code: key.name,
        composed: true,
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: true,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: true,
        key: key.name,
        keyCode: key.code,
        location: 0,
        metaKey: false,
        repeat: false,
        returnValue: false,
        shiftKey: false,
        type: "keydown",
        which: key.code
    })
}