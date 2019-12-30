import { Notify } from 'quasar'

//from map-todo-solution-1 with backend

const ErrorService = {
  showAlert (userMessage) {
    Notify.create({
      color: 'green',
      position: 'top',
      message: userMessage,
      icon: 'done_all'
    })
  },
  log (error) {
    console.log(error)
  }
}

export default ErrorService