import MainApiClient from './mainclient'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'


class MainApiClient_document extends MainApiClient {

    constructor(){
        super()
    }

    GET_printJobsCurrent(callback, index, currentUser, accesstoken){
        try {
            const config = {
                url: this.getUrl(['printjobs', index, currentUser]),
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accesstoken}`
                }
            }
            console.log(accesstoken)
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

    GET_printJobsPrintFile(callback, body = {}, accesstoken){
        try {

            RNFetchBlob.fetch('POST', this.getUrl(['printjobs', 'file']), {
                "Authorization": `Bearer ${accesstoken}`,

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

    }   
    
}

export default MainApiClient_document;