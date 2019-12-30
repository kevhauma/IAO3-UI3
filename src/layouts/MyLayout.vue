<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />

                <q-toolbar-title>
                    ExamenProject - Hospitaal
                </q-toolbar-title>
                <q-input dark dense standout @focus="searching=true" @blur="clearSearch()" v-model="searchInput" @input="search()" input-class="text-right" class="q-ml-md" debounce="100" :loading="searchLoading">
                    <template v-slot:append>
                        <q-icon v-if="searchInput === ''" name="search" />
                        <q-icon v-else name="clear" class="cursor-pointer" @click="clearSearch()" />
                    </template>
                </q-input>
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
        <search-result-list v-if="searching" :results="searchResults" @on-select="goTo">
        </search-result-list>

        <settings v-if="settings">
        </settings>

    </q-layout>
</template>

<script>
    import departmentManager from "../util/managers/departmentManager"
    import patientManager from "../util/managers/patientManager"
    import heartRateManager from "../util/managers/heartRateManager"
    import Settings from "../components/settings"
    import SearchResultList from "../components/SearchResultList"
    export default {
        name: 'MyLayout',
        data() {
            return {
                leftDrawerOpen: false,
                departments: null,
                settings: false,
                searchInput: '',
                searchLoading: false,
                searchResults: [],
                searching: false,
            }
        },
        components: {
            Settings,
            SearchResultList
        },
        created() {
            departmentManager.get()
                .then(res => this.departments = res)

        },
        computed: {
            sortedDepartments() {
                return this.departments.slice().sort((a, b) => a.id - b.id)
            }
        },
        methods: {
            async search() {
                let all = await patientManager.get()
                this.searchLoading = true
                this.searchResults = []
                this.searchInput = this.searchInput.toLowerCase()
                if (this.searchInput === "" || this.searchInput.length < 3) {
                    this.searchLoading = false
                    return
                }
                all.forEach(p => {
                    let pushed = false
                    if (p.status.toLowerCase().includes(this.searchInput))
                        pushed = true

                    if (p.name.toLowerCase().includes(this.searchInput))
                        pushed = true

                    if (this.searchInput.startsWith("vegan") && p.vegan)
                        pushed = true

                    if (p.nextAction() && p.nextAction().type.includes(this.searchInput))
                        pushed = true

                    if (pushed)
                        this.searchResults.push(p)

                })
                this.searchLoading = false
            },
            clearSearch() {
                setTimeout(() => {
                    this.searching = false
                    this.searchInput = ''
                    this.searchResults = []
                }, 100)
            },
            goTo(id) {
                this.$router.push({
                    name: 'patient',
                    params: {
                        id: id
                    }
                })
                this.clearSearch()
            }

        }
    }

</script>
<style>
    .q-page-container {
        height: 100%;
    }

</style>
