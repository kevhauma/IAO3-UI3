import patientManager from "./patientManager"
import roomManager from "./roomManager"
import {socket} from "../../boot/socket"

socket.on('heartrate', async (hr) => {
        let p = await patientManager.get(hr.patient)
        p.addHeartRate(hr.hr)
      
    })
socket.on('bellRinged', async (room) => {
        let r = await roomManager.get(room)
        console.log(bellRinged)
        let p = await patientManager.get(r.patient)
        p.bellRinged = true
        
    })
