import { date } from "quasar"

export default class Patient{
    constructor(np){
        this.id = np.id
        this.name = np.name
        this.bloodPressure = np.bloodPressure
        this.img = np.img
        this.dob = np.dob
        this.vegan = np.vegan
        this.reason = np.reason
        this.actions = np.actions
        this.stateInterval = setIntcheckState(()=>this.checkState(),60*1000) // check state every minute
    }
    checkState(){
        let now = new Date()
        let firstAction = this.actions
            .filter(a=>!a.done)
            .reduce((closest,curr)=> //look for the action that is the earliest
                curr.time - closest.time < 0 
                ? curr : closest
            ,{time:Infinity})
        
        if(!firstAction){
            this.status = "CLEAR"
        }
        if(firstAction.time - Date.now() < 200){
            this.state = "EMERGENCY"
        }
    }
    
}