<template app="settings">
    <div class="settingContainer" :style="primaryBackground()">
        <div style="padding: 10px;">
            <h4>Settings</h4>
            <div class="ranges">
                <div class="range">
                    <div >
                        heartrate range: {{ hr.min }}bpm to {{ hr.max }}bpm
                    </div>
                    <q-range v-model="hr" :min="0" :max="300" color="white" />
                </div>
                <div class="range">
                    
                    <div>
                        action range: {{ actionTime }}
                    </div>
                    <q-slider v-model="action" :min="0" :max="180" color="white" :step="15" />
                </div>
            </div>

            
            <q-item caption>show in room</q-item>
            <q-option-group v-model="roomSettings.group" :options="roomSettings.options" type="checkbox" color="green" inline dense />
            <q-item caption>Alarm <q-checkbox v-model="audio" color="green"></q-checkbox>
            </q-item>

            <div class="colorpickers">
                <div>
                    <q-badge :style="{background:clearHex}" text-color="black" class="q-mb-sm">
                        CLEAR
                    </q-badge>

                    <q-color v-model="clearHex" default-view="palette" :palette="getPallete(clearHex)" class="my-picker" />
                </div>
                <div>
                    <q-badge :style="{background:soonHex}" text-color="black" class="q-mb-sm">
                        SOON
                    </q-badge>

                    <q-color v-model="soonHex" default-view="palette" :palette="getPallete(soonHex)" class="my-picker" />
                </div>
                <div>
                    <q-badge :style="{background:emergencyHex}" text-color="black" class="q-mb-sm">
                        EMERGENCY
                    </q-badge>
                    <q-color v-model="emergencyHex" default-view="palette" :palette="getPallete(emergencyHex)" class="my-picker" />
                </div>
                <div>
                    <q-badge :style="{background:treshHex}" text-color="black" class="q-mb-sm">
                        THRESH
                    </q-badge>

                    <q-color v-model="treshHex" default-view="palette" :palette="getPallete(treshHex)" class="my-picker" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import settings from "../util/settings.js"
    import {
        colors
    } from 'quasar'
    let {
        lighten
    } = colors
    export default {
        name: 'setting',
        data() {
            return {
                hr: settings.getters.HRthreshold(),
                action: settings.getters.actionThreshold(),
                roomSettings: settings.getters.roomSettings(),
                audio: settings.getters.audioOn(),
                clearHex: settings.getters.clearHex(),
                emergencyHex: settings.getters.emergencyHex(),
                soonHex: settings.getters.soonHex(),
                treshHex: settings.getters.treshHex(),
            }
        },
        methods: {
            primaryBackground() {
                return {
                    'background-color': colors.getBrand('primary')
                }
            },
            getPallete(color) {
                return [lighten(color, -25),
                    lighten(color, -15),
                    lighten(color, -5),
                    lighten(color, 5),
                    lighten(color, 15),
                    lighten(color, 25),
                ]
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
            clearHex() {
                settings.setters.setClearHexn(this.clearHex)
            },
            emergencyHex() {
                settings.setters.setEmergencyHex(this.emergencyHex)
            },
            soonHex() {
                settings.setters.setSoonHex(this.soonHex)
            },
            treshHex() {
                settings.setters.setTreshHex(this.treshHex)
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
        max-width: 500px;
    }

    .colorpickers {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .my-picker {
        margin: 5px;
        flex: 200px;
    }
    .ranges{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
