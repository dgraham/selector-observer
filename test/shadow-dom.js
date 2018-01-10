/* @flow */

import {assert, body, randomClassName, suite, test, timeout} from './utils'
import {observe} from '../lib'

suite('shadow dom', function() {
  test('mismatch open', async function() {
    const root = document.createElement('div')
    body.appendChild(root)

    const shadowRoot = root.attachShadow({mode: 'open'})

    const className = randomClassName()
    let addRan = false
    let removeRan = false

    const observer = observe({
      selector: `.${className}`,
      add() {
        addRan = true
      },
      remove() {
        removeRan = true
      }
    })

    const el = document.createElement('span')
    el.className = className

    shadowRoot.appendChild(el)

    await timeout(10)

    assert.equal(addRan, false, 'add ran')
    assert.equal(removeRan, false, 'remove ran')

    body.removeChild(root)

    observer.abort()
  })

  test('mismatch closed', async function() {
    const root = document.createElement('div')
    body.appendChild(root)

    const shadowRoot = root.attachShadow({mode: 'closed'})

    const className = randomClassName()
    let addRan = false
    let removeRan = false

    const observer = observe({
      selector: `.${className}`,
      add() {
        addRan = true
      },
      remove() {
        removeRan = true
      }
    })

    const el = document.createElement('span')
    el.className = className

    shadowRoot.appendChild(el)

    await timeout(10)

    assert.equal(addRan, false, 'add ran')
    assert.equal(removeRan, false, 'remove ran')

    body.removeChild(root)

    observer.abort()
  })
})
