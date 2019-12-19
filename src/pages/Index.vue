<template>
<div v-if="currentDepartment" class="container">
    <div >{{currentDepartment.name}}</div>    
    <div>
    <floor-plan :rooms="currentDepartment.rooms">
    
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
    import REST from "../util/REST"
    export default {
        name: 'PageIndex',
        components: {
            FloorPlan
        },
        data() {
            return {
                currentDepartmentId: 0,
                currentDepartment: null,
            }
        },
        created() {
            setInterval(()=>this.currentDepartmentId++,10000)
        },
        watch: {
            currentDepartmentId(){
            REST.get(`/department/${this.currentDepartmentId}`)
                .then(result => this.currentDepartment = result)
                .then(() => console.log("dep: ", this.currentDepartment))
                .catch(e => console.error("error: ", e))    
            }
        }

    }

</script>
