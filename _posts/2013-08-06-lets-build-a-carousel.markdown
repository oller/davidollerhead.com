---
layout: post
title:  "Using a Slider with Jekyll (in this case, Flexslider)"
date:   2013-08-06 15:40:10
categories: blog
carousel:
 - image: /assets/img/posts/tuts/carousel-jekyll/carousel-slide1.jpg
   alt: Example Carousel Slide
 - image: /assets/img/posts/tuts/carousel-jekyll/carousel-slide2.jpg
   alt: Example Carousel Slide
 - image: /assets/img/posts/tuts/carousel-jekyll/carousel-slide3.jpg
   alt: Example Carousel Slide
---

It's been a pleasure getting acquainted with jekyll and putting this portfolio site together.  By means of an introductory post, and also to share some rather basic techniques in jekyll, I thought I'd share how I went about adding certain features.  First stop, a slider&hellip;

### The Front Matters

First things first, you'll need to add the images, and note down the path to those from the root of your site. Remember, do not put these in a folder starting with an `_` such as `_images`. As `_` prefixed folders are ignored by Jekyll and not copied over into the `_site` directory on compilation.

Once we've saved the images, we need to referenece them from the YML Front Matter at the top of the Jekyll Post or Page we'd like them (and therefore the carousel) to appear on.

{% highlight php %}
---
layout: post
title:  "Let's build a Carousel!"
date:   2013-07-03 21:40:10
categories: jekyll demo blog carousel
carousel:
 - image: /assets/img/carousel/slide1.jpg
 - image: /assets/img/carousel/slide2.jpg
---

Lorem ipsum dolor sit amet, consectetur...
{% endhighlight %}

Note the space indenatation for each `- image` as a child of the carousel.

Now that the post or page is now aware that we've a carousel, and the images to use, we can now use some simple [Liquid Template][liquid-wiki-gh] tags to loop through these and print out the markup we require.  In this example, and on this site - I use the excellent & responsive [Flexslider][flexslider-gh]. So  let's open up `_layouts/post.html` or whichever layout you'd like to have the carousel appear in, and add in the relevant code.

{% highlight html %}
  {% raw %}{% if page.carousel %}{% endraw %}
  <div class="flexslider">
    <ul class="slides">
      {% raw %}{% for slides in page.carousel %}{% endraw %}
      <li>
        <img src="{% raw %}{{ slides.image }}{% endraw %}">
      </li>
      {% raw %}{% endfor %}{% endraw %}
    </ul>
  </div>
  {% raw %}{% endif %}{% endraw %}
{% endhighlight %}

As you can see, if we've a `page.carousel` defined in our YML Front-Matter for the post/page, we'll print out the flexslider container, looping for each seperate `image` defined within the `carousel`.  The `slides` object is just created in the loop to hold the children of the `carousel` object.

### Only loading libraries when we need them

We can also use the flag `{%raw%}{% if page.carousel %}{%endraw%}` to detect whether the page has a carousel at the default layout level, meaning we can use this to now only load the necessary library assets associated with they're required.  Removing unnecessary bloat and keeping things nice and lean.

As mentioned previously, in this example we're using Flexslider, so we'll need 3 files:
- The jQuery library (on Google's <abbr title="Content Delivery Network">CDN</abbr>)
- The Flexslider minified library
- My site's `app.js` which holds the initialisation function for the slider, amongst other things.

{% highlight html %}
{% raw %}{% if page.carousel %}{% endraw %}
<!-- Google CDN Hosted jQuery  -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
<!-- Flexslider Library  -->
<script src="/assets/js/flexslider.min.js"></script>
<!-- Initialisation Code  -->
<script src="/assets/js/app.js"></script>
{% raw %}{% endif %}{% endraw %}
{% endhighlight %}

So now that we have the assets loading and the markup and images being served correctly, lastly we just need to initialise the slider.  Below is is an example initialisation, contained within the aforementioned `app.js`

{% highlight javascript %}
// Initialise FlexSlider for Carousels
$(window).load(function() {
	$('.flexslider').flexslider({
	animation: "fade",
	controlNav: false,
	directionNav: true,
	slideshowSpeed: 5000,
	animationSpeed: 600,
	touch: true
	});
});
{% endhighlight %}

So there you have it, you ought to now be able to easily include a flexslider carousel on any page you wish, just by saving the images and setting up post/page's Front Matter correctly.

This is slightly simplified for ease of presentation.  On top of this, I'm using the [Jekyll Asset Pipeline][pipeline-gh] to concatenate and minify all css / js, but the logic still stands and can be applied to minified assets too.

> Top One, Nice one, Get Sorted!


[flexslider-gh]: https://github.com/woothemes/FlexSlider
[pipeline-gh]: https://github.com/matthodan/jekyll-asset-pipeline
[liquid-wiki-gh]: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers