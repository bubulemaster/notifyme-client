import { inject } from 'aurelia-framework'

import { NotifyMeStore } from '../../redux/notifymestore'
import { connect } from '../../redux/actions'

import { NotifyMeIoClient } from '../../io/io-client'

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
    this.io.connect({
      username: this.username,
      password: this.password,
      url: this.url,
      onDisconnect: () => console.log('Disconnected'),
      onLoginError: () => console.log('Login error'),
      onLogin: () =>
        this.store.dispatch(connect(this.username, this.password, this.url))
    })
  }
}
