let patients = []

import REST from "../REST.js"
import Patient from "../classes/Patient"

async function get(id) {
    if (patients.length > 0 && !id) {
        let result = await REST.get("/patient")
        patients = result.map(r=>new Patient(r))
    }
    if (id) {
        let one = patients.find(p => p.id === id)
        if (!one) {
            one = await REST.get(`/patient/${id}`)
            if (!one) return null
            else {
                one = new Patient(one)
                patients.push(one)
            }
        }
        return one
    }
    else 
        return patients
}

async function update(patient) {
    let updated = await REST.put("/patient",patient)
    if (id) {
        patients.map(p => p.id === updated.id ? new Patient(updated) : p)
    }
    return updated
}
export default {get,update}