<template>
<div v-if="departments" class="container">
        <div
            clickable 
            tag="a"
            v-for="dep in sortedDepartments" 
            :key="dep.id"                    
            :to="/department/+dep.id"
        >
            {{dep.id}}. {{dep.name}}
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
    import departmentManager from "../util/managers/departmentManager"
    export default {
        name: 'PageIndex',
        data() {
            return {
                currentDepartment: null,
                departments: []
            }
        },
        created() {
            departmentManager.get()
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
