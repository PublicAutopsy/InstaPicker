$.fn.instaPicker = function(){
    var container = $(this);

}

$.fn.instaPicker.open = function(user){
    var container = $(this);

    function openLightbox(){

    }

    function display(photos){
        for (x=0; x < photos.data.length; x ++ ){
            console.log(photo);
        }
    }

    function getPhotos(){
        $.getJSON(url, display);
    }

}

$.fn.instaPicker.close = function(){
    var container = $(this);

    container.fadeOut(function(){
        container.html("");
    });

}
