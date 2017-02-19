/*
 * action types
 */
// New notification receive
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
// When connect to server
export const CONNECT = 'CONNECT'
// When user logout
export const LOGOUT = 'LOGOUT'
// When network link lost
export const DISCONNECT = 'DISCONNECT'

/*
 * action creators
 */
export function addNotification (notif) {
  return { type: ADD_NOTIFICATION, notif }
}

export function connect (username, password, url) {
  return { type: CONNECT, username, password, url }
}

export function logout () {
  return { type: LOGOUT }
}

export function disconnect () {
  return { type: DISCONNECT }
}
