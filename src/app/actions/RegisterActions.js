import axios from "axios";

export function register(data){
    return dispatch => {
        console.log("APIBASEURL:" + APIBASEURL);
        return axios.post( APIBASEURL + "/users/", data);
    }
}