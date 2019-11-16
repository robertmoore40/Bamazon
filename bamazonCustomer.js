// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: 'Gokatie1',
	database: 'bamazon_db'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	connection.end();
  });

function positiveCheck() {
	  
};

function inventoryDisplay() {

};

function customerInquirer() {
	  
};

function quantityCheck() {
	  
};

function sufficientQuantity() {
	  
};

function insufficientQuantity() {
	  
};

function orderTotalCalculation() {
	  
};
