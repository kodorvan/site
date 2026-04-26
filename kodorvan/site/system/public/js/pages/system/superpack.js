"use strict";

core.modules.connect(["damper"], ["superpack"]).then((connected) => {
	// Imported modules

	// Initializing the instance of the project.mjs
	core.system.superpack = new connected.system.superpack(
		document.getElementById('superpack'),
		document.getElementById('superpack_urn'),
		document.getElementById('superpack_title'),
		document.getElementById('superpack_html'),
		document.getElementById('superpack_text'),
		document.getElementById('superpack_supercost'),
	);
});
