import { Notify } from 'quasar'

// this shows how you can provide a service as an object literal

const ErrorService = {
  showAlert (userMessage) {
    Notify.create({
      color: 'negative',
      position: 'top',
      message: userMessage,
      icon: 'report_problem'
    })
  },
  log (error) {
    console.log(error)
  }
}

export default ErrorService