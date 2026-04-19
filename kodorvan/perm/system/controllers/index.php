<?php

declare(strict_types=1);

namespace kodorvan\perm\controllers;

// Files of the project
use kodorvan\perm\controllers\core;

// Framework for PHP
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\status;

/**
 * Index
 *
 * @package kodorvan\perm\controllers
 *
 * @param array $errors Registry of errors
 *
 * @method null index() Main page
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
final class index extends core
{
	/**
	 * Errors
	 *
	 * @var array $errors Registry of errors
	 */
	protected array $errors = [
		'system' => []
	];

	/**
	 * Main page
	 *
	 * @return null
	 */
	public function index(): null
	{
		if (str_contains($this->request->headers['accept'] ?? '', content::html->value)) {
			// Request for HTML response

			// Initializing the team workload
			$this->view->workload = (string) ($_COOKIE['workload'] ?? rand(20, 80));

			// Initializing services
			$this->view->services = [
				[
					'class' => 'telegram voronka',
					'title' => 'Телеграм воронка',
					'icon_left' => '',
					/* 'icon_center' => 'import', */
					'icon_center' => 'crown',
					'icon_right' => '',
					'description' => <<<TXT
						Поступательно запросит данные пользователя, скомпонует, запишет в базу данных и синхронизирует в CRM
						<br><br>
						Используя иммерсивные технологии и многофакторный сбор обеспечивает максимальное удержание пользователя
						TXT,
					'howto' => 'Направьте к нему клиентов и ждите новых заказов в вашей CRM, на сайте или в чате',
					'buttons' => [
						[
							'icon' => 'comment',
							'href' => 'https://t.me/' . TELEGRAM_ROBOT['domain'] . '?start=telegram voronka'
						]
					],
					'theses' => [
						[
							'class' => 'yellow',
							'characteristic' => '-80%',
							'text' => 'НАГРУЗКА'
						],
						[
							'class' => 'blue',
							'colored' => true,
							'characteristic' => '+5%',
							'text' => 'КОНВЕРСИИ'
						],
						[
							'class' => 'green',
							'characteristic' => '0₽',
							'text' => 'НИКАКОЙ АРЕНДЫ'
						]
					],
					'background_image_src' => '/themes/default/images/telegram_voronka.png',
					'background_image_alt' => 'Телеграм воронка КОДОРВАНЬ',
					'cost' => '2000',
					'canceled' => 'ЗАБЛОКИРОВАН'
				],
				[
					'class' => 'parser',
					'title' => 'Парсер',
					'icon_left' => '',
					'icon_center' => 'search',
					'icon_right' => '',
					'description' => <<<TXT
						Любая работа за компьютером может быть автоматизирована
						<br><br>
						Парсер берёт данные с сайтов через API, либо эмулируя пользователя, а так же из excel-документов, CRM и бухгалтерии, затем просчитывает, анализирует и записывает результат
						TXT,
					'howto' => 'Подключите источники и снизьте нагрузку на операторов, оптимизируйте процессы',
					'extra' => [
						'Wildberries',
						'OZON',
						'Yandex Market',
						'Avito',
						'CDEK',
						'1C',
						'Bitrix',
						'Мой Склад'
					],
					'buttons' => [
						[
							'icon' => 'comment',
							/* 'href' => 'https://t.me/' . TELEGRAM_ROBOT['domain'] . '?start=parser' */
							'href' => 'https://t.me/' . TELEGRAM_ROBOT['domain'] . '?start=parser'
						]
					],
					'theses' => [
						[
							'class' => 'yellow',
							'colored' => true,
							'characteristic' => '-100%',
							'text' => 'НАГРУЗКА'
						],
						[
							'class' => 'cyan',
							'icon' => 'infinity',
							'text' => 'ВЕЧНАЯ ПОДДЕРЖКА'
						],
						[
							'class' => 'green',
							'icon' => 'play forwards',
							'text' => 'РЕКОРД СКОРОСТИ'
						]
					],
					'background_image_src' => '/themes/default/images/excel_small_compressed.jpg',
					'background_image_alt' => 'Парсеры КОДОРВАНЬ',
					'cost' => '3000'
				],
				[
					'class' => 'calculator',
					'title' => 'Калькулятор',
					'icon_left' => '',
					'icon_center' => 'calculator',
					'icon_right' => '',
					'description' => <<<TXT
						Составление алгоритма обработки большого объёма данных с использованием нейросетей и грамотно выбранной сортировки
						<br><br>
						Оператор вводит данные, нажимает на кнопки, двигает ползунки и мгновенно получает точный результат вычислений
						TXT,
					'howto' => 'Настройте параметры в панели управления и в долгосрочной перспективе сэкономьте тысячи часов рабочего времени',
					'extra' => [],
					'buttons' => [
						[
							'icon' => 'comment',
							'href' => 'https://t.me/' . TELEGRAM_ROBOT['domain'] . '?start=calculator'
						]
					],
					'theses' => [
						[
							'class' => 'yellow',
							'characteristic' => '-95%',
							'text' => 'НАГРУЗКА'
						],
						[
							'class' => 'green',
							'characteristic' => '-80%',
							'text' => 'ОШИБОК ВЫЧИСЛЕНИЙ'
						],
						[
							'class' => 'red',
							'colored' => true,
							'characteristic' => '+20%',
							'text' => 'ОБУЧАЕМОСТЬ'
						]
					],
					'background_image_src' => '/themes/default/images/tordv_compressed.jpg',
					'background_image_alt' => 'Калькулятор КОДОРВАНЬ',
					'cost' => '10 000'
				]

			];

			// Sending the cookie with the team workload (1800 = 30min)
			setcookie('workload', $this->view->workload, time() + 1800, '/');

			// Initializing the project constructor data
			$this->view->project = [
				'architectures' => [
					'site' => 'Сайт',
					'chat_robot' => 'Чат-робот',
					'program' => 'Программа',
					'module' => 'Модуль',
					'parser' => 'Парсер',
					'script' => 'Скрипт',
					'game' => 'Видеоигра',
					/* 'site' => 'Сайты и браузерные расширения',
					'chat_robot' => 'Чат-роботы (любой мессенджер)',
					'program' => 'Программа (Android, iOS, Windows)',
					'module' => 'Модуль для любой программы',
					'parser' => 'Парсер данных API, HTTP и эмуляция',
					'script' => 'Скрипт (автоматизация процессов)',
					'game' => 'Видеоигра (Android, iOS, Windows)' */
				],
				'purposes' => [
					'funnel' => 'Воронка',
					'contacts' => 'Контакты',
					'neural_network' => 'Нейросети',
					'gallery' => 'Галерея',
					'crm' => 'CRM',
					'landing' => 'Лендинг',
					'marketplace' => 'Маркетплейс',
					'search' => 'Поиск',
					'calculate' => 'Расчёты',
					'logic' => 'Логика',
					'game' => 'Игра',
					'special' => 'Особенный',
				],
				'integrations' => [
					'one_c' => '1C',
					'bitrix24' => 'Битрикс24',
					'moy_sklad' => 'Мой Склад',
					'telegram' => 'Телеграм',
					'mail' => 'Почта',
					'excel' => 'Excel'
				]
			];

			// Initializing contacts data
			$this->view->contacts = [
				'sim' => [
					'requests' => [
						'full' => PROJECT_CONTACTS_SIM_REQUESTS ?? 'Ошибка',
						'country' => PROJECT_CONTACTS_SIM_REQUESTS_COUNTRY ?? 'Ошибка',
						'operator' => PROJECT_CONTACTS_SIM_REQUESTS_OPERATOR ?? 'Ошибка',
						'number' => [
							PROJECT_CONTACTS_SIM_REQUESTS_NUMBER_1 ?? 'Ошибка',
							PROJECT_CONTACTS_SIM_REQUESTS_NUMBER_2 ?? 'Ошибка',
							PROJECT_CONTACTS_SIM_REQUESTS_NUMBER_3 ?? 'Ошибка'
						]
					]
				]
			];

			// Initializing contacts data
			$this->view->integrations = [
				'Мой Склад' => 'moy_sklad',
				'1С Предприятие' => '1c',
				'Битрикс 24' => 'bitrix24',
				'ВКонтакте' => 'vk',
				'МАКС' => 'max',
				/* 'yandex_direct', */
				'Яндекс Директ' => 'yandex_market',
				'ОЗОН' => 'ozon',
				'Вайлдберриз' => 'wildberries',
				'Авито' => 'avito',
				'YClients' => 'yclients',
				'ЮКасса' => 'yookassa',
				'OpenAI' => 'openai'
			];

			// Render page
			$page = $this->view->render(
				'main/index.html',
				[
					'smartphone' => $this->request->smartphone,
					'tablet' => $this->request->tablet
				]
			);

			// Sending response
			$this->response
				->start()
				->clean()
				->sse()
				->write($page)
				->validate($this->request)
				?->body()
				->end();

			// Deinitializing rendered page
			unset($page);

			// Exit (success)
			return null;
		}

		// Exit (fail)
		return null;
	}
}
