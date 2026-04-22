<?php

declare(strict_types=1);

namespace kodorvan\site\controllers;

// Files of the project
use kodorvan\site\controllers\core,
	kodorvan\site\models\superpack;

// Framework for PHP
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\status;

// Baza database
use mirzaev\baza\database,
	mirzaev\baza\column,
	mirzaev\baza\record,
	mirzaev\baza\enumerations\encoding,
	mirzaev\baza\enumerations\type;

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
final class superpack extends core
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
	 * Page: superpack
	 *
	 * @return null
	 */
	public function index(string $urn): null
	{
		if (str_contains($this->request->headers['accept'] ?? '', content::html->value)) {
			// Request for HTML response

			// Initializing the superpack
			$superpack = new superpack()->read(filter: fn(record $record) => $record->urn === $urn && $record->active === 1);

			if ($superpack instanceof superpack) {
				// Initialized the superpack

				// Render page
				$page = $this->view->render(
					'pages/article.html',
					[
						'article' => [
							'urn' => $urn,
							'title' => $superpack->title,
							'html' => $superpack->html
						],
						'smartphone' => $this->request->smartphone,
						'tablet' => $this->request->tablet
					]
				);
			} else {
				// Not initialized the superpack
			}

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
