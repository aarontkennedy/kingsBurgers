CREATE DATABASE kingsBurgers_db;
USE kingsBurgers_db;

CREATE TABLE burgers (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500)
);

CREATE TABLE eaters (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`google_id` VARCHAR(500) NOT NULL,
	`name` VARCHAR(100) NOT NULL
);

CREATE TABLE burgerEaten (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`burger_id` INT NOT NULL, 
	`eater_id` INT NOT NULL, 
	`rating` INT NOT NULL, 
	`date` DATE,
	FOREIGN KEY (`burger_id`) REFERENCES burgers(`id`),
	FOREIGN KEY (`eater_id`) REFERENCES eaters(`id`)
);

INSERT INTO burgers (`name`, `description`)
VALUES ("1. The Double Play", "Swiss Cheese, Horseradish");

INSERT INTO burgers (`name`, `description`)
VALUES ("2. The Dugout", "Hashbrowns & Bacon");

INSERT INTO burgers (`name`, `description`)
VALUES ("3. The Slider", "Eggs & Hot Sauce");
