function getLocalStorage(key="dados"){          
    try{        
        if(!!JSON.parse(window.localStorage.getItem(key))){
            return JSON.parse(window.localStorage.getItem(key))
        }else{
            window.localStorage.setItem(key, JSON.stringify([]));
            return JSON.parse(window.localStorage.getItem(key))
        }
    }catch{        
        window.localStorage.setItem(key, JSON.stringify([]));
        return JSON.parse(window.localStorage.getItem(key));        
    }    
}
export default getLocalStorage;