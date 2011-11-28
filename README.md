     __    __ _ _   _                 _     __    __ _     _            _       
    / / /\ \ (_) |_| |__   ___  _   _| |_  / / /\ \ (_) __| | __ _  ___| |_ ___ 
    \ \/  \/ / | __| '_ \ / _ \| | | | __| \ \/  \/ / |/ _` |/ _` |/ _ \ __/ __|
     \  /\  /| | |_| | | | (_) | |_| | |_   \  /\  /| | (_| | (_| |  __/ |_\__ \
      \/  \/ |_|\__|_| |_|\___/ \__,_|\__|   \/  \/ |_|\__,_|\__, |\___|\__|___/
                                                             |___/ Plugins for jQuery!

Without Widgets
===============

A few handy jQuery widgets that we developed.

Current widgets:

* Popover.

**Note:** This really is still very early days, and you probably don't want to actually use this yet.

Widgets
=======

Popover
-------

There are a number of popover implementations, but none that met our requirements. This one does.

**Usage:** Call wowPopover on an element. For example:

> $('#something').wowPopover({
>   content: $('#some_content') 
> });

**Options**

* **content:** The content of the popover. This will be copied into the popover immediately, and removed from the DOM.
* **side_margin:** The minimum distance in px between the left/right edge of the popover and the browser edge. *Default: 4*
* **debug:** Display log messages to the console when true. *Default: 4*
* **onBeforeShow:** Function that is called before the popover is displayed. Passes the trigger and the popover div.
* **onAfterShow:** Function that is called after the popover is displayed. Passes the trigger and the popover div.
* **onBeforeHide:** Function that is called before the popover is hidden. Passes the trigger and the popover div.
* **onAfterHide:** Function that is called before the popover is hidden and removed from the DOM. Passes the trigger.



License
=======

Without Widgets is Copyright © 2011 Without Software Inc. It is free software, licensed under the MIT License, and may be redistributed under the terms specified in the LICENSE file.