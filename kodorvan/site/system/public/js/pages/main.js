"use strict";

core.modules.connect(["damper", "project"]).then((connected) => {
	// Imported modules

	// Initializing the introdution HTML-element
	const introdution = document.getElementById('introdution');

	// Initializing the files input wrap HTML-element
	const files = document.getElementById("project_files");

	// Initializing the superpack HTML-elements
	const superpack = document.getElementById("superpack");
	const superpack_value = superpack.querySelector('span.value');

	// Initializing the instance of the project.mjs
	core.global.project = new connected.global.project(
		document.querySelector('section[data-paginator-page="2"]'), 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		undefined, 
		superpack,
		document.getElementById("project_name"),
		document.getElementById("project_description"),
		files,
		document.getElementById("requester_name"),
		document.getElementById("requester_sim"),
		document.getElementById("requester_mail"),
		document.getElementById("requester_other"),
		document.getElementById("requester_personal"),
		true
	);

	// Initializing the "back" button
	const back = document.getElementById('back');

	core.modules.connect(["paginator"]).then((connected) => {
		// Imported the paginator.mjs module

		// Initializing pages
		const pages = document.querySelectorAll('section[data-paginator-page]');

		// Initializing the instance of the paginator.mjs
		core.global.paginator = new connected.global.paginator(
			document.getElementById('buttons'), 
			pages,
			2
		);

		// Initializing the buttons
		const buttons = core.global.paginator.shell.querySelectorAll('button[data-paginator-page-button]');

		function menu(identifier) {
			// Initializing the target page button HTML-element
			const active = core.global.paginator.shell.querySelector('button[data-paginator-page-button="' + identifier + '"]');

			if (active instanceof HTMLElement) {
				// Initialized the target page button HTML-element

				for (const inactive of buttons) {
					// Iteration over pages

					// Hiding the page button HTML-element
					inactive.style.setProperty('display', 'none');
				}

				// Showing the target page button HTML-element
				active.style.removeProperty('display');

				if (identifier > core.global.paginator.initial) {
					// Second or more page

					// Showing the "back" button
					back.style.removeProperty('display');
				} else {
					// The first page

					// Hiding the "back" button
					back.style.setProperty('display', 'none');
				}
			}
		}

		// Initializing the page buttons menu
		core.global.paginator.shell.addEventListener("paginator.page.opened", function (event) {
			// Scrolling to the introdution HTML-element
			// introdution?.scrollIntoView({ behavior: 'smooth' });
			// Сделать для мобилок 300 а для пк 0
			window.scrollTo({ top: window.innerHeight > 1500 ? 0 : 300, behavior: 'smooth' });

			// Initializing the page buttons menu
			menu(event.detail.identifier);
		});

		// Connecting event listener for project parameters writings
		core.global.project.shell.addEventListener("project.write", function(event) {
			if (event.detail.name === 'superpack') {
				// Superpack
				
				if (superpack_value instanceof HTMLElement) {
					// Initialized the superpack value HTML-element

					// Writing the superpack value
					superpack_value.innerText = event.detail.value ?? '';

					if (superpack_value.innerText.length > 1) {
						// Has a value

						// Showing the superpack HTML-element
						superpack.style.removeProperty('display');
					} else {
						// Has no value

						// Hiding the sueprpack HTML-element
						superpack.style.setProperty('display', 'none');
					}
				}
			}

			// Initializing the "project" page button HTML-element
			const project = core.global.paginator.shell.querySelector('button[data-paginator-page-button="2"]');

			if (project instanceof HTMLElement) {
				// Initialized the "project" page button HTML-element

				// Showing or hiding the "project" page button HTML-element
				project.disabled = 
					!(core.global.project.project.name 
					&& (
						core.global.project.project.description != null 
						|| core.global.project.project.files.length > 0 
					));
			}
		
			// Initializing the "requester" page button HTML-element
			const requester = core.global.paginator.shell.querySelector('button[data-paginator-page-button="3"]');

			if (requester instanceof HTMLElement) {
				// Initialized the "requester" page button HTML-element

				// Showing or hiding the "requester" page button HTML-element
				requester.disabled = 
					!(core.global.project.requester.personal 
					&& (
						core.global.project.requester.sim != null 
						|| core.global.project.requester.mail != null 
						|| core.global.project.requester.other != null
					));
			}
		});

		// Connecting event listener for project calculation
		core.global.project.shell.addEventListener("project.calculated", function() {
			// Showing the buttons HTML-element
			core.global.paginator.shell?.style.removeProperty('display');
		});

		// Initializing the page buttons menu
		core.global.paginator.shell.addEventListener("paginator.page.opened", function (event) {
			// Scrolling to the introdution HTML-element
			// introdution?.scrollIntoView({ behavior: 'smooth' });
			// window.scrollTo({ top: 300, behavior: 'smooth' });
			// Сделать для мобилок 300 а для пк 0
			window.scrollTo({ top: window.innerHeight > 1500 ? 0 : 300, behavior: 'smooth' });

			// Initializing the page buttons menu
			menu(event.detail.identifier);
		});
	});

	// Initializing the files list HTML-element
	const list = files.querySelector('ol.files');

	// Initializing the files input HTML-element
	const files_input = files.querySelector('.input');

	files_input.addEventListener('input', (event) => {
		// Deleting every file label from the list
		list.innerHTML = '';

		if (files_input.files.length > 0) {
			// Has files

			// Showing the list HTML-element
			list.style.removeProperty('display');

			// Initializing the file index iterator
			let index = 0;

			for (const file of files_input.files) {
				// Iterating over files

				// Initializing the maximum length for the file label name
				const maximum = 16;

				// Initializing the end tail for the file label name
				const tail = 8;

				// Initializing the file label name
				const name = file.name.length > maximum ? file.name.slice(0, maximum - tail).trim() + '...' + file.name.slice(-tail).trim() : file.name; 

				// Initializing the file label HTML-element
			  const element = document.createElement('li');
			  element.id = "project_files_input_" + index;
				element.setAttribute('title', file.name);
				element.innerText = name;
				
			  // Initializing the file label delete button
				const button = document.createElement('button');
				button.classList.add('delete');

				button.addEventListener('click', (event) => {
					// Initializing the file index 
					const index = Array.from(list.children).indexOf(element);

					// Initializing the actual list of files
					let files = core.global.project.project.files;

					// Deleting the file
					files.splice(index, 1);

					// Deleting the file label HTML-element
					element.remove();

					// Writing into the project property
					core.global.project.project.files = files;
				})

				// Initializing the file label delete button image
				const image = document.createElement('img');
				image.setAttribute('src', '/themes/default/images/icons/close.svg');

				// Writing the file label into the list HTML-element
				button.appendChild(image);
				element.appendChild(button);
				list.appendChild(element);

				// Recalculating the index (postfix-incrementation)
				index++;
			}
		} else {
			// Has no files

			// Hiding the list HTML-element
			list.style.setProperty('display', 'none');
		}
	})

	core.global.project.shell.parentElement.classList.remove('loading');
});
