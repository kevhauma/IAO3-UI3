<template>
<div v-if="currentDepartment" class="container">
    <q-btn-dropdown color="primary" :label="`${currentDepartment.id}. ${currentDepartment.name}`">
        <q-list>
            <q-item 
                    clickable 
                    v-close-popup
                    v-for="dep in sortedDepartments" 
                    :key="dep.id"                    
                    @click="changeDepartment(dep)">
                {{dep.id}}. {{dep.name}}
            </q-item>
        </q-list>
    </q-btn-dropdown>
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
                currentDepartment: null,
                departments: []
            }
        },
        created() {
            REST.get(`/department`)
                .then(result => {
                    this.departments = result
                    this.currentDepartment = this.sortedDepartments[0]
                })
                .catch(e => console.error("error: ", e))
        },
        methods: {
            changeDepartment(dep){
                this.currentDepartment = dep
            }
        },
        computed:{
            sortedDepartments(){
                return this.departments.slice().sort((a,b)=>a.id - b.id)
            }
        }
    }

</script>
