import { inject } from 'aurelia-framework'
import { HttpClient } from 'aurelia-fetch-client'

import { authString } from '../../http/auth/credential'

import { NotifyMeIoClient } from '../../io/io-client'
import { NotifyMeStore } from '../../redux/notifymestore'

const { ipcRenderer } = require('electron')

@inject(NotifyMeStore, NotifyMeIoClient, HttpClient)
export class Talk {
  constructor (notifyMeStore, notifyMeIoClient, http) {
    this.store = notifyMeStore
    this.io = notifyMeIoClient
    this.http = http

    this.messages = []

    this.io.on('chat message', message => {
      ipcRenderer.send('asynchronous-message', 'ping')
      this.messages.unshift(message)
    })

    this.store.subscribe(() => this.reduxUpdate())

    this.newMessage = {
      stream: '',
      message: ''
    }

    /*
    this.messages.push({
      message: 'This is a nice message',
      username: 'Bond, James Bond',
      title: 'Girl power',
      msgtype: 'notification',
      stream: 'test_stream'
    })
    */
  }

  attached () {
    $(this.popupAddMessage).hide()
  }

  reduxUpdate () {
    const state = this.store.state()

    if (!state.user.logged) {
      // At logout clear message
      this.messages = []
    }
  }

  /**
   * Display message popup with extra information.
   */
  displayMoreInformationPopup (item) {
    $(item).popup('show')
  }

  /**
   * Show/Hide div to write a message
   */
  toggleAddMessagePopup () {
    const buttonUp = $(this.iconDisplayAddMessage).hasClass('up')

    if (buttonUp) {
      // Hide div to write message
      $(this.iconDisplayAddMessage).addClass('down').removeClass('up')
    } else {
      this.loadAddMessagePopup()
    }

    // Display div
    $(this.popupAddMessage).toggle()
  }

  /**
   * Load div to write message
   */
  loadAddMessagePopup () {
    // Chang icon button
    $(this.iconDisplayAddMessage).addClass('up').removeClass('down')
    // Add loading search stream icon
    $(this.streamsSearchInput).toggleClass('loading')

    // Call server to get stream list for current user
    const state = this.store.state()
    const auth = authString(state.user.username, state.user.password)

    this.http.fetch(state.server.url + '/api/v1/user/' + state.user.username, {
      method: 'get',
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => {
        let newResult = []

        data.streams.forEach((stream) => {
          newResult.push({title: stream})
        })

        return newResult
      })
      .then(listStream => {
        // http://semantic-ui.com/modules/search.html#/settings
        $(this.streamsSearchInput).search({
          source: listStream,
          searchFields: ['title'],
          onSelect: (result, response) => {
            this.newMessage.stream = result.title
            return true
          }
        })

        // Remove loading animation
        $(this.streamsSearchInput).toggleClass('loading')
      })
      .catch(() => {
        // Remove loading animation
        $(this.streamsSearchInput).toggleClass('loading')
      })
  }

  closeAddMessagePopup () {
    this.newMessage.stream = ''
    this.newMessage.message = ''
    $(this.popupAddMessage).hide()
  }

  addMessagePopup () {
    // send message
    console.log(this.newMessage.stream)

    // TODO check if message or stream empty
    this.io.emit('chat message', {
      message: this.newMessage.message,
      stream: this.newMessage.stream
    })

    this.closeAddMessagePopup()
  }
}
