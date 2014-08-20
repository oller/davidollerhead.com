---
layout: post
title:  Bitcoin Price Widget
date:   2014-05-01 20:28:10
categories: work
tags: Development
thumb: /img/work/bitcoin/thumb/thumb-bitcoin.png
---

<div id="coindesk-widget" data-size="mpu" data-align="center"></div>
<script type="text/javascript" src="/js/work/bitcoin/coindesk-widget.min.js"></script>

An embeddable JavaScript widget to represent and visualise the past hour's bitcoin price information.

The [d3 JavaScript library][d3]  was used to render the sparkline, based on the data retrieved from the price API.

Built in a robust fashion, the widget queries the past hour's data, plus a price for 'now', which is appended. if for some reason the past hour's data isn't returned, the widget will create a sparkline from now, polling every minute to get a price update.

A hover state was incorporated, giving a tooltip for the price for the cursor point along the x-axis

Uses CSS3 animations to show an update in the price  when an update is successfully retrieved.  The price value going red or green, and fading up or down accordingly, calculated against the previously most recent value.

Fully vector and prepared for HiDPI devices.  The widget source includes base64 encoded SVGs used for logos, with fallback PNGs, to reduce requests.

Embedded with 2 lines code:

{% highlight js %}
<div id="coindesk-widget" data-size="mpu" data-align="center"></div>
<script type="text/javascript" src="/js/work/bitcoin/coindesk-widget.min.js"></script>
{% endhighlight %}

The data-attributes allow the embedder to give it various sizes, that the widget will use to render itself appropriately.

[d3]: http://d3js.org
