import { inject } from 'aurelia-framework'

import { NotifyMeStore } from '../../redux/notifymestore'
import { logout } from '../../redux/actions'

import { NotifyMeIoClient } from '../../io/io-client'

@inject(NotifyMeStore, NotifyMeIoClient)
export class Client {
  constructor (notifyMeStore, notifyMeIoClient) {
    this.store = notifyMeStore
    this.io = notifyMeIoClient

    this.sheet = {
      talk: {
        active: false
      },
      setup: {
        active: false
      },
      streams: {
        active: false
      }
    }

    this.selectSheet('talk')
  }

  exit () {
    this.store.dispatch(logout())
  }

  selectSheet (name) {
    for (let currentSheet in this.sheet) {
      this.sheet[currentSheet].active = false
    }

    this.sheet[name].active = true
  }
}
