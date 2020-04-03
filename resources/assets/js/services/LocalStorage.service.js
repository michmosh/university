const LocalStorageService = {

    setLocalStorage(user){
        let storageObject = JSON.stringify({...user});
        localStorage.setItem("user",storageObject);
    },

    getLocalStorage(){
        let userString = localStorage.getItem('user');
        let user = {};
        if(userString){
            user = JSON.parse(userString);
        }
        return user;
    },

    removeLocalStorage(){
        localStorage.removeItem('user');
    }
}

export default LocalStorageService;