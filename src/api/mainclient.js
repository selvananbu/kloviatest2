import AsyncStorage from '@react-native-community/async-storage';

class MainApiClient {
    constructor(){
    }

    async getUrl(entities = [], parameters = {}){
        // console.log('asdasdasd')
        var fetchURL = await AsyncStorage.getItem('com.processfusion.baseurl') 
        // var url = "https://infinitycloudadmin.uniprint.net";
        var url = fetchURL
        entities.forEach(entity => {
            url += '/' + entity;
        });

        var first = true;

        for(var key in parameters){
            if(first){
                url += '?';
                first = false;
            }   
            else{
                url += '&';
            }
            url += key+ '=' + parameters[key];
        }

        return(url);
    }

}

export default MainApiClient;