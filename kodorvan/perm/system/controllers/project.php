<?php

declare(strict_types=1);

namespace kodorvan\perm\controllers;

// Files of the project
use kodorvan\perm\controllers\core;

// PHP framework
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\status;

// Mail server
use PHPMailer\PHPMailer\PHPMailer as mail,
	PHPMailer\PHPMailer\SMTP as smtp,
	PHPMailer\PHPMailer\Exception as mail_exception;

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
	 * 
	 *
	 * @return null
	 */
	public function request(string $request): null
	{
		// Initializing the project identifier (temporary solution)
		$identifier = blake3($request, 20);

		// Initializing the project storage path
		$path = STORAGE . DIRECTORY_SEPARATOR . 'projects' . DIRECTORY_SEPARATOR . $identifier;

		// Initializing the project storage directory in the storage
		if (!file_exists($path))	mkdir($path, 0775, true);

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
			$mail->Host = 'smtp.mail.ru';
			$mail->SMTPAuth = true;
			$mail->Username = 'system@kodorvan.tech';
			$mail->Password = 'c6oQF2nY0javI312eDS0';
			$mail->SMTPSecure = mail::ENCRYPTION_SMTPS;
			$mail->Port = 465;
			$mail->setFrom('system@kodorvan.tech', 'Система');
			$mail->addAddress('request@kodorvan.tech', 'Заявки');

			// The message
			$mail->isHTML(true);
			$mail->Subject = empty($request['project']['name']) ? 'Заказ' : 'Заказ: ' . $request['project']['name'];
			$mail->Body = $this->view->render('messages/request.html', $request);
			$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

			// Attachments
			foreach ($files as $name => $file) {
				// Iterating of project storage files registry

				// Writing the attachment into the message
				$mail->addAttachment($file, $name);
			}

			// Sending the message
			$mail->send();
		} catch (mail_exception $exception) {
		}

		// Sending response
		$this->response
			->start()
			->clean()
			->sse()
			->validate($this->request)
			?->body()
			->end();

		// Exit (fail)
		return null;
	}
}
