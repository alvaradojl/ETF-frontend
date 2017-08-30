import axios from "axios";

export function addEvent(data){
    return dispatch => {
        console.log("APIBASEURL:" + APIBASEURL);

        return axios.post(APIBASEURL + "/events/", data);
    }
}