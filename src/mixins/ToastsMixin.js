/**
 * Provides additionnal methods to a vue instance (view / component), to create / toasts.
 */
import store from '@/store/'

export default {
  methods: {
    $error (message) {
      addToastMessage(message, 'red')
    },
    $success (message) {
      addToastMessage(message, 'green')
    }
  }
}

function addToastMessage (message, color) {
  store.state.toastMessages.unshift({ message, color: 'red' })

  // Remove the toast message from the store after a delay
  setTimeout(() => {
    store.state.toastMessages.shift()
  }, 2500)
}
