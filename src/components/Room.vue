<template app="room">

    <div class="room-container" :style="{position}">
        <div class="topRow">
            <div class="roomId">{{room.id}}</div>
            <div class="heartrate" v-if="patient" v-show="roomSettings.heartrate">
                <q-icon color="red" name="favorite"></q-icon>{{patient.latestHeartRate()}}
            </div>
            <q-icon name="file_copy" class="detailButton" v-if="patient" title="View details" @click.native="onRoomSelected"></q-icon>
        </div>
        <div v-if="patient" :style="getStatusStyle()" class="statusbar">
            <audio autoplay loop v-if="patient.status === 'THRESH' && audioOn" style="display:none">
                <source src="../assets/alarm.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
        <q-item class="patientInfo">
            <q-item-section avatar class="patientMain" v-if="patient">
                <q-avatar class="patientAvatar" v-show="roomSettings.picture">
                    <img :src='patient.img'>
                </q-avatar>
                <q-item-label>{{patient.name}}</q-item-label>
            </q-item-section>

            <q-item-section class="patientMore" v-if="patient">
                <q-item-label caption v-show="roomSettings.reason">{{patient.reason}}</q-item-label>
                <q-item-label caption class="nextAction" v-if="nextAction" v-show="roomSettings.action">
                    <q-icon name="assignment" style="font-size:2em"></q-icon>
                    <div>
                        <em>{{nextAction.type}}</em><br>
                        {{patient.nextTimeStamp()}}
                    </div>
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-item class="facilities" v-show="roomSettings.facilities">
            <q-icon v-if="room.facilities.TV" flat round color="green" name="live_tv" title="TV" />
            <q-icon v-if="!room.facilities.TV" flat round color="red" name="tv_off" title="GEEN TV" />
            <q-icon v-if="room.facilities.sanitair" flat round color="teal" name="wc" title="SANITAIR" />
            <q-icon v-if="room.facilities.salon" flat round color="brown" name="event_seat" title="SALON" />
            <q-icon v-if="room.facilities.kinderverzorging" flat round color="amber" name="child_friendly" title="KINDERVERZORGING" />
        </q-item>
    </div>

</template>
<script>
    import patientManager from "../util/managers/patientManager.js"
    import settings from "../util/settings.js"

    export default {
        name: 'room',
        props: {
            room: {
                type: Object,
            },
            position: String,
        },
        data() {
            return {
                patient: null,
            }
        },
        computed: {
            nextAction() {
                return this.patient.nextAction()
            },

            roomSettings() {
                let s = settings.getters.roomSettings().group
                let rs = {}
                s.forEach(o => rs[o] = true)

                return rs
            },
            audioOn() {
                return settings.getters.audioOn()
            }

        },
        created() {
            if (this.room.patient) {
                patientManager.get(this.room.patient)
                    .then(patient => {
                        this.patient = patient
                    })
            }
        },
        methods: {
            onRoomSelected(event) {
                if (this.patient) {
                    this.$emit("patient-selected", this.patient.id)
                }
            },
            getStatusStyle() {
                switch (this.patient.status) {
                    case "CLEAR": {
                        return {
                            background: settings.getters.clearHex()
                        }
                    }
                    case "SOON": {
                        return {
                            background: settings.getters.soonHex()
                        }
                    }
                    case "EMERGENCY": {
                        return {
                            background: settings.getters.emergencyHex()
                        }
                    }
                    case "THRESH": {
                        return {
                            background: settings.getters.treshHex(),
                            'animation-name': "warning",
                            'animation-duration': "1s",
                            'animation-iteration-count': "infinite",
                        }
                    }
                }
            }

        },
    }

</script>

<style>
    .room-container {
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: space-between;
    }

    .patientInfo {
        flex-grow: 2;
    }


    .facilities {
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

    .topRow {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .detailButton:hover {
        cursor: pointer;
    }

    .patientInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
    }

    .patientMain {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }

    .patientName {
        flex-grow: 2;
    }

    .statusbar {
        height: 10px;
        width: 100%;
    }

    .CLEAR {
        background-color: rgba(0, 255, 0, 1);
        animation: none !important;
    }

    .SOON {
        background-color: rgba(245, 135, 51, 1);
        animation: none !important;
    }

    .EMERGENCY {
        background-color: rgba(209, 91, 0, 1);
        animation: none !important;
    }

    .THRESH {
        animation-name: warning;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }

    .nextAction {
        display: flex;
    }

    @keyframes warning {
        0% {
            opacity: 1;
        }

        50% {
             opacity: 0;
        }

        100% {
             opacity: 1;
        }
    }

</style>
