// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');
var confirm = require('inquirer-confirm');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: 'Gokatie1',
	database: 'bamazon_db'
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId)
});

// To do
// Check inputs with mod % 1 = 0 to verify whole numbers
// What if the user wants an ID which isn't included on the list?

function wholeNumberCheck(input) {
	if (Number.isInteger(parseInt(input.item_Quantity)) && Number.isInteger(parseInt(input.item_ID))) {
		console.log("Passed Whole Number Check")
		return true;
	} 
	else {
		console.log("Failed Whole Number Check")
		errorReturn();
		return false;
	}
};

function validateCountingNumberCheck(input) {
	// verify number is a counting number
	// rather than daisy chain qualifications - write a function for each of the qualifications, for debugging
	if (parseInt(input.item_Quantity) && parseInt(input.item_ID) > 0) {
		console.log("Positive Check Passed")
		return true;
	} 
	else {
		console.log("Positive Check Failed")
		errorReturn();
		return false;
	}
};

function checkRandomNumber (){
	// check something here
}

function errorReturn() {
	
	console.log("Something went wrong, please try again");
	connection.end();
	// Monday Tutor Session:MTS: if you have a global variable array "errors", push this error into the array, print array
}

function inventoryDisplay() {
	connection.query("SELECT * FROM products", function (error, results) {
		// WHEN GETTING BACK PRODUCTS, FIND ARRAY LENGTH AND STORE IT AS A VARIABLE
		// IF ID>results.length, ERROR;
		// MAKE A FUNCTION WHICH RETURNS TRUE OR FALSE
		// Based on if its greater than all item IDs
		// Upon this, you'll be able to synchronously check whole, integer, >0, <length
		// key word synchronously, this is atypical\
	 	// perhaps make another array based on IDs?
		// run check and see if ID exists by looping through array, does ID exist in the array?
		// research .includes method
		// research .indexOf method (Most likely what I would like to use in this case) 
		// 
		if (error) throw error
		var products = results.map(product => {
			return {
				id: product.id,
				name: product.products_name,
				department: product.department_name,
				price: product.price,
				stock: product.stock_quantity
			}
		})
		var table = new Table({
			head:["ID", "Name", "Department", "Price", "Quantity in Stock"]
		})
		for (product of products) {
			table.push([product.id, product.name, product.department, product.price, product.stock])
		};
		console.log(table.toString());
	})
doubleCheck();
};

var itemID;
var item_Quantity;

function customerInquirer() {
	// What to do if customer chooses an ID that isn't on the list. n=1000 or something?
	console.log("Got to inquirer")
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_ID',
			message: 'Enter the item ID',
			filter: Number
		},
		{
			type: 'input',
			name: 'item_Quantity',
			message: 'How many?',
			filter: Number
		}
	]).then(function (input) {
		// var numberCheckVar = validateCountingNumberCheck(input) && wholeNumberCheck(input);
		// nothing asynchronous
		// take input here

		// wholeNumberCheck();
		// validateCountingNumberCheck();
		// checkRandomNumber();

// when you return something - it stops running! Won't continue in single threaded JS

		// one way to handle it is through promises - not needed here
		// another way to do it is a built in error handling system called Try/Catch
		// will automatically return an error object (console.log object?)
		// return true to continue
		// return error, error 
		

		// the functions will continue to run
		// set a variable to function 
		// var xyz = wholenumbercheck();

		// below - if statement - 
		// is each one of them is true-

		// if functionA && functionB && functionC = true
		// if (functionA() && functionB() && functionC())
		// continue
		// else error statement
		
		// this is a little messy, what you usually see is a variable set to the outcome,
		// set to the outcome of each function

		// var dog cat horse
		// if (dog && cat && horse){
			// continue function
		// }
		// else {
			// errorfunction(console.log?? anything like that - KISS);
			//
		// }
		// 
		//if the function stops running - return function as if statement - 
		// below that outside of the if block, return error function or console log 



		// if (numberCheckVar && wholeNumberCheck) {
			console.log("Item ID chosen is " + input.item_ID);
			console.log("Item quantity decided upon is " + input.item_Quantity);
			 itemID = parseInt(input.item_ID);
			 item_Quantity = parseInt(input.item_Quantity);
			connection.query('Select * FROM products WHERE id = ' + itemID, function(err,res){
				if(err){console.log(err)};
				var stockQuantityCheck = res[0].stock_quantity;
				console.log("Stock quantity is " + stockQuantityCheck)
				if(item_Quantity <= res[0].stock_quantity){
					var orderTotal = res[0].price * item_Quantity;
					var updateString = 'UPDATE products SET stock_quantity = ' + (res[0].stock_quantity - item_Quantity) + ' WHERE id = ' + itemID;
					connection.query(updateString, function(err, data) {
						if (err) throw err;
						// console.log(data);
						console.log("Successfully ordered");
						console.log("Your order total is " + orderTotal + " dollars");
						console.log("Thank you for your patronage")
						connection.end();
					})
		} else{
			console.log("Error: Insufficient Quantity");
			console.log("Sorry, there isn't enough " + res[0].products_name + " in stock");
			connection.end();
		};
					
			})});
	}
;

function doubleCheck() {
confirm('Would you like to purchase anything?')
  .then(function confirmed() {
	console.log('Which item would you like to buy?');
	customerInquirer();

  }, function cancelled() {
	console.log('Come back anytime');
	connection.end();
  });
}
function runBamazon() {
	inventoryDisplay();
};

runBamazon();