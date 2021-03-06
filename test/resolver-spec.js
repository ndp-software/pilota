/*eslint-env mocha */

import {assert} from 'chai'

import {newObjectResolver} from '../src/resolver.js'


describe('newObjectResolver', function() {

  it('returns null for unassigned', function() {
    const resolver = newObjectResolver()
    assert.equal(null, resolver('foo'))
  })

  it('add an event handler', function() {
    const resolver = newObjectResolver()
    const handler = (x) => x * 10
    resolver.addHandler('addOne', handler)
    assert.equal(handler, resolver('addOne'))
  })

  it('add an event handler without the right data', function() {
    const resolver = newObjectResolver()

    assert.throws(()=> resolver.addHandler(), 'requires a command name')
    assert.throws(()=> resolver.addHandler('x'), 'requires a projection function')
    assert.throws(()=> resolver.addHandler('x', 'y'), 'requires a projection function')
  })

  it('add an * event handler', function() {
    const resolver = newObjectResolver()
    const handler = (x) => x * 10
    resolver.addHandler('*', handler)
    assert.equal(handler, resolver('foo'))
    assert.equal(handler, resolver('bar'))
  })

  it('can provide object as starting pt', function() {
    const handler = (x) => x * 10
    const resolver = newObjectResolver({
      addOne: handler
    })
    assert.equal(handler, resolver('addOne'))
  })

})