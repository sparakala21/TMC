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
    const url = BASE_URL + '/menuItem';
    const body = {
        name: 'Test Burger',
        price: 9.99,
        description: 'Delicious burger',
        category: 'Food'
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'Menu item added successfully');
    const insertedId = result.menuItem;
    //result = await fetchData(BASE_URL + '/menuItems?_id=' + insertedId, '_id='+ insertedId)
    result = await fetchData(BASE_URL + '/menuItems?_id='+ insertedId)
    assert.strictEqual(result.foundMenuItems[0]._id, insertedId )
}

async function testPostEmptyMenuItem(){
    const url = BASE_URL + '/menuItem';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompleteMenuItem(){
    const url = BASE_URL + '/menuItem';
    const body = {
        price: 9.99,
        description: 'Delicious burger',
        category: 'Food'
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdateMenuItem(){
    const url = BASE_URL + '/menuItem';
    const body = {
        name: 'Test Burger',
        price: 9.99,
        description: 'Delicious burger',
        category: 'Food'
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'Menu item added successfully');
    const insertedId = result.menuItem;
    const updateItem = {
        name: 'Updated Item Name',
        description: 'This is the updated description of the item',
        price: 99.99
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/menuItems?_id='+ insertedId)
    assert.strictEqual(result.foundMenuItems[0]._id, insertedId )
    assert.strictEqual(result.foundMenuItems[0].name, updateItem.name)
    assert.strictEqual(result.foundMenuItems[0].description, updateItem.description)
    assert.strictEqual(result.foundMenuItems[0].price, updateItem.price)
}



async function testPostOrder(){
    const url = BASE_URL + '/order';
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
    assert.strictEqual(result.message, 'order added successfully');
    const insertedId = result.order;
    result = await fetchData(BASE_URL + '/orders?_id='+ insertedId)
    assert.strictEqual(result.foundOrders[0]._id, insertedId )
}

async function testPostEmptyOrder(){
    const url = BASE_URL + '/order';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompleteOrder(){
    const url = BASE_URL + '/order';
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
    const url = BASE_URL + '/order';
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
    assert.strictEqual(result.message, 'order added successfully');
    const insertedId = result.order;
    const updateItem = {  
        pickupLocation : 4,
        items : ['16','7','6','1'],
        costOfItems : 86.4,
        tip : 3.1,
        completed : "2023-09-25T16:30:45Z",
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/orders?_id='+ insertedId)
    assert.strictEqual(result.foundOrders[0]._id, insertedId )
    assert.strictEqual(result.foundOrders[0].pickupLocation, updateItem.pickupLocation)
    assert.strictEqual(result.foundOrders[0].items[0], updateItem.items[0])
    assert.strictEqual(result.foundOrders[0].costOfItems, updateItem.costOfItems)
    assert.strictEqual(result.foundOrders[0].tip, updateItem.tip)
    assert.strictEqual(result.foundOrders[0].completed, updateItem.completed)
}


async function testPostAccount(){
    const url = BASE_URL + '/account';
    const body = {  
        name : "the tester",
        email : "theTester@test.com",
        password : "12345",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart : ['1', '2', '3', '4']
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'account successfully created');
    const insertedId = result.account;
    result = await fetchData(BASE_URL + '/accounts?_id='+ insertedId)
    assert.strictEqual(result.foundAccounts[0]._id, insertedId )
}

async function testPostEmptyAccount(){
    const url = BASE_URL + '/account';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompleteAccount(){
    const url = BASE_URL + '/account';
    const body = {  
        name : "the tester",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart : ['1', '2', '3', '4']
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdateAccount(){
    const url = BASE_URL + '/account';
    const body = {  
        name : "the tester",
        email : "theTester@test.com",
        password : "12345",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart : ['1', '2', '3', '4']
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'account successfully created');
    const insertedId = result.account;
    const updateItem = {  
        email : "testing2@test.com",
        password : "abcdefg",
        phone : "122-333-5555",
        accessLevel : 0, 
        cart : ['9', '2', '3', '4']
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/accounts?_id='+ insertedId)
    assert.strictEqual(result.foundAccounts[0]._id, insertedId )
    assert.strictEqual(result.foundAccounts[0].email, updateItem.email)
    assert.strictEqual(result.foundAccounts[0].cart[0], updateItem.cart[0])
    assert.strictEqual(result.foundAccounts[0].password, updateItem.password)
    assert.strictEqual(result.foundAccounts[0].phone, updateItem.phone)
    assert.strictEqual(result.foundAccounts[0].accessLevel, updateItem.accessLevel)
}


async function testPostPickupLocaion(){
    const url = BASE_URL + '/pickupLocation';
    const body = {  
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'pickup location successfully created');
    const insertedId = result.pickupLocation;
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedId)
    console.log(result)
    assert.strictEqual(result.foundPickupLocations[0]._id, insertedId )
}

async function testPostEmptyPickupLocation(){
    const url = BASE_URL + '/pickupLocation';
    const body = {};
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}


async function testPostIncompletePickupLocation(){
    const url = BASE_URL + '/pickupLocation';
    const body = {  
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    result = await postData(url, body);
    assert.strictEqual(result.error, 'Required fields are missing');
}

async function testUpdatePickupLocation(){
    const url = BASE_URL + '/pickupLocation';
    const body = {  
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'pickup location successfully created');
    const insertedId = result.pickupLocation;
    const updateItem = {  
        address : "193 RPI Rd.",
        contactInfo : "123-456-4321",
        name : "Sage Dinning Hall",
        active : true
    };
    await updateData(url + '?_id='+ insertedId, updateItem)
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedId)
    assert.strictEqual(result.foundPickupLocations[0]._id, insertedId )
    assert.strictEqual(result.foundPickupLocations[0].address, updateItem.address)
    assert.strictEqual(result.foundPickupLocations[0].contactInfo, updateItem.contactInfo)
    assert.strictEqual(result.foundPickupLocations[0].name, updateItem.name)
    assert.strictEqual(result.foundPickupLocations[0].active, false)
}


async function testActivateLocation(){
    const url = BASE_URL + '/pickupLocation';
    body = {  
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union",
        active : true
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'pickup location successfully created');
    const insertedIdOne = result.pickupLocation;

    body = {  
        address : "321 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "Commons Dinning hall",
    };
    result = await postData(url, body);
    assert.strictEqual(result.message, 'pickup location successfully created');
    const insertedIdTwo = result.pickupLocation;
    result = await postData(BASE_URL + '/activateLocation', {_id: insertedIdTwo})
    // check that the active flag was removed from the first id
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedIdOne)
    assert.strictEqual(result.foundPickupLocations[0].active, false )
    // check the active flag was set to true for the second id
    result = await fetchData(BASE_URL + '/pickupLocations?_id='+ insertedIdTwo)
    assert.strictEqual(result.foundPickupLocations[0].active, true )
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
    //await testPostMenuItem()
    //await testPostEmptyMenuItem()
    //await testPostIncompleteMenuItem()
    //await testUpdateMenuItem()
    //await testPostOrder()
    //await testPostEmptyOrder()
    //await testPostIncompleteOrder()
    //await testUpdateOrder()
    //await testPostAccount()
    //await testPostEmptyAccount()
    //await testPostIncompleteAccount()
    //await testUpdateAccount()
    //await testPostPickupLocaion()
    //await testPostEmptyPickupLocation()
    //await testPostIncompletePickupLocation()
    //await testUpdatePickupLocation()
    await testActivateLocation()
    //await clearTestDB()
    console.log("all tests passed")
}

runTests();
/*
const randomString = () => Math.random().toString(36).substring(7);

describe('API Testing with Axios', () => {

    // Test MenuItem Endpoints
    describe('POST /menuItem', () => {

        it('should add a valid menu item', async () => {
            const menuItem = {
                name: 'Test Burger',
                price: 9.99,
                description: 'Delicious burger',
                category: 'Food'
            };
            const response = await axios.post(`${BASE_URL}/menuItem`, menuItem);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('Menu item added successfully');
        });

        it('should fail to add a menu item with missing fields', async () => {
            const menuItem = {
                price: 9.99
            };
            try {
                await axios.post(`${BASE_URL}/menuItem`, menuItem);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.error).toBe('Required fields are missing');
            }
        });

        it('should get all menu items', async () => {
            const response = await axios.get(`${BASE_URL}/menuItems`);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('Menu items grabbed');
            expect(Array.isArray(response.data.allMenuItems)).toBe(true);
        });
    });

    // Test Order Endpoints
    describe('POST /order', () => {

        it('should add a valid order', async () => {
            const order = {
                menuItemIds: ['menuItem1', 'menuItem2'],
                accountId: 'testAccount1',
                pickupLocationId: 'testLocation1'
            };
            const response = await axios.post(`${BASE_URL}/order`, order);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('order added successfully');
        });

        it('should fail to add an order with missing required fields', async () => {
            const order = {
                accountId: 'testAccount1'
            };
            try {
                await axios.post(`${BASE_URL}/order`, order);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.error).toBe('missing required fields');
            }
        });

        it('should get all orders', async () => {
            const response = await axios.get(`${BASE_URL}/orders`);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('orders grabbed');
            expect(Array.isArray(response.data.allOrders)).toBe(true);
        });
    });

    // Test Account Endpoints
    describe('POST /account', () => {

        it('should create a valid account', async () => {
            const account = {
                username: randomString(),
                password: 'testpassword',
                email: `${randomString()}@test.com`
            };
            const response = await axios.post(`${BASE_URL}/account`, account);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('account successfully created');
        });

        it('should fail to create an account with missing fields', async () => {
            const account = {
                username: randomString()
            };
            try {
                await axios.post(`${BASE_URL}/account`, account);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.error).toBe('missing required fields');
            }
        });

        it('should get all accounts', async () => {
            const response = await axios.get(`${BASE_URL}/accounts`);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('accounts grabbed');
            expect(Array.isArray(response.data.allAccounts)).toBe(true);
        });
    });

    // Test Pickup Location Endpoints
    describe('POST /pickupLocation', () => {

        it('should create a valid pickup location', async () => {
            const pickupLocation = {
                name: 'Location 1',
                address: '1234 Test St',
                city: 'Testville',
                state: 'TX',
                zip: '12345'
            };
            const response = await axios.post(`${BASE_URL}/pickupLocation`, pickupLocation);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('pickup location successfully created');
        });

        it('should fail to create a pickup location with missing fields', async () => {
            const pickupLocation = {
                name: 'Location 2'
            };
            try {
                await axios.post(`${BASE_URL}/pickupLocation`, pickupLocation);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.error).toBe('missing required fields');
            }
        });

        it('should get all pickup locations', async () => {
            const response = await axios.get(`${BASE_URL}/pickupLocations`);
            expect(response.status).toBe(201);
            expect(response.data.message).toBe('pickup locations grabbed');
            expect(Array.isArray(response.data.allPickupLocations)).toBe(true);
        });
    });

});
*/
