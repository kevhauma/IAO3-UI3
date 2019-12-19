<template app="room">
 <q-card v-if="patient">
      <q-item class="card-top">
        <q-item-section avatar>
          <q-avatar>
            <img src="patient.img">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{patient.name}}</q-item-label>
          <q-item-label caption>{{patient.reason}}</q-item-label>
        </q-item-section>
      </q-item>

     
       <q-card-actions align="around">
        <q-btn v-if="room.facilites.TV" flat round color="red" icon="live_tv"/>
        <q-btn v-if="!room.facilites.TV" flat round color="red" icon="tv_off"/>
        <q-btn v-if="room.facilites.sanitair" flat round color="teal" icon="wc"/>
        <q-btn v-if="room.facilites.salon" flat round color="primary" icon="event_seat"/>
        <q-btn v-if="room.facilites.kinderverzorging" flat round color="primary" icon="child_friendly"/>
      </q-card-actions>

    </q-card>
</template>
<script>
    export default {
        name: 'room',
        props: {
            room: {
                type: Object,
            },
        },
        data() {
            return {

            }
        },
        computed: {
            patient: async() => await REST.get(`${URI_PATH}/patient/${room.patient}`)

        }
    }

</script>
