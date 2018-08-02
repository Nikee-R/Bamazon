// ===================== Dependencies ===================== //
var inquirer = require("inquirer");
var mysql = require("mysql");

// MySQL information.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Bamazon"

});

// ===================== Functions ===================== //
// Connects to server.
connection.connect(function(err) {
    if (err) throw err;
    
    // Runs after connection is made.
    start();
});


// This function will prompt the user for inputs.
function start() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please input item id:',
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you want to purchase?',
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    // This part of the function will check if the item id
    // exists and that it is in stock.
    ]).then(function(input) {

        // Variables to organize.
        var item = input.item_id;
        var quantity = input.quantity;
        var queryStr = "SELECT * FROM products WHERE ?";

        // This will show the product list.
        connection.query(queryStr, {item_id: item}, function(err, res) {
            if (err) throw err;

            // This will run if item ID is invalid.
            if (res.length === 0) {
                console.log("Sorry, this is an invalid item ID.");
                displayInventory();
                
            // This part will check if the item is in stock.
            } else {
                var productData = res[0];

                if (quantity <= productData.stock_quantity) {
                    console.log("The product you requested is in stock.");

                    var updateQuery = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + 
                    " WHERE item_id = " + item;
                
                // Updates the data and runs if order is a success.
                connection.query(updateQuery, function(err,res) {
                    if (err) throw err;

                    console.log("Total: " + productData.price * quantity);
                    console.log("Thank you, your order has been place.");
                    console.log("\n--------------------------------------\n");

                    connection.end();
                })

            // This error will be thrown if there is not enough items in stock. 
            } else {
                console.log("Sorry, the item is not in stock.");
                console.log("----------------------------------------------------\n");

                displayInventory();
                }
            }
        })
    })
}
   
    // This will display the inventory.
    function displayInventory() {

        queryStr = "SELECT * FROM products";

        connection.query(queryStr, function(err, res) {
            if (err) throw err;
            
            console.log("\nINVENTORY \n");

            var output = "";
            for (var i = 0; i < res.length; i++) {
                output = "";
                output += "Item ID: " + res[i].item_id + "|";
                output += " Product Name: " + res[i].product_name + "|";
                output += " Department: " + res[i].department_name + "|";
                output += " Price: $" + res[i].price + "\n";

                console.log(output);
            }
        
            console.log("----------------------------------------------------\n");
         })
    }


function runBamazon() {

    displayInventory();
}

runBamazon();

