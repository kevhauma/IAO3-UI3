<template>
<div v-if="department" class="container">
    <q-toggle v-model="mapView" icon="map"></q-toggle> 
    <div v-if="mapView">
        <floor-plan :departmentId="department.id">
        </floor-plan>
    </div>
    <!-- <div v-if="!mapView">
        <room-list :rooms="department.rooms">    
        </room-list>
    </div> -->
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
    import departmentManager from "../util/managers/departmentManager"
    import { colors } from 'quasar'
    export default {
        name: 'DepartmenPage',
        components: {
            FloorPlan
        },
        data() {
            return {
                department: null,    
                mapView : true,           
            }
        },
        methods:{
            getThisDepartment(){
                departmentManager.get(this.$route.params.id)
                        .then(result => {
                            this.department = result     
                            colors.setBrand("primary",this.department.color)
                        })
                        .catch(e => console.error("error: ", e))
            }
        },
        created(){
            this.getThisDepartment()
        },
        watch:{
            '$route.params':{
                handler(){
                    this.getThisDepartment()
                },
                immediate: true
            },
            mapView(){
                this.getThisDepartment()
            }
        }       
    }

</script>
