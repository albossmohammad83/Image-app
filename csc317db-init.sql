CREATE DATABASE IF NOT EXISTS `csc317db`;

USE `csc317db`;

CREATE TABLE IF NOT EXISTS `csc317db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `usertype` INT NOT NULL DEFAULT 0,
  `active` INT NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `csc317db`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL,
  `description` VARCHAR(4096) NOT NULL,
  `photopath` VARCHAR(4096) NOT NULL,
  `thumbnail` VARCHAR(4096) NOT NULL,
  `active` INT NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  `fk_userid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `posts to users_idx` (`fk_userid` ASC) VISIBLE,
  CONSTRAINT `posts to users`
    FOREIGN KEY (`fk_userid`)
    REFERENCES `csc317db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `csc317db`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(4096) NOT NULL,
  `fk_userid` INT NOT NULL,
  `fk_postid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `posts to users_idx` (`fk_userid` ASC) VISIBLE,
  CONSTRAINT `posts to users`
    FOREIGN KEY (`fk_userid`)
    REFERENCES `csc317db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
