// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');
var confirm = require('inquirer-confirm');

var itemID;
var item_Quantity;

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
		connection.end();
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
			 itemID = parseInt(input.item_ID);
			 item_Quantity = parseInt(input.item_Quantity);
			connection.query('Select * FROM products WHERE id = ' + itemID, function(err,res){
				if(err){console.log(err)};
				var stockQuantityCheck = res[0].stock_quantity;
				console.log("Stock quantity is " + stockQuantityCheck)
					var updateString = 'UPDATE products SET stock_quantity = ' + (res[0].stock_quantity + item_Quantity) + ' WHERE id = ' + itemID;
					connection.query(updateString, function(err, data) {
						if (err) throw err;
						// console.log(data);
						console.log("Got through! Successfully added");
						connection.end();
					})
        });
    };
})};

function newProductAdd(){
        inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "Product Name?"
        },
        {
            name:"Category",
            type:"input",
            message:"Product Category?"
        },
        {
            name:"Price",
            type:"input",
            message:"Product Price?"
        },
        {
            name:"Quantity",
            type:"input",
            message:"Quantity?"
        },
    
        ]).then(function(input){
            var name = input.Name;
            var category = input.Category;
            var price = input.Price;
            var quantity = input.Quantity;
            newInventoryItem(name,category,price,quantity); 
        });
      };
    
function newInventoryItem(name,category,price,quantity){
          connection.query('INSERT INTO products (products_name,department_name,price,stock_quantity) VALUES("' + name + '","' + category + '",' + price + ',' + quantity +  ')');
          viewProducts();
};

// function testfunction(){
//     connection.query('INSERT INTO products (products_name,department_name,price,stock_quantity) VALUES("' + "name" + '","' + "category" + '",' + 1.99 + ',' + 100 +  ')');
//     viewProducts();
// };

// testfunction();
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


//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

