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
                <q-markup-table flat bordered :separator="'cell'">
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
                            <td class="text-center">{{action.actionName}}</td>
                            <td class="text-center">{{action.time.toLocaleDateString()}} {{action.time.toLocaleTimeString()}}</td>
                            <td class="text-center">
                                <q-checkbox v-model="action.done" color="teal" @click.native="update(action)" />
                            </td>
                            <td class="text-center">
                                <q-btn rounded flat dense color="red" icon="delete" />
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-item>
            <q-item class="heartrate">
                <graph class=graph v-if="patient" :chartdata="patient.heartrate"></graph>
            </q-item>
        </q-item>
    </div>
</template>

<script>
    import patientManager from "../util/managers/patientManager"
    import Graph from '../components/Graph'
    import {allowedActions} from "../util/settings"
    export default {
        name: 'PatientPage',
        data() {
            return {
                patient: {},
                mapView: true,
                chartData: null, 
                filter: false
            }
        },
        components: {
            Graph
        },
        methods: {
            getPatient() {
                patientManager.get(this.$route.params.id)
                    .then(result => {
                        if (result){
                            this.patient = result
                            this.patient.actions.sort((a,b)=>a.time-b.time)
                        }
                        else
                            this.$router.push({
                                name: "404"
                            })
                    })
                    .catch(e => console.error("error: ", e))
            },
            async update(a) {
                await patientManager.update(this.patient)
            },
        },
        created() {
            this.getPatient()
        },
        computed: {
            patientBirth() {
                return new Date(this.patient.dob).toLocaleDateString()
            },
            filteredActions(){
                if(this.filter)
                    return this.patient.actions.filter(a=>!a.done)
                else 
                    return this.patient.actions
            }
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
    .actions{
        display: flex;
        flex-direction: column;
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
