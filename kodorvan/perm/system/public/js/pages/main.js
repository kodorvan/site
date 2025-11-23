"use strict";

import("../modules/hotline.mjs").then((module) => {
	// Imported the hotline.mjs module

	// Initializing an instance of the hotline.mjs
	const instance = new module.hotline(document.getElementById("wrap"));

	// Initializing settings of the hotline instance
	instance.alive = true;
	instance.wheel = false;
	instance.delta = 3;
	instance.step = -0.5;

	// Starting the hotline instance
	instance.start();
});

import("../modules/womb3-simplex.mjs").then((module) => {
	// Initializing the instance
	const womb = new module.womb(document.getElementById("introdution_animation"));
	womb.block = {
		width: 40,
		height: 40,
	};
	womb.init();
	womb.generate(undefined, '#000');

	// Initializing the process registers
	let offset = 0;
	let speed = 0.003;

	// Starting the process
	setInterval(function () {
		womb.dump();
		womb.generate((offset += speed), '#000');
	}, 20);

	// Initializing the resizing event processor
	window.addEventListener(
		"resize",
		function (e) {
			womb.init();
			womb.dump();
			womb.generate((offset += speed), '#000');
		},
		true
	);
});
