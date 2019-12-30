let patients = []

import REST from "../REST.js"
import Patient from "../classes/Patient"
import updateService from "../services/updateService"

async function get(id) {
    if (patients.length > 0 && !id) {
        let result = await REST.get("/patient")
        patients = result.map(r => new Patient(r))
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
    } else
        return patients
}

async function update(patient) {
    let clean = {
        id: patient.id,
        name: patient.name,
        bloodPressure: patient.bloodPressure,
        img: patient.img,
        dob: patient.dob,
        vegan: patient.vegan,
        reason: patient.reason,
        actions: patient.actions.map(a => {
            return {
                id: a.id,
                type: a.type,
                done: a.done,
                time: a.time
            }
        })
    }
    let updated = await REST.update(`/patient/${clean.id}`, clean)
    if (update.id) {
        patients.map(p => p.id === updated.id ? new Patient(updated) : p)
    }
    updateService.showAlert("update Succesfull")
    return updated
}
export default {
    get,
    update
}
