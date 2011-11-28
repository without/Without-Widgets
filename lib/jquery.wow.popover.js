(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    wowPopover: function(options) {
      var $overlay, $popover, calculate_position, in_popover, log, modalHide, settings;
      settings = {
        content: true,
        option2: false,
        debug: false
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
        return $overlay.remove();
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
        if (popover_left < 4) {
          popover_left = 4;
          adjusted = true;
        }
        right_pos = popover_left + $popover.innerWidth();
        if (right_pos > window_wid) {
          popover_left = popover_left - (right_pos - window_wid) - 4;
          adjusted = true;
        }
        $popover.offset({
          top: popover_top,
          left: popover_left
        });
        if (adjusted) {
          if (popover_left === 4) {
            return ($('#wow-popover-arrow')).width(elem_wid);
          } else {
            return ($('#wow-popover-arrow')).width(elem_wid * 2 + 4 + 300);
          }
        } else {
          return ($('#wow-popover-arrow')).width('100%');
        }
      };
      return this.each(function() {
        return $(this).click(function(e) {
          ($('body')).append($overlay.click(function() {
            if (!in_popover) modalHide();
            return in_popover = false;
          }));
          $overlay.append($popover.click(function() {
            in_popover = true;
            return log("test");
          }));
          $popover.find('#wow-popover-content').append(settings.content);
          settings.content.show();
          calculate_position($(this));
          $overlay.show();
          return e.preventDefault();
        });
      });
    }
  });

}).call(this);
