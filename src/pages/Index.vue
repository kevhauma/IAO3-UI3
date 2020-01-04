<template>
<div v-if="departments" class="container">
        <div
            clickable 
            tag="a"
            v-for="dep in sortedDepartments" 
            :key="dep.id"                    
            @click="goToDepartment(dep)"
             class="indexdepartment"
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
    .indexdepartment:hover {
        text-decoration: underline;
        cursor: pointer;
    }

</style>
<script>    
    import departmentManager from "../util/managers/departmentManager"
    export default {
        name: 'PageIndex',
        data() {
            return {
                departments: null
            }
        },
        created() {
            departmentManager.get()
                .then(result => {
                    this.departments = result
                })
                .catch(e => console.error("error: ", e))
        },
        methods: {
            goToDepartment(dep) {
                this.$router.push({
                    name: 'department',
                    params: {
                        id: dep.id
                    }
                })
            }
        },
        computed: {
            sortedDepartments() {
                return this.departments.slice().sort((a, b) => a.id - b.id)
            }
        }
    }

</script>
