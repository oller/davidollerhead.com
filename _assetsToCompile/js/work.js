'use strict';

$(function() {
    // Once 'inview', fade in portfolio work
    $('.tile-fade').one('inview', function () {
      $('.faded').each(function (i) {
        var $this = $(this);
        setTimeout(function () {
          $this.removeClass('faded');
        }, i * 80);
      });
    });

    // Filter Porfolio Work Grid by 'area', specified by data-filter attribute
    $('.portfolio-grid__filter a').click(function (e) {
      var $this = $(this);
      $('.portfolio-grid__filter a').removeClass('filter');
      $this.addClass('filter');
      var tag = $this.data('filter');
      if (tag == "all") {
        $('.portfolio-grid__work').removeClass('masked');
      } else {
        var $matches = $('.portfolio-grid__work.' + tag);
        $('.portfolio-grid__work').not($matches).addClass('masked');
        $matches.removeClass('masked');
      }
      e.preventDefault();
    });
});
