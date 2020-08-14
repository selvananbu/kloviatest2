import MainApiClient from './mainclient'
import axios from 'axios';

import RNFetchBlob from 'rn-fetch-blob'
import {ensureAccessTokenIsValid} from './authutil'

class MainApiClient_releaseprintjob extends MainApiClient {

    constructor(){
        super()
    }

    
   POST_releaseprintjob(callback, body = {}){
        var self = this;
        ensureAccessTokenIsValid(function(accessToken){
            try {
                RNFetchBlob.fetch('POST', self.getUrl(['printjobs', 'release','v2']), {
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

export default MainApiClient_releaseprintjob;