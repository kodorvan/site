<?php

declare(strict_types=1);

namespace kodorvan\site\models;

// Files of the project
use kodorvan\site\models\core;

// Baza database
use mirzaev\baza\database,
	mirzaev\baza\column,
	mirzaev\baza\record,
	mirzaev\baza\enumerations\encoding,
	mirzaev\baza\enumerations\type;

// Active Record pattern
use mirzaev\record\interfaces\record as record_interface,
	mirzaev\record\traits\record as record_trait;

// Svoboda time
use svoboda\time\statement as svoboda;

// Built-in libraries
use Exception as exception,
	LogicException as exception_logic,
	RuntimeException as exception_runtime;

/**
 * Project
 *
 * @package kodorvan\site\models
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
final class superpack extends core implements record_interface
{
	use record_trait;

	/**
	 * File
	 *
	 * @var string $file Path to the database file
	 */
	protected string $file = DATABASES . DIRECTORY_SEPARATOR . 'superpacks.baza';

	/**
	 * Database
	 *
	 * @var database $database The database
	 */
	public protected(set) database $database;

	/**
	 * Serialized
	 *
	 * @var bool $serialized Is the implementator object serialized?
	 */
	private bool $serialized = true;

	/**
	 * Constructor
	 *
	 * @method record|null $record The record
	 *
	 * @return void
	 */
	public function __construct(?record $record = null)
	{
		// Initializing the database
		$this->database = new database()
			->encoding(encoding::utf8)
			->columns(
				new column('identifier', type::long_long_unsigned),
				/* new column('account', type::long_long_unsigned), */
				new column('urn', type::long_long_unsigned),
				new column('title', type::string, ['length' => 64]),
				new column('html', type::string, ['length' => 8192]),
				new column('text', type::string, ['length' => 8192]),
				new column('supercost', type::integer_unsigned),
				new column('active', type::char),
				new column('updated', type::integer_unsigned),
				new column('created', type::integer_unsigned)
			)
			->connect($this->file);

		// Initializing the record
		$record instanceof record and $this->record = $record;
	}

	/**
	 * Write
	 *
	 * @throws exception_logic when failed to process project integration
	 *
	 * @param int $account The account identifier
	 * @param string $urn URN
	 * @param string $title Title
	 * @param string|null $html Content (HTML)
	 * @param string|null $html Content (text)
	 * @param int $supercost Cost
	 * @param int $active Is the record active?
	 *
	 * @return record|false The record, if created
	 */
	public function write(
		/* int $account, */
		string $urn,
		string $title,
		?string $html = null,
		?string $text = null,
		?int $supercost = null,
		bool $active = true,
	): record|false {
		if (!empty($html) || !empty($text)) {
			// Initializing the record
			$record = $this->database->record(
				$this->database->count() + 1,
				/* $account, */
				$urn,
				$title,
				(string) $html,
				(string) $text,
				(int) $supercost,
				(int) $active,
				svoboda::timestamp(),
				svoboda::timestamp()
			);

			// Writing the record into the database
			$created = $this->database->write($record);

			// Exit (success)
			return $created ? $record : false;
		}

		// Exit (fail)
		return false;
	}

	/**
	 * Serialize
	 *
	 * @return self The instance from which the method was called (fluent interface)
	 */
	public function serialize(): self
	{
		if ($this->serialized) {
			// The record implementor is serialized

			// Exit (fail)
			throw new exception_runtime('The record implementor is already serialized');
		}

		// Serializing the record parameters
		$this->record->active = (int) $this->record->active;

		// Writing the status of serializing
		$this->serialized = true;

		// Exit (success)
		return $this;
	}

	/**
	 * Deserialize
	 *
	 * @return self The instance from which the method was called (fluent interface)
	 */
	public function deserialize(): self
	{
		if (!$this->serialized) {
			// The record implementor is deserialized

			// Exit (fail)
			throw new exception_runtime('The record implementor is already deserialized');
		}

		// Deserializing the record parameters
		$this->record->active = (bool) $this->record->active;

		// Writing the status of serializing
		$this->serialized = false;

		// Exit (success)
		return $this;
	}

	/**
	 * Account
	 *
	 * Search for the account
	 *
	 * @return account|null The account
	 */
	/* public function account(): ?account
	{
		// Search for the account
		$account = new account()->read(filter: fn(record $record) => $record->identifier === $this->account && $record->active === 1);

		if ($account instanceof account) {
			// Found the account account

			// Deserializing the record
			$account->deserialize();

			// Exit (success)
			return $account;
		}

		// Exit (fail)
		return null;
	} */
}
