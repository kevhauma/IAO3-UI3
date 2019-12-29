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
                        <q-icon name="event" />{{patientBirth}}</q-item>
                    <q-item v-if="patient.vegan">
                        vegan:
                        <q-icon name="nature" color="green" />
                    </q-item>
                    <q-item>{{patient.reason}}</q-item>
                </q-item>
            </div>
        </div>
        <q-item class="actionAndHeartrate">
            <q-item class=actions>
                <q-list>
                    <q-item class="actionListItem" v-for="action in patient.actions" :key="action.id">
                        <q-item-section>
                            {{action.actionName}}
                        </q-item-section>
                        <q-item-section>
                            {{action.time.toLocaleDateString()}} {{action.time.toLocaleTimeString()}}
                        </q-item-section>
                        <q-item-section>
                            <q-checkbox v-model="action.done" color="teal" @click.native="update(action)" />
                        </q-item-section>

                        <q-item-section>
                            <q-avatar clickable ripple color="grey" text-color="white" icon="edit" />
                        </q-item-section>
                        <q-item-section>
                            <q-avatar clickable ripple color="red" text-color="white" icon="delete" />
                        </q-item-section>

                    </q-item>
                </q-list>
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
    export default {
        name: 'PatientPage',
        data() {
            return {
                patient: {},
                mapView: true,
                chartData: null,
            }
        },
        components: {
            Graph
        },
        methods: {
            getPatient() {
                patientManager.get(this.$route.params.id)
                    .then(result => {
                        if (result)
                            this.patient = result
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

    .actionListItem {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;
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
    .heartrate, .actions{
         flex: 30%;
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
