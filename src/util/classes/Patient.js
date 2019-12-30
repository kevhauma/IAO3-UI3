import settings from "../settings.js"
export default class Patient {
    constructor(np) {
        this.id = np.id
        this.name = np.name
        this.bloodPressure = np.bloodPressure
        this.img = np.img
        this.dob = np.dob
        this.heartrate = []
        this.status = "CLEAR"
        this.vegan = np.vegan
        this.reason = np.reason
        this.actions = np.actions.map(a => { //set date string to date object
            return {
                id: a.id,
                type: a.type,
                done: a.done,
                time: new Date(a.time)
            }
        })


        this.checkState()
        this.stateInterval = setInterval(() => this.checkState(), 1 * 1000) // check state every minute

    }
    checkState() {
        let now = new Date()
        let firstAction = this.nextAction()

        let hrSettings = settings.getters.HRthreshold()
        if (this.latestHeartRate() > hrSettings.max || this.latestHeartRate() < hrSettings.min) {
            this.status = "THRESH"
        } else if (firstAction.time - Date.now() < 0) {
            this.status = "EMERGENCY"
        } else if ((firstAction.time - Date.now()) / (60 * 1000) < settings.getters.actionThreshold()) {
            this.status = "SOON"
        } else {
            this.status = "CLEAR"
        }



        //        console.log(this.status,firstAction)
    }
    addHeartRate(hr) {
        this.heartrate.push(hr)
    }
    latestHeartRate(){
        return this.heartrate[this.heartrate.length-1]
    }

    nextAction() {
        return this.actions
            .filter(a => !a.done)
            .reduce((early, curr) => //look for the action that is the earliest
                curr.time.getMilliseconds() < early.time.getMilliseconds() ? curr : early, {
                    time: new Date(new Date().setFullYear("9999"))
                }) //set very late date
    }
    nextTimeStamp() {
        let between = this.nextAction().time - Date.now()
        let abs = Math.abs(between)
        let totalSeconds = Math.floor(abs / 1000)
        let seconds = totalSeconds % 60
        let totalMinutes = Math.floor(totalSeconds / 60)
        let minutes = totalMinutes % 60
        let totalHours = Math.floor(totalMinutes / 60)
        let hours = totalHours % 24
        let days = Math.floor(totalHours / 24)

        let timeString = `${days?`${days}d`:""} ${hours}h ${minutes}m`

        if (between > 0)
            return `binnen ${timeString}`
        else
            return `${timeString} geleden`
    }
    addAction(action) {
        this.actions.push(action)
    }
    deleteAction(action) {
        this.actions = this.actions.filter((a) => !(a.time.getTime() === action.time.getTime() && a.type === action.type))
    }
}
