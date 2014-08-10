$(function () {
  // Filter Porfolio Work Grid by 'area', specified by data-filter attribute

  var activeClass = 'active';

  $('.portfolio-grid__filter a').click(function (e) {
    var $this = $(this);
    $('.portfolio-grid__filter a').removeClass(activeClass);
    $this.addClass(activeClass);
    var tag = $this.data('filter');
    if (tag === 'all') {
      $('.portfolio-grid__work').removeClass('masked');
    } else {
      var $matches = $('.portfolio-grid__work.' + 'tag-'+tag);
      $('.portfolio-grid__work').not($matches).addClass('masked');
      $matches.removeClass('masked');
    }
    e.preventDefault();
  });
});
