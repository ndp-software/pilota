export function precondition(x, msg) {
  if (!x) throw msg
}

export function isFunction(x) {
  return typeof x === 'function'
}

export function subscribeLog(observable$, name) {
  observable$.subscribe(
    function(v) {
      global.console.log(`${name}.next:`, v)
    },
    function(v) {
      global.console.log(`${name}.error:`, v)
    },
    function(v) {
      global.console.log(`${name}.complete:`, v)
    }
  )
}

