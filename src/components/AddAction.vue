<template app='AddAction'>
    <q-dialog :value="show">
        <q-card style="min-width: 300px">
            <q-card-section>
                <div class="text-h6">Add Action</div>
            </q-card-section>

            <q-card-section>
                <q-select outlined v-model="newAction.type" :options="allowedActions" dense>
                    <template v-slot:prepend>
                        <q-icon name="assignment" />
                    </template>
                </q-select>
            </q-card-section>
            <q-card-section>
                <div class="q-gutter-md row items-start">
                    <q-date v-model="newAction.time" mask="YYYY-MM-DD HH:mm" color="primary" required />
                    <q-time v-model="newAction.time" mask="YYYY-MM-DD HH:mm" color="primary" reauired />
                </div>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" @click="cancel()" />
                <q-btn flat label="Add Action" @click="confirm()" />
            </q-card-actions>
        </q-card>

    </q-dialog>

</template>
<script>
    import {
        allowedActions
    } from "../util/constants"
    export default {
        name: 'AddAction',
        data() {
            return {
                newAction: {}
            }
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        },
        methods: {
            cancel(){
                this.$emit('add-cancel')
                this.newAction = this.startAction    
            },
            confirm(){
                this.$emit('add-confirm',this.clonedAction)
                this.newAction = this.startAction    
            }
        },
        created() {
            this.newAction = this.startAction
        },
        computed: {
            allowedActions() {
                return allowedActions
            },
            firstAction() {
                return allowedActions[0]
            },
            clonedAction() {
                return {...this.newAction}
            },
            startAction() {
                return {
                    type: this.firstAction,
                    time: new Date(),
                    done: false,
                }
            }

        },

    }

</script>
<style>


</style>
