/** @module superpack */

"use strict";

/**
 * @name superpack.mjs
 *
 * @description
 * Module for creating superpacks
 *
 * @class
 * @public
 *
 * {@link https://git.mirzaev.sexy/mirzaev/superpack.mjs}
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
export default class superpack {
	/**
	 * @name Shell
	 *
	 * @description
	 * Shell of all elements, top-level parent HTML-element
	 *
	 * @type {HTMLElement}
	 *
	 * @protected
	 */
	#shell;

	/**
	 * @name Elements
	 *
	 * @description
	 * Calculation steps shell elements 
	 *
	 * @type {Map}
	 *
	 * @protected
	 */
	#elements = new Map();	

	/**
	 * @name Elements (get)
	 *
	 * @description
	 * Getter for `this.#elements`
	 *
	 * @return {Map}
	 *
	 * @public
	 */
	get elements() {
		return this.#elements;
	}

	/**
	 * @name stages
	 *
	 * @description
	 * Active stages for guide
	 *
	 * @return {Set}
	 *
	 * @protected
	 */
	#stages = new Set();

	/**
	 * @name Stages (get)
	 *
	 * @description
	 * Getter for `this.#stages`
	 *
	 * @return {Set}
	 *
	 * @public
	 */
	get stages() {
		return this.#stages;
	}

	/**
	 * @name Shell (get)
	 *
	 * @description
	 * Getter for `this.#shell`
	 *
	 * @return {HTMLElement}
	 *
	 * @public
	 */
	get shell() {
		return this.#shell;
	}

	/**
	 * @name URN
	 *
	 * @description
	 * The superpack URN (https://kodorvan.tech/superpack/{URN})
	 *
	 * @type {string}
	 *
	 * @protected
	 */
	#urn = '';

	/**
	 * @name URN (set)
	 *
	 * @description
	 * Setter for `this.#urn`
	 *
	 * @public
	 */
	set urn(value) {
		// Writing into the hour cost
		this.#urn = value;

		// Dispatching event: "system.superpack.write"
		this.#shell.dispatchEvent(
			new CustomEvent("system.superpack.write", {
				detail: { name: 'urn', value: value }
			})
		);

		if (this.#urn.length > 0) {
			// Has a value

			// Deleting from the stages registry
			this.#stages.delete('urn');
		} else {
			// Has no value 

			// Writing into the stages registry
			this.#stages.add('urn');
		}
			
		// Reinitializing guide HTML-elements
		this.guide();
	}

	/**
	 * @name Title
	 *
	 * @description
	 * The superpack title
	 *
	 * @type {string}
	 *
	 * @protected
	 */
	#title = '';

	/**
	* @name Title (set)
	*
	* @description
	* Setter for `this.#title`
	*
	* @public
	*/
	set title(value) {
		// Writing into the hour cost
		this.#title = value;

		// Dispatching event: "system.superpack.write"
		this.#shell.dispatchEvent(
			new CustomEvent("system.superpack.write", {
				detail: { name: 'title', value: value }
			})
		);

		if (this.#title.length > 0) {
			// Has a value

			// Deleting from the stages registry
			this.#stages.delete('title');
		} else {
			// Has no value 

			// Writing into the stages registry
			this.#stages.add('title');
		}
			
		// Reinitializing guide HTML-elements
		this.guide();
	}

	/**
	 * @name HTML
	 *
	 * @description
	 * The superpack content (HTML)
	 *
	 * @type {string}
	 *
	 * @protected
	 */
	#html = '';

	/**
	* @name HTML (set)
	*
	* @description
	* Setter for `this.#html`
	*
	* @public
	*/
	set html(value) {
		// Writing into the hour cost
		this.#html = value;

		// Dispatching event: "system.superpack.write"
		this.#shell.dispatchEvent(
			new CustomEvent("system.superpack.write", {
				detail: { name: 'html', value: value }
			})
		);

		if (this.#html.length > 0) {
			// Has a value

			// Deleting from the stages registry
			this.#stages.delete('html');
		} else {
			// Has no value 

			// Writing into the stages registry
			this.#stages.add('html');
		}
			
		// Reinitializing guide HTML-elements
		this.guide();
	}

	/**
	 * @name Text
	 *
	 * @description
	 * The superpack content (text)
	 *
	 * @type {string}
	 *
	 * @protected
	 */
	#text = '';

	/**
	* @name Text (set)
	*
	* @description
	* Setter for `this.#text`
	*
	* @public
	*/
	set text(value) {
		// Writing into the hour cost
		this.#text = value;

		// Dispatching event: "system.superpack.write"
		this.#shell.dispatchEvent(
			new CustomEvent("system.superpack.write", {
				detail: { name: 'text', value: value }
			})
		);

		if (this.#text.length > 0) {
			// Has a value

			// Deleting from the stages registry
			this.#stages.delete('text');
		} else {
			// Has no value 

			// Writing into the stages registry
			this.#stages.add('text');
		}
			
		// Reinitializing guide text-elements
		this.guide();
	}

	/**
	 * @name Supercost
	 *
	 * @description
	 * The superpack content (supercost)
	 *
	 * @type {number}
	 *
	 * @protected
	 */
	#supercost = 0;

	/**
	* @name Supercost (set)
	*
	* @description
	* Setter for `this.#supercost`
	*
	* @public
	*/
	set supercost(value) {
		// Writing into the hour cost
		this.#supercost = value;

		// Dispatching event: "system.superpack.write"
		this.#shell.dispatchEvent(
			new CustomEvent("system.superpack.write", {
				detail: { name: 'supercost', value: value }
			})
		);

		if (this.#supercost > 0) {
			// Has a value

			// Deleting from the stages registry
			this.#stages.delete('supercost');
		} else {
			// Has no value 

			// Writing into the stages registry
			this.#stages.add('supercost');
		}
			
		// Reinitializing guide supercost-elements
		this.guide();
	}

	/**
	 * @name Constructor
	 *
	 * @description
	 * Initialize an instance
	 *
	 * @param {HTMLElement} shell The shell element
	 **/
	constructor(
		shell,
		urn,
		title,
		html,
		text,
		supercost
	) {
		if (shell instanceof HTMLElement) {
			// Initialized the shell

			// Writing the shell HTML-element
			this.#shell = shell;

			if (urn instanceof HTMLElement) this.#elements.set('urn', urn);
			if (title instanceof HTMLElement) this.#elements.set('title', title);
			if (html instanceof HTMLElement) this.#elements.set('html', html);
			if (text instanceof HTMLElement) this.#elements.set('text', text);
			if (supercost instanceof HTMLElement) this.#elements.set('supercost', supercost);

			Object.assign(
				this.send,
				{
					/**
					 * @name Send (system)
					 *
					 * @description
					 * Send the superpack data to the server
					 *
					 * @memberof superpack.send
					 *
					 * @return {void}
					 */
					async system(request, resolve, reject) {
						try {
							if (
								// typeof identifier === "string" ||
								true
							) {
								// Validated all required arguments

								return await core.request(
									"/system/superpack/create",
									request,
									"PUT",
								).then(
									async (json) => {
										if (json) {
											// Received a JSON-response

											if (
												json.errors !== null &&
												typeof json.errors === "object" &&
												json.errors.length > 0
											) {
												// Fail (received errors)

												// Exit (fail)
												reject(json);
											} else {
												// Success (not received errors)

												// Reloading the page @todo make something smarter
												alert("Запрос доставлен");

												// Exit (success)
												resolve();
											}
										}
									},
									() => reject(),
								);
							}
						} catch (e) {
							console.log(e);

						}
					}
				}
			);

			core?.modules.connect("damper").then((connected) => {
				// Imported the damper.mjs module

				Object.assign(
					this.send,
					{
						/**
						 * @name Send (damper)
						 *
						 * @description
						 * Send the superpack data to the server
						 *
						 * @memberof superpack.send
						 *
						 * @param {booleanean} [force=false] Ignore the damper?
						 *
						 * @return {void}
						 */
						damper: core.damper(
							(...variables) => this.send.system(...variables),
							300,
							2,
						),
					}
				);
			});
		}
	}

	/**
	* @name Guide
	* 
	* @description
	* Set user interface help elements
	*
	* @param {(string|Set)} stages
	*
	* @public
	**/
	guide(stages) {
		if (stages !== undefined) {
			// Received stages

			 if (stages instanceof Set)	{
				 // Set

				 // Reinitializing stages
				 this.#stages = stages;
			 } else {
				 // String (expected) 

				 // Writing into stages
				 this.#stages.add(stages);
			 }
		}

	 for (const [parameter, element] of this.#elements) {
		 // Iterating over elements

		 // Initializing the guide HTML-element
		 const guide = element.querySelector('.guide');

		 if (guide instanceof HTMLElement) {
			 // Initialized the guide HTML-element

			 // Initializing the input HTML-element
			 const input = element.querySelector('.input');

			 if (input.value == "" || this.#stages.has(parameter)) {
				 // Requested guide

				 // Showing the guide
				 guide.classList.add('active');
			 } else {
				 // Not requested guide

				 // Hiding the guide
				 guide.classList.remove('active');
			 }
		 }
	 }
	}

	/**
	* @name Pack
	*
	* @description
	* Compose the superpack parameters
	*
	* @public
	*
	* @returns {string} Parameters row for `application/x-www-form-urlencoded`
	*/
	pack() { 
		// Exit (success)
		return "identifier=" + encodeURIComponent(new Date().valueOf())
			+ "&urn=" + encodeURIComponent(this.#urn)
			+ "&title=" + encodeURIComponent(this.#title)
			+ "&html=" + encodeURIComponent(this.#html)
			+ "&text=" + encodeURIComponent(this.#text)
			+ "&supercost=" + encodeURIComponent(this.#supercost)
		;
	}

	/**
	 * @name Send
	 *
	 * @description
	 * Compose the superpack and send to the server
	 *
	 * @public
	 *
	 * @param {boolean} [force=false] Ignore the damper?
	 */
  send(force = false) {
		core.modules.connect("damper").then(
			() => {
				// Imported the damper module

				// Processing under damper
				this.send.damper(this.pack(), force);
			},
			() => {
				// Not imported the damper module

				// Processing
				this.send.system(this.pack());
			},
		);
	}
}
