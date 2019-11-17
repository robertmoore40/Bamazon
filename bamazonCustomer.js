// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
// var table = require('table');
var Table = require('cli-table');

// command to print table
// console.log()
// SELECT * FROM sometable\G

// var itemID = 
// var item_Quantity = 
// keep this variable global
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: 'Gokatie1',
	database: 'bamazon_db'
});

// put below in a specific function
// I will eventually need a connection.end
connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId)
	inventoryDisplay();
	// runBamazon();
	// connection.end();
});
// then run inquirer


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




// function validateIDCheck(input) {
// 	// verify number is a counting number
// 	if (parseInt(input.item_ID) > 0)  {
// 		console.log("1/2 Number Validated")
// 		return true;
// 	} else {
// 		console.log("Failed 1/2 Item ID Counting Number Check");
// 		return "Failed 1/2 Item ID Counting Number Check";
// 	}	  
// };

// function validateQuantityCheck(input) {
// 	// verify number is a counting number
// 	if (parseInt(input.item_Quantity) > 0)  {
// 		console.log("2/2 Number Validated")
// 		return true;
// 	} else {
// 		console.log("Failed 2/2 Quantity Counting Number Check");
// 		return "Failed 2/2 Quantity Counting Number Check";
// 	}	  
// };

function validateCountingNumberCheck(input) {
	// verify number is a counting number
	if (parseInt(input.item_Quantity) && parseInt(input.item_ID) > 0) {
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
	// runBamazon();
	// add prompt - would you like to restart?
}

function inventoryDisplay() {
	// 
	connection.query("SELECT * FROM products", function (error, results) {
		if (error) throw error
		// console.log(results)

		var products = results.map(product => {
			return {
				id: product.id,
				name: product.products_name,
			}
		})
		// console.log(products);
		var table = new Table({
			head:["product.id", "product.name"]
		})
		for (product of products) {
			
			table.push([product.id, product.name])
		
		}
		console.log(table.toString());
	})

	// getting back results - now need to put it in a table
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
	]).then(function (input) {

		// validateIDCheck(input);
		// validateQuantityCheck(input);
		var numberCheckVar = validateCountingNumberCheck(input);

		if (numberCheckVar) {
			// set these variables based on outputs of these functions to booleans - check if any are false
			// return object - let user know if ID is wrong or if quantity is wrong
			console.log("Item ID chosen is " + input.item_ID);
			console.log("Item quantity decided upon is " + input.item_Quantity);
			console.log("okay! got through!")
			var itemID = parseInt(input.item_ID);
			var item_Quantity = parseInt(input.item_Quantity);
			// quantityCheck();
		}
		else {
			console.log("Something is wrong")
			// return error function out
			// error function out
		}
	})
};

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

function runBamazon() {
	// inventoryDisplay();
	customerInquirer();
};
