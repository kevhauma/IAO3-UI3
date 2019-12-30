<template app="searchlist">
    <q-list class="searchlist" show-if-above bordered content-class="bg-grey-2">
        <q-item>
                {{resultCount}}  gevonden
            </q-item>
        <q-item v-for="patient in results" :key="patient.id" class="searchListItem">            
            <q-item clickable tag="a" @click.native="goToPatient(patient)"  class="searchListItemInner">
                <q-item-section avatar>
                    <q-avatar>
                        <img :src="patient.img"/>
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{patient.name}}</q-item-label>
                    <q-item-label caption>{{patient.nextAction().type}}: {{patient.nextTimeStamp()}}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                    <q-item-label caption>{{patient.status}}</q-item-label>
                     <q-icon name="nature" color="green" v-if="patient.vegan"/>
                    <q-item-label caption> <q-icon name="favorite" color="red"/> {{patient.latestHeartRate()}}</q-item-label>
                </q-item-section>
            </q-item>
        </q-item>
    </q-list>
</template>

<script>
    export default {
        name: 'searchlist',
        data() {
            return {

            }
        },
        props: {
            results: {
                type: Array
            }
        },
        methods: {
            goToPatient(p){
                console.log("going to:", p.name)
                 
                this.$emit("on-select",p.id)
            }
        },
        computed:{
            resultCount(){
                return this.results.length == 1 ? `${this.results.length} resultaat` : `${this.results.length} resultaten`
            }
        },
        watch: {
            results: {
                handler(newRes) {
                    this.results = newRes
                }
            }
        }
    }

</script>
<style>
    .searchlist {
        position: absolute;
        max-height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
        max-width: 400px;
        top: 50px;
        right: 0px;
        border-radius: 5px;
        background:rgba(155,155,155,0.8);
    }

    .searchListItem {
        justify-content: flex-end;
        width: 100%;
    } .searchListItemInner {
        width: 100%;
    }

</style>
