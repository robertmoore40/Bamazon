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