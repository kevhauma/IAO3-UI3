let departments

import REST from "../REST.js"
import roomManager from "./roomManager"
import Department from "../classes/Department"

async function get(id) {
    if (!departments) {
        departments = await REST.get("/department")
    }
    if (id) {
        let one = departments.find(p => p.id === id)
        if (!one) {
            one = REST.get(`/department/${id}`)
            if (!one) return null
            else {
                one = new Department(one)
                departments.push(one)
            }        
        }
        return one
    }
    else 
        return departments
}

async function getRooms(id){
    let {rooms} = await get(id)
    let newRooms = []
    for (const room of rooms) {
        newRooms.push(await roomManager.get(room))
    }   
    return newRooms
}

async function getFreeRooms(id){
    let {rooms} = await getRooms(id)
    return rooms.filter(r=>!r.patient)
}

export default {get,getRooms,getFreeRooms}