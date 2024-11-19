const { MongoClient, ServerApiVersion } = require("mongodb");
const assert = require("assert");
require('dotenv').config();
//const axios = require('axios');
const BASE_URL = "http://localhost:3000"

const TEST_DB = 'tmc_uat'

// Helper function to generate random data for testing
async function postData(url, inputBody) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputBody)
        });

        // Parse the response as JSON
        const data = await response.json();

        // Return the data for further use
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}



async function fetchData(url, query="") {
    try {
        const response = await fetch(url, {
            method: 'GET', 
        });

        if (!response.ok) {
            console.log(response.status)
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data; // Return the data for further use
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}


async function updateData(url, inputBody) {
    try {
        const response = await fetch(url, {
            method: 'PUT', // Use PUT method for updating data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputBody)
        });

        // Parse the response as JSON
        const data = await response.json();
        // Return the data for further use
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}


async function testPostMenuItem(){
    const url = BASE_URL + '/menuItems';
    const body = {
        name: 'Test Burger',
        price: 9.99,
        description: 'Delicious burger',
        category: 'Main Dish'
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    result = await fetchData(BASE_URL + '/menuItems?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
    assert.strictEqual(result.foundItems[0].active, true )
    assert.strictEqual(result.foundItems[0].category, body.category )
}

async function testPostEmptyMenuItem(){
    const url = BASE_URL + '/menuItems';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompleteMenuItem(){
    const url = BASE_URL + '/menuItems';
    const body = {
        price: 9.99,
        description: 'Delicious burger',
        category: 'Food'
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdateMenuItem(){
    const url = BASE_URL + '/menuItems';
    const body = {
        name: 'Test Burger',
        price: 9.99,
        description: 'Delicious burger',
        category: 'Food'
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    const updateItem = {
        name: 'Updated Item Name',
        description: 'This is the updated description of the item',
        price: 99.99,
        active: false
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/menuItems?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
    assert.strictEqual(result.foundItems[0].name, updateItem.name)
    assert.strictEqual(result.foundItems[0].description, updateItem.description)
    assert.strictEqual(result.foundItems[0].price, updateItem.price)
    assert.strictEqual(result.foundItems[0].active, updateItem.active)
}



async function testPostOrder(){
    const url = BASE_URL + '/orders';
    const body = {  
        accountId : '2342abdc',
        orderTime : "2023-09-24T15:30:45Z",
        pickupLocation : 3,
        items : ['2','4','6','1'],
        costOfItems : 34,
        tip : 3.4,
        completed : "2023-09-24T16:30:45Z",
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    result = await fetchData(BASE_URL + '/orders?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
}

async function testPostEmptyOrder(){
    const url = BASE_URL + '/orders';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompleteOrder(){
    const url = BASE_URL + '/orders';
    const body = {  
        orderTime : "2023-09-24T15:30:45Z",
        pickupLocation : 3,
        costOfItems : 34,
        tip : 3.4,
        completed : "2023-09-24T16:30:45Z",
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdateOrder(){
    const url = BASE_URL + '/orders';
    const body = {  
        accountId : '2342abdc',
        orderTime : "2023-09-24T15:30:45Z",
        pickupLocation : 3,
        items : ['2','4','6','1'],
        costOfItems : 34,
        tip : 3.4,
        completed : "2023-09-24T16:30:45Z",
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    const updateItem = {  
        pickupLocation : 4,
        items : ['16','7','6','1'],
        costOfItems : 86.4,
        tip : 3.1,
        completed : "2023-09-25T16:30:45Z",
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/orders?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
    assert.strictEqual(result.foundItems[0].pickupLocation, updateItem.pickupLocation)
    assert.strictEqual(result.foundItems[0].items[0], updateItem.items[0])
    assert.strictEqual(result.foundItems[0].costOfItems, updateItem.costOfItems)
    assert.strictEqual(result.foundItems[0].tip, updateItem.tip)
    assert.strictEqual(result.foundItems[0].completed, updateItem.completed)
}


async function testPostAccount(){
    const url = BASE_URL + '/accounts';
    const body = {  
        name : "the tester",
        email : "theTester@test.com",
        password : "12345",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart : [{_id: 1, name: "m", price: 10}, {_id: 1, name: "m", price: 10}, {_id: 2, name: "n", price: 8}, {_id: 5, name: "p", price: 2.4}]
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    result = await fetchData(BASE_URL + '/accounts?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
    assert.strictEqual(result.foundItems[0].cart.length, 4)
}

async function testPostEmptyAccount(){
    const url = BASE_URL + '/accounts';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompleteAccount(){
    const url = BASE_URL + '/accounts';
    const body = {  
        name : "the tester",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart :  [{_id: 1, name: "m", price: 10}, {_id: 1, name: "m", price: 10}, {_id: 2, name: "n", price: 8}, {_id: 5, name: "p", price: 2.4}]
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdateAccount(){
    const url = BASE_URL + '/accounts';
    const body = {  
        name : "the tester",
        email : "theTester@test.com",
        password : "12345",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart : []
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    const updateItem = {  
        email : "testing2@test.com",
        password : "abcdefg",
        phone : "122-333-5555",
        accessLevel : 0, 
        cart : [{_id: 1, name: "m", price: 10}, {_id: 1, name: "m", price: 10}, {_id: 2, name: "n", price: 8}, {_id: 5, name: "p", price: 2.4}]
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/accounts?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
    assert.strictEqual(result.foundItems[0].email, updateItem.email)
    assert.strictEqual(result.foundItems[0].cart[0].name, updateItem.cart[0].name)
    assert.strictEqual(result.foundItems[0].password, updateItem.password)
    assert.strictEqual(result.foundItems[0].phone, updateItem.phone)
    assert.strictEqual(result.foundItems[0].accessLevel, updateItem.accessLevel)
}


async function testPostPickupLocaion(){
    const url = BASE_URL + '/pickupLocations';
    const body = {  
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
}

async function testPostEmptyPickupLocation(){
    const url = BASE_URL + '/pickupLocations';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompletePickupLocation(){
    const url = BASE_URL + '/pickupLocations';
    const body = {  
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdatePickupLocation(){
    const url = BASE_URL + '/pickupLocations';
    const body = {  
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedId = result.item;
    const updateItem = {  
        address : "193 RPI Rd.",
        contactInfo : "123-456-4321",
        name : "Sage Dinning Hall",
        active : true
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedId)
    assert.strictEqual(result.foundItems[0]._id, insertedId )
    assert.strictEqual(result.foundItems[0].address, updateItem.address)
    assert.strictEqual(result.foundItems[0].contactInfo, updateItem.contactInfo)
    assert.strictEqual(result.foundItems[0].name, updateItem.name)
    assert.strictEqual(result.foundItems[0].active, true)
}


async function testActivateLocation(){
    const url = BASE_URL + '/pickupLocations';
    body = {  
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union",
        active : true
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedIdOne = result.item;

    body = {  
        address : "321 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "Commons Dinning hall",
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'item added successfully');
    const insertedIdTwo = result.item;
    result = await postData(BASE_URL + '/activateLocation', {_id: insertedIdTwo})
    // check that the active flag was removed from the first id
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedIdOne)
    assert.strictEqual(result.foundItems[0].active, false )
    // check the active flag was set to true for the second id
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedIdTwo)
    assert.strictEqual(result.foundItems[0].active, true )
}

async function testActivateLocationWithBadId(){
    result = await postData(BASE_URL + '/activateLocation', {_id: "abababab"})
    assert.strictEqual(result.error, "Invalid _id format" )
    result = await postData(BASE_URL + '/activateLocation', {_id: "qwertyuioplkjhgfdsazxcvb"})
    assert.strictEqual(result.error, "Invalid _id format" )
}


// add 3 menu Items and return thier Ids
async function fillMenuItems(){
    let cart = []
    let menuUrl = BASE_URL + '/menuItems';
    let body = [
        {
            name: 'Test Burger',
            price: 9.99,
            description: 'Delicious burger',
            category: 'Food'
        },
        {
            name: 'Test Curry',
            price: 25,
            description: 'Delicious Curry',
            category: 'Curry'
        },
        {
            name: 'Test Waffle',
            price: 25,
            description: 'Delicious Waffle',
            category: 'Waffle'
        }
    ];
    for (let i = 0; i< body.length; i++){
        let result = await postData(menuUrl, body[i]);
        cart.push({_id: result.item, name: body[i].name, price: body[i].price});
    }
    return cart
}


async function setUpTestAccount(){
    //setup the account
    let menuItems = await fillMenuItems()
    let accountUrl = BASE_URL + '/accounts';
    const body = {  
        name : "the tester",
        email : "theTester@test.com",
        password : "12345",
        phone : "122-333-4444",
        accessLevel : 1, 
    };
    let result = await postData(accountUrl, body);
    let insertedId = result.item;
    const updateItem = {  
        cart : menuItems
    };
    await updateData(accountUrl + '?_id='+ insertedId, updateItem)
    return {id: insertedId, menu : menuItems}
}

async function testOrderFromCart(){
    let account = await setUpTestAccount()
    let accountId = account.id
    //Create the order
    let orderFromCartUrl = BASE_URL + '/orderFromCart?_id=' + accountId
    result = await postData(orderFromCartUrl, {pickupLocation: '1', tip: 1.2})
    result = await fetchData(BASE_URL + '/orders?_id='+ result.orderId)
    assert.strictEqual(result.foundItems[0].costOfItems, 59.99 )
    assert.strictEqual(result.foundItems[0].tip, 1.2 )
    assert.strictEqual(result.foundItems[0].items.length, account.menu.length )
    assert.strictEqual(result.foundItems[0].items[0]._id,  account.menu[0]._id )
    assert.strictEqual(result.foundItems[0].items[1]._id,  account.menu[1]._id )
    assert.strictEqual(result.foundItems[0].items[2]._id,  account.menu[2]._id )

}

async function clearTestDB(){
    const uri = process.env.ATLAS_URI

    const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );
    assert.strictEqual(TEST_DB, 'tmc_uat')
    const myDB = client.db(TEST_DB);
    const menuItems = myDB.collection("menuItems");
    const orders = myDB.collection("orders");
    const accounts = myDB.collection("accounts");
    const pickupLocations = myDB.collection("pickupLocations");
    
    await menuItems.deleteMany({})
    await orders.deleteMany({})
    await accounts.deleteMany({})
    await pickupLocations.deleteMany({})
}
  
async function runTests(){
    // We only want to run the tests on the test database 
    assert.strictEqual(process.env.DATABASE, TEST_DB)
    await testPostMenuItem()
    await testPostEmptyMenuItem()
    await testPostIncompleteMenuItem()
    await testUpdateMenuItem()
    await testPostOrder()
    await testPostEmptyOrder()
    await testPostIncompleteOrder()
    await testUpdateOrder()
    await testPostAccount()
    await testPostEmptyAccount()
    await testPostIncompleteAccount()
    await testUpdateAccount()
    await testPostPickupLocaion()
    await testPostEmptyPickupLocation()
    await testPostIncompletePickupLocation()
    await testUpdatePickupLocation() 
    await testActivateLocation()
    await testOrderFromCart()
    await testActivateLocationWithBadId()
    console.log("all tests passed")
    //await clearTestDB()
}

runTests();
