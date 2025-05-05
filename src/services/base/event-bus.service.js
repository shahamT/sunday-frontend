function createEventEmitter() {
    const listenersMap = {}
    return {
        //* Use this function to subscribe to an event
        on(evName, listener) {
            listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },

        //* Use this function to emit an event
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()
window.evBus = eventBusService

////////////////////////////////////////////////////

function showFlashMsg(msg) {
    eventBusService.emit('show-flash-msg', msg)
}

export function showSuccessMsg(txt) {
    showFlashMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
    showFlashMsg({ txt, type: 'error' })
}

window.showSuccessMsg = showSuccessMsg
window.showErrorMsg = showErrorMsg

////////////////////////////////////////////////////

export function showDialog({ content, backgroundColor = 'black', onConfirm, onCancel, onClose }) {
    eventBusService.emit('show-dialog', {
      content,
      backgroundColor,
      onConfirm,
      onCancel,
      onClose
    })
  }
  
  export function closeDialog(reason) {
    eventBusService.emit('close-dialog', reason)
  }
  
  window.showDialog = showDialog
  window.closeDialog = closeDialog