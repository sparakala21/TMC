//import { MenuItem, Order, Account, PickupLocation } from './models.js';
const { MenuItem, Order, Account, PickupLocation } = require("./models.js")
const { MongoClient, ServerApiVersion, ObjectId  } = require("mongodb");
const cors = require('cors');
require('dotenv').config();
const express = require('express');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// TODO set up secrets for connection string

const uri = process.env.ATLAS_URI

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Database setup
const database = process.env.DATABASE;
if (!database) {
    console.error('DATABASE environment variable is not set');
    process.exit(1);
}

// get to mongo connection
const myDB = client.db(database);
const menuItems = myDB.collection("menuItems");
const orders = myDB.collection("orders");
const accounts = myDB.collection("accounts");
const pickupLocations = myDB.collection("pickupLocations");

async function postMenuItem(newMenuItem){
    const result = await menuItems.insertOne(newMenuItem.getPostDict());
    console.log(
        `menuItem inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

async function getAllMenuItems(query={}){
    const result = await menuItems.find(query).toArray();
    console.log("all menu items: ", result)
    return result   
}

async function updateMenuItem(filter, updateDoc){
    const result = await menuItems.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.post('/menuItem', async (req, res) => {
    const newMenuItem = new MenuItem(req.body);

    if (!newMenuItem.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const menuItem = await postMenuItem(newMenuItem);
        res.status(201).json({ message: 'Menu item added successfully', menuItem });
        return menuItem
    } catch (error) {
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});


app.get('/menuItems', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const foundMenuItems = await getAllMenuItems(query);
        res.status(201).json({ message: 'Menu items grabbed', foundMenuItems });
        return foundMenuItems;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get menu items' });
    }
});


app.put('/menuItem', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updateMenuItem(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});


async function postOrder(newOrder){
    const result = await orders.insertOne(newOrder.getPostDict());
    console.log(
        `order inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}


async function getOrders(query={}){
    const result = await orders.find(query).toArray();
    console.log("all orders items: ", result);
    return result;
}


async function updateOrder(filter, updateDoc){
    const result = await orders.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.post('/order', async (req, res) => {
    const newOrder = new Order(req.body);

    if (!newOrder.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const order = await postOrder(newOrder);
        res.status(201).json({ message: 'order added successfully', order });
        return order
    } catch (error) {
        res.status(500).json({ error: 'Failed to add order' });
    }
});


app.get('/orders', async (req, res) => {
    const query = req.query;
    console.log(query)
    if(query._id){
        query._id = new ObjectId(query._id)
    }
    console.log("id handled")
    try {
        const foundOrders = await getOrders(query);
        res.status(201).json({ message: 'orders grabbed', foundOrders });
        return foundOrders;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
});


app.put('/order', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }
    
    try {
        const result = await updateOrder(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});


async function createAccount(newAccount){
    const result = await accounts.insertOne(newAccount.getPostDict());
    console.log(
        `account inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

async function getAccounts(query={}){
    const result = await accounts.find(query).toArray();
    console.log("all accounts: ", result);
    return result;
}


async function updateAccount(filter, updateDoc){
    const result = await accounts.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.post('/account', async (req, res) => {
    const newAccount = new Account(req.body);

    if (!newAccount.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const account = await createAccount(newAccount);
        res.status(201).json({ message: 'account successfully created', account });
        return account
    } catch (error) {
        res.status(500).json({ error: 'Failed to create account' });
    }
});


app.get('/accounts', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }
    try {
        const foundAccounts = await getAccounts(query);
        res.status(201).json({ message: 'accounts grabbed', foundAccounts });
        return foundAccounts;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get accounts' });
    }
});


app.put('/account', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updateAccount(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update account' });
    }
});


async function createPickupLocation(newPickupLocation){
    const result = await pickupLocations.insertOne(newPickupLocation.getPostDict());
    console.log(
        `pickup location inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}


async function getPickupLocations(query={}){
    const result = await pickupLocations.find(query).toArray();
    console.log("all pickup locations: ", result)
    return result   
}

async function updatePickupLocation(filter, updateDoc){
    const result = await pickupLocations.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.post('/pickupLocation', async (req, res) => {
    const newPickupLocation = new PickupLocation(req.body)

    if (!newPickupLocation.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const pickupLocation = await createPickupLocation(newPickupLocation);
        res.status(201).json({ message: 'pickup location successfully created', pickupLocation });
        return pickupLocation
    } catch (error) {
        res.status(500).json({ error: 'Failed to create pickup location' });
    }
});


app.get('/pickupLocations', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }
    try {
        const foundPickupLocations = await getPickupLocations(query);
        res.status(201).json({ message: 'pickup locations grabbed', foundPickupLocations });
        return foundPickupLocations;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get pickup locations' });
    }
});


app.put('/pickupLocation', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updatePickupLocation(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update pickup location' });
    }
});


async function ActivatePickupLocation(filter){
    result = await pickupLocations.updateMany({active : true}, {$set : {active : false}});
    result = await pickupLocations.updateOne(filter, {$set: {active : true}});
    return result
}


app.post('/activateLocation', async (req, res) => {
    try {
        if(!req.body._id){
            res.status(400).json({error: 'Missing _id field'})
        } else {
            const idToActivate = {_id : new ObjectId(req.body._id)} 
            const pickupLocation = await ActivatePickupLocation(idToActivate);
            res.status(201).json({ message: 'active location changed', pickupLocation });
            return pickupLocation
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed activate location' });
    }
});


async function getMenuItemsFromCart( cart ){
    let items = []
    for (let i = 0; i < cart.length; i++) { 
        let query = {_id : new ObjectId(cart[i])}
        let foundMenuItems = await getAllMenuItems(query);
        items.push(foundMenuItems[0])
    }
    return items
}

app.post('/orderFromCart', async(req, res) => {
    // Take in an account id so we can grab the cart
    const query = req.query
    const body = req.body
    try {
        if (!query._id ||  !body.pickupLocation || !body.tip){
            res.status(400).json({error: 'Missing required fields field'})
        }
        else{
            // get the cart from the account
            query._id = new ObjectId(query._id)
            const foundAccount = await getAccounts(query);
            cart = foundAccount[0].cart
            // calculte the total cost of the items
            let foundMenuItems = await getMenuItemsFromCart(cart)
            let cost = 0
            for (let i = 0; i < foundMenuItems.length; i++) { 
                cost += foundMenuItems[i].price
            }
            // create the order
            const now = new Date();
            let order = {
                accountId: query._id,
                items: cart,
                orderTime: now.toString(),
                pickupLocation: body.pickupLocation,
                costOfItems: cost,
                tip: body.tip,
                completed: null
            }
            let newOrder = new Order(order)
            const orderId = await postOrder(newOrder);
            res.status(201).json({ message: 'order added successfully', orderId });
            return orderId
        }
    } catch (error){
        console.log("ERROR: " + error)
        res.status(500).json({ error: 'Failed to create order' });
    }

})

app.post('/runSquare', async (req, res) => {
    try {
        const response = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
          method: 'POST',
          headers: {
            'Square-Version': '2024-11-20',
            Authorization: 'Bearer EAAAl7bENyO2IwLTbpGL89p7qWt6p1A6C6AXjph8GtfoeYievQUUrespkltM-hh3', // Replace ACCESS_TOKEN with your actual token
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idempotency_key: 'cd9e25dc-d9f2-4430-aedb-61605070e95f',
            quick_pay: {
              name: 'Auto Detailing',
              price_money: {
                amount: 10000, // Amount in cents (e.g., 10000 = $100.00)
                currency: 'USD',
              },
              location_id: 'A9Y43N9ABXZBP', // Replace with your actual location ID
            },
          }),
        });
    
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
    
        const data = await response.json();
        const paymentLink = data.payment_link?.url;
    
        if (paymentLink) {
          Linking.openURL(paymentLink);
        } else {
          Alert.alert('Error', 'Could not generate payment link.');
        }
      } catch (error) {
        console.error('Error generating payment link:', error);
        Alert.alert('Error', 'Failed to create payment link. Please try again.');
      }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});