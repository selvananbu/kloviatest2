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
        ensureAccessTokenIsValid(async function(accessToken){
            try {
                const config = {
                    url: await self.getUrl(['printjobs', index, currentUser]),
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

    GET_availableRenderStationForPrinter(callback,printerId){
        var self = this;
        ensureAccessTokenIsValid(async function(accessToken){
            try {
                RNFetchBlob.fetch('GET', await self.getUrl(['renderstations','mobile','release','printer',printerId]), {
                    "Authorization": `Bearer ${accessToken}`,
                })
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
        ensureAccessTokenIsValid(async function(accessToken){
            try {
                RNFetchBlob.fetch('POST', await self.getUrl(['printjobs', 'file']), {
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