// ===================== Dependencies ===================== //
var inquirer = require("inquirer");
var mysql = require("mysql");

// MySQL information.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
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
            message: 'Please input item id.',
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
    ]).then(function(answer) {
        console.log("Item ID: " + answer.item_id + "\n Quantity: " + answer.quantity)
        connection.query("SELECT * FROM  products", function(err, res) {
            // Error handler.
            if (err) throw err;

        // This organizes the table nicely.
        console.log("   ID  |   Product Name   |  Department  |  Price  |  Stock   |");
        // Displays all items in database.
        for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + res[i].product_name + res[i].department_name + res[i].stock_quantity);
        }
        });
        
    
        // This will put an error message based on if the item id
        // is invalid.

        // This part will check if the item is in stock.

        // This error will be thrown if there is not enough items
        // in stock.


    });
}