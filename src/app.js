import {inject} from 'aurelia-framework'

import { NotifyMeStore } from './redux/notifymestore'

@inject(NotifyMeStore)
export class App {
  constructor (notifyMeStore) {
    this.store = notifyMeStore

    this.store.subscribe(() => this.reduxUpdate())
  }

  reduxUpdate () {
    const state = this.store.state()

    // state.notifications vient de l'actions.js ?
    this.notif = state.notifications
    this.logged = state.server.logged
  }
}
