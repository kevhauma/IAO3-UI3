import { Notify } from 'quasar'

//from map-todo-solution-1 with backend

const ErrorService = {
  showAlert (userMessage) {
    Notify.create({
      color: 'negative',
      position: 'top',
      message: `${userMessage}.\nPlease try to refresh the page.`,
      icon: 'report_problem'
    })
  },
  log (error) {
    console.log(error)
  }
}

export default ErrorService