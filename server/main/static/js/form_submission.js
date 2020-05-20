$.ajaxSetup({
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                     if (cookie.substring(0, name.length + 1) == (name + '=')) {
                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                         break;
                     }
                 }
             }
             return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});

//Create FormData
const formElem = document.querySelector("#post_form");
formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(formElem);
})

//Send FormData
formElem.addEventListener("formdata", (e)=>{
    let data = e.formData;
    for (var [key,value] of data.entries()){
        console.log(key,value);
    }

     $.ajax({
        url: '/post_form/',
        type: 'POST',
        data: data,
        success: function(response){
            console.log('yay')
            console.log("Form Posted")
        },

        error: function(error) {
            console.log(error)
        },
        cache:false,
        contentType: false,
        processData: false,
    })




})




/*
    var formData = new FormData(form)


 */


