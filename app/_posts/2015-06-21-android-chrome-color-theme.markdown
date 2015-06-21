---
layout: post
title:  "How to set the background colour of the address bar on android chrome"
date:   2015-06-21 14:09:00
categories: blog
masthead:
  raw: <img src="/img/posts/tuts/chrome-theme/chrome-theme.png" alt="Google Chrome Colour Theme on Android" class="drop-shadow">
  flush: bottom
---

Chrome on my Android phone has started to support the ability to the set the background colour for the address bar at the top of the browser.

It turns out this can be achieved with a single `<meta>` tag in the `<head>` of the page.

{% highlight html %}
<meta name="theme-color" content="#b4da55">
{% endhighlight %}

So there you go, an easy way to give your site a more seamless, native feel.
