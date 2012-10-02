require([
  "namespace",
  // Libs
  "jquery",
  "use!backbone",
  // Modules
  "index",
  "google",
  "use!transit",
  "use!peel",
  "use!newrelic"
  ],

function(namespace, $, Backbone, Index, google) {

  if (!$.support.transition || $.browser.msie || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))
    $.fn.transition = $.fn.animate;

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "step1",
      "step2": "step2",
      "step3": "step3",
      "step4": "step4",
      "step5": "step5",
      "step6": "step6",
      "step7": "step7",
      "step8": "step8",
      "data": "data",
      "kennedy": "kennedy",
      ":hash": "step1"
    },
    initialize: function() {
      this.bind('all', function (trigger, args) {
        var routeData = trigger.split(':');
        if (routeData[0] === 'route') {
          if(routeData[1] == 'step1') {
            $('#reset').fadeOut();
            $('#data_entry').fadeIn();
          } else {
            $('#reset').fadeIn();
            $('#data_entry').fadeOut();
          }
        }
      });
    },
    stepTransition: function(content, element, callback) {
      $(window).off('resize');
      Backbone.Page.changepage( Backbone.history.fragment );
      if (!$.support.transition || $.browser.msie || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        $("#main").fadeOut(function(){
          $("#main").html(content).fadeIn(function() {
            if ( _.isFunction(callback) )
              callback();
          });
        });
      } else {
        $("#main").children("div").children("div").transition({
          opacity: 0,
          scale: 0.8
        }, function(){
          $("#main").html(content);
          $(element).css({
            opacity: 0,
            scale: 0.8
          }).transition({
            opacity: 1,
            scale: 1.0
          });
          if (callback != undefined)
            callback();
        });
      }
    },
    step1: function(hash) {
      var route = this;
      var index = new Index.Views.step1;
      // Attach the tutorial to the DOM
      index.render(function(el) {
        route.stepTransition(el , "#step1", function() {
          Backbone.Page.reset();
        });
        // Fix for hashes in pushState and hash fragment
        if (hash && !route._alreadyTriggered) {
          // Reset to home, pushState support automatically converts hashes
          Backbone.history.navigate("", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;
        }
      });
    },
    step2: function(hash) {
      var route = this;
      var index = new Index.Views.step2;

      // Attach the tutorial to the DOM
      index.render(function(el) {
        route.stepTransition(el , "#step2", function() {
          if (screen.height < 768) {
              $('#lower-foreground').transition({opacity: 0});
          }
          $('#locality').css({width: $(document).width() - 90} ).focus();
          $(window).off('resize');
          $(window).resize(function() {
            $('#locality').css({width: $(document).width() - 90} );
          });
          if( navigator.onLine && google != undefined ) {
            $( "#map_canvas" ).show();
            var mapCanvas = $( "#map_canvas" ).get( 0 );
            var myOptions = {
              'disableDefaultUI': true,
              'draggable': false,
              'zoom': 14,
              'eyboardShortcuts': false,
              'disableDoubleClickZoom': false,
              'scrollwheel': false
            };
            google.addMapToCanvas( mapCanvas, myOptions, 55.781379,37.622375);
            google.autocomplete( $('#locality')[0] );
            google.refresh();
          } else {
            $( "#map_canvas" ).hide();
          }

          index.populate();
        });
        // Fix for hashes in pushState and hash fragment
        if (hash && !route._alreadyTriggered) {
          // Reset to home, pushState support automatically converts hashes
          Backbone.history.navigate("", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;
        }
      });
    },
    step3: function(hash) {
      var route = this;
      var index = new Index.Views.step3;
      index.render(function(el) {
        route.stepTransition(el , "#step3", function() {
          index.populate();
        });
      });
    },
    step4: function(hash) {
      var route = this;
      var index = new Index.Views.step4;
      index.render(function(el) {
        route.stepTransition(el , "#step4", function() {
          index.populate();
        });
      });
    },
    step5: function(hash) {
      var route = this;
      var index = new Index.Views.step5;
      index.render(function(el) {
        route.stepTransition(el , "#step5", function() {
          index.populate();
        });
      });
    },
    step6: function(hash) {
      var route = this;
      var index = new Index.Views.step6;
      index.render(function(el) {
        route.stepTransition(el , "#step6", function() {
          if ( Backbone.Page.mobile() ) {
            $('#errorkind').text('Mobile number already in use');
            $('#step6 .error').fadeIn();
          }
          index.populate();
        });
      });
    },
    step7: function(hash) {
      var route = this;
      var index = new Index.Views.step7;
      index.render(function(el) {
        route.stepTransition(el , "#step7");
      });
    },
    step8: function(hash) {
      var route = this;
      var index = new Index.Views.step8;
      index.render(function(el) {
        route.stepTransition(el , "#step8");
      });
    },
    kennedy: function(hash) {
      var route = this;
      var index = new Index.Views.kennedy;
      index.render(function(el) {
        route.stepTransition(el , "#kennedy", function() {
          index.populate();
        });
      });
    },
    data: function(hash) {
      var route = this;
      var index = new Index.Views.data;
      index.render(function(el) {
        route.stepTransition(el , "#data", function() {
          $.get('app/templates/hall/' + Backbone.Page.campus + '.html',
            function(data) {
              $('#hall_placement').html(data);
              index.populate();
            });
        });
      });
    }
  });


  var fragment = document.location.pathname + document.location.hash;
  fragment = fragment.replace('/','').replace('#','');
  Backbone.Page = new Index.Page(document.URL.match(/\/\/([^\.]*)/)[1], fragment);
  Backbone.Page.pushrecords();

  window.addEventListener('online',function(evt) {
    Backbone.Page.pushrecords();
  });

  window.onerror = function(errorMsg, file, lineNumber) {
    // post the error with all the information we need.
    $.post('http://s1.studentlife.org.nz/js_error.php', {error: errorMsg, file: file, lineNumber: lineNumber, documentReady: window.documentIsReady});
    return false;
  }

  // Shorthand the application namespace
  var app = namespace.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true, root: "/" + I18n.locale + "/" });

  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning it's relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
      href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
