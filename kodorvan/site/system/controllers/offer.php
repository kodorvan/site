<?php

declare(strict_types=1);

namespace kodorvan\site\controllers;

// Files of the project
use kodorvan\site\controllers\core;

// Framework for PHP
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\status;

/**
 * Offer
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
final class offer extends core
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
	 * Page: offer
	 *
	 * @return null
	 */
	public function index(): null
	{
		if (str_contains($this->request->headers['accept'] ?? '', content::html->value)) {
			// Request for HTML response

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

			// Render page
			$page = $this->view->render(
				'main/offer.html',
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
