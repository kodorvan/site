<?php

declare(strict_types=1);

namespace kodorvan\site\controllers;

// Files of the project
use kodorvan\site\controllers\core;

// Framework for PHP
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\status;

/**
 * Index
 *
 * @package kodorvan\site\controllers
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

			// Initializing superpacks
			$this->view->superpacks = [
				[
					'class' => 'site direct',
					'icon_center' => 'crown',
					'image' => [
						'src' => '/themes/' . THEME . '/images/site_example.jpg',
						'alt' => 'Сайт для рекламы'
					],
					'title' => 'Лендинг',
					'description' => 'Сайт для рекламной компании',
					'features' => [
						[
							'icon' => 'template',
							'text' => 'Авангардный дизайн'
						],
						[
							'icon' => '',
							'text' => 'Продумана каждая деталь'
						],
						[
							'icon' => 'list-tree',
							'text' => 'Глубокий SEO'
						],
						/* [
							'icon' => 'document',
							'text' => 'Юридическая броня'
						], */
						[
							'icon' => 'bell',
							'text' => 'Регистрация в Роскомнадзор'
						]
					],
					'deal' => [
						'cost' => '30 000',
						'text' => 'ПОЛНАЯ СТОИМОСТЬ'
					],
					'button' => [
						'class' => 'request',
						'text' => 'ВЫБРАТЬ',
						'label' => 'Кнопка для заказа'
					]
				],
				[
					'class' => 'voronka',
					'icon_center' => 'crown',
					'image' => [
						'src' => '/themes/' . THEME . '/images/telegram_voronka.png',
						'alt' => 'Воронка в Телеграм'
					],
					'title' => 'Воронка',
					/* 'description' => '', */
					'features' => [
						[
							'icon' => 'phone',
							'text' => 'Сбор данных'
						],
						[
							'icon' => 'copy',
							'text' => 'Синхронизация с CRM'
						],
						[
							'icon' => 'track',
							'text' => 'Аналитика всех этапов'
						],
						/* [
							'icon' => '',
							'text' => 'Повышение конверсий'
						], */
						[
							'icon' => 'style',
							'text' => 'Иммерсивные техники'
						],
						[
							'icon' => 'smile',
							'text' => 'Никакой аренды'
						]
					],
					'deal' => [
						'cost' => '10 000',
						'text' => 'ПОЛНАЯ СТОИМОСТЬ'
					],
					'button' => [
						'class' => 'request',
						'text' => 'ВЫБРАТЬ',
						'label' => 'Кнопка для заказа'
					]
				],
				[
					'class' => 'ai assistent telegram',
					'icon_center' => '',
					'image' => [
						'src' => '/themes/' . THEME . '/images/telegram_voronka.png',
						'alt' => 'Воронка в Телеграм'
					],
					'title' => 'ИИ-ассистент',
					'description' => 'Личный консультант',
					'features' => [
						[
							'icon' => 'assign',
							'text' => 'Самообучение',
						],
						[
							'icon' => 'performance',
							'text' => 'Индивидуальная настройка'
						],
						[
							'icon' => 'extension',
							'text' => 'Актуализация базы данных'
						],
						[
							'icon' => '',
							'text' => 'Передовая ИИ-модель'
						],
						[
							'icon' => 'smile',
							'text' => 'Никакой аренды'
						]
					],
					'deal' => [
						'cost' => '15 000',
						'text' => 'ПОЛНАЯ СТОИМОСТЬ'
					],
					'button' => [
						'class' => 'request',
						'text' => 'ВЫБРАТЬ',
						'label' => 'Кнопка для заказа'
					]
				],
				[
					'class' => 'marketplace',
					'icon_center' => 'crown',
					'image' => [
						'src' => '/themes/' . THEME . '/images/site_example.jpg',
						'alt' => 'Сайт для рекламы'
					],
					'title' => 'Маркетплейс',
					'description' => 'Бюджет разработки >2млн',
					'features' => [
						[
							'icon' => 'trophy',
							'text' => 'Чистый код, без конструкторов'
						],
						[
							'icon' => 'template',
							'text' => 'Индивидуальный дизайн'
						],
						/* [
							'icon' => 'import',
							'text' => 'Годовая подписка на обновления'
						], */
						[
							'icon' => 'extension',
							'text' => 'Подключение к Мой Склад'
						],
						[
							'icon' => 'performance',
							'text' => 'Физический сервер с личным администратором'
						]
					],
					'article' => <<<HTML
						Изначально проект создавался как чат-робот Telegram с Web App, где по нажатию на кнопку пользователь попадал в мини-приложение, автоматически авторизовавшись через мессенджер.<br>
						<br>
						Там он видел весь каталог товаров с категориями, ценами, фильтрами и умным поиском. Всего за 2 минуты он проходил все этапы: наполнял корзину товарами, заполнял адрес доставки (в первый раз) и оплачивал через СБП! Сессия сохраняла данные между устройствами (смартфон и компьютер). Была проведена огромная аналитическая работа с фокус-группами и сбором статистики. Каждый элемент на экране размещён очень обоснованно.<br>
						<br>
						После оплаты приложение автоматически закрывается и пользователь возвращается в чат с роботом, где он видит список купленных товаров, статус заказа, оплаченный счёт, а так же подтверждение от оператора. Операторам в чат прилетает заказ с кнопкой "написать покупателю" прямо в Telegram!<br>
						<br>
						Сейчас мы развиваем проект как полноценный сайт, оставляя поддержку версии для мессенджеров.<br>
					  <br>
						В покупку лицензии включена стоимость разработки индивидуального дизайна<br>
						<br>
						После покупки вам нужно будет оплачивать размещение проекта на наших серверах - так мы гарантируем сохранность нашего кода, а вы экономите сотни тысяч рублей на системном администраторе, бекапах, юридических заморочках с роскомнадзором (берём ответственность на себя) и постоянным масштабированием. Цена небольшая, особенно учитывая, что туда входит наша постоянная тех. поддержка<br>
						<br>
						Не берём никаких процент с продаж!<br>
						<br>
						По желанию добавляем или удаляем функции, а критические обновления безопасности устанавливаем бесплатно. В случае проблем, тех.работ или утечек оповещаем моментально.
					HTML,
					'deal' => [
						'cost' => '120 000',
						'text' => 'ВЕЧНАЯ ЛИЦЕНЗИЯ НА КОД'
					],
					'button' => [
						'class' => 'deal blue',
						'text' => 'ВЫБРАТЬ',
						'label' => 'Кнопка выбора суперпака для калькулятора'
					]
				],
			];

			// Sending the cookie with the team workload (1800 = 30min)
			/* setcookie('workload', $this->view->workload, time() + 1800, '/'); */

			// Initializing contacts data
			$this->view->integrations = [
				'Вайлдберриз' => 'wildberries',
				'ОЗОН' => 'ozon',
				'Мой Склад' => 'moy_sklad',
				'1С Предприятие' => '1c',
				'Битрикс 24' => 'bitrix24',
				'ВКонтакте' => 'vk',
				'МАКС' => 'max',
				'Авито' => 'avito',
				'YClients' => 'yclients',
				'ЮКасса' => 'yookassa',
				'OpenAI' => 'openai',
				/* 'yandex_direct', */
				'Яндекс Директ' => 'yandex_market',
			];

			// Render page
			$page = $this->view->render(
				'pages/index.html',
				[
					'uri' => 'https://' . DOMAIN,
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
