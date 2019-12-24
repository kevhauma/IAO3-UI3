<template>
<div v-if="departments" class="container">
        <q-card 
            clickable 
            v-for="dep in sortedDepartments" 
            :key="dep.id"                    
            @click="changeDepartment(dep)"
        >
            {{dep.id}}. {{dep.name}}
        </q-card>
</div>
</template>
<style>
    .container {
        height: 100%;
        width: 100%;
    }

</style>
<script>    
    import REST from "../util/REST"
    export default {
        name: 'PageIndex',
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
            changeDepartment(dep) {
                this.currentDepartment = dep
            }
        },
        computed: {
            sortedDepartments() {
                return this.departments.slice().sort((a, b) => a.id - b.id)
            }
        }
    }

</script>
