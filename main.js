const {app, Tray, Menu, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ICON_PATH = 'src/img/icon/'

// Set true if close by tray icon
let willQuitApp = false

let iconFileName
let unReadIconFileName

if (process.platform == 'darwin') {
  // TODO http://electron.rocks/proper-tray-icon/
  iconFileName = 'macosTemplate.png'
  unReadIconFileName = 'macosUnreadTemplate.png'
} else if (process.platform == 'win32') {
  iconFileName = 'windows.ico'
  unReadIconFileName = 'windows-unread.ico'
}

const iconPath = path.join(__dirname, ICON_PATH + iconFileName)
const unReadIconPath = path.join(__dirname, ICON_PATH + unReadIconFileName)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let appIcon

function createWindow () {
  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow({
    show: false,
    icon: path.join(__dirname, ICON_PATH + '64x64.png')
  })

  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      accelerator: 'CmdOrCtrl+S',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        willQuitApp = true
        mainWindow.close()
      }
    },
    {
      label: 'Debug',
      click: () => mainWindow.webContents.openDevTools()
    }
  ])

  appIcon.setToolTip('NotifyMe Official client')
  appIcon.setContextMenu(contextMenu)
  appIcon.on('click', () => mainWindow.show())

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('close', (e) => {
    if (!willQuitApp) {
      // the user only tried to close the window
      e.preventDefault()
      mainWindow.hide()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    appIcon.setImage(iconPath)
  })
}

if (process.platform === 'darwin') {
  // MacOS only
  app.dock.hide()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (willQuitApp || process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// 'before-quit' is emitted when Electron receives
// the signal to exit and wants to start closing windows
app.on('before-quit', () => willQuitApp = true)

ipcMain.on('asynchronous-message', (event, arg) => {
  if (!mainWindow.isFocused()) {
    // Change icon
    appIcon.setImage(unReadIconPath)
  }

  event.sender.send('asynchronous-reply', 'pong')
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
