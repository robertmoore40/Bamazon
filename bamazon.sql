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
VALUES ("vanilla", "ice cream", 2.50, 100),
("chocolate", "ice cream", 2.50, 152),
("strawberry", "ice cream", 2.50, 40),
("rocky road", "ice cream", 2.50, 20),
("mint chocolate chip", "ice cream", 2.50, 50);

SELECT * FROM products


