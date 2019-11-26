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


function runBamazon(){
inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Choose a function',
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}).then(manager => {
    switch (true) {
        case manager.choice === "View Products for Sale":
            viewProducts();
            break;

        case manager.choice === "View Low Inventory":
            viewLow();
            break;

        case manager.choice === "Add to Inventory":
            inventoryAdd();
            break;

        case manager.choice === "Add New Product":
            newProductAdd();
            break;

        default:
    }
})};

function viewProducts() {
	connection.query("SELECT * FROM products", function (error, results) {
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
};

function viewLow(){
    var viewLowRequest = "SELECT id, products_name, stock_quantity FROM products WHERE stock_quantity < 5";
	connection.query(viewLowRequest, function(err, res) {
        if (err) throw err;
        console.log(viewLowRequest);
        console.log(res);
    // runBamazon();
})};

function inventoryAdd(){
// inquirer.prompt([
// 	{
// 			name: "item_ID",
// 			type: "input",
// 			message: "Enter item ID"
// 	},
// 	{
// 			name: "stock_quantity",
// 			type: "input",
// 			message: "How much would you like to add to the current stock?"
// 	}
// 	]).then(function(answer) {});
//     console.log("inventory add chosen");
//     // same as buying, just a sign change
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
		var numberCheckVar = validateCountingNumberCheck(input);

		if (numberCheckVar) {
			console.log("Item ID chosen is " + input.item_ID);
			console.log("Item quantity to add is " + input.item_Quantity);
			console.log("okay! got through!")
			 itemID = parseInt(input.item_ID);
			 item_Quantity = parseInt(input.item_Quantity);
			connection.query('Select * FROM products WHERE id = ' + itemID, function(err,res){
				if(err){console.log(err)};
				// console.log(res);
				// console.log(res[0].stock_quantity)
				// does res0 exist?
				// console log out
				// if res[0] else 
				var stockQuantityCheck = res[0].stock_quantity;
				console.log("Stock quantity is " + stockQuantityCheck)
				if(item_Quantity <= res[0].stock_quantity){
					// console.log("success");

					var updateString = 'UPDATE products SET stock_quantity = ' + (res[0].stock_quantity + item_Quantity) + ' WHERE id = ' + itemID;
					connection.query(updateString, function(err, data) {
						if (err) throw err;
						// console.log(data);
						console.log("Got through! Successfully added");
						connection.end();
					})
		};
					
			})};
	})
};


function newProductAdd(){
    console.log("Add new product chosen")
    // insert into database
    // INSERT INTO
    // double check this - traversy media check on this
    // grabs name of table, pushes new values
    // if auto-increment, no need to assign new ID
};

runBamazon();

function validateCountingNumberCheck(input) {
	// verify number is a counting number
	// rather than daisy chain qualifications - write a function for each of the qualifications, for debugging
	if (parseInt(input.item_Quantity) && parseInt(input.item_ID) > 0) {
		console.log("Double Check Passed")
		return true;
	} 
	else {
		console.log("Failed Double Check")
		errorReturn();
		return false;
	}
};

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

