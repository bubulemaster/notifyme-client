import { combineReducers } from 'redux'
import { ADD_NOTIFICATION, CONNECT, LOGOUT, DISCONNECT } from './actions'

function notificationsFilter (state = [], action) {
  return state
}

function notifications (state = [], action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action]
    default:
      return state
  }
}

function user (state = {username: null, password: null}, action) {
  switch (action.type) {
    case CONNECT:
      return {
        username: action.username,
        password: action.password
      }
    default:
      return state
  }
}

function serverStatus (state = { connected: false, disconnect: false, url: null }, action) {
  switch (action.type) {
    case CONNECT:
      return {
        logged: true,
        disconnect: false,
        url: action.url
      }
    case LOGOUT:
      return {
        logged: false,
        disconnect: false,
        url: action.url
      }
    case DISCONNECT:
      return {
        logged: true,
        disconnect: true,
        url: action.url
      }
    default:
      return state
  }
}

const notifyMe = combineReducers({
  a: notificationsFilter,
  messages: notifications,
  user: user,
  server: serverStatus
})

export default notifyMe
