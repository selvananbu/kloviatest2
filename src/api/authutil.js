const ensureAccessTokenIsValid = (functionAfterTokenisValid, site = conversionLib.getLocalStorageValue("config.sitename")) => {
    mutex
    .acquire()
    .then(function(release) {
        let siteName = site;
        let accessToken = conversionLib.getLocalStorageValue("config.accessToken." + siteName);
        let refreshToken = conversionLib.getLocalStorageValue("config.refreshToken." + siteName);
        let username = conversionLib.getLocalStorageValue("config.username");

        var isValid = checkAccessTokenIsValid(accessToken);
        var promisesToMake = null;
        if (!isValid) {
            
            console.log("-------------- Refresh authentication --------------")
            promisesToMake = [refreshAuth(refreshToken, username)];
            
            Promise.all(promisesToMake)
            .then(function(results) {
                // console.log("--------- PROMISE CALL COMPLETED ---------", results);

                let refreshedAccessToken = conversionLib.getLocalStorageValue("config.accessToken." + siteName);
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