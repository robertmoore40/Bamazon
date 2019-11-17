// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('table');

// var itemID = 
// var item_Quantity = 

// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	port: 3306,

// 	user: 'root',

	// password: 'Gokatie1',
// 	database: 'bamazon_db'
// });

// connection.connect(function(err) {
// 	if (err) throw err;
// 	console.log("connected as id " + connection.threadId);
// 	connection.end();
//   });


// function testNumberChecker () {
// 	if ( -5 > 0 ){
// 		console.log("True")
// 		return true;
// 	}
// 	else {
// 		console.log("False");
// 		return false;
// 	}
// }

// testNumberChecker();


runBamazon();

function validateIDCheck(input) {
	// verify number is a counting number
	if (parseInt(input.item_ID) > 0)  {
		console.log("1/2 Number Validated")
		return true;
	} else {
		console.log("Failed 1/2 Item ID Counting Number Check");
		return "Failed 1/2 Item ID Counting Number Check";
	}	  
};

function validateQuantityCheck(input) {
	// verify number is a counting number
	if (parseInt(input.item_Quantity) > 0)  {
		console.log("2/2 Number Validated")
		return true;
	} else {
		console.log("Failed 2/2 Quantity Counting Number Check");
		return "Failed 2/2 Quantity Counting Number Check";
	}	  
};

function validateCountingNumberCheck(input) {
	// verify number is a counting number
	if (parseInt(input.item_Quantity) && parseInt(input.item_ID) > 0)  {
		console.log("Double Check Passed")
		return true;
	} else {
		console.log("Failed Double Check")
		errorReturn();
		return false;
	}	  
};

function errorReturn() {
	console.log("Something went wrong, please try again");
	runBamazon();
}

function inventoryDisplay() {

};

function customerInquirer() {
inquirer.prompt([
	{
		type: 'input',
		name: 'item_ID',
		message: 'Enter the item ID',
		// validate: validateIDCheck(),
		// validate: validateIDCheck,
		filter: Number
	},
	{
		type: 'input',
		name: 'item_Quantity',
		message: 'How many?',
		// validate: validateQuantityCheck(),
		// validate: validateQuantityCheck,
		filter: Number
	}
]).then(function(input) {
	validateIDCheck(input);
	validateQuantityCheck(input);
	validateCountingNumberCheck(input);
	console.log("Item ID chosen is " + input.item_ID);
	console.log("Item quantity decided upon is " + input.item_Quantity);
	console.log("got through!")
	var itemID = parseInt(input.item_ID);
	var item_Quantity = parseInt(input.item_Quantity);
	quantityCheck();
	  
})};

function quantityCheck() {

	// if (item ID exists && quantity > sql quantity check){
	// sufficientQuantity() 
// }
	// else { 
	// insufficientQuantity()
// };
};

function sufficientQuantity() {
	//   console log success
	// SQL query quantity check
	// call order total calculation
	// orderTotalCalculation();
	orderTotalCalculation();

};

function insufficientQuantity() {
	//   Console log error, kick out user
	console.log("We don't have enough!")
	errorReturn();
};

function orderTotalCalculation() {
	// log quantity * price
	console.log("Thank you for your purchase")
	// kick user back out
	  
};

function runBamazon () {
	// inventoryDisplay();
	customerInquirer();
};
