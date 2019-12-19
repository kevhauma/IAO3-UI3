<template app="floorplan">
<div class="floorplan">
    <room v-for="room in roomObjects"
      v-if="roomObjects"
      :key="room.id"
      room="room"
      class="room"
      :style="getStyle(room)"
    />
</div>
</template>
<script>
    import REST from "../utils/REST.js"
    import Room from "./Room.vue"
    import {
        URI_PATH
    } from "../util/constants.js"

    export default {
        name: 'floorplan',
        props: {
            rooms: {
                type: Array
            }
        },
        data() {
            return {
                leftDrawerOpen: false
            }
        },
        components: {
            Room
        },
        computed: {
            roomObjects: async () => 
                this.rooms.map(await (room) => {
                    return REST.get(`${URI_PATH}/room/${room.id}`)
                })            
        },
        methods: {
            getStyle(room) {
                return {
                    left: `${room.placement.x}px`,
                    top: `${room.placement.y}px`,
                    width: `${room.placement.width}px`,
                    height: `${room.placement.height}px`
                }
            }
        }
    }

</script>
<style>
    .floorplan {
        margin-top: 5px;
        position: relative;
        /* to allow absolute postioning of markers on map */
        overflow: auto;
        height: 100%;
        /* fill the parent */
    }

    .room {
        position: absolute;
    }

    }

</style>
