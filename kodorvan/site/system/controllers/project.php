<?php

declare(strict_types=1);

namespace kodorvan\site\controllers;

// Files of the project
use kodorvan\site\controllers\core;

// PHP framework
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\method,
	mirzaev\minimal\http\enumerations\status;

// Mail server
use PHPMailer\PHPMailer\PHPMailer as mail,
	PHPMailer\PHPMailer\SMTP as smtp,
	PHPMailer\PHPMailer\Exception as mail_exception;

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
final class project extends core
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
	 * Page: calculator
	 *
	 * @return null
	 */
	public function calculator(): null
	{
		if ($this->request->method === method::get) {
			// GET

			if (str_contains($this->request->headers['accept'] ?? '', content::html->value)) {
				// Request for HTML response

				// Initializing the project constructor data
				$this->view->calculator = [
					'architectures' => [
						'site' => 'Сайт',
						'chat_robot' => 'Чат-робот',
						'program' => 'Программа',
						'game' => 'Видеоигра',
						'script' => 'Скрипт, парсер, макрос',
						'module' => 'Модуль, плагин, расширение',
					],
					'purposes' => [
						'funnel' => 'Воронка (обработка пользователя)',
						'contacts' => 'Контакты (сбор данных)',
						'ai' => 'Внедрение ИИ',
						'archive' => 'Архив (галерея, библиотека, реестр)',
						'crm' => 'Индивидуальная CRM',
						'landing' => 'Лендинг (посадочная страница)',
						'marketplace' => 'Маркетплейс, магазин, витрина',
						'saas' => 'SaaS проект',
						'search' => 'Поиск и анализ',
						'calculate' => 'Вычисления (калькулятор)',
						'individual' => 'Индивидуальная разработка',
					],
					'integrations' => [
						'one_c' => '1C',
						'bitrix24' => 'Битрикс24',
						'moy_sklad' => 'Мой Склад',
						'mail' => 'Почта',
						'excel' => 'Excel',
						'ozon' => 'OZON',
						'wildberries' => 'Wildberries',
						'yandex_market' => 'Яндекс Маркет',
						'avito' => 'Авито',
						'vk' => 'ВКонтакте',
						'max' => 'МАКС',
						'telegram' => 'Телеграм',
						'neural_networks' => 'Нейросети'
					]
				];

				// Render page
				$page = $this->view->render(
					'pages/project/calculator.html',
					[
						'uri' => 'https://' . DOMAIN . "/project/calculator",
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
		}

		// Exit (fail)
		return null;
	}

	/**
	 * Request the project by calculator
	 *
	 * @return null
	 */
	public function request(string $request): null
	{
		// Debugging
		date_default_timezone_set('Asia/Yekaterinburg');
		file_put_contents('requests.txt', '[' . date('Y.m.d H:i:s') . '] Заказ с сайта: ' . DOMAIN . "\n", FILE_APPEND);
		file_put_contents('requests.txt', print_r($request, true) . "\n", FILE_APPEND);
		file_put_contents('requests.txt', print_r($this->request->files, true) . "\n", FILE_APPEND);

		if ($this->request->method === method::put) {
			// PUT

			// Initializing the project identifier (temporary solution)
			$identifier = blake3($request, 20);

			// Initializing the project storage path
			$path = STORAGE . DIRECTORY_SEPARATOR . 'projects' . DIRECTORY_SEPARATOR . $identifier;

			// Initializing the project storage directory in the storage
			if (!file_exists($path)) mkdir($path, 0775, true);

			// Declaring the project storage files registry
			$files = [];

			foreach ($this->request->files as $file) {
				// Iterating over files

				// Initializing the file destination path
				$destination = $path . DIRECTORY_SEPARATOR . $file['name'];

				// Writing the file into the project storage
				copy($file['tmp_name'], $destination);

				// Writing the file destination path into the project storage files registry
				$files[$file['name']] = $destination;
			}

			// Decoding the request JSON argument
			$request = json_decode(json: $request, associative: true, depth: 5);

			// Initializing the mail server
			$mail = new mail(true);

			try {
				// Writing the mail server parameters
				/* $mail->SMTPDebug = smtp::DEBUG_SERVER; */
				$mail->setLanguage('ru');
				$mail->CharSet = mail::CHARSET_UTF8;
				$mail->isSMTP();
				$mail->Host = MAIL['host'];
				$mail->SMTPAuth = true;
				$mail->Username = MAIL['sender']['mail'];
				$mail->Password = MAIL['sender']['password'];
				$mail->SMTPSecure = mail::ENCRYPTION_SMTPS;
				$mail->Port = 465;
				$mail->setFrom(MAIL['sender']['mail'], MAIL['sender']['name']);
				$mail->addAddress(MAIL['receiver']['mail'], MAIL['receiver']['name']);

				// The message
				$mail->isHTML(true);
				$mail->Subject = empty($request['project']['name']) ? 'Заказ' : 'Заказ: ' . $request['project']['name'];
				$mail->Body = $this->view->render('messages/request.html', $request);
				/* $mail->AltBody = 'This is the body in plain text for non-HTML mail clients'; */

				// Attachments
				foreach ($files as $name => $file) {
					// Iterating of project storage files registry

					// Writing the attachment into the message
					$mail->addAttachment($file, $name);
				}

				// Sending the message
				$mail->send();
			} catch (mail_exception $exception) {
				file_put_contents('requests.txt', '[' . date('Y.m.d H:i:s') . "] ПИЗДЕЦ\n", FILE_APPEND);
				file_put_contents('requests.txt', '[' . date('Y.m.d H:i:s') . ']' . $exception->getMessage() . "\n", FILE_APPEND);

				try {
					// Initializing the mail server
					$mail = new mail(true);
					
					$mail->setLanguage('ru');
					$mail->CharSet = mail::CHARSET_UTF8;
					$mail->isSMTP();
					$mail->Host = MAIL['host'];
					$mail->SMTPAuth = true;
					$mail->Username = MAIL['sender']['mail'];
					$mail->Password = MAIL['sender']['password'];
					$mail->SMTPSecure = mail::ENCRYPTION_SMTPS;
					$mail->Port = 465;
					$mail->setFrom(MAIL['sender']['mail'], MAIL['sender']['name']);
					$mail->addAddress(MAIL['receiver']['mail'], MAIL['receiver']['name']);

					// The message
					$mail->isHTML(true);
					$mail->Subject = empty($request['project']['name']) ? 'Заказ без документов' : 'Заказ без документов: ' . $request['project']['name'];
					$mail->Body = $this->view->render('messages/request.html', $request);

					// Sending the message
					$mail->send();
				} catch (mail_exception $exception) {
					file_put_contents('requests.txt', '[' . date('Y.m.d H:i:s') . "] ПИЗДЕЦ БЕЗ КАРТИНОК\n", FILE_APPEND);
					file_put_contents('requests.txt', '[' . date('Y.m.d H:i:s') . ']' . $exception->getMessage() . "\n", FILE_APPEND);
				}
			}

			// Sending response
			$this->response
				->start()
				->clean()
				->sse()
				->validate($this->request)
				?->body()
				->end();

			// Exit (success)
			return null;
		}

		// Exit (fail)
		return null;
	}
}
