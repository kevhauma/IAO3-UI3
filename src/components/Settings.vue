<template app="settings">
    <div class="settingContainer" :style="primaryBackground()">
        <div style="padding: 10px;">
            <h4>Settings</h4>
            <div>
                heartrate range: {{ hr.min }}bpm to {{ hr.max }}bpm
            </div>

            <q-range v-model="hr" :min="0" :max="300" color="white" />
            <div>
                action range: {{ actionTime }}
            </div>

            <q-slider v-model="action" :min="0" :max="180" color="white" :step="15" />
            <q-item caption>show in room</q-item>
            <q-option-group v-model="roomSettings.group" :options="roomSettings.options" type="checkbox" color="green" inline dense />
            <q-item caption>Alarm <q-checkbox v-model="audio" color="green"></q-checkbox></q-item> 
    </div>
    </div>
</template>
<script>
    import settings from "../util/settings.js"
    import {
        colors
    } from 'quasar'

    export default {
        name: 'setting',
        data() {
            return {
                hr: settings.getters.HRthreshold(),
                action: settings.getters.actionThreshold(),
                roomSettings: settings.getters.roomSettings(),
                audio: settings.getters.audioOn(),
            }
        },
        methods: {
            primaryBackground() {
                return {
                    'background-color': colors.getBrand('primary')
                }
            }
        },
        computed: {
            actionTime() {
                let hours = Math.floor(this.action / 60)
                let minutes = this.action % 60
                return `${hours?`${hours}h`:""}${minutes?`${minutes}m`:""}`

            }
        },
        watch: {
            hr() {
                settings.setters.setHRthreshold(this.hr)
            },
            action() {
                settings.setters.setActionThreshold(this.action)
            },
            'roomSettings.group': {
                handler() {
                    settings.setters.setRoomSettings(this.roomSettings)
                },
                deep: true,
            },
            audio() {
                settings.setters.setAudioOn(this.audio)
            },
        }
    }

</script>

<style scoped>
    h4 {
        margin: 20px;
    }

    .settingContainer {
        position: fixed;
        right: 0px;
        top: 50px;
        z-index: 1;
    }

</style>
