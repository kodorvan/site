<?php

declare(strict_types=1);

namespace kodorvan\site\controllers;

// Files of the project
use kodorvan\site\controllers\core,
	kodorvan\site\models\superpack as model;

// Framework for PHP
use mirzaev\minimal\http\enumerations\content,
	mirzaev\minimal\http\enumerations\method,
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
			$superpack = new model()->read(filter: fn(record $record) => $record->urn === $urn && $record->active === 1);

			if ($superpack instanceof model) {
				// Initialized the superpack

				// Render page
				$page = $this->view->render(
					'pages/article.html',
					[
						'uri' => 'https://' . DOMAIN . "/superpack/$urn",
						'article' => [
							'urn' => $superpack->urn,
							'head' => [
								'title' => $superpack->title
							],
							'body' => [
								'html' => $superpack->html
							]
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

	/**
	 * Page: superpack
	 *
	 * @return null
	 */
	public function create(
		?string $identifier = null,
		?string $urn = null,
		?string $title = null,
		?string $html = null,
		?string $text = null,
		string|int|float|null $supercost = null
	): null {
		if ($this->request->method === method::get) {
			// GET

			if (str_contains($this->request->headers['accept'] ?? '', content::html->value)) {
				// Request for HTML response

				// Render page
				$page = $this->view->render(
					'pages/system/superpack/create.html',
					[
						'uri' => 'https://' . DOMAIN . "/system/superpack/create",
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
		} else if ($this->request->method === method::put) {
			// PUT

			// Initializing the superpack
			$superpack = new model()->read(filter: fn(record $record) => $record->urn === $urn);

			if ($superpack instanceof model) {
				// The superpack is already created

			} else {
				// The superpack is not already created

				// Sanitizing
				$urn = preg_replace('/[^\w\d\-.]+/', '', $urn);
				$title = preg_replace('/[^\w\d\s\-.,!]+/u', '', $title);
				$supercost = (float) preg_replace('/[^\d.]+/', '', $supercost);

				// Creating the superpack
				$superpack = new model()->write(
					urn: $urn,
					title: $title,
					html: $html,
					text: $text,
					supercost: $supercost
				);

				if ($superpack instanceof record) {
					// Created the superpack

					// Sending response
					$this->response
						->start()
						->clean()
						->sse()
						->json([
							'redirect' => "/superpack/$urn"
						])
						->validate($this->request)
						?->body()
						->end();
				}
			}
		}

		// Exit (fail)
		return null;
	}
}
