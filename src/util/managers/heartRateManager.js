import patientManager from "./patientManager"
//import io from 'socket.io'
//
//
//io.on('heartrate',newHR => {
//    let patient = getPatient(newHR.patient)
//    patient.hr.push(newHR.hr)
//    if(patient.hr.length > 200)
//        patient.hr.shift()
//})

start()

async function start() {
    let all = await patientManager.get()
    setInterval(() => {
        all.forEach(p => {
            let randomHR = Math.round(Math.random() * 200 + 50)
            p.addHeartRate(randomHR)
            if (p.heartrate.length > 200)
                p.heartrate.shift()
        })
    },5000)
}
