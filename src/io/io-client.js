import {noView} from 'aurelia-framework'
import io from 'socket.io-client'

/* By default, the DI container assumes that everything is a singleton instance;
   one instance for the app. However, you can use a registration decorator to
   change this */

@noView()
export class NotifyMeIoClient {
  constructor () {
    this.connected = false
    this.socket = null
  }

  /**
   *
   * @param config configuration @see IoConfig
   */
  connect (config) {
    // If previous connection exists, close it
    if (this.socket) {
      this.socket.close()
    }

    this.socket = io.connect(
      config.url,
      {
        path: '/streams.io',
        autoConnect: true
      }
    )

    this.socket.on('connect', () => {
      // We authentication is good
      config.onLogin && this.socket.on('authenticated', config.onLogin)

      config.onDisconnect && this.socket.on('disconnect', config.onDisconnect)

      config.onLoginError && this.socket.on('unauthorized', config.onLoginError)

      // Send authentication
      this.socket.emit('authentication', {
        username: config.username,
        password: config.password
      })
    })
  }

  /**
   * Execute function on name.
   *
   * @param name 'chat message'
   * @param fn callback function
   */
  on (name, fn) {
    this.socket.on(name, fn)
  }

  /**
   * Emit a message.
   *
   * @param room the io room
   * @param message message to send
   */
  emit (room, message) {
    this.socket.emit(room, message)
  }
}
