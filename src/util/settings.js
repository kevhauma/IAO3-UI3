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
    clearHex: "#00FF00",
    soonHex: "#f5cb34",
    emergencyHex: "#f58734",
    treshHex: "#FF0000",
    
});

const getters = {
    actionThreshold: () => setting.actionThreshold,
    HRthreshold: () => setting.HRthreshold,
    roomSettings: () => setting.roomSettings,
    audioOn: () => setting.audioOn,
    clearHex: () => setting.clearHex,
    soonHex: () => setting.soonHex,
    emergencyHex: () => setting.emergencyHex,
    treshHex: () => setting.treshHex,
}

const setters = {
    setActionThreshold: (val) => setting.actionThreshold = val,
    setHRthreshold: (val) => setting.HRthreshold = val,
    setRoomSettings: (val) => setting.roomSettings = val,
    setAudioOn: (val) => setting.audioOn = val,
    setClearHex: (val) => setting.clearHex = val,
    setSoonHex: (val) => setting.soonHex = val,
    setEmergencyHex: (val) => setting.emergencyHex = val,
    setTreshHex: (val) => setting.treshHex = val,
}

export default {
    getters,
    setters
}
