---
layout: post
title:  "Vector Shopping Centre Maps"
date:   2015-08-28 19:01:10
categories: work
tags: Development
thumb: /img/work/svg-maps/thumb/thumb-svg-maps.png
masthead:
  carousel:
   - image: /img/work/svg-maps/svg-maps1.png
     alt: Vector Maps Screen 1
   - image: /img/work/svg-maps/svg-maps2.png
     alt: Vector Maps Screen 2
---

Created a mobile-first touch-friendly javascript interface to interact with various isometric vector maps of shopping centres. Built using <abbr title="Universal Module Definition">UMD</abbr> modules, Underscore, OOJS patterns and the [svg-pan-zoom](http://github.com/ariutta/svg-pan-zoom) library.

The SVG map is loaded asynchronously and can be dragged and zoomed (touch/pinch friendly).

An additional request to the server returns a JSON response that maps retailer names to the retail unit IDs present in the SVG map. This is used to display the store information as a tooltip on hover (or tap) and to power a search function.

An off-canvas menu gives the user the ability to keyword search for a retailer.  This autocompletes and will highlight the unit on selection, with the unit flashing and a tooltip appearing above the unit.  The menu also has a list of facitilies available at the centre, which can be toggled to display the icon at the correct location on the map.

The ability to click on a unit to request additional data for a specific retailer has been implemented and is awaiting an API endpoint to be exposed.

A little snippet&hellip;

{% highlight js %}
buildLegend: function () {
    var iconsPresent = this.getIconsPresent(),
        legendTemplate = _.template(this.legendItemTemplate.html()),

        // Build up legend items only for icons present
        legendItems =
            _.filter(this.legendData, function (legendItem) {
                return iconsPresent.indexOf(legendItem.action) >= 0;
            });

    this.legend.append(legendTemplate({legendItems : legendItems}));
}
{% endhighlight %}
