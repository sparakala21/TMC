//import { MenuItem, Order, Account, PickupLocation } from './models.js';
const { MenuItem, Order, Account, PickupLocation } = require("./models.js")
const { MongoClient, ServerApiVersion, ObjectId  } = require("mongodb");

require('dotenv').config();

// TODO set up secrets for connection string

const uri = process.env.ATLAS_URI

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

// get to mongo connection
const database = process.env.DATABASE
const myDB = client.db(database);
const menuItems = myDB.collection("menuItems");
const orders = myDB.collection("orders");
const accounts = myDB.collection("accounts");
const pickupLocations = myDB.collection("pickupLocations");

const express = require('express');
const app = express();
app.use(express.json());

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
            res.error(400).json({error: 'Missing _id field'})
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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});