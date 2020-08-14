import MainApiClient from './mainclient'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'

import {ensureAccessTokenIsValid} from './authutil'

class MainApiClient_proximitydevice extends MainApiClient {

    constructor(){
        super()
    }

    GET_printer_from_proximity_id(callback,proximityId){
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                const config = {
                    url: self.getUrl(['proximitydevices',"printers",proximityId]),
                    method: 'get',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
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
        })
        

    }

    GET_proximitydevice_list(callback){
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                const config = {
                    url: self.getUrl(['proximitydevices']),
                    method: 'get',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
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
        })
        

    }   
    GET_proximitydevice_printers_mappable(callback, index){
        var self = this;
        ensureAccessTokenIsValid(async function(accessToken){
            try {
                const config = {
                    url: await self.getUrl(['proximitydevices', 'printers', 'mappable']),
                    method: 'get',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
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
        })
        

    } 
    
}

export default MainApiClient_proximitydevice;