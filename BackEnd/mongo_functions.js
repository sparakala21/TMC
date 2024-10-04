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
        const menuItems = await getAllMenuItems();
        res.status(201).json({ message: 'Menu items grabbed', menuItems });
        return menuItems;
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
        const orders = await getAllOrders();
        res.status(201).json({ message: 'orders grabbed', orders });
        return menuItems;
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
});


module.exports = {
    postMenuItem,
    getAllMenuItems,
    postOrder,
    getAllOrders
}