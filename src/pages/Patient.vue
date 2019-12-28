<template>
    <div class="PatientWrapper">
        this is a patient screen
        <div v-if="patient">
            name: {{patient.name}}
        </div>
        <div class="heartrate">
            
        </div>
    </div>
</template>

<script>
    import patientManager from "../util/managers/patientManager"
    export default {
        name: 'PatientPage',
        data() {
            return {
                patient: null,
                mapView: true,
            }
        },
        methods: {
            getPatient() {
                patientManager.get(this.$route.params.id)
                    .then(result => {
                        this.patient = result
                    })
                    .catch(e => console.error("error: ", e))
            }
        },
        created() {
            console.log("created")
            this.getPatient()
        },
        watch: {
            '$route.params': {
                handler() {
                    console.log("watched");
                    this.getPatient()
                },
                immediate: true
            },
        }
    }

</script>
