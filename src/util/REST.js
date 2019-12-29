import axios from 'axios'
import {
    URI_PATH
} from './constants'

const options = {
    headers: {
	  'Access-Control-Allow-Origin': '*',        
	}
}


async function get(path) {
    let result = await axios.get(`${URI_PATH}${path}`,options)
    return result.data
}
async function post(path,toPost) {
    let result = await axios.post(`${URI_PATH}${path}`,toPost,options)
    return result.data
}
async function update(path,toUpdate) {
    let result = await axios.put(`${URI_PATH}${path}`,toUpdate,options)
    return result.data
}
async function del(path) {
    let result = await axios.delete(`${URI_PATH}${path}`,options)
    return result.data
}

export default {
    get,
    post,
    update,
    del
}
