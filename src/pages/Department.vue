<template>
<div v-if="department" class="container">
    <div>
    <floor-plan :rooms="department.rooms">
    
    </floor-plan>
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
    import departmentManager from "../util/managers/departmentManager"
    import { colors } from 'quasar'
    export default {
        name: 'PageIndex',
        components: {
            FloorPlan
        },
        data() {
            return {
                department: null,               
            }
        },
        watch:{
            '$route.params':{
                handler(){
                    departmentManager.get(this.$route.params.id)
                        .then(result => {
                            this.department = result
                            console.log(result)         
                            colors.setBrand("primary",this.department.color)
                        })
                        .catch(e => console.error("error: ", e))
                },
                immediate: true
            }
        }       
    }

</script>
