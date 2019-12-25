<template app="room">

 <div class="room-container">
     <div class="roomId">{{room.id}}</div>
      <q-item  class="patientInfo" @click.native="onRoomSelected">
        <q-item-section avatar v-if="patient" class="patientMain">
          <q-avatar class="patientAvatar">
            <img :src='patient.img'>
          </q-avatar>
           <q-item-label>{{patient.name}}</q-item-label>
        </q-item-section>

        <q-item-section v-if="patient" class="patientName">         
          <q-item-label caption>{{patient.reason}}</q-item-label>
        </q-item-section>
      </q-item>

       <q-item class="facilities">
        <q-icon v-if="room.facilities.TV" flat round color="green" name="live_tv"/>
        <q-icon v-if="!room.facilities.TV" flat round color="red" name="tv_off"/>
        <q-icon v-if="room.facilities.sanitair" flat round color="teal" name="wc"/>
        <q-icon v-if="room.facilities.salon" flat round color="brown" name="event_seat"/>
        <q-icon v-if="room.facilities.kinderverzorging" flat round color="amber" name="child_friendly"/>
      </q-item>
    </div>

</template>
<script>
    import patientManager from "../util/managers/patientManager.js"
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
                patientManager.get(this.room.patient)
                    .then(patient => this.patient = patient)
            }
        },
        methods:{
            onRoomSelected(event){
                if(this.patient){
                    this.$emit('patient-selected',this.patient.id)
                }
            }, 
        }
    }

</script>

<style>
    .room-container{
        padding:5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: space-between;
        -webkit-box-shadow: inset 0px 0px 10px 8px rgba(255,0,0,1);
        -moz-box-shadow: inset 0px 0px 10px 8px rgba(255,0,0,1);
        box-shadow: inset 0px 0px 10px 8px rgba(255,0,0,1);
    }
    .patientInfo{
        flex-grow: 2;
    }
    .patientInfo :hover{
        cursor: pointer;
    }
    .facilities{
       display: flex;
        flex-wrap: nowrap;        
        justify-content: center;
        max-width: 100%;
        padding: 0;        
    }
    .facilities i {
        font-size: 2em;
    margin: 4px;
    }

    .patientInfo{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:0;
    }
    .patientMain{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .patientName{
        flex-grow: 2;
    }
</style>