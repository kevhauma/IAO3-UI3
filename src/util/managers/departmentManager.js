let departments

import REST from "../REST.js"
import roomManager from "./roomManager"

async function get(id) {
    if (!departments) {
        departments = await REST.get("/department")
    }
    if (id) {
        let one = departments.find(p => p.id === id)
        if (!one) {
            one = REST.get(`/department/${id}`)
            if (!one) return null
            else departments.push(one)
        }
        return one
    }
    else 
        return departments
}

async function getRooms(id){
    let {rooms} = await get(id)
    rooms.map(async(r)=>roomManager.get(r))
    return rooms
}

async function getFreeRooms(id){
    let {rooms} = await get(id)
    rooms.map(async(r)=>roomManager.get(r))
    return rooms.filter(r=>!r.patient)
}

export default {get,getRooms,getFreeRooms}