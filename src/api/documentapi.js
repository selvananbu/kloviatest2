import MainApiClient from './mainclient'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'

import {ensureAccessTokenIsValid} from './authutil'

class MainApiClient_document extends MainApiClient {

    constructor(){
        super()
    }

    
    GET_printJobsCurrent(callback, index, currentUser){
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                const config = {
                    url: self.getUrl(['printjobs', index, currentUser]),
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
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

    GET_printJobsPrintFile(callback, body = {}){
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {

                RNFetchBlob.fetch('POST', self.getUrl(['printjobs', 'file']), {
                    "Authorization": `Bearer ${accessToken}`,
    
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf',
                }, JSON.stringify(body))
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

export default MainApiClient_document;