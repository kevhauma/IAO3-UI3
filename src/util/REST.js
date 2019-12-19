import axios from "axios"

async function get(path){
    let result = axios.get(path)
    return result.data
}
async function post(path){
    let result = axios.post(path)
    return result.data
}
async function update(path){
    let result = axios.put(path)
    return result.data
}
async function del(path){
    let result = axios.delete(path)
    return result.data
}


export default {
    get,post,update,del
}