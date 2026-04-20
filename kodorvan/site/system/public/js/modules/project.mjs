/** @module project */

"use strict";

/**
 * @name project.mjs
 *
 * @description
 * Module for creating projects
 *
 * @class
 * @public
 *
 * {@link https://git.mirzaev.sexy/mirzaev/project.mjs}
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
export default class project {
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
	#stages = new Set([
		'hour'
	]);

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
	 * @name Days
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#days = Object.freeze({
    hours: 4,
    additional: 1
	});

	/**
	 * @name Hours
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#hours = Object.freeze({
    start: 1,
    additional: 0,
    minimal: 4
	});

	/**
	 * @name Hour
	 *
	 * @description
	 * Cost per development hour
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#hour = {
		default: 1800,
		request: 1800
	};

	/**
	* @name Hour (set)
	*
	* @description
	* Setter for `this.#hour`
	*
	* @public
	*/
	set hour(value) {
		// Normalizing the value
		if (value < 300) value = 300;
		else if (value > 5000) value = 5000;

		// Writing into the hour cost
		this.#hour.request = value;

		// Dispatching event: "project.write"
		this.#shell.dispatchEvent(
			new CustomEvent("project.write", {
				detail: { name: 'hour', value: value }
			})
		);

		// Recalculating
		this.calculate();

		if (this.#hour.request == this.#hour.default) {
			// The default value

			// Writing into the stages registry
			this.#stages.add('hour');
		} else {
			// Not the default value

			// Deleting from the stages registry
			this.#stages.delete('hour');
		}
			
		// Reinitializing guide HTML-elements
		this.guide();
	}

	/**
	 * @name Workers
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#workers = Object.freeze({
    programmer: {
			symbol: Symbol("programmer"),
			coefficient: 1.2
		},
    designer: {
			symbol: Symbol("contact"),
			coefficient: 1.2
		},
    booster: {
			symbol: Symbol("booster"),
			coefficient: 1.2
		},
	});

	/**
	 * @name Workers (get)
	 *
	 * @description
	 * Getter for `this.#workers`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get workers() {
		return this.#workers;
	}

	/**
	 * @name Team
	 *
	 * @type {Map}
	 *
	 * @protected
	 */
	#team = new Map([
		[this.#workers.programmer, 0],
    [this.#workers.designer, 0],
    [this.#workers.booster, 0]
	]);

	/**
	* @name Programmers (set)
	*
	* @description
	* Setter for `this.#team`
	*
	* @public
	*/
	set programmers(value) {
		// Writing into the development team buffer
		this.#team.set(this.#workers.programmer, value);

		// Dispatching event: "project.write"
		this.#shell.dispatchEvent(
			new CustomEvent("project.write", {
				detail: { name: 'programmers', value: value }
			})
		);

		// Writing into the HTML-element
		this.#elements.get('programmers').value = value;

		// Recalculate
		this.calculate();
	}

	/**
	* @name Designers (set)
	*
	* @description
	* Setter for `this.#team`
	*
	* @public
	*/
	set designers(value) {
		// Writing into the development team buffer
		this.#team.set(this.#workers.designer, value);

		// Dispatching event: "project.write"
		this.#shell.dispatchEvent(
			new CustomEvent("project.write", {
				detail: { name: 'designers', value: value }
			})
		);

		// Writing into the HTML-element
		this.#elements.get('designers').value = value;

		// Recalculate
		this.calculate();
	}

	/**
	* @name Boosters (set)
	*
	* @description
	* Setter for `this.#team`
	*
	* @public
	*/
	set boosters(value) {
		// Writing into the development team buffer
		this.#team.set(this.#workers.booster, value);

		// Dispatching event: "project.write"
		this.#shell.dispatchEvent(
			new CustomEvent("project.write", {
				detail: { name: 'boosters', value: value }
			})
		);

		// Writing into the HTML-element
		this.#elements.get('boosters').value = value;

		// Recalculate
		this.calculate();	
	}

	/**
	 * @name Team (get)
	 *
	 * @description
	 * Getter for `this.#team`
	 *
	 * @return {Map}
	 *
	 * @public
	 */
	get team() {
		return this.#team;
	}

	/**
	 * @name Services
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#services = Object.freeze({
    one_c: {
			symbol: Symbol("one_c"),
			coefficient: 3
		},
    bitrix24: {
			symbol: Symbol("bitrix24"),
			coefficient: 3.5
		},
    moy_sklad: {
			symbol: Symbol("moy_sklad"),
			coefficient: 3
		},
    mail: {
			symbol: Symbol("mail"),
			coefficient: 1.4
		},
    excel: {
			symbol: Symbol("excel"),
			coefficient: 1.8
		},
    ozon: {
			symbol: Symbol("ozon"),
			coefficient: 2.8
		},
    wildberries: {
			symbol: Symbol("wildberries"),
			coefficient: 2.9
		},
    yandex_market: {
			symbol: Symbol("yandex_market"),
			coefficient: 2.6
		},
    avito: {
			symbol: Symbol("avito"),
			coefficient: 2.4
		},
    vk: {
			symbol: Symbol("vk"),
			coefficient: 2
		},
    max: {
			symbol: Symbol("max"),
			coefficient: 2
		},
    telegram: {
			symbol: Symbol("telegram"),
			coefficient: 2
		},
    neural_networks: {
			symbol: Symbol("neural_networks"),
			coefficient: 2.6
		},
	});

	/**
	 * @name Services (get)
	 *
	 * @description
	 * Getter for `this.#services`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get services() {
		return this.#services;
	}

	/**
	 * @name Integrations
	 *
	 * @type {Set}
	 *
	 * @protected
	 */
	#integrations = new Set();

	/**
	 * @name Integrations (get)
	 *
	 * @description
	 * Getter for `this.#integrations`
	 *
	 * @return {Array}
	 *
	 * @public
	 */
	get integrations() {
		return [...this.#integrations];
	}

	/**
	 * @name Purposes
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#purposes = Object.freeze({
    funnel: {
			symbol: Symbol("funnel"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.mail,
				this.services.bitrix24,
				this.services.neural_networks,
			]),
			coefficient: 1.2
		},
    contacts: {
			symbol: Symbol("contacts"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.mail,
				this.services.bitrix24,
				this.services.neural_networks,
			]),
			coefficient: 1.1
		},
    ai: {
			symbol: Symbol("ai"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.one_c,
				this.services.bitrix24,
				this.services.excel,
				this.services.mail,
				this.services.ozon,
				this.services.wildberries,
				this.services.avito,
				this.services.yandex_market,
			]),
			coefficient: 3
		},
    archive: {
			symbol: Symbol("archive"),
			integrations: new Set([
			]),
			coefficient: 1
		},
    crm: {
			symbol: Symbol("crm"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.one_c,
				this.services.moy_sklad,
				this.services.excel,
				this.services.ozon,
				this.services.wildberries,
				this.services.avito,
				this.services.yandex_market,
			]),
			coefficient: 6
		},
    landing: {
			symbol: Symbol("landing"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.mail,
				this.services.bitrix24,
			]),
			coefficient: 1.5
		},
    marketplace: {
			symbol: Symbol("marketplace"),
			integrations: new Set([
				this.services.one_c,
				this.services.moy_sklad,
				this.services.excel,
				this.services.ozon,
				this.services.wildberries,
				this.services.avito,
				this.services.yandex_market,
			]),
			coefficient: 8
		},
    saas: {
			symbol: Symbol("saas"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.one_c,
				this.services.moy_sklad,
				this.services.excel,
				this.services.ozon,
				this.services.wildberries,
				this.services.avito,
				this.services.yandex_market,
			]),
			coefficient: 8
		},
    search: {
			symbol: Symbol("search"),
			integrations: new Set([
				this.services.telegram,
				this.services.max,
				this.services.vk,
				this.services.ozon,
				this.services.wildberries,
				this.services.avito,
				this.services.yandex_market,
			]),
			coefficient: 1
		},
    calculate: {
			symbol: Symbol("calculate"),
			integrations: new Set([
				this.services.one_c,
				this.services.moy_sklad,
				this.services.excel,
				this.services.ozon,
				this.services.wildberries,
				this.services.avito,
				this.services.yandex_market,
			]),
			coefficient: 2
		},
    game: {
			symbol: Symbol("game"),
			integrations: new Set([
			]),
			coefficient: 4
		},
    individual: {
			symbol: Symbol("individual"),
			// integrations: this.services,
			integrations: new Set([
			]),
			coefficient: 3
		}
	});

	/**
	 * @name Purposes (get)
	 *
	 * @description
	 * Getter for `this.#purposes`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get purposes() {
		return this.#purposes;
	}

	/**
	 * @name Architectures
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#architectures = Object.freeze({
    site:  {
			symbol: Symbol("site"),
			purposes: new Set([
				this.purposes.funnel,
				this.purposes.landing,
				this.purposes.contacts,
				this.purposes.archive,
				this.purposes.ai,
				this.purposes.crm,
				this.purposes.calculate,
				this.purposes.saas,
				this.purposes.marketplace,
				this.purposes.search,
				this.purposes.individual,
			]),
			coefficient: 3,
			cost: {
				usd: 120,
				rub: 12000
			},
			team: new Map([
				[this.#workers.programmer, 1],
				[this.#workers.designer, 1],
				[this.#workers.booster, 1]
			])
		},
    chat_robot: {
			symbol: Symbol("chat_robot"),
			purposes: new Set([
				this.purposes.funnel,
				this.purposes.landing,
				this.purposes.contacts,
				this.purposes.archive,
				this.purposes.ai,
				this.purposes.crm,
				this.purposes.calculate,
				this.purposes.saas,
				this.purposes.marketplace,
				this.purposes.individual,
			]),
			coefficient: 3,
			cost: {
				usd: 40,
				rub: 4000
			},
			team: new Map([
				[this.#workers.programmer, 1],
				[this.#workers.designer, 0],
				[this.#workers.booster, 0]
])
		},
		program:  {
			symbol: Symbol("program"),
			purposes: new Set([
				this.purposes.neural_network,
				this.purposes.ai,
				this.purposes.crm,
				this.purposes.calculate,
				this.purposes.marketplace,
				this.purposes.individual,
			]),
			coefficient: 4,
			cost: {
				usd: 180,
				rub: 18000
			},
			team: new Map([
				[this.#workers.programmer, 1],
				[this.#workers.designer, 1],
				[this.#workers.booster, 0]
])
		},
    
		game:  {
			symbol: Symbol("game"),
			purposes: new Set([
				this.purposes.logic
			]),
			cost: {
				usd: 150,
				rub: 15000
			},
			coefficient: 5,
			team: new Map([
				[this.#workers.programmer, 1],
				[this.#workers.designer, 1],
				[this.#workers.booster, 1]
])
		},
		script:  {
			symbol: Symbol("script"),
			purposes: new Set([
				this.purposes.search,
				this.purposes.individual,
			]),
			coefficient: 1,
			cost: {
				usd: 20,
				rub: 2000
			},
			team: new Map([
				[this.#workers.programmer, 1],
				[this.#workers.designer, 0],
				[this.#workers.booster, 0]
])
		},
		module:  {
			symbol: Symbol("module"),
			purposes: new Set([
				this.purposes.individual,
			]),
			coefficient: 1,
			cost: {
				usd: 60,
				rub: 6000
			},
			team: new Map([
				[this.#workers.programmer, 1],
				[this.#workers.designer, 0],
				[this.#workers.booster, 0]
])
		}
	});

	/**
	 * @name Architectures (get)
	 *
	 * @description
	 * Getter for `this.#architectures`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get architectures() {
		return this.#architectures;
	}

	/**
	 * @name Architecture
	 *
	 * @description
	 * Development direction and platform of the project
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#architecture;

	/**
	 * @name Architecture (set)
	 *
	 * @description
	 * Setter for `this.#architecture`
	 *
	 * @public
	 */
	set architecture(value) {
		// Declaring the architecture
		let architecture;

		if (typeof value === 'symbol') {
			// Symbol

			for (const target of this.#architectures) {
				// Iterating over architectures

				if (target?.symbol === integration) {
					// Found the target architecture by its symbol

					// Initializing the architecture
					architecture = target;

					// Terminating the loop
					break;
				}
			}
		} else if (typeof value === 'string') {
			// String

			// Initializing the architecture
			architecture = this.#architectures[value];
		} 

		if (Object.values(this.#architectures).includes(architecture)) {
			// Initialized the architecture
	
			// Writing the architecture
			this.#architecture = architecture;

			// Dispatching event: "project.write"
			this.#shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'architecture', value: architecture }
				})
			);

			// Deleting from the stages registry
			this.#stages.delete('architecture');
		} else {
			// Not initialized the architecture

			// Deleting the architecture
			this.#architecture = undefined;

			// Dispatching event: "project.write"
			this.#shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'architecture', value: undefined }
				})
			);

			// Writing into the stages registry
			this.#stages.add('architecture');
		}

		// Initializing the purpose HTML-element
		let purpose = this.#elements.get('purpose');

		if (typeof this.#architecture?.symbol === 'symbol') {
			// Initialized the architecture

			// Enabling the purpose HTML-element
			purpose.style.removeProperty('display');

			for (const option of purpose.querySelectorAll('option:not([data-project-select-title]')) {
				// Iteration over purposes

				if (this.#architecture.purposes.has(this.#purposes[option.value])) {
					// Included the purpose

					// Showing the purpose
					option.disabled = false;
					option.removeAttribute('hidden');
				} else {
					// Not included the purpose

					// Hiding the purpose
					option.disabled = true;
					option.setAttribute('hidden', 'true');
				}
			}

			// Reinitializing guide HTML-elements
			this.guide('purpose');

			if (this.#purpose !== undefined) {
				// Initialized the purpose

				if (this.#architecture?.purposes.has(this.#purpose)) {
					// The architecture has the same purpose

					// Reinitializing the purpose
					this.purpose = this.#purpose;
				} else {
					// The architecture has no the same purpose

					// Deinitializing the purpose
					this.purpose = undefined;
				}
			}
		} else {
			// Not initialized the architecture

			// Hiding the purpose HTML-element
			purpose.style.setProperty('display', 'none');
		}

		// Reinitializing the team programmers
		this.#team.set(this.#workers.programmer, architecture?.team.get(this.#workers.programmer) ?? 0);

		// Writing into the HTML-element
		this.#elements.get('programmers').value = this.#team.get(this.#workers.programmer);

		// Reinitializing the team designers
		this.#team.set(this.#workers.designer, architecture?.team.get(this.#workers.designer) ?? 0);

		// Writing into the HTML-element
		this.#elements.get('designers').value = this.#team.get(this.#workers.designer);

		// Reinitializing the team boosters
		this.#team.set(this.#workers.booster, architecture?.team.get(this.#workers.booster) ?? 0);

		// Writing into the HTML-element
		this.#elements.get('boosters').value = this.#team.get(this.#workers.booster);

		// Recalculating
		this.calculate(true);

		// Reinitializing guide HTML-elements
		this.guide();
	}

	/**
	 * @name Architecture (get)
	 *
	 * @description
	 * Getter for `this.#architecture`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get architecture() {
		return this.#architecture;
	}

	/**
	 * @name Purpose
	 *
	 * @description
	 * What will the project do
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#purpose;

	/**
	 * @name Purpose (set)
	 *
	 * @description
	 * Setter for `this.#purpose`
	 *
	 * @public
	 */
	set purpose(value) {
		// Declaring the purpose
		let purpose;

		if (typeof value === 'symbol') {
			// Symbol

			for (const target of this.#purposes) {
				// Iterating over purposes

				if (target?.symbol === integration) {
					// Found the target purpose by its symbol

					// Initializing the purpose
					purpose = target;

					// Terminating the loop
					break;
				}
			}
		} else if (typeof value === 'string') {
			// String

			// Initializing the purpose
			purpose = this.#purposes[value];
		} 

		if (Object.values(this.#purposes).includes(purpose)) {
			// Initialized the purpose

			if ([...this.architecture.purposes].map((value) => value?.symbol).find((value) => value === purpose?.symbol)) {
				// The architecture implies the purpose

				// Writing the purpose
				this.#purpose = purpose;

				// Dispatching event: "project.write"
				this.#shell.dispatchEvent(
					new CustomEvent("project.write", {
						detail: { name: 'purpose', value: purpose }
					})
				);

				// Deleting from the stages registry
				this.#stages.delete('purpose');
			}
		} else {
			// Not initialized the purpose

			// Deleting the purpose
			this.#purpose = undefined;

			// Dispatching event: "project.write"
			this.#shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'purpose', value: undefined }
				})
			);

			// Writing into the stages registry
			this.#stages.add('purpose');

			// Reinitializing the purpose input HTML-element value
			const input = this.#elements.get('purpose').getElementsByTagName('select')[0];
			if (input?.value != null) input.value = '';
		}

		if (typeof this.#purpose?.symbol === 'symbol') {
			// Initialized the purpose

			// Writing stages into the stages registry
			this.#stages.add('team');
			this.#stages.add('reward');

			// Enabling the integrations HTML-element
			this.#elements.get('team').style.removeProperty('display');
			this.#elements.get('reward').style.removeProperty('display');

			// Initializing the integrations HTML-element
			 let integrations = this.#elements.get('integrations');

			for (const wrap of integrations.querySelectorAll('div.integration')) {
				// Iteration over integrations

				// Initializing the integration elements
				let [input, label] = wrap.children;

				if (this.#purpose.integrations.has(this.#services[input.value])) {
					// Included the integration

					// Showing the integration
					input.disabled = false;
					wrap.style.removeProperty('display');
				} else {
					// Not included the integration

					// Disabling the integration
					input.checked = false;

					// Hiding the integration
					input.disabled = true;
					wrap.style.setProperty('display', 'none');
				}
			}

			if (integrations.querySelectorAll('div.integration>input:not(:disabled)').length > 0) {
				// Initialized at least 1 integration

				// Enabling the integrations HTML-element
				integrations.style.removeProperty('display');

				// Reinitializing the integrations guide HTML-elements
				this.integrations_reinitialize();
			} else {
				// No initialized integrations

				// Disabling the integrations HTML-element
				integrations.style.setProperty('display', 'none');
			}
		} else {
			// Not initialized the purpose
		}

		// Recalculating
		this.calculate(true);

		// Reinitializing guide HTML-elements
		this.guide();
	}

	/**
	 * @name Purpose (get)
	 *
	 * @description
	 * Getter for `this.#purpose`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get purpose() {
		return this.#purpose;
	}

	/**
	 * @name Project
	 *
	 * @description
	 * Information about the project
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#project = new (class {
		/**
		 * @name Core
		 *
		 * @description
		 * The core of the module
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#core;

		/**
		 * @name Name
		 *
		 * @description
		 * Name of the project
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#name;

		/**
		 * @name Name (set)
		 *
		 * @description
		 * Setter for `this.#name`
		 *
		 * @public
		 */
		set name(value) {
			if (typeof value === 'string' && value.length > 0) {
				// String

				// Writing the property
				this.#name = value;

				// Deleting from the stages registry
				this.#core.stages.delete('project_name');
			} else {
				// Undefined

				// Deleting the property
				this.#name = undefined;

				// Writing into the stages registry
				this.#core.stages.add('project_name');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'project_name', value: this.#name }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Name (get)
		 *
		 * @description
		 * Getter for `this.#name`
		 *
		 * @return {string}
		 *
		 * @public
		 */
		get name() {
			return this.#name;
		}

		/**
		 * @name Description
		 *
		 * @description
		 * Description of the project
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#description;

		/**
		 * @name Description (set)
		 *
		 * @description
		 * Setter for `this.#description`
		 *
		 * @public
		 */
		set description(value) {
			if (typeof value === 'string' && value.length > 0) {
				// String

				// Writing the property
				this.#description = value;

				// Deleting from the stages registry
				this.#core.stages.delete('project_description');
			} else {
				// Undefined

				// Deleting the property
				this.#description = undefined;

				// Writing into the stages registry
				this.#core.stages.add('project_description');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'project_description', value: this.#description }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Description (get)
		 *
		 * @description
		 * Getter for `this.#description`
		 *
		 * @return {string}
		 *
		 * @public
		 */
		get description() {
			return this.#description;
		}

		/**
		 * @name Files
		 *
		 * @description
		 * Files of the project
		 *
		 * @type {Array}
		 *
		 * @protected
		 */
		#files = [];

		/**
		 * @name Files (set)
		 *
		 * @description
		 * Setter for `this.#files`
		 *
		 * @public
		 */
		set files(value) {
			if (value instanceof Array && value.length > 0) {
				// Array

				// Writing the property
				this.#files = value;
			} else if (value instanceof FileList && value.length > 0) {
				// FileList

				// Writing the property
				this.#files = [...value];
			} else if (value instanceof File){
				// File

				// Writing into the property
				this.#files.push(value);
			} else {
				// Undefined

				// Deleting the property
				this.#files = [];
			}

			if (this.#files.length > 0) {
				// Has files

				// Deleting from the stages registry
				this.#core.stages.delete('project_files');
			} else {
				// Has no files

				// Writing into the stages registry
				this.#core.stages.add('project_files');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'project_files', value: this.#files }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Files (get)
		 *
		 * @description
		 * Getter for `this.#files`
		 *
		 * @return {string}
		 *
		 * @public
		 */
		get files() {
			return this.#files;
		}

		/**
		 * @name Constructor
		 *
		 * @param {object} core The core of the module
		 **/
		constructor(core) {
			if (typeof core === 'object') {
				// Initialized the core

				// Writing the core
				this.#core = core;
			}
		}
	})(this);

	/**
	 * @name Project (get)
	 *
	 * @description
	 * Getter for `this.#project`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get project() {
		return this.#project;
	}

	/**
	 * @name Requester
	 *
	 * @description
	 * Information about the requester (user)
	 *
	 * @type {object}
	 *
	 * @protected
	 */
	#requester = new (class {
		/**
		 * @name Core
		 *
		 * @description
		 * The core of the module
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#core;

		/**
		 * @name Name
		 *
		 * @description
		 * Name of the requester
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#name;

		/**
		 * @name Name (set)
		 *
		 * @description
		 * Setter for `this.#name`
		 *
		 * @public
		 */
		set name(value) {
			if (typeof value === 'string' && value.length > 0) {
				// String

				// Writing the property
				this.#name = value;

				// Deleting from the stages registry
				this.#core.stages.delete('requester_name');
			} else {
				// Undefined

				// Deleting the property
				this.#name = undefined;

				// Writing into the stages registry
				this.#core.stages.add('requester_name');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'requester_name', value: this.#name }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Name (get)
		 *
		 * @description
		 * Getter for `this.#name`
		 *
		 * @return {string}
		 *
		 * @public
		 */
		get name() {
			return this.#name;
		}

		/**
		 * @name SIM
		 *
		 * @description
		 * SIM-number of the requester
		 *
		 * @type {(string|number)}
		 *
		 * @protected
		 */
		#sim;

		/**
		 * @name SIM (set)
		 *
		 * @description
		 * Setter for `this.#sim`
		 *
		 * @public
		 */
		set sim(value) {
			if ((typeof value === 'string' && value.length > 0) || typeof value === 'number') {
				// String

				// Writing the property
				this.#sim = value;

				// Deleting from the stages registry
				this.#core.stages.delete('requester_sim');
			} else {
				// Undefined

				// Deleting the property
				this.#sim = undefined;

				// Writing into the stages registry
				this.#core.stages.add('requester_sim');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'requester_sim', value: this.#sim }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name SIM (get)
		 *
		 * @description
		 * Getter for `this.#sim`
		 *
		 * @return {(string|number)}
		 *
		 * @public
		 */
		get sim() {
			return this.#sim;
		}

		/**
		 * @name Mail
		 *
		 * @description
		 * Mail of the requester
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#mail;

		/**
		 * @name Mail (set)
		 *
		 * @description
		 * Setter for `this.#mail`
		 *
		 * @public
		 */
		set mail(value) {
			if (typeof value === 'string' && value.length > 0) {
				// String

				// Writing the property
				this.#mail = value;

				// Deleting from the stages registry
				this.#core.stages.delete('requester_mail');
			} else {
				// Undefined

				// Deleting the property
				this.#mail = undefined;

				// Writing into the stages registry
				this.#core.stages.add('requester_mail');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'requester_mail', value: this.#mail }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Mail (get)
		 *
		 * @description
		 * Getter for `this.#mail`
		 *
		 * @return {string}
		 *
		 * @public
		 */
		get mail() {
			return this.#mail;
		}

		/**
		 * @name Other
		 *
		 * @description
		 * Other contact data of the requester
		 *
		 * @type {string}
		 *
		 * @protected
		 */
		#other;

		/**
		 * @name Other (set)
		 *
		 * @description
		 * Setter for `this.#other`
		 *
		 * @public
		 */
		set other(value) {
			if (typeof value === 'string' && value.length > 0) {
				// String

				// Writing the property
				this.#other = value;

				// Deleting from the stages registry
				this.#core.stages.delete('requester_other');
			} else {
				// Undefined

				// Deleting the property
				this.#other = undefined;

				// Writing into the stages registry
				this.#core.stages.add('requester_other');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'requester_other', value: this.#other }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Other (get)
		 *
		 * @description
		 * Getter for `this.#other`
		 *
		 * @return {string}
		 *
		 * @public
		 */
		get other() {
			return this.#other;
		}

		/**
		 * @name Personal
		 *
		 * @description
		 * personal contact data of the requester
		 *
		 * @type {boolean}
		 *
		 * @protected
		 */
		#personal;

		/**
		 * @name Personal (set)
		 *
		 * @description
		 * Setter for `this.#personal`
		 *
		 * @public
		 */
		set personal(value) {
			if ((typeof value === 'string' && value === 'on') 
				|| value === true) {
				// String "on"

				// Writing the property
				this.#personal = true;

				// Deleting from the stages registry
				this.#core.stages.delete('requester_personal');
			} else {
				// Undefined

				// Deleting the property
				this.#personal = false;

				// Writing into the stages registry
				this.#core.stages.add('requester_personal');
			}

			// Dispatching event: "project.write"
			this.#core.shell.dispatchEvent(
				new CustomEvent("project.write", {
					detail: { name: 'requester_personal', value: this.#personal }
				})
			);

			// Reinitializing guide HTML-elements
			this.#core.guide();
		};

		/**
		 * @name Personal (get)
		 *
		 * @description
		 * Getter for `this.#personal`
		 *
		 * @return {boolean}
		 *
		 * @public
		 */
		get personal() {
			return this.#personal;
		}

		/**
		 * @name Constructor
		 *
		 * @param {object} core The core of the module
		 **/
		constructor(core) {
			if (typeof core === 'object') {
				// Initialized the core

				// Writing the core
				this.#core = core;
			}
		}
	})(this);

	/**
	 * @name Requester (get)
	 *
	 * @description
	 * Getter for `this.#requester`
	 *
	 * @return {object}
	 *
	 * @public
	 */
	get requester() {
		return this.#requester;
	}

	/**
	 * @name Constructor
	 *
	 * @description
	 * Initialize a hotline instance
	 *
	 * @param {HTMLElement} shell The shell element
	 * @param {booleanean} [inject=false] Write the hotline instance into the shell element?
	 **/
	constructor(
		shell,
		architecture,
		purpose,
		integrations,
		team,
		programmers,
		designers,
		boosters,
		reward,
		hour,
		hour_input_number,
		hour_input_range,
		result,
		calculated,
		hours,
		hours_output,
		days_output,
		payment,
		payment_output,
		prepayment,
		prepayment_output,
		project_name,
		project_description,
		project_files,
		requester_name,
		requester_sim,
		requester_mail,
		requester_other,
		requester_personal,
		inject = false
	) {
		if (shell instanceof HTMLElement) {
			// Initialized the shell

			// Writing the shell HTML-element
			this.#shell = shell;

			// Writing the instance into the shell element
			if (inject) this.#shell.project = this;

			if (architecture instanceof HTMLElement) this.#elements.set('architecture', architecture);
			if (purpose instanceof HTMLElement) this.#elements.set('purpose', purpose);
			if (integrations instanceof HTMLElement) this.#elements.set('integrations', integrations);

			if (team instanceof HTMLElement) this.#elements.set('team', team);
			if (programmers instanceof HTMLElement) this.#elements.set('programmers', programmers);
			if (designers instanceof HTMLElement) this.#elements.set('designers', designers);
			if (boosters instanceof HTMLElement) this.#elements.set('boosters', boosters);

			if (reward instanceof HTMLElement) this.#elements.set('reward', reward);
			if (hour instanceof HTMLElement) this.#elements.set('hour', hour);
			if (hour_input_number instanceof HTMLElement) this.#elements.set('hour_input_number', hour_input_number);
			if (hour_input_range instanceof HTMLElement) this.#elements.set('hour_input_range', hour_input_range);

			if (result instanceof HTMLElement) this.#elements.set('result', result);
			if (calculated instanceof HTMLElement) this.#elements.set('calculated', calculated);

			if (hours instanceof HTMLElement) this.#elements.set('hours', hours);
			if (hours_output instanceof HTMLElement) this.#elements.set('hours_output', hours_output);
			if (days_output instanceof HTMLElement) this.#elements.set('days_output', days_output);

			if (payment instanceof HTMLElement) this.#elements.set('payment', payment);
			if (payment_output instanceof HTMLElement) this.#elements.set('payment_output', payment_output);

			if (prepayment instanceof HTMLElement) this.#elements.set('prepayment', prepayment);
			if (prepayment_output instanceof HTMLElement) this.#elements.set('prepayment_output', prepayment_output);

			if (project_name instanceof HTMLElement) this.#elements.set('project_name', project_name);
			if (project_description instanceof HTMLElement) this.#elements.set('project_description', project_description);
			if (project_files instanceof HTMLElement) this.#elements.set('project_files', project_files);

			if (requester_name instanceof HTMLElement) this.#elements.set('requester_name', requester_name);
			if (requester_sim instanceof HTMLElement) this.#elements.set('requester_sim', requester_sim);
			if (requester_mail instanceof HTMLElement) this.#elements.set('requester_mail', requester_mail);
			if (requester_other instanceof HTMLElement) this.#elements.set('requester_other', requester_other);
			if (requester_personal instanceof HTMLElement) this.#elements.set('requester_personal', requester_personal);

			Object.assign(
				this.send,
				{
					/**
					 * @name Send (system)
					 *
					 * @description
					 * Send the project data to the server
					 *
					 * @memberof project.send
					 *
					 * @return {void}
					 */
					async system(request, files, resolve, reject) {
						try {
							if (
								// typeof identifier === "string" ||
								true
							) {
								// Validated all required arguments

								// Initializing the body buffer
								const body = new FormData();

								// Writing parameters into the body buffer
								body.append("request", request);

								// Initializing the file index
								let index = 0;

								for (const file of files) {
									// Iterating over files

									// Writing the parameter into the body buffer
									body.append('file_' + index++, file);
								}

								return await core.request(
									"/project/request",
									body,
									"PUT",
									{
										"Accept": "application/json",
									},
									null,
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

												// Yandex Metrika goal reached
												ym(108320242,'reachGoal','project_requested', { order_price: '0', currency: 'RUB' });

												// Reloading the page @todo make something smarter
												alert("Запрос доставлен, ожидайте обратной связи");

												// Initializing the rofls HTML-element
												const rofls = document.getElementById('rofls');

												// Showing rofls
												rofls.style.removeProperty('display');

												// Starting the rofls hotline.mjs instance
												rofls.instance.start();

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
						 * Send the project data to the server
						 *
						 * @memberof project.send
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
	* @name Integrate
	*
	* @description
	* Setter for `this.#integrations`
	*
	* @param {(string|Symbol|object)} integration The service, symbol or instance
	*
	* @public
	*/
	integrate(integration) {
		if (typeof integration === 'symbol') {
			// Symbol

			for (const service of this.#services) {
				// Iterating over services

				if (service?.symbol === integration) {
					// Found the service by its symbol

					// Initializing the integration
					integration = service;

					// Terminating the loop
					break;
				}
			}
		} else {
			// String

			// Initializing the integration
			integration = this.#services[integration];
		}

		if (Object.values(this.#services).includes(integration)) {
			// Initialized the integration

			// Enabling the integration
			this.#integrations.add(integration);
		}

		// Reinitializing the integrations guide HTML-elements
		this.integrations_reinitialize();
	}

	/**
	* @name Desintegrate
	*
	* @description
	* Unsetter for `this.#integrations`
	*
	* @param {(string|Symbol|object)} integration The service, symbol or instance
	*
	* @public
	*/
	desintegrate(integration) {
		if (typeof integration === 'symbol') {
			// Symbol

			for (const service of this.#services) {
				// Iterating over services

				if (service?.symbol === integration) {
					// Found the service by its symbol

					// Initializing the integration
					integration = service;

					// Terminating the loop
					break;
				}
			}
		} else {
			// String

			// Initializing the integration
			integration = this.#services[integration];
		}

		if (Object.values(this.#services).includes(integration)) {
			// Initialized the integration

			// Disabling the integration
			this.#integrations.delete(integration);
		}

		// Reinitializing the integrations stage
		this.integrations_reinitialize();
	}

	/**
	* @name Integrations
	*
	* @description
	* Show or hide the integrations HTML-element by amount of avaiable integrations
	*
	* @public
	*/
	integrations_reinitialize() {
		// Initializing the integrations HTML-element
		const integrations = this.#elements.get('integrations');

		if (integrations.querySelectorAll('div.integration>input:checked').length > 0) {
			// Selected at least 1 integration

			// Deinitializing the stage
			this.#stages.delete('integrations');
		} else {
			// No selected integrations

			// Initializing the stage
			this.#stages.add('integrations');
		}

		// Recalculating
		this.calculate();

		// Reinitializing the integrations guide HTML-elements
		this.guide();
	}

	/**
	* @name Hours
	*
	* @description
	* Calculate development time and write into its HTML-element
	*
	* @public
	*
	* @param {boolean} inject Inject into the HTML-element?
	* @param {boolean} absolute Calculate by the absolute coefficient?
	*
	* @returns {number} Amount of development hours
	*/
	hours(inject = false, absolute = false) {
		// Initializing start hours
		let start = this.#hours.start ?? 1;
		if (start < 1) start = 1;

		// Initializing additional hours
		let additional = this.#hours.additional ?? 0;

		// Declaring the hours buffer
		let hours;

		if (absolute) {
			// Absolute coefficient calculation

		} else {
			// Relative coefficient calculation

			// Initializing the development hours
			hours = start;

			if (this.#architecture !== undefined) {
				// Initialized the architecture

				// Multiplication with the coefficient
				hours *= this.#architecture.coefficient ?? 1;
			}

			if (this.#purpose !== undefined) {
				// Initialized the purpose

				// Multiplication with the coefficient
				hours *= this.#purpose.coefficient ?? 1;
			}

			if (this.#integrations.size > 0) {
				// Initialized at least 1 integration

				for (const integration of this.#integrations) {
					// Iterating over integrations
 
					// Multiplication with the coefficient
					hours *= integration.coefficient ?? 1;
				}
			}

			// Adding the additional hours
			hours += additional;

			// Normalizing the hours
			hours = Math.ceil(Math.max(hours, this.#hours.minimal));
		}

		if (inject) {
			// Inject into the hours HTML-element

			// Initializing the result HTML-element
			const result = this.#elements.get('result');

			// Showing the result HTML-element
			result.style.removeProperty('display');

			// Initializing the hours HTML-element
			const output = this.#elements.get('hours_output');

			// Writing into the hours output HTML-element
			output.innerText = hours;

			// Initializing the hours wrap HTML-element
			const wrap = this.#elements.get('hours');

			// Showing the hours wrap HTML-element
			wrap.style.removeProperty('display');
		}

		// Exit (success)
		return hours;
	}


	/**
	* @name Days
	*
	* @description
	* Calculate development days and write into its HTML-element
	*
	* @public
	*
	* @param {number} hours Amount of hours
	* @param {boolean} inject Inject into the HTML-element?
	*
	* @returns {number} Amount of development days
	*/
	days(hours, inject = false) {
		// Calculating days by hours
		const days = Math.ceil((hours / this.#days.hours) + this.#days.additional);

		if (inject) {
			// Inject into the days HTML-element

			// Initializing the days HTML-element
			const output = this.#elements.get('days_output');

			// Writing into the days output HTML-element
			output.innerText = days;
		}

		// Exit (success)
		return days;
	}

	/**
	* @name Payment
	*
	* @description
	* Calculate payment and prepayment, then write into its HTML-elements
	*
	* @public
	*
	* @param {number} hours Amount of hours
	* @param {boolean} [inject = false] Inject into the HTML-element?
	*
	* @returns {object} {'full' => number, 'prepayment' => number}
	*/
	payment(hours, inject = false) {
		// Initializing costs
		const costs = {
			full: Math.ceil(hours * this.#hour.request),
			prepayment: null
		};

		for (const worker of Object.values(this.#workers)) {
			// Iteration over workers

			// Initializing workers in the development team
			const team = this.#team.get(worker);

			if (team > this.#architecture?.team.get(worker)) {
				// More than default

				// Multiplication with the programmers coefficient
				costs.full *= team * worker.coefficient;
			} else {
				// Less than default

				// Division with the programmers coefficient
				costs.full /= Math.max(team, 1)  * worker.coefficient;
			}
		}

		// Ceiling the full cost
		costs.full = Math.ceil(costs.full);

		// Calculating the prepayment (30%)
		costs.prepayment = Math.ceil(costs.full * 0.3);

		if (inject) {
			// Inject into the hours HTML-element

			// Initializing the result HTML-element
			const result = this.#elements.get('result');

			// Showing the result HTML-element
			result.style.removeProperty('display');

			// Initializing the output HTML-elements
			const payment_output = this.#elements.get('payment_output');
			const prepayment_output = this.#elements.get('prepayment_output');

			// Writing into the output HTML-elements
			payment_output.innerText = new Intl.NumberFormat("ru-RU", { maximumSignificantDigits: 3 }).format(costs.full);
			prepayment_output.innerText =  new Intl.NumberFormat("ru-RU", { maximumSignificantDigits: 3 }).format(costs.prepayment);

			// Initializing the wrap HTML-elements
			const payment_wrap = this.#elements.get('payment');
			const prepayment_wrap = this.#elements.get('prepayment');

			// Showing the wrap HTML-elements
			payment_wrap.style.removeProperty('display');
			prepayment_wrap.style.removeProperty('display');
		}

		// Exit (success)
		return costs;
	}

	/**
	* @name Calculate
	*
	* @description
	* Calculate payment, prepayment, hours and days, then write into its HTML-elements
	*
	* @public
	*
	* @returns {object} The calculation result
	*/
	calculate() {
		// Calculating
		const hours = this.hours(true, false);
		const days = this.days(hours, true);
		const payment = this.payment(hours, true);

		// Dispatching event: "project.calculated"
		this.#shell.dispatchEvent(
			new CustomEvent("project.calculated", {
				detail: { hours, days, payment }
			})
		);

		// Exit (success)
		return { hours, days, payment };
	}

	/**
	* @name Pack
	*
	* @description
	* Compose the project to JSON
	*
	* @public
	*
	* @returns {string} JSON
	*/
	pack() {
		// Calculating
		const calculated = this.calculate();

    // Exit (success)
		return JSON.stringify({
			identifier: new Date().valueOf(),
			calculator: {
				architecture: this.#architecture?.symbol.description,
				purpose: this.#purpose?.symbol.description,
				integrations: [...this.#integrations].map((value) => value.symbol.description),
				team: {
					programmers: this.#team.get(this.#workers.programmer) ?? this.#architecture.team.get(this.#workers.programmer),
					designers: this.#team.get(this.#workers.designer) ?? this.#architecture.team.get(this.#workers.designer),
					boosters: this.#team.get(this.#workers.booster) ?? this.#architecture.team.get(this.#workers.booster),
				},
				hour: this.#hour,
				calculated
			},
			project: {
				name: this.#project.name,
				description: this.#project.description,
			},
			requester: {
				name: this.#requester.name,
				sim: this.#requester.sim,
				mail: this.#requester.mail,
				other: this.#requester.other,
				personal: this.#requester.personal
			}
		});
	}

	/**
	* @name Send
	*
	* @description
	* Compose the project and send to the server
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
				this.send.damper(this.pack(), this.#project.files, force);
			},
			() => {
				// Not imported the damper module

				// Processing
				this.send.system(this.pack(), this.#project.files);
			},
		);
	}
}
