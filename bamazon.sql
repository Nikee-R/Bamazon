-- Drops database if it already exists. --
DROP DATABASE IF EXISTS Bamazon;
-- Creates the Bamazon database. --
CREATE DATABASE Bamazon;
-- Makes all changes effect the Bamazon databse. --
USE Bamazon;

-- Creates the table called products. --
CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL, 
    PRIMARY KEY (item_id)
);

select * from Products;

-- Inserts data into products table. --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Persona 5", "Entertainment", 50.00, 30),
		("Monster Hunter: World", "Entertainment",50.00, 30),
        ("Octopath Traveler","Entertainment", 50.00, 30),
        ("Nier: Automata", "Entertainment", 50.00, 30),
        ("Mountain Dew", "Food", 2.00, 150),
        ("Doritos", "Food", 1.00, 150),
        ("Pretzels", "Food", 5.00, 100),
        ("Colored Pencils", "Stationary", 5.00, 200),
        ("iPhone X", "Electronics", 1000, 10),
        ("Crayons", "Stationary", 3.00, 150),
        ("Markers", "Stationary", 5.00, 150),
        ("Nintendo Switch", "Electronics", 300.00, 10),
        ("Cups", "Household", 10.00, 200),
        ("Laptop", "Electronics", 500.00, 15);

        
        