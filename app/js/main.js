'use strict';

(function() {

    var davidollerhead = {

        init: function() {
            this.gridFilter();
            this.contactForm();
        },

        gridFilter: function() {
            // Filter Porfolio Work Grid by 'area', specified by data-filter attribute
            var activeClass = 'active';

            $('.portfolio-grid__filter a').click(function(e) {
                var $this = $(this);
                $('.portfolio-grid__filter a').removeClass(activeClass);
                $this.addClass(activeClass);
                var tag = $this.data('filter');
                if (tag === 'all') {
                    $('.portfolio-grid__work').removeClass('masked');
                } else {
                    var $matches = $('.portfolio-grid__work.' + 'tag-' + tag);
                    $('.portfolio-grid__work').not($matches).addClass('masked');
                    $matches.removeClass('masked');
                }
                e.preventDefault();
            });
        },

        contactForm: function() {
            // Ajax submit Contact Form
            var request;
            var simpleFormToken = '207a5cba6b522a6c696626e9d2cf6c1d';

            // Bind to the submit of message form
            $('#contact-form').submit(function(event) {
                // Abort any pending request
                if (request) {
                    request.abort();
                }
                // Setup and cache some local vars
                var form = $(this);
                var inputs = form.find('input, select, button, textarea');
                var serializedData = form.serialize();

                console.log(form);
                console.log(inputs);
                console.log(serializedData);

                // Disable inputs during .post
                inputs.prop('disabled', true);

                // Fire off the request to /form.php
                request = $.ajax({
                    dataType: 'jsonp',
                    url: 'http://getsimpleform.com/messages/ajax?form_api_token=' + simpleFormToken,
                    type: 'post',
                    data: serializedData
                });

                // Callback on success
                request.done(function(response, textStatus, jqXHR) {
                    // positive feedback to user
                    $('#submit').prop('disabled', true).addClass('form__submit--success').text('\u2713 Message Sent!');
                });

                // Callback on failure
                request.fail(function(jqXHR, textStatus, errorThrown) {
                    // Log error to the console
                    console.error('The following error occured: ' + textStatus, errorThrown);
                });

                // Callback regardless
                request.always(function() {
                    // Reenable inputs
                    inputs.not('button').prop('disabled', false);
                });

                // Prevent posting of form
                event.preventDefault();
            });
        }
    };

    // R-r-r-ready
    $(function() {
        davidollerhead.init();
    });

}());
