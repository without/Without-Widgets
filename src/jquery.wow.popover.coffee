#
#  __    __ _ _   _                 _     __    __ _     _            _       
# / / /\ \ (_) |_| |__   ___  _   _| |_  / / /\ \ (_) __| | __ _  ___| |_ ___ 
# \ \/  \/ / | __| '_ \ / _ \| | | | __| \ \/  \/ / |/ _` |/ _` |/ _ \ __/ __|
#  \  /\  /| | |_| | | | (_) | |_| | |_   \  /\  /| | (_| | (_| |  __/ |_\__ \
#   \/  \/ |_|\__|_| |_|\___/ \__,_|\__|   \/  \/ |_|\__,_|\__, |\___|\__|___/
#                                                          |___/              
# POPOVER widget
#

$ = jQuery

# Adds plugin object to jQuery
$.fn.extend
  # Change pluginName to your plugin's name.
  wowPopover: (options) ->
    # Default settings
    settings =
      content: '...'     # The content of the popover.
      side_margin: 4  # The minimum distance in px between the left/right edge of the popover and the browser edge.
      debug: false    # Display log messages to the console when true.
      onBeforeShow: null
      onAfterShow: null
      onBeforeHide: null
      onAfterHide: null

    # Merge default settings with options.
    settings = $.extend settings, options

    $overlay = $("<div id='wow-overlay'></div>")
    $popover = $("<div id='wow-popover-frame'><div id='wow-popover-arrow' class='wow-top'></div><div id='wow-popover-content'></div></div>")
    in_popover = false

    # Simple logger.
    log = (msg) ->
      console?.log msg if settings.debug

    modalHide = () ->
      $elem = ($ '.wow-popover-open')
      $content = ($ '#wow-popover-content')
      options.onBeforeHide($elem, $content) if options.onBeforeHide
      
      $overlay.remove()
      $elem.removeClass('wow-popover-open')
      options.onAfterHide($elem) if options.onAfterHide
      

    # Calculates the position to place the popover
    calculate_position = (elem) ->
      elem_offset = elem.offset()
      elem_wid = elem.innerWidth()
      elem_hei = elem.innerHeight()
      popover_top = elem_offset.top + elem_hei + 11
      popover_left = elem_offset.left + (elem_wid / 2) - (300 / 2) # 300 = magic width number; change!
      window_wid = $(window).width()
      
      adjusted = false;
      if (popover_left < settings.side_margin)
        popover_left = settings.side_margin;
        adjusted = true;

      # Make sure it's not off the right of the browser window
      right_pos = popover_left + $popover.innerWidth()
      if (right_pos > window_wid)
        popover_left = popover_left - (right_pos - window_wid) - settings.side_margin; 
        adjusted = true;

      # position the popover
      $popover.offset
        top: popover_top
        left: popover_left
      if adjusted
        if popover_left == settings.side_margin
          ($ '#wow-popover-arrow').width(elem_wid)
        else
          ($ '#wow-popover-arrow').width(elem_wid * 2 + 300) # 300 = magic width number; change!
      else
        ($ '#wow-popover-arrow').width('100%')
      
      
    # Do the popover.
    return @each ()->
      # First, listen for clicks on the object.
      settings.content.remove()
      $(this).click (e) ->
        $this = ($ this)
        $content = $popover.find('#wow-popover-content')
        $content.append(settings.content)
        
        # Add a class indicating that the object has initiated the popover
        $this.addClass('wow-popover-open')
        
        # Add the overlay
        ($ 'body').append $overlay.click -> 
          if not in_popover
            modalHide()
          in_popover = false
          
        # Add the popover
        $overlay.append $popover.click ->
          in_popover = true
          log "test"
            
        # calculate the position of the popover-frame
        calculate_position $this
            
        options.onBeforeShow($this, $content) if options.onBeforeShow
        settings.content.show()
                
        # Show   
        $overlay.show()
        options.onAfterShow($this, $content) if options.onAfterShow
        
        
        e.preventDefault()
        
