!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}(),function(){var a={init:function(){this.gridFilter(),this.contactForm()},gridFilter:function(){var a="active",b="masked",c=$(".portfolio-grid__work");$(".portfolio-grid__filter").on("click","a",function(d){var e=$(this);e.addClass(a),e.parent().siblings().children("a").removeClass(a);var f=e.data("filter");if("all"===f)c.removeClass(b);else{var g=$('.portfolio-grid__work[data-tags~="'+f+'"]');c.not(g).addClass(b),g.removeClass(b)}d.preventDefault()})},contactForm:function(){var a,b="207a5cba6b522a6c696626e9d2cf6c1d";$("#contact-form").submit(function(c){a&&a.abort();var d=$(this),e=d.find("input, select, button, textarea"),f=d.serialize();e.prop("disabled",!0),a=$.ajax({dataType:"jsonp",url:"http://getsimpleform.com/messages/ajax?form_api_token="+b,type:"post",data:f}),a.done(function(){$("#submit").prop("disabled",!0).addClass("form__submit--success animated pulse").text("✓ Message Sent!")}),a.fail(function(a,b,c){console.error("The following error occured: "+b,c),$("#submit").prop("disabled",!0).addClass("form__submit--success animated shake").text("× Message Failed, Please try again")}),a.always(function(){e.not("button").prop("disabled",!1)}),c.preventDefault()})}};$(function(){a.init()})}();