CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));

INSERT INTO `user` (`email`, `password`, `role`) VALUES ('admin@localhost.fr', 'admin', 'ADMIN');


CREATE TABLE IF NOT EXISTS `card_set` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(1250) NOT NULL,
  `illustration_path` VARCHAR(250),
  `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `card` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(1250) NOT NULL,
  `type` VARCHAR(250) NOT NULL,
  `rarity` VARCHAR(250) NOT NULL,
  `color` VARCHAR(250) NOT NULL,
  `card_trigger` VARCHAR(250),
  `power` INT,
  `life` INT,
  `cost` INT,
  `counter` INT,
  `attribute` VARCHAR(250),
  `illustration_type` VARCHAR(250) NOT NULL,
  `illustration_path` VARCHAR(250),
  `card_set_id` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

ALTER TABLE `card`
  ADD CONSTRAINT `fk_card_set_id`
  FOREIGN KEY (`card_set_id`)
  REFERENCES `card_set` (`id`)
  ON DELETE CASCADE;