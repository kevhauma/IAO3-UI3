let patients

import REST from "../REST.js"

async function get(id) {
    if (!patients) {
        patients = await REST.get("/patient")
    }
    if (id) {
        let one = patients.find(p => p.id === id)
        if (!one) {
            one = REST.get(`/patient/${id}`)
            if (!one) return null
            else patients.push(one)
        }
        return one
    }
    else 
        return patients
}

async function update(patient) {
    let updated = await REST.put("/patient",patient)
    if (id) {
        patients.map(p => p.id === updated.id ? updated : p)
    }
    return updated    
}
export default {get,update}