/**
 * Singleton containing shared data between components.
 */
export default {
  state: {
    // Toast messages looks like { message: string, color: string }
    toastMessages: [{
      message: 'test',
      color: 'red'
    }]
  }
}
