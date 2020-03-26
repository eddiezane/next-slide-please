const log = (...args) => console.log("content.js log", ...args)
log("started")

var port = chrome.runtime.connect({ name: "content-channel" })
port.postMessage({ where: "content.js" })
port.onMessage.addListener(function(msg) {
  log("message", msg)
  switch (msg.event) {
    case "addEventListeners":
      const socket = io("https://dfc9f01a.ngrok.io")
      socket.on("connect", () => {
        console.log("socket connected")
        log("hooking into fullscreen")
        document.addEventListener("fullscreenchange", function(event) {
          log("fullscreen", event)
          setTimeout(() => {
            log("adding keydown listener")
            const frame = document
              .querySelector(".punch-present-iframe")
              .contentWindow.document.querySelector(".punch-viewer-content")
            log(frame)

            socket.on('ext:keydown', event => {
              switch(event.key) {
                case 'ArrowLeft':
                  frame.dispatchEvent( makeKeyEvent('prev'))
                  break
                case 'ArrowRight':
                  frame.dispatchEvent(makeKeyEvent('next'))
                  break
              }
            })
          }, 2000)
        })
      })
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
  if (!key) throw new Error(`Unknown type ${type}`)

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
