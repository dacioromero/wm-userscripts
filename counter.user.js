// ==UserScript==
// @name        Web Monetization - Counter
// @namespace   https://github.com/dacioromero/wm-userscripts
// @description Adds an element to track the amount paid on a page.
// @icon        https://webmonetization.org/img/fav-webmonetization.png
// @author      Dacio Romero <me@dacio.dev>
// @run-at      document-idle
// @match       *://*/*
// @grant       none
// @version     1.1.0
// @updateURL   https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @installURL  https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @downloadURL https://raw.githubusercontent.com/dacioromero/wm-userscripts/master/counter.user.js
// @require     https://unpkg.com/react@16.13.0/umd/react.production.min.js
// @require     https://unpkg.com/react-dom/umd/react-dom.production.min.js
// @require     https://unpkg.com/react-hook-wm@0.1.14/umd/react-hook-wm.min.js
// @license     MIT
// ==/UserScript==

if (document.monetization) {
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

  const root = document.createElement('div')

  function positionReducer (position) {
    return (position + 1) % 4
  }

  function Counter () {
    const { total, scale, code } = ReactHookWM.useCounter()
    const [position, handleClick] = React.useReducer(positionReducer, 2)

    if (total === 0) return null

    let className = 'wmCounter'

    switch (position) {
      case 0:
        className += ' top left'
        break
      case 1:
        className += ' top right'
        break
      case 2:
        className += ' bottom right'
        break
      case 3:
        className += ' bottom left'
        break
    }

    return React.createElement('div', { onClick: handleClick, className }, [total.toFixed(scale), ' ', code])
  }

  document.head.appendChild(style)
  document.head.appendChild(font)
  document.body.appendChild(root)
  ReactDOM.render(React.createElement(Counter, {}, null), root)
}
