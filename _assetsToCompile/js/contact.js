(function(){
    // Jekyll Won't let me Render an Empty Text Area, render with space then clear in JS to reveal placeholder text
    $('textarea[name="message"]').val('');

    // Ajax submit Contact Form
    // variable to hold request
    var request;
    // bind to the submit event of our form
    $("form.contact").submit(function(event){
        // abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);
        // let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");
        // serialize the data in the form
        var serializedData = $form.serialize();

        // let's disable the inputs for the duration of the ajax request
        // $inputs.prop("disabled", true);

        // fire off the request to /form.php
        request = $.ajax({
            dataType: 'jsonp',
            url: "http://getsimpleform.com/messages/ajax?form_api_token=207a5cba6b522a6c696626e9d2cf6c1d",
            type: "post",
            data: serializedData
        });

        // callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            // log a message to the console
            console.log("Hooray, it worked!");
            $('.pure-button').prop('disabled', true).addClass('success').text("\u2713 Message Sent!");
        });

        // callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            console.error(
                "The following error occured: "+
                textStatus, errorThrown
            );
        });

        // callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // reenable the inputs
            $inputs.not('button').prop("disabled", false);
        });

        // prevent default posting of form
        event.preventDefault();
    });
}());