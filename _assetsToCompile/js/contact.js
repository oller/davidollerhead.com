'use strict';

(function() {
    // Jekyll won't let you render an Empty textarea, render with space then clear in to reveal placeholder text
    $('textarea[name="message"]').val('');

    // Ajax submit Contact Form
    var request;
    // bind to the submit of message form
    $("form.contact").submit(function(event) {
        // abort any pending request
        if (request) {
            request.abort();
        }
        // setup and cache some local vars
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();

        // disable inputs during .post
        $inputs.prop("disabled", true);

        // fire off the request to /form.php
        request = $.ajax({
            dataType: 'jsonp',
            url: "http://getsimpleform.com/messages/ajax?form_api_token=207a5cba6b522a6c696626e9d2cf6c1d",
            type: "post",
            data: serializedData
        });

        // callback on success
        request.done(function(response, textStatus, jqXHR) {
            // positive feedback to user
            $('.pure-button').prop('disabled', true).addClass('success').text("\u2713 Message Sent!");
        });

        // callback on failure
        request.fail(function(jqXHR, textStatus, errorThrown) {
            // log  error to the console
            console.error('The following error occured: ' + textStatus, errorThrown );
        });

        // callback regardless
        request.always(function() {
            // reenable inputs
            $inputs.not('button').prop("disabled", false);
        });

        // prevent posting of form
        event.preventDefault();
    });
}());
