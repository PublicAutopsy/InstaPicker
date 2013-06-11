(function($){
    $.fn.instapicker = function (CLIENTID, ACCESSTOKEN, UID, INITCALLBACK) {
        console.log(this);
        var imageHolder = this;
        var accessToken = ACCESSTOKEN;
        var UID = UID;
        var selectedImages = {selected: []};
        var btn = this;
        var onInit = INITCALLBACK;
        open();
        function open(){
            selectedImages = {selected: []};
             var photoUrl = "https://api.instagram.com/v1/users/" + UID + "/media/recent/?access_token=" + accessToken;
            getPhotos(photoUrl);
        }

        function close(){
            var container = $(this);

            container.fadeOut(function () {
                container.html("");
            });
        }
        
        function getPhotos(photoUrl) {
            $.ajax({
                url: photoUrl,
                dataType: 'jsonp',
                success: function (results) {
                    openLightBox(results);
                }
            });
        }
        function openLightBox(res){
            lightboxStyle = {
                "backgroundColor" : "#000",
                "position"   : "absolute",
                "width"      : "100%",
                "height"     : "100%",
                "left"       : "0px",
                "top"        : "0px",
                "display"    : "none"
            }
            lightboxContainerStyle = {
                "background" : "#fff",
                "position"   : "absolute",
                "left"       : "50%",
                "top"        : "50%",
                "width"      : "500px",
                "height"     : "200px",
                "marginTop"  : "-100px",
                "marginLeft" : "-250px",
                "padding"    : "20px"

            }
            photoContainerStyle = {
                "width"      : "100%",
                "height"     : "100%",
                "overflow"   : "scroll"

            }
            photoSelectedStyle = {
                "opacity"    : ".6"
            }
            $("body").append("<div id='lightbox'> <div id='lightbox-container'> <div id='instagram-photos'></div> <div id='instaPick-submit'>SUBMIT</div> </div> </div>");
            $("#lightbox").css(lightboxStyle);
            $("#lightbox #lightbox-container").css(lightboxContainerStyle);
            $("#lightbox #lightbox-container #instagram-photos").css(photoContainerStyle);
            $("#lightbox #lightbox-container #instagram-photos").css("display", "block");

            $("#lightbox").fadeIn(function(){
                $(".instagram-picture").click(function(){
                    if ($(this).hasClass("instaPicked")){
                        $(".instaPicked").css("opacity", "1");
                        $(this).removeClass("instaPicked");

                    } else {
                        $(this).addClass("instaPicked");
                        $(".instaPicked").css(photoSelectedStyle);
                    }

                });
                $("#instaPick-submit").click(function(){
                    $(".instaPicked").each(function(index, value){
                        selectedImages.selected.push({element: $(value), hiRes: $(value).data("highres") });
                    })

                    closeLightBox(selectedImages);
                     selectedImages = {selected: []};
                     $(".instaPicked").removeClass("instaPicked");

                });

            });

            function display(photos) {
                console.log(photos);
                var MyPhotos = photos;
                for (x = 0; x < MyPhotos.data.length; x++) {
                    $("#instagram-photos").append("<img class='instagram-picture' width='100' height='100' data-highRes='" + photos.data[x].images.standard_resolution.url + "' src='" + photos.data[x].images.low_resolution.url + "' >")
                    if ( x == MyPhotos.data.length - 1){
                        
                    }
                }
            }

            display(res);
        }
        function closeLightBox(selected){
            $("")
            $("#lightbox").fadeOut();
            $("#lightbox").remove();

            console.log(selected.selected.length);
            console.log(imageHolder);

            for (var i = 0; i < selected.selected.length; i++ ){
                selected.selected[i ].element.clone().appendTo(imageHolder);
            }
        }


        
        


    }

})(jQuery);
