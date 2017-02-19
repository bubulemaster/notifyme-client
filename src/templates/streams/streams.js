import { inject } from 'aurelia-framework'
import { HttpClient, json } from 'aurelia-fetch-client'

import { authString } from '../../http/auth/credential'

import { NotifyMeStore } from '../../redux/notifymestore'

@inject(NotifyMeStore, HttpClient)
export class Streams {
  constructor (notifyMeStore, http) {
    this.store = notifyMeStore
    this.http = http

    // List of avaible stream on server
    this.existingStream = []
    // List of stream that user want notify
    this.userStream = []
    // Filter value
    this.searchTerm = ''
    // True if user
    this.updateUser = false
  }

  /**
   * Call NotifyMe server.
   *
   * @param url (only api part)
   * @param verb http verb
   * @param [body] optional content to send (automatically convert to json)
   */
  callServer (url, verb, body) {
    const state = this.store.state()
    const auth = authString(state.user.username, state.user.password)

    let data

    if (body) {
      data = {
        method: verb,
        body: json(body),
        headers: {
          'Authorization': auth
        }
      }
    } else {
      data = {
        method: verb,
        headers: {
          'Authorization': auth
        }
      }
    }

    return this.http.fetch(state.server.url + '/api/v1/' + url, data)
  }

  attached () {
    // Reset save
    this.updateUser = false

    // Add loading search stream icon
    $(this.streamsFilterInput).toggleClass('loading')

    this.callServer('stream', 'get')
      .then(response => response.json())
      .then(data => {
        this.existingStream = data

        const state = this.store.state()
        return this.callServer('user/' + state.user.username, 'get')
      })
      .then(response => response.json())
      .then(data => {
        this.existingStream.forEach(existsStream => {
          data.streams.find(item => item === existsStream.name)
            ? existsStream.checked = true
            : existsStream.checked = false
        })

        $(this.streamsFilterInput).toggleClass('loading')
      })
  }

  /**
   * Filter function on array.
   *
   * @param searchExpression exprestion to search
   * @param value current item of array
   */
  filterFunc (searchExpression, value) {
    const itemValue = value.name

    return (!searchExpression || !itemValue)
      ? false
      : itemValue.toUpperCase().indexOf(searchExpression.toUpperCase()) !== -1
  }

  /**
   * Display message popup with extra information.
   *
   * @param item current item contain extra stream information
   */
  displayMoreInformationPopup (item) {
    $(item).popup('show')
  }

  /**
   * Add or remove current stream.
   *
   * @param currentStream current stream in template
   */
  addRemoveStream (currentStream) {
    currentStream.checked = !currentStream.checked
    this.updateUser = true
  }

  saveStream (event) {
    $(event.target).toggleClass('loading')
    // Disable button
    $('.enableOnInput').prop('disabled', true)

    const state = this.store.state()

    // Create data for request
    let data = {
      streams: []
    }

    // Create new request for server
    this.existingStream.forEach(item => {
      item.checked && data.streams.push(item.name)
    })

    // Update list of user stream
    this.userStream = data.streams

    this.callServer('user/' + state.user.username, 'put', data)
      .then(() => {
        $(event.target).toggleClass('loading')
        $('.enableOnInput').prop('disabled', false)
      })
      .catch(() => {
        $(event.target).toggleClass('loading')
        $('.enableOnInput').prop('disabled', false)
      })
  }
}
