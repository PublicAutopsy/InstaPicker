$.fn.instaPicker = function () {
    var imageHolder;
    var accessToken;
    var UID;
    var selectedImages = {selected: []};
    function initializer(){
        accessToken = window.location.hash.split("=")[1];
        if (accessToken != undefined) {
            var idUrl = "https://api.instagram.com/v1/users/self?access_token=" + accessToken;

            $.ajax({
                url: idUrl,
                dataType: 'jsonp',
                success: function (results) {
                    console.log(results)
                    UID = results.data.id;
                    console.log(UID);
                }
            });

        } else {
            console.log("Not logged in");
        }
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
                    console.log(selectedImages);
                    closeLightBox();
                })

            });

        });

        function display(photos) {
            console.log(photos);
            for (x = 0; x < photos.data.length; x++) {
                $("#instagram-photos").append("<img class='instagram-picture' width='100' height='100' data-highRes='" + photos.data[x].images.standard_resolution.url + "' src='" + photos.data[x].images.low_resolution.url + "' >")
            }
        }

        display(res);
    }
    function closeLightBox(){
        $("#lightbox").fadeOut();
        $("#lightbox").remove();
        for (var i = 0; i < selectedImages.selected.length; i++ ){
            selectedImages.selected[i].element.clone().appendTo(imageHolder);
        }
    }


    $.fn.instaPicker.init = function (BTN, HOLDER, CLIENTID, REDIRECTURI) {
        initializer();

        var btn = BTN;
        imageHolder = HOLDER;
        var loginUrl = "https://instagram.com/oauth/authorize/?client_id=" + CLIENTID + "&redirect_uri=" + REDIRECTURI + "&response_type=token";

        btn.click(function () {
            if (accessToken != undefined) {
                $(document).instaPicker.open();
            } else {
                window.location.href= loginUrl;
            }

        })
    }

    $.fn.instaPicker.open = function () {

        var photoUrl = "https://api.instagram.com/v1/users/" + UID + "/media/recent/?access_token=" + accessToken;

        function getPhotos() {
            $.ajax({
                url: photoUrl,
                dataType: 'jsonp',
                success: function (results) {
                    openLightBox(results);
                }
            });
        }

        getPhotos();

    }

    $.fn.instaPicker.close = function () {
        var container = $(this);

        container.fadeOut(function () {
            container.html("");
        });

    }

}