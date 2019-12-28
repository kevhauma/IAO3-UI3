import settings from "../settings.js"
export default class Patient {
    constructor(np) {
        this.id = np.id
        this.name = np.name
        this.bloodPressure = np.bloodPressure
        this.img = np.img
        this.dob = np.dob
        this.heartrate = [55]
        this.status = "CLEAR"
        this.vegan = np.vegan
        this.reason = np.reason
        this.actions = np.actions.map(a => { //set date string to date object
            return {
                actionName: a.actionName,
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
        let latest = this.heartrate[this.heartrate.length - 1]
        if (latest > hrSettings.max || latest < hrSettings.min) {
            this.status = "THRESH"
        } 
        else if (firstAction.time - Date.now() < 0) {
            this.status = "EMERGENCY"
        } 
        else if ((firstAction.time - Date.now()) / (60 * 1000) < settings.getters.actionThreshold()) {
            this.status = "SOON"
        } 
        else {
            this.status = "CLEAR"
        }



        //        console.log(this.status,firstAction)
    }
    addHeartRate(hr) {
        this.heartrate.push(hr)
    }

    nextAction() {
        return this.actions
            .filter(a => !a.done)
            .reduce((early, curr) => //look for the action that is the earliest
                curr.time.getMilliseconds() < early.time.getMilliseconds() ? curr : early, {
                    time: new Date(new Date().setFullYear("9999"))
                }) //set very late date
    }
}
