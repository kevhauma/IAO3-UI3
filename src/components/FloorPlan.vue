    <template app='floorplan'>
        <div class='floorplan'>
            <img src="../statics/floorplan.png">
            <div>
                <room v-for='room in updatedRooms' :key='room.id' :room='room' :position="'absolute'" :style='getStyle(room)' @patient-selected="onPatientSelected" />
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
                    updatedRooms: null,
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
                onPatientSelected(patientid) {
                    this.$emit('patient-selected', patientid)
                }
            },
            watch: {
                rooms: {
                    handler(newRooms, old) {
                        console.log("watched: ", newRooms)
                        this.updatedRooms = newRooms
                    },
                    deep: true,
                    immediate: true,
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
            height: 100%;
        }

    </style>
