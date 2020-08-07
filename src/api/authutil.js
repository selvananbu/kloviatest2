import MainApiClient_auth from './authapi';
import {Mutex} from 'async-mutex';
import AsyncStorage from '@react-native-community/async-storage';


const mutex = new Mutex();

export const ensureAccessTokenIsValid = (functionAfterTokenisValid) => {
    mutex
    .acquire()
    .then(async function(release) {
        let data = await AsyncStorage.getItem('com.processfusion.userdata');
        let currentData = JSON.parse(data)
        let accessToken = JSON.parse(data).AccessToken;

        var isValid = checkAccessTokenIsValid(accessToken);
        var promisesToMake = null;
        if (!isValid) {
            promisesToMake = [refreshAuth(currentData)];
            
            Promise.all(promisesToMake)
            .then(async function(results) {
                let refreshedAccessTokenTemp = await AsyncStorage.getItem('com.processfusion.userdata');
                let refreshedAccessToken = JSON.parse(refreshedAccessTokenTemp).AccessToken;

                if(checkAccessTokenIsValid(refreshedAccessToken)) {
                    release();
                    functionAfterTokenisValid(refreshedAccessToken);            
                }
                else {
                    // add some logging
                    release();
                }
            });
        }
        else {
            release();
            functionAfterTokenisValid(accessToken);
        }
    }); // mutex - Acquire
}

const refreshAuth = (data) => {
    const body = {
        AccessToken: data.AccessToken,
        RefreshToken: data.RefreshToken,
        Rts: data.Rts
    }
    // console.log(body, 'asdasd')
    // return new MainApiClient_auth().POST_login(getTokenCallback, body)
    return new Promise(function(resolve, reject) {
        new MainApiClient_auth().POST_login((res) => getTokenCallback(res, resolve), body)

    
    }).then(function(result) {
        return result;
    })
}

const getTokenCallback  = async (responseData, resolve) => {
    // console.log('sadsadsad', responseData, resolve)
    if (responseData.status === 200) {
        var data = responseData.data;
        AsyncStorage.setItem("com.processfusion.userdata", JSON.stringify(data));
        var temp = await AsyncStorage.getItem("com.processfusion.userdata")
        // console.log(temp);
        resolve(temp)
    }
}

const checkAccessTokenIsValid = (accessToken) => {
    if(accessToken === null || accessToken === undefined)
        return false;

    let parts = accessToken.split(".");
    if(parts.length !== 3)
    {
        console.error("Invalid access token format");
        return false;
    }
    // console.log(accessToken, 'asdasdasdasdasd')
    var decodedPayload = decodeToken(parts[1]);
    var timeDiffMillis = (decodedPayload.exp * 1000) - Date.now();
    var timeDiffSec = Math.floor(timeDiffMillis/1000); // in seconds

    console.log("Remaining sec: ", timeDiffSec);
    return (timeDiffSec > 60 ? true : false);
}

const decodeToken = (tokenPart) => {
    var playload = JSON.parse(atob(tokenPart));
    return(playload);
}