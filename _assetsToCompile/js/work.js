// Once 'inview', fade in portfolio work
$('.tile-fade').one('inview', function() {
	$('.faded').each(function(i) {
	var $this = $(this);
	setTimeout(function() {
			$this.removeClass('faded');
		}, i * 80);
	});
});

// Filter Porfolio Work Grid by 'area', specified by data-filter attribute
$('.grid-filter a').click(function(e) {
	var $this = $(this);
	$('.grid-filter a').removeClass('filter');
	$this.addClass('filter');
	var tag = $this.data('filter');
	if (tag == "all") {
		$('.grid-node').removeClass('masked');
	}else {
		var $matches = $('.grid-node.' + tag );
		$('.grid-node').not($matches).addClass('masked');
		$matches.removeClass('masked');
	}
	e.preventDefault();
});
