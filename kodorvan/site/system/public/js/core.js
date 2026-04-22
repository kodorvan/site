"use strict";

/**
 * @name Core
 *
 * @description
 * Core of the project
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
class core {
	// Domain
	static domain = window.location.hostname;

	// Language
	static language = "ru";

	// Window
	static window;

	// The "loading" element
	static loading = document.getElementById("loading");

	// The <header> element
	static header = document.body.getElementsByTagName("header")[0];

	// The <aside> element
	static aside = document.body.getElementsByTagName("aside")[0];

	// The <menu> element
	static menu = document.getElementById("menu");

	// The <main> element
	static main = document.body.getElementsByTagName("main")[0];

	// The <footer> element
	static footer = document.body.getElementsByTagName("footer")[0];

	/**
	 * Request
	 *
	 * @param {string} uri
	 * @param {string} body
	 * @param {string} method POST, GET...
	 * @param {object} headers
	 * @param {string} type Format of response (json, text...)
	 *
	 * @return {Promise}
	 */
	static async request(
		uri = "/",
		body,
		method = "GET",
		headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			"Accept": "application/json",
		},
		type = "json",
	) {
		return await fetch(encodeURI(uri), { method, headers, body })
			.then((response) => type === null || response[type]());
	}

	/**
	 * @name Modules
	 *
	 * @method connect(modules) Connect modules
	 *
	 * @return {Array} List of initialized modules
	 */
	static modules() {
		return Object.keys(this).filter((module) =>
			this[module]?.type === "module"
		);
	}

	/**
	 * @name Buffer
	 */
	static buffer = class buffer {
		/**
		 * @name Write to buffers
		 *
		 * @description
		 * Write to buffers (interface)
		 *
		 * @param {string} name Name of the parameter
		 * @param {string} value Value of the parameter (it can be JSON)
		 *
		 * @return {bool} Execution completed with an error?
		 */
		static write(name, value) {
			core.modules.connect("damper").then(
				() => {
					// Imported the damper module

					// Execute under damper
					this.write.damper(name, value);
				},
				() => {
					// Not imported the damper module

					// Execute
					this.write.system(name, value);
				},
			);

			// Exit (success)
			return false;
		}
	};

	/**
	 * Сгенерировать окно выбора действия
	 *
	 * @param {string} title Верхний колонтинул
	 * @param {string} text Основное содержимое окна
	 * @param {string} left Содержимое левой кнопки
	 * @param {object} left_css Перечисление CSS-классов левой кнопки (массив)
	 * @param {function} left_click Действие после нажатия на левую кнопку
	 * @param {string} right Содержимое правой кнопки
	 * @param {object} right_css Перечисление CSS-классов правой кнопки (массив)
	 * @param {function} right_click Действие после нажатия на правую кнопку
	 *
	 * @return {void}
	 */
	/* static choose = core.damper(
		(
			title = "Выбор действия",
			text = "",
			left = "Да",
			left_css = ["grass"],
			left_click = () => {},
			right = "Нет",
			right_css = ["clay"],
			right_click = () => {},
		) => {
			// Инициализация оболочки всплывающего окна
			this.popup_body.wrap = document.createElement("div");
			this.popup_body.wrap.setAttribute("id", "popup");

			// Инициализация всплывающего окна
			const popup = document.createElement("section");
			popup.classList.add("list", "small");

			// Инициализация заголовка всплывающего окна
			const title_h3 = document.createElement("h3");
			title_h3.classList.add("unselectable");
			title_h3.innerText = title;

			// Инициализация оболочки с основной информацией
			const main = document.createElement("section");
			main.classList.add("main");

			// Инициализация колонки
			const column = document.createElement("div");
			column.classList.add("column");

			// Инициализация текста
			const text_p = document.createElement("p");
			text_p.innerText = text;

			// Инициализация строки
			const row = document.createElement("div");
			row.classList.add("row", "buttons");

			// Инициализация левой кнопки
			const left_button = document.createElement("button");
			left_button.classList.add(...left_css);
			left_button.innerText = left;
			left_button.addEventListener("click", left_click);

			// Инициализация правой кнопки
			const right_button = document.createElement("button");
			right_button.classList.add(...right_css);
			right_button.innerText = right;
			right_button.addEventListener("click", right_click);

			// Инициализация окна с ошибками
			this.popup_body.errors = document.createElement("section");
			this.popup_body.errors.classList.add(
				"errors",
				"window",
				"list",
				"calculated",
				"hidden",
			);
			this.popup_body.errors.setAttribute("data-errors", true);

			// Инициализация элемента-тела (оболочки) окна с ошибками
			const errors = document.createElement("section");
			errors.classList.add("body");

			// Инициализация элемента-списка ошибок
			const dl = document.createElement("dl");

			// Инициализация активного всплывающего окна
			const old = document.getElementById("popup");

			if (old instanceof HTMLElement) {
				// Найдено активное окно

				// Деинициализация быстрых действий по кнопкам
				document.removeEventListener("keydown", this.buttons);

				// Сброс блокировки
				this.freeze = false;

				// Удаление активного окна
				old.remove();
			}

			// Запись в документ
			popup.appendChild(title_h3);

			column.appendChild(text_p);

			row.appendChild(left_button);
			row.appendChild(right_button);
			column.appendChild(row);

			main.appendChild(column);
			popup.appendChild(main);

			this.popup_body.wrap.appendChild(popup);
			document.body.appendChild(this.popup_body.wrap);

			errors.appendChild(dl);
			this.popup_body.errors.appendChild(errors);
			this.popup_body.wrap.appendChild(this.popup_body.errors);

			// Инициализация ширины окна с ошибками
			this.popup_body.errors.style.setProperty(
				"--calculated-width",
				popup.offsetWidth + "px",
			);

			// Инициализация переменных для окна с ошибками (12 - это значение gap из div#popup)
			function top(errors) {
				errors.style.setProperty("transition", "0s");
				errors.style.setProperty(
					"--top",
					popup.offsetTop + popup.offsetHeight + 12 + "px",
				);
				setTimeout(() => errors.style.removeProperty("transition"), 100);
			}
			top(this.popup_body.errors);
			const resize = new ResizeObserver(() => top(this.popup_body.errors));
			resize.observe(this.popup_body.wrap);

			// Инициализация функции закрытия всплывающего окна
			const click = () => {
				// Блокировка
				if (this.freeze) return;

				// Удаление всплывающего окна
				this.popup_body.wrap.remove();

				// Удаление статуса активной строки
				row.removeAttribute("data-selected");

				// Деинициализация быстрых действий по кнопкам
				document.removeEventListener("keydown", this.buttons);

				// Сброс блокировки
				this.freeze = false;
			};

			// Инициализация функции добавления функции закрытия всплывающего окна
			const enable = () =>
				this.popup_body.wrap.addEventListener("click", click);

			// Инициализация функции удаления функции закрытия всплывающего окна
			const disable = () =>
				this.popup_body.wrap.removeEventListener("click", click);

			// Первичная активация функции удаления всплывающего окна
			enable();

			// Добавление функции удаления всплывающего окна по событиям
			popup.addEventListener("mouseenter", disable);
			popup.addEventListener("mouseleave", enable);

			// Добавление функции удаления всплывающего окна по кнопкам
			left_button.addEventListener("click", click);
			right_button.addEventListener("click", click);

			// Фокусировка
			right_button.focus();
		},
		300,
	); */
}

Object.assign(
	core.modules,
	{
		/**
		 * @name Connect modules
		 *
		 * @param {(Array|string)} modules Names of modules without extension (`.mjs` only)
		 *
		 * @return {Promise}
		 */
		async connect(modules) {
			// Normalisation required arguments
			if (typeof modules === "string") modules = [modules];

			if (modules instanceof Array) {
				// Received and validated required arguments

				// Initializing the registry of connected modules
				const connected = [];

				for (const module of modules) {
					// Iterating over modules

					// Downloading, importing and writing the module into a core property and into registry of connected modules
					core[module] =
						connected[module] =
							await (await import(`./modules/${module}.mjs`)).default;
				}

				// Exit (success)
				return connected;
			}
		},
	},
);

core.modules.connect("damper").then(() => {
	// Imported the damper module

	Object.assign(
		core.buffer.write,
		{
			/**
			 * @name Write to buffers
			 *
			 * @description
			 * Write to buffers (damper)
			 *
			 * @param {string} name Name of the parameter
			 * @param {string} value Value of the parameter (it can be JSON)
			 * @param {bool} force Ignore the damper? (false)
			 *
			 * @return {Promise}
			 */
			damper: core.damper(
				(...variables) => core.buffer.write.system(...variables),
				300,
				2,
			),
		},
	);
});

/**
 * @name Write to buffers
 *
 * @description
 * Write to buffers (system)
 *
 * @param {string} name Name of the parameter
 * @param {string} value Value of the parameter (it can be JSON)
 *
 * @return {Promise}
 */
Object.assign(
	core.buffer.write,
	{
		system(
			name,
			value,
			resolve = () => {},
			reject = () => {},
		) {
			try {
				core.modules.connect("session").then(() => {
					// Imported the session module

					// Write to the session buffer
					core.session.buffer?.write(name, value);
				});

				core.modules.connect("account").then(() => {
					// Imported the account module

					// Write to the account buffer
					core.account.buffer?.write(name, value);
				});

				// Exit (success)
				resolve();
			} catch (e) {
				// Exit (fail)
				reject(e);
			}
		},
	},
);

// Dispatching event: "core.initialized"
document.dispatchEvent(new CustomEvent("core.initialized"));
