let rooms

import REST from "../REST.js"

async function get(id) {
    if (!rooms) {
        rooms = await REST.get("/room")
    }
    if (id) {
        let one = rooms.find(p => p.id === id)
        if (!one) {
            one = REST.get(`/room/${id}`)
            if (!one) return null
            else rooms.push(one)
        }
        return one
    }
    else 
        return rooms
}
export default {get}