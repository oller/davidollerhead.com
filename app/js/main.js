'use strict';

(function() {

    var davidollerhead = {

        init: function() {
            this.gridFilter();
            this.contactForm();
        },

        gridFilter: function() {
            // Filter Porfolio Work Grid by 'area', specified by data-filter attribute
            var classActive = 'active';
            var classMasked = 'masked';
            var elPortfolioWork = $('.portfolio-grid__work');

            $('.portfolio-grid__filter').on('click', 'a', function(e) {
                var clicked = $(this);
                clicked.addClass(classActive);
                clicked.parent().siblings().children('a').removeClass(classActive);
                var tag = clicked.data('filter');
                if (tag === 'all') {
                    elPortfolioWork.removeClass(classMasked);
                } else {
                    var $matches = $('.portfolio-grid__work[data-tags~="'+ tag +'"]');
                    elPortfolioWork.not($matches).addClass(classMasked);
                    $matches.removeClass(classMasked);
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
                    $('#submit').prop('disabled', true).addClass('form__submit--success animated pulse').text('\u2713 Message Sent!');
                });

                // Callback on failure
                request.fail(function(jqXHR, textStatus, errorThrown) {
                    // Log error to the console
                    console.error('The following error occured: ' + textStatus, errorThrown);
                    $('#submit').prop('disabled', true).addClass('form__submit--success animated shake').text('\u00D7 Message Failed, Please try again');
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
