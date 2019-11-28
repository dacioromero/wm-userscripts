// ==UserScript==
// @name        Web Monetization - Counter
// @namespace   https://github.com/dacioromero/wm-userscripts
// @description Adds an element to track the amount paid on a page.
// @author      Dacio Romero <me@dacio.dev>
// @run-at      document-idle
// @match       *://*/*
// @grant       none
// @version     1.0.0
// @updateURL   https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @installURL  https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @downloadURL https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @license     MIT
// ==/UserScript==

const style = document.createElement('style')
style.textContent = `
  .wmCounter {
    position: fixed;
    bottom: 8px;
    right: 8px;
    z-index: 99999;
    color: white;
    background: black;
    border-radius: 8px;
    line-height: 24px;
    padding: 0 8px;
    user-select: none;
    font-family: "Roboto", sans-serif;
  }

  .wmCounter:hover {
    opacity: 0.25;
  }
`.replace(/\s+/g, ' ').trim()

const counter = document.createElement('div')
counter.className = 'wmCounter'

let total = 0

function handleMonetizationProgress (event) {
  const { amount, assetScale, assetCode } = event.detail

  total += Number(amount) * 10 ** -assetScale

  counter.textContent = `${total.toFixed(assetScale)} ${assetCode}`
}

if (document.monetization) {
  document.body.appendChild(counter)
  document.head.appendChild(style)
  document.monetization.addEventListener('monetizationprogress', handleMonetizationProgress)
}
