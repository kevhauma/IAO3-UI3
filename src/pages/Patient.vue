<template>
    <div class="detailPage">
        <div class="info">
            <q-avatar class="patientImg">
                <img :src="patient.img">
            </q-avatar>
            <div class="moreInfo">
                <h3>{{patient.name}}</h3>
                <q-item class="moremoreInfo">
                    <q-item>
                        geboortedatum:
                        <q-icon name="event" />{{patientBirth}}</q-item>
                    <q-item>
                        Veganistisch:
                        <q-checkbox v-model="patient.vegan" color="green" @click.native="update(action)" />
                    </q-item>
                    <q-item>reden: {{patient.reason}}</q-item>
                </q-item>
            </div>
        </div>
        <q-item class="actionAndHeartrate">
            <q-item class="actions">
                <h3>Acties</h3>
                <q-toggle v-model="filter"> verberg uitgevoerde acties </q-toggle>
                <q-markup-table class="actionTable" flat bordered :separator="'cell'">
                    <thead>
                        <tr>
                            <th class="text-center">type</th>
                            <th class="text-center">tijdstip</th>
                            <th class="text-center">uitgevoerd</th>
                            <th class="text-center">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="actionListItem" v-for="action in filteredActions" :key="action.id">
                            <td class="text-center">{{action.type}}</td>
                            <td class="text-center">{{action.time.toLocaleDateString()}} {{action.time.toLocaleTimeString()}}</td>
                            <td class="text-center">
                                <q-checkbox v-model="action.done" color="teal" @input="update()" :disable="action.done"/>
                            </td>
                            <td class="text-center">
                                <q-btn rounded flat dense color="red" icon="delete" @click="deleteAction(action)" :disable="actionIsAllowed(action.type)" />
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
                <q-btn class="addActionBtn" icon="add" label="Voeg nieuwe actie toe" color="green" @click="onAddClick()">
                </q-btn>
            </q-item>
            <q-item class="heartrate">
                <graph class=graph v-if="patient" :chartdata="patient.heartrate"></graph>
            </q-item>
        </q-item>
        <q-sticky>
            <add-action :show="showAddDialogue" @add-confirm="onAddAction" @add-cancel="onAddCancel"></add-action>
        </q-sticky>

    </div>
</template>

<script>
    import patientManager from "../util/managers/patientManager"
    import Graph from "../components/Graph"
    import AddAction from "../components/AddAction"
    import {
        allowedActions
    } from "../util/constants"

    export default {
        name: 'PatientPage',
        data() {
            return {
                patient: {},
                mapView: true,
                chartData: null,
                filter: false,
                showAddDialogue: false,
            }
        },
        components: {
            Graph,
            AddAction
        },
        methods: {
            getPatient() {
                patientManager.get(this.$route.params.id).then(result => {
                        if (result) {
                            this.patient = result
                            this.patient.actions.sort((a, b) => a.time - b.time)
                        } else
                            this.$router.push({
                                name: "404"
                            })
                    })
                    .catch(e => console.error("error: ", e))
            },
            async update() {
                await patientManager.update(this.patient)
            },
            actionIsAllowed(action) {
                return !allowedActions.includes(action)
            },
            onAddClick() {
                this.showAddDialogue = true
            },
            onAddAction(action){
                action.time = new Date(action.time)
                this.patient.addAction(action)
                this.showAddDialogue = false
                this.update()
            },
            onAddCancel(){
                console.log("cancelling")
                this.showAddDialogue = false
            },
            deleteAction(action){
                this.patient.deleteAction(action)
                  this.update()
            },
            
        },
        created() {
            this.getPatient()
        },
        computed: {
            patientBirth() {
                return new Date(this.patient.dob).toLocaleDateString()
            },
            filteredActions() {
                if (this.filter)
                    return this.patient.actions.filter(a => !a.done)
                else
                    return this.patient.actions
            },
        },
    }

</script>
<style>
    .detailPage {
        padding: 75px;
    }

    .actionAndHeartrate {
        white-space: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }


    .info {
        display: flex;
        flex-direction: row;
        margin: auto;
        max-width: 800px;
    }

    .moreInfo {
        display: flex;
        flex-direction: row;
    }

    .moremoreInfo {
        display: flex;
        flex-direction: column;
    }

    .heartrate,
    .actions {
        flex: 30%;
    }

    .actions {
        display: flex;
        flex-direction: column;
    }

    .actionTable {
        flex-grow: 2;
    }

    .addActionBtn {
        flex-grow: 0;
        max-height: 50px;
    }

    .patientImg {
        width: 100px;
        height: 100px;
        margin: 30px;
    }

    .graph {
        width: 100%;
        height: 100%;
    }

</style>
