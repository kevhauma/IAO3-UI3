export default class Patient{
    constructor(np){
        this.id = np.id
        this.name = np.name
        this.bloodPressure = np.bloodPressure
        this.img = np.img
        this.dob = np.dob
        this.vegan = np.vegan
        this.reason = np.reason
        console.log("new: ",np.actions)
        this.actions = np.actions.map(a=>{ //set date string to date object
            return {
                actionName : a.actionName,
                done : a.done,
                time: new Date(a.time)
            }
        })
        console.log("this: ",this.actions)
        this.status = "CLEAR"
        this.stateInterval = setInterval(()=>this.checkState(),60*1000) // check state every minute
        this.heartrate = []
    }
    checkState(){
        let now = new Date()
//        console.log(this.actions)
        let firstAction = this.actions
            .filter(a=>!a.done)
            .reduce((early,curr)=> //look for the action that is the earliest
                curr.time.getTime() < early.time.getTime() ? curr : early  
            ,{time:Infinity})
        
        if(!firstAction){
            this.status = "CLEAR"
        }
        if(firstAction.time - Date.now() < 200){
            this.status = "EMERGENCY"
        }
//        console.log(this.status,firstAction)
    }
    addHeartRate(hr){
        this.heartrate.push(hr)
    }
}