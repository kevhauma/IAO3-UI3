<template app='floorlist'>
    <div>
        <div class='floorlist' v-if='updatedRooms'>
            <room v-for='room in rooms' :key='room.id' :room='room' :position="'relative'" class="listroom" @patient-selected="onPatientSelected" />
        </div>
    </div>
</template>
<script>
    import roomManager from '../util/managers/roomManager'
    import departmentManager from '../util/managers/departmentManager'
    import Room from './Room.vue'

    export default {
        name: 'floorlist',
        props: {
            rooms: {
                type: Array,
            },
        },
        data() {
            return {
                updatedRooms: null
            }
        },
        components: {
            Room
        },
        methods: {
            onPatientSelected(patientid) {
                this.$emit('patient-selected', this.patient.id)
            }
        },
        watch: {
            rooms(newRooms, old) {
                if (newRooms)
                    this.updatedRooms = newRooms
            }
        },
    }

</script>
<style>
    .floorlist {
        white-space: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .listroom {
        flex: 200px;
        margin: 5px;
        height: 200px;
        border: 1px solid black;
        border-radius: 4px;
    }

</style>
