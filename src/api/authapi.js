import MainApiClient from './mainclient'
import axios from 'axios';

class MainApiClient_auth extends MainApiClient {

    constructor(){
        super()
    }

    POST_loginFirst(callback, body = {}){
        try {
            const config = {
                url: this.getUrl(['account', 'login']),
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            }
            console.log(config)
            return axios.request(config)
            .then(function(response) {
    
                callback(response);
            })
            .catch(function(err) {
                console.log(err, 'asdasdasdsad');
                callback(err);
            })
            
        }
        catch (e) {
            callback(e); // pass exception object to err handler
        }

    }

    POST_login(callback, body = {}){
        try {
            const config = {
                url: this.getUrl(['account', 'refreshtoken']),
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            }
            console.log(config)
            return axios.request(config)
            .then(function(response) {
    
                callback(response);
            })
            .catch(function(err) {
                console.log(err, 'asdasdasdsad');
                callback(err);
            })
            
        }
        catch (e) {
            callback(e); // pass exception object to err handler
        }

    }
    
}

export default MainApiClient_auth;