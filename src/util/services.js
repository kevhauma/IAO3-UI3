import REST from "./REST.js"
import {
    URI_PATH
} from "./constants.js"
let repos = {
    patient: [],
    room: [],
    department: []
}

function makeGet(name) {
    return async(id) => {
        if (!id)
            return repos[name]

        let found = repos[name].find(o => o.id === id)
        if (!found){
            found = await REST.get(`${URI_PATH}/${name}/${id}`)
            if(found)
                repos[name].push(found)
        }
        return found
    }
}

function makeadd(name) {
    return async(object) => {
        let added = await REST.post(`${URI_PATH}/${name}`)
        repos[name].push(added)
        return added
    }
}
function makeUpdate(name) {
    return async(id,object) => {
        let found = await makeGet(name)(id)
        if(!found) return
        
        await REST.post(`${URI_PATH}/${name}/${id}`,object)
        found = object
        return found
    }
}