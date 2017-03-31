import { inject } from 'aurelia-framework'

import { NotifyMeStore } from '../../redux/notifymestore'
import { connect } from '../../redux/actions'

import { NotifyMeIoClient } from '../../io/io-client'
import { IoConfig } from '../../io/io-config'

@inject(NotifyMeStore, NotifyMeIoClient)
export class Login {
  constructor (notifyMeStore, notifyMeIoClient) {
    this.store = notifyMeStore
    this.io = notifyMeIoClient

    this.username = 'John'
    this.password = '1234567890'
    this.url = 'http://localhost:3001'
  }

  attached () {
    // When template is created
    // $('.ui.checkbox').checkbox()
  }

  detached () {
    // When destroy template
  }

  login () {
    let config = new IoConfig(this.username, this.password, this.url)
    config.onDisconnect = () => console.log('Disconnected')
    config.onLoginError = () => console.log('Login error'),
    config.onLogin = () =>
      this.store.dispatch(connect(this.username, this.password, this.url))

    this.io.connect(config)
  }
}
