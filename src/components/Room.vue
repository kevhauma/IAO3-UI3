<template app="room">
<div>
    {{room.id}}
 <q-card>
      <q-item class="card-top">
        <q-item-section avatar>
          <q-avatar v-if="patient">
            <img :src='patient.img'>
          </q-avatar>
        </q-item-section>

        <q-item-section v-if="patient">
          <q-item-label>{{patient.name}}</q-item-label>
          <q-item-label caption>{{patient.reason}}</q-item-label>
        </q-item-section>
      </q-item>

     
       <q-card-actions align="around">
        <q-btn v-if="room.facilities.TV" flat round color="red" icon="live_tv"/>
        <q-btn v-if="!room.facilities.TV" flat round color="red" icon="tv_off"/>
        <q-btn v-if="room.facilities.sanitair" flat round color="teal" icon="wc"/>
        <q-btn v-if="room.facilities.salon" flat round color="primary" icon="event_seat"/>
        <q-btn v-if="room.facilities.kinderverzorging" flat round color="primary" icon="child_friendly"/>
      </q-card-actions>

    </q-card>
    </div>
</template>
<script>
    import REST from "../util/REST.js"
    export default {
        name: 'room',
        props: {
            room: {
                type: Object,
            },
        },
        data() {
            return {
                patient: null,
            }
        },
        created() {
            if (this.room.patient) {
                REST.get(`/patient/${this.room.patient}`)
                    .then(patient => this.patient = patient)
                    .then(()=> console.log(this.patient))
            }
        }
    }

</script>

<style>
    .q-card{
        height:100%;
        padding:0;
    }
</style>