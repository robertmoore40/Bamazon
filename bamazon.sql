DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
id INT(10) NOT NULL AUTO_INCREMENT,
products_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(7) NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO products (products_name, department_name, price, stock_quantity)
VALUES ("Orange IFruit", "Electronics", 699.99, 100),
("Call of Honor 37: War", "Video Games", 59.99, 1500),
("Confection Microwave", "Appliances", 82.99, 30),
("Facezone Friendfinder", "Video Games", 44.99, 140),
("Dr. Spider: Revengers", "Comic Books", 8.05, 15),
("The Crookshank Re-uption", "Movies", 12.56, 50),
("Dawnzer's Leelight", "Appliances", 66.99, 14),
("Edge of Tomorrow 2: 2 Edge, 2 Tomorrow", "Movies", 15.99, 9000),
("58000 Inch Plasma Screen TV", "Appliances", 829.99, 3),
("Egg Cooker", "Appliances", 14.99, 25),
("Sepuku Puzzles", "Books", 3.99, 10),
("Soulsbourne", "Video Games", 69.99, 500),
("How to Pick Up Fair Maidens", "Books", 5.99, 70);

SELECT * FROM products


