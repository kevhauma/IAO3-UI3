<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />

                <q-toolbar-title>
                    ExamenProject - Hospitaal
                </q-toolbar-title>
                <q-btn flat round dense icon="build" class="q-mr-xs" @click="settings=!settings" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
            <q-list v-if="departments">

                <q-item-label header>Departments</q-item-label>
                <q-item v-for="dep in sortedDepartments" :key="dep.id">
                    <q-item clickable tag="a" :to="/department/+dep.id">
                        <q-item-section avatar>
                            <q-icon :name="dep.icon" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{dep.name}}</q-item-label>
                            <q-item-label caption>rooms available: <span v-if="dep.freeRooms">{{dep.freeRooms}}</span></q-item-label>
                        </q-item-section>
                    </q-item>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
        
        <settings v-if="settings">
        </settings>
        
    </q-layout>
</template>

<script>
    import departmentManager from "../util/managers/departmentManager"
    import heartRateManager from "../util/managers/heartRateManager"
    import Settings from "../components/settings"
    export default {
        name: 'MyLayout',
        data() {
            return {
                leftDrawerOpen: false,
                departments: null,
                settings: false,
            }
        },
        components:{
          Settings  
        },
        created() {
            departmentManager.get()
                .then(res => this.departments = res)

        },
        computed: {
            sortedDepartments() {
                return this.departments.slice().sort((a, b) => a.id - b.id)
            }
        }
    }

</script>
<style>
    .q-page-container {
        height: 100%;
    }

</style>
