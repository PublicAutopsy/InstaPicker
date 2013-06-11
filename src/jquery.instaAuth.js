
(function($){
    $.fn.instaAuth = function (CLIENTID, REDIRECTURI, SUCCESSCALLBACK) {
        console.log(this);
        var clientId;
        var accessToken;
        var UID;
        var successCallback = SUCCESSCALLBACK;
        var clientId = CLIENTID;      
        var loginUrl = "https://instagram.com/oauth/authorize/?client_id=" + CLIENTID + "&redirect_uri=" + REDIRECTURI + "&response_type=token";
      
        authorize();

       function authorize(){
            
            if (accessToken != undefined) {
                var idUrl = "https://api.instagram.com/v1/users/self?access_token=" + accessToken;

                $.ajax({
                    url: idUrl,
                    dataType: 'jsonp',
                    success: function (results) {
                       
                        UID = results.data.id;
                        accessToken = accessToken;

                        console.log(results)
                        console.log(UID);
                        console.log(accessToken);
                        successCallback();

                    }
                });

            } else {
                console.log("setting auth success");
                var authWindow = window.open(loginUrl,"Instagram Login", "width=446,height=361");
                
            }
            
            
            
        }

        $.fn.instaAuth.successfulAuth = function (accessTokenReturn ){
                
            accessToken = accessTokenReturn;
            var idUrl = "https://api.instagram.com/v1/users/self?access_token=" + accessToken;

                $.ajax({
                    url: idUrl,
                    dataType: 'jsonp',
                    success: function (results) {
                       
                        UID = results.data.id;
                        successCallback();
                    }
                });
        }



        $.fn.instaAuth.getAccessToken = function(){
            return accessToken;
        }
        $.fn.instaAuth.getUserId = function(){
            return UID;
        }
        
        

    }

})(jQuery);
