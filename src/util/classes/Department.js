import roomManager from "../managers/roomManager"
export default class Department {
    constructor(nd) {
        this.id = nd.id
        this.name = nd.name
        this.color = nd.color
        this.icon = nd.icon
        this.rooms = nd.rooms
        this.getFreeRooms()
    }
    async getFreeRooms() {
        let free = 0
        for (let i = 0; i < this.rooms.length; i++) {
            let room = await roomManager.get(this.rooms[i])
            if (!room.patient) {
                free++
            }
        }
        this.freeRooms = free
    }

}
