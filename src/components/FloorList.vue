<template app='floorplan'>
<div class='floorplan'>
    <div v-if='roomObjects.length > 0'>
        <room v-for='room in roomObjects'
        :key='room.id'
        :room='room'
        class='room'        
        @patient-selected="onPatientSelected"      
        />
    </div>
</div>
</template>
<script>
    import roomManager from '../util/managers/roomManager'
    import departmentManager from '../util/managers/departmentManager'
    import Room from './Room.vue'

    export default {
        name: 'floorplan',
        props: {
            departmentId: String
        },
        data() {
            return {
                roomObjects: [],
            }
        },
        components: {
            Room
        },
        methods: {
            getStyle(room) {
                return {
                    left: `${room.placements.x}px`,
                    top: `${room.placements.y}px`,
                    width: `${room.placements.width}px`,
                    height: `${room.placements.height}px`
                }
            }, 
            getRooms(){
                departmentManager.getRooms(this.departmentId)
                .then(rooms => {
                    this.roomObjects = rooms
                })                
            },
            onPatientSelected(patientid){
                this.$router.push({ 
                        name: 'patient', 
                        params: { id: patientid } 
                    })
            }
        },
        created() {
            this.getRooms()
        },
        watch: {
            roomIds() {
                this.getRooms()
            }
        },    
    }
    

</script>
<style>
    .floorplan {
        margin-top: 5px;
        position: relative;
        /* to allow absolute postioning of markers on map */
        overflow: auto;
        height: 550px;
        /* fill the parent */
    }

    .room {
        position: absolute;
    }

</style>
