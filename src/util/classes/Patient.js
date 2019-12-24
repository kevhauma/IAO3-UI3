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
        this.actions
            .filter(a=>!a.done)
            .forEach(a=>{
                console.log(a)
            })
    }
    
}