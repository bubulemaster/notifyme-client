import { Base64 } from './base64'

const BASE64 = new Base64()

export function authString (user, password) {
  const str = user + ':' + password

  return 'Basic ' + BASE64.encode(str)
}
