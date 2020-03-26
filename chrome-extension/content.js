console.log('content.js');


// setTimeout(() => {
  // const frame = document.querySelector('.punch-present-iframe').contentWindow.document
  // // const frame = document.querySelector('.punch-present-iframe').contentWindow.document.querySelector('.punch-viewer-content')
  // frame.addEventListener('keydown', event => {
    // console.log('content keydown', event)
  // })
// }, 3000)



// chrome.runtime.sendMessage({ type: 'connect' }, response => {
// console.log(response.farewell);
// });



// let keys = {
// prev: {
// name: "ArrowLeft",
// code: 37,
// },
// next: {
// name: "ArrowRight",
// code: 39,
// }
// }

// let sendKey = ev => document.querySelector('.punch-present-iframe').contentWindow.document.querySelector('.punch-viewer-content').dispatchEvent(ev)

// let makeKeyEvent = type => {
// const key = keys[type];
// if (!key) throw new Error(`Unknown type ${type}`);

// return new KeyboardEvent('keydown', {
// altKey:false,
// bubbles: true,
// cancelBubble: false, 
// cancelable: true,
// charCode: 0,
// code: key.name,
// composed: true,
// ctrlKey: false,
// currentTarget: null,
// defaultPrevented: true,
// detail: 0,
// eventPhase: 0,
// isComposing: false,
// isTrusted: true,
// key: key.name,
// keyCode: key.code,
// location: 0,
// metaKey: false,
// repeat: false,
// returnValue: false,
// shiftKey: false,
// type: "keydown",
// which: key.code
// })
// }

// sendKey(makeKeyEvent('next'))
// sendKey(makeKeyEvent('prev'))
