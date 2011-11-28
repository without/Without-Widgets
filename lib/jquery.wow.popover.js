(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    wowPopover: function(options) {
      var $overlay, $popover, calculate_position, in_popover, log, modalHide, settings;
      settings = {
        content: '...',
        side_margin: 4,
        debug: false,
        onBeforeShow: null,
        onAfterShow: null,
        onBeforeHide: null,
        onAfterHide: null
      };
      settings = $.extend(settings, options);
      $overlay = $("<div id='wow-overlay'></div>");
      $popover = $("<div id='wow-popover-frame'><div id='wow-popover-arrow' class='wow-top'></div><div id='wow-popover-content'></div></div>");
      in_popover = false;
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      modalHide = function() {
        var $content, $elem;
        $elem = $('.wow-popover-open');
        $content = $('#wow-popover-content');
        if (options.onBeforeHide) options.onBeforeHide($elem, $content);
        $overlay.remove();
        $elem.removeClass('wow-popover-open');
        if (options.onAfterHide) return options.onAfterHide($elem);
      };
      calculate_position = function(elem) {
        var adjusted, elem_hei, elem_offset, elem_wid, popover_left, popover_top, right_pos, window_wid;
        elem_offset = elem.offset();
        elem_wid = elem.innerWidth();
        elem_hei = elem.innerHeight();
        popover_top = elem_offset.top + elem_hei + 11;
        popover_left = elem_offset.left + (elem_wid / 2) - (300 / 2);
        window_wid = $(window).width();
        adjusted = false;
        if (popover_left < settings.side_margin) {
          popover_left = settings.side_margin;
          adjusted = true;
        }
        right_pos = popover_left + $popover.innerWidth();
        if (right_pos > window_wid) {
          popover_left = popover_left - (right_pos - window_wid) - settings.side_margin;
          adjusted = true;
        }
        $popover.offset({
          top: popover_top,
          left: popover_left
        });
        if (adjusted) {
          if (popover_left === settings.side_margin) {
            return ($('#wow-popover-arrow')).width(elem_wid);
          } else {
            return ($('#wow-popover-arrow')).width(elem_wid * 2 + 300);
          }
        } else {
          return ($('#wow-popover-arrow')).width('100%');
        }
      };
      return this.each(function() {
        settings.content.remove();
        return $(this).click(function(e) {
          var $content, $this;
          $this = $(this);
          $content = $popover.find('#wow-popover-content');
          $content.append(settings.content);
          $this.addClass('wow-popover-open');
          ($('body')).append($overlay.click(function() {
            if (!in_popover) modalHide();
            return in_popover = false;
          }));
          $overlay.append($popover.click(function() {
            in_popover = true;
            return log("test");
          }));
          calculate_position($this);
          if (options.onBeforeShow) options.onBeforeShow($this, $content);
          settings.content.show();
          $overlay.show();
          if (options.onAfterShow) options.onAfterShow($this, $content);
          return e.preventDefault();
        });
      });
    }
  });

}).call(this);
