import axios from 'axios'
import {
    URI_PATH
} from './constants'
import errorService from './services/errorService'

const options = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}


async function get(path) {
    try {
        let result = await axios.get(`${URI_PATH}${path}`, options)
        return result.data
    } catch (e) {
        errorService.showAlert("Failed getting data")
        errorService.log(e)
    }
}
async function post(path, toPost) {
    try {
        let result = await axios.post(`${URI_PATH}${path}`, toPost, options)
        return result.data
    } catch (e) {
        errorService.showAlert("Failed sending data")
        errorService.log(e)
    }
}
async function update(path, toUpdate) {
    try {
        let result = await axios.put(`${URI_PATH}${path}`, toUpdate, options)
        return result.data
    } catch (e) {
        errorService.showAlert("Failed updating data")
        errorService.log(e)
    }
}
async function del(path) {
    try {
        let result = await axios.delete(`${URI_PATH}${path}`, options)
        return result.data
    } catch (e) {
        errorService.showAlert("Failed deleting data")
        errorService.log(e)
    }
}

export default {
    get,
    post,
    update,
    del
}
