<template>
    <div v-if="department" class="container">
        <q-toggle v-model="mapView" icon="map"></q-toggle>
        <div v-if="mapView">
            <floor-plan :rooms="department.roomObjects" @patient-selected="onPatientSelected" >
            </floor-plan>
        </div>
        <div v-if="!mapView">
            <floor-list :rooms="department.roomObjects" @patient-selected="onPatientSelected" >
            </floor-list>
        </div>
    </div>
</template>
<style>
    .container {
        height: 100%;
        width: 100%;
    }

</style>
<script>
    import FloorPlan from "../components/FloorPlan"
    import FloorList from "../components/FloorList"
    import departmentManager from "../util/managers/departmentManager"
    import {
        colors
    } from 'quasar'
    export default {
        name: 'DepartmenPage',
        components: {
            FloorPlan,
            FloorList
        },
        data() {
            return {
                department: null,
                mapView: true,
            }
        },
        methods: {
            getThisDepartment() {
                departmentManager.get(this.$route.params.id)
                    .then(result => {
                        this.department = result
                    console.log("department Set")
                        colors.setBrand("primary", this.department.color)
                    
                        return departmentManager.getRooms(this.department.id)
                    })
                    .then(rooms => {
                        rooms.sort((a,b)=> a.id - b.id)
                        console.log("rooms set")
                        this.department.roomObjects = rooms
                    })
                    .catch(e => console.error("error: ", e))
            },
            onPatientSelected(patientid){
                this.$router.push({ 
                        name: 'patient', 
                        params: { id: patientid } 
                    })
            }
        },
        created() {
            console.log("department created")
            this.getThisDepartment()
        },
        watch: {
            '$route.params': {
                handler() {
                    this.getThisDepartment()
                },
                immediate: true
            }
        }
    }

</script>
