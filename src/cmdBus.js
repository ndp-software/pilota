import { Subject }                  from 'rxjs'
import {
  map,
  filter,
  withLatestFrom,
}                                   from 'rxjs/operators'
import { asyncScheduler }           from 'rxjs'
import { subscribeLog, isFunction } from './util.js'
import { newObjectResolver }        from './resolver.js'
import { newDispatcher }            from './dispatcher.js'

/*
 Bus to dispatch and apply commands to the state stream.

 state$ -- an Observable and Observer

 dispatch -- One of the following:

 * null or undefined -- returned cmdBus does no dispatching in the given
 state. The caller can add command handlers calling `addHandler`.

 * object -- a map of command names to handling functions

 * a dispatcher function -- a function that will handle the commands. The signature
 is `(state, cmd) => state`. The name of the command is available as `name` property.

 */

export function newCmdBus$ (state$, dispatch) {

  const cmdBus$ = new Subject(asyncScheduler)

  if (isFunction(dispatch)) {
    cmdBus$.dispatch = dispatch
  } else {
    const resolver     = newObjectResolver(dispatch)
    cmdBus$.dispatch   = newDispatcher(resolver)
    cmdBus$.addHandler = resolver.addHandler
    cmdBus$.on         = cmdBus$.addHandler // alias
  }

  cmdBus$.pipe(
    map((cmd) => typeof cmd == 'string' ? { name: cmd } : cmd),
    withLatestFrom(state$, (cmd, state) => cmdBus$.dispatch(state, cmd)),
    filter(x => x !== undefined),
         )
         .subscribe(state$)

  return cmdBus$
}

export function logCmdBus (cmdBus$) {
  subscribeLog(cmdBus$, 'cmdBus$')
}



