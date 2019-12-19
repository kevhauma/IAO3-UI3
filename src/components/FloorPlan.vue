<template app='floorplan'>
<div class='floorplan'>
    <img src="../statics/floorplan.png">
    <div v-if='roomObjects.length > 0'>
        <room v-for='room in roomObjects'
        :key='room.id'
        :room='room'
        class='room'
        :style='getStyle(room)'
        />
    </div>
</div>
</template>
<script>
    import REST from '../util/REST.js'
    import Room from './Room.vue'

    export default {
        name: 'floorplan',
        props: {
            rooms: {
                type: Array
            }
        },
        data() {
            return {
                roomObjects: [],
            }
        },
        components: {
            Room
        },
        created() {
            this.rooms.forEach((room) => {
                REST.get(`/room/${room}`)
                    .then(r => {
                        this.roomObjects.push(r)
                    })
                
            })
        },
        methods: {
            getStyle(room) {
                return {
                    left: `${room.placements.x}px`,
                    top: `${room.placements.y}px`,
                    width: `${room.placements.width}px`,
                    height: `${room.placements.height}px`
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
        height: 500px;
        /* fill the parent */
     
    }

    .room {
        position: absolute;
    }

</style>
