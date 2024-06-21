 export let storage = {
    set: (name,value) =>{
         localStorage.setItem(name,value)
    },
    get: (name) => {
       return localStorage.getItem(name)
    },
    remove :(name) =>{
        localStorage.removeItem(name)
    },
    has : (name) => {
        if(storage.get(name) == undefined){
            return false
        }else {
            return true
        }
    }
}