//code from:
//https://austincooper.dev/2019/08/09/vue-observable-state-store/
import Vue from 'vue';

const setting = Vue.observable({
    actionThreshold: 120,
    HRthreshold: {min:40,max:180}
});

 const getters = {
    actionThreshold: () => setting.actionThreshold,
    HRthreshold: () => setting.HRthreshold
}

 const setters = {
    setActionThreshold: (val) => setting.actionThreshold = val,
    setHRthreshold: (val) => setting.HRthreshold = val
}

 export default {getters,setters}