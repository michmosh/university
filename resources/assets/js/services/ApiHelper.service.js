import axios from 'axios';
const ApiHelperService = {
    setAxiosHeaders(api_token){
        axios.defaults.headers.common["Authorization"] =  'Bearer ' + api_token;
    },
    removeAxiosHeader(){
        delete axios.defaults.headers.common["Authorization"];
    }
} 
export default ApiHelperService;