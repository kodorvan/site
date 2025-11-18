"use strict";

import("../modules/hotline.mjs").then((module) => {
	// Imported the hotline.mjs module

	// Initializing an instance of the hotline.mjs
	const instance = new module.hotline(document.getElementById("wrap"));

	// Initializing settings of the hotline instance
	instance.alive = true;
	instance.wheel = false;
	instance.delta = 3;

	// Starting the hotline instance
	instance.start();
});

 document.addEventListener('dragstart', function(event) {
        event.preventDefault();
        return false;
    });