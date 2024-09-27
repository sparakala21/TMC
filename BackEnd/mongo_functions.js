import { MenuItem, Order, Account, PickupLocation } from './models.js';
const { MongoClient, ServerApiVersion } = require("mongodb");


// TODO set up secrets for connection string
const uri = "<connection string>";

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

// get to mongo connection
const myDB = client.db("TMC");
const menuItems = myDB.collection("MenuItems");
const orders = myDB.collection("Orders");

const express = require('express');
const app = express();

// TODO: add image field
async function postMenuItem(newMenuItem){
    const result = await menuItems.insertOne(newMenuItem.getPostDict());
    console.log(
        `menuItem inserted with the _id: ${result.insertedId}`,
    );
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


async function postOrder(newOrder){
    const result = await orders.insertOne(newOrder.getPostDict());
    console.log(
        `order inserted with the _id: ${result.insertedId}`,
    );
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