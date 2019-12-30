//from
//https://forum.quasar-framework.org/topic/3267/how-to-use-socket-io-in-quasar-building-an-electron-app/16

//If you want to use socket in .js files, like for Vuex, you simply: import { socket } from ‘boot/socket’
//If you want to use it within .vue files, simply refer to it as: this.$socket

import io from 'socket.io-client'
import {SOCKET_PATH} from '../util/constants'

const socket = io.connect(`${SOCKET_PATH}`)

export default ({Vue}) => {
    Vue.prototype.$socket = socket
}
export {socket}


