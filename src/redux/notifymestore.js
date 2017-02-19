import {noView} from 'aurelia-framework'
import { createStore } from 'redux'

import notifyMe from './reducers'

/* By default, the DI container assumes that everything is a singleton instance;
   one instance for the app. However, you can use a registration decorator to
   change this */

@noView()
export class NotifyMeStore {
  constructor () {
    this.store = createStore(notifyMe)
  }

  subscribe (fn) {
    this.store.subscribe(fn)
  }

  state () {
    return this.store.getState()
  }

  dispatch (fn) {
    this.store.dispatch(fn)
  }
}
