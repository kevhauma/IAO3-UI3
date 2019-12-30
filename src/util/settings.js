//code from:
//https://austincooper.dev/2019/08/09/vue-observable-state-store/
import Vue from 'vue';

const setting = Vue.observable({
    actionThreshold: 120,
    HRthreshold: {
        min: 40,
        max: 180
    },
    roomSettings: {
        group: ['heartrate','facilities','picture','reason','action'],
        options: [
            {
                label: 'heartrate',
                value: 'heartrate'
            },
            {
                label: 'facilities',
                value: 'facilities'
            },
            {
                label: 'picture',
                value: 'picture'
            },
            {
                label: 'reason',
                value: 'reason'
            },
            {
                label: 'action',
                value: 'action'
            }],
     
    },
    audioOn: false,
    
});

const getters = {
    actionThreshold: () => setting.actionThreshold,
    HRthreshold: () => setting.HRthreshold,
    roomSettings: () => setting.roomSettings,
    audioOn: () => setting.audioOn,
}

const setters = {
    setActionThreshold: (val) => setting.actionThreshold = val,
    setHRthreshold: (val) => setting.HRthreshold = val,
    setRoomSettings: (val) => setting.roomSettings = val,
    setAudioOn: (val) => setting.audioOn = val,
}

export default {
    getters,
    setters
}
