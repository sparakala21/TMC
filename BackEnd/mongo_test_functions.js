const assert = require("assert");
//const axios = require('axios');
const BASE_URL = "http://localhost:3000"

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
        console.log('Success:', data);

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
        console.log(data); // Handle the data from the server

        return data; // Return the data for further use
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

async function postMenuItem(){
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


  
function runTests(){
    assert.strictEqual(process.env.DATABASE, 'tmc_uat')
    postMenuItem()
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
