let rooms

import REST from "../REST.js"
import Room from "../classes/Room"
import departmentManager from "./departmentManager"

async function get(id) {
    if (!rooms) {
        let result = await REST.get("/room")
        rooms = result.map(r=>new Room(r))
    }
    if (id) {
        let one = rooms.find(p => p.id === id)
        if (!one) {
            one = await REST.get(`/room/${id}`)
            if (!one) return null
            else {
                one = new Room(one)
                rooms.push(one)
            }
        }
        return one
    }
    else 
        return rooms
}

export default {get}