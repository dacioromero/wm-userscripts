// ==UserScript==
// @name        Web Monetization - Counter
// @namespace   https://github.com/dacioromero/wm-userscripts
// @description Adds an element to track the amount paid on a page.
// @icon        https://webmonetization.org/img/fav-webmonetization.png
// @author      Dacio Romero <me@dacio.dev>
// @run-at      document-idle
// @match       *://*/*
// @grant       none
// @version     1.0.1
// @updateURL   https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @installURL  https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @downloadURL https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @license     MIT
// ==/UserScript==

const font = document.createElement('link')
font.href = 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
font.rel = 'stylesheet'

const style = document.createElement('style')
style.textContent = `
  .wmCounter {
    position: fixed;
    z-index: 99999;
    color: white;
    background: black;
    border-radius: 8px;
    line-height: 24px;
    padding: 0 8px;
    user-select: none;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
  }

  .wmCounter:hover {
    opacity: 0.5;
  }

  .wmCounter.top { top: 8px; }
  .wmCounter.bottom { bottom: 8px; }
  .wmCounter.left { left: 8px; }
  .wmCounter.right { right: 8px; }
`.replace(/\s+/g, ' ').trim()

const counter = document.createElement('div')
counter.className = 'wmCounter'

// 0-3
let position = 2

function updateCounterPos () {
  const { classList } = counter

  classList.remove('top', 'bottom', 'left', 'right')

  switch (position) {
    case 0:
      classList.add('top', 'left')
      break
    case 1:
      classList.add('top', 'right')
      break
    case 2:
      classList.add('bottom', 'right')
      break
    case 3:
      classList.add('bottom', 'left')
      break
  }
}

updateCounterPos()

function handleCounterClick (event) {
  event.preventDefault()

  position = (position + 1) % 4

  updateCounterPos()
}

let total = 0

function handleMonetizationProgress (event) {
  const { amount, assetScale, assetCode } = event.detail

  total += Number(amount) * 10 ** -assetScale

  counter.textContent = `${total.toFixed(assetScale)} ${assetCode}`
}

if (document.monetization) {
  document.head.appendChild(style)
  document.head.appendChild(font)
  document.body.appendChild(counter)

  counter.addEventListener('click', handleCounterClick)
  document.monetization.addEventListener('monetizationprogress', handleMonetizationProgress)
}
