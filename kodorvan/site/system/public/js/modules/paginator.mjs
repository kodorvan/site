/** @module paginator */

"use strict";

/**
 * @name paginator.mjs
 *
 * @description
 * Module for pagination
 *
 * @class
 * @public
 *
 * {@link https://git.mirzaev.sexy/mirzaev/hotline.mjs}
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
export default class paginator {
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
	 * @name Pages
	 *
	 * @type {NodeList}
	 *
	 * @protected
	 */
	#pages;

	/**
	 * @name Pages (get)
	 *
	 * @return {NodeList}
	 *
	 * @public
	 */
	get pages() {
		return this.#pages;
	}

	/**
	 * @name Page
	 *
	 * @type {number}
	 *
	 * @protected
	 */
	#page = 1;

	/**
	 * @name Page (get)
	 *
	 * @return {number}
	 *
	 * @public
	 */
	get page() {
		return this.#page;
	}

	/**
	 * @name The initial page
	 *
	 * @type {number}
	 *
	 * @protected
	 */
	#initial = 1;

	/**
	 * @name The initial page (get)
	 *
	 * @return {number}
	 *
	 * @public
	 */
	get initial() {
		return this.#initial;
	}

	/**
	 * @name Constructor
	 *
	 * @description
	 * Initialize a hotline instance
	 *
	 * @param {HTMLElement} shell The shell element
	 * @param {NodeList} pages The pages HTML-elements list
	 * @param {number} initial The initial page identifier
	 * @param {boolean} [inject=false] Write the hotline instance into the shell element?
	 **/
	constructor(
		shell,
		pages,
		initial,
		inject = false
	) {
		if (shell instanceof HTMLElement) {
			// Initialized the shell

			// Writing the shell HTML-element
			this.#shell = shell;

			// Writing the instance into the shell element
			if (inject) this.#shell.paginator = this;
		}

		if (pages instanceof NodeList) {
			// Initialized the pages HTML-elements list

			// Writing the pages HTML-elements list
			this.#pages = pages;
		}

		if (typeof initial === 'number') {
			// Initialized the initial page identifier

			// Writing the initial page identifier
			this.#page = this.#initial = initial;
		}
	}

	/**
	 * @name Relative
	 *
	 * @description
	 * Hide all pages then show the active page
	 *
	 * @param {number} offset Relative to `this.#page` adding number
	 **/
	relative(offset) {
		// Initializing the target page
		const target = this.#page + offset;

		// Initializing the target page HTML-element
		const active = document.querySelector('section[data-paginator-page="' + target + '"]');

		if (active instanceof HTMLElement) {
			// Initialized the target page HTML-element

			for (const inactive of this.#pages) {
				// Iteration over pages

				// Hiding the page HTML-element
				inactive.style.setProperty('display', 'none');
			}

			// Showing the target page HTML-element
			active.style.removeProperty('display');

			// Reinitializing the active page
			this.#page = target;

			// Initializing the active page focus identifier
			const focus = active?.getAttribute('data-paginator-page-focus');

			if (focus != null && focus.length > 1) {
				// Initialized the active page focus identifier

				// Initializing the active page focus HTML-element
				const element = document.getElementById(focus);

			 if (element instanceof HTMLElement) {
				 // Initialized the active page focus HTML-element

				 // Changing the user focus
				 element.focus();
			 }
			}

			// Dispatching event: "paginator.page.opened"
			this.#shell?.dispatchEvent(
				new CustomEvent("paginator.page.opened", {
					detail: { identifier: this.#page, element: active }
				})
			);
		}
	}
}
