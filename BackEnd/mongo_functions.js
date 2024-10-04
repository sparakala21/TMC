//import { MenuItem, Order, Account, PickupLocation } from './models.js';
const { MenuItem, Order, Account, PickupLocation } = require("./models.js")
const { MongoClient, ServerApiVersion } = require("mongodb");

require('dotenv').config();

// TODO set up secrets for connection string

const uri = process.env.ATLAS_URI

console.log("uri: ",uri)

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

// get to mongo connection
const myDB = client.db("tmc_data");
const menuItems = myDB.collection("menuItems");
const orders = myDB.collection("orders");
const accounts = myDB.collection("accounts");
const pickupLocations = myDB.collection("pickupLocations");

const express = require('express');
const app = express();

// TODO: add image field
async function postMenuItem(newMenuItem){
    const result = await menuItems.insertOne(newMenuItem.getPostDict());
    console.log(
        `menuItem inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

async function getAllMenuItems(){
    const result = await menuItems.find({}).toArray();
    console.log("all menu items: ", result)
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
    } catch (error) {
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});


app.get('/menuItems', async (req, res) => {
    try {
        const allMenuItems = await getAllMenuItems();
        res.status(201).json({ message: 'Menu items grabbed', allMenuItems });
        return allMenuItems;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get menu items' });
    }
});


async function postOrder(newOrder){
    const result = await orders.insertOne(newOrder.getPostDict());
    console.log(
        `order inserted with the _id: ${result.insertedId}`,
    );
}


async function getAllOrders(){
    const result = await orders.find({}).toArray();
    console.log("all orders items: ", result)
    return result   
}


app.post('/order', async (req, res) => {
    const newOrder = new Order(req.body)

    if (newOrder.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    
    try {
        const order = await postOrder(newOrder);
        res.status(201).json({ message: 'order added successfully', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add order' });
    }
});


app.get('/orders', async (req, res) => {
    try {
        const allOrders = await getAllOrders();
        res.status(201).json({ message: 'orders grabbed', allOrders });
        return menuItems;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
});



async function createAccount(newAccount){
    const result = await accounts.insertOne(newAccount.getPostDict());
    console.log(
        `account inserted with the _id: ${result.insertedId}`,
    );
}


async function getAllAccounts(){
    const result = await accounts.find({}).toArray();
    console.log("all accounts: ", result)
    return result   
}


app.post('/account', async (req, res) => {
    const newAccount = new Account(req.body)

    if (newAccount.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    
    try {
        const account = await createAccount(newAccount);
        res.status(201).json({ message: 'account successfully created', account });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create account' });
    }
});


app.get('/accounts', async (req, res) => {
    try {
        const allAccounts = await getAllAccounts();
        res.status(201).json({ message: 'accounts grabbed', allAccounts });
        return allAccounts;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
});


async function createPickupLocation(newPickupLocation){
    const result = await pickupLocations.insertOne(newPickupLocation.getPostDict());
    console.log(
        `pickup location inserted with the _id: ${result.insertedId}`,
    );
}


async function getAllPickupLocations(){
    const result = await pickupLocations.find({}).toArray();
    console.log("all pickup locations: ", result)
    return result   
}


app.post('/pickupLocation', async (req, res) => {
    const newPickupLocation = new PickupLocation(req.body)

    if (newPickupLocation.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    
    try {
        const pickupLocation = await createPickupLocation(newPickupLocation);
        res.status(201).json({ message: 'pickup location successfully created', pickupLocation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create pickup location' });
    }
});


app.get('/pickupLocations', async (req, res) => {
    try {
        const allPickupLocations = await getAllPickupLocations();
        res.status(201).json({ message: 'pickup locations grabbed', allPickupLocations });
        return allPickupLocations;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get pickup locations' });
    }
});

module.exports = {
    postMenuItem,
    getAllMenuItems,
    postOrder,
    getAllOrders
}