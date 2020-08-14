class MainApiClient {
    constructor(){
    }

    getUrl(entities = [], parameters = {}){

        var url = "https://infinitycloudc-stage.azurewebsites.net/api";

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