/**
 * Class configuration for IO connction.
 *
 * username: 'my_user'.
 * password: 'my_user_password'.
 * url: 'my_url'.
 * onLogin: callback when login.
 * onDisconnect: callback when lost server connection.
 * onLoginError: callback if login error.
 */
export class IoConfig {
  constructor(username, password, url) {
    this.username = username
    this.password = password
    this.url = url
    this.onLogin = null
    this.onDisconnect = null
    this.onLoginError = null
  }
}
