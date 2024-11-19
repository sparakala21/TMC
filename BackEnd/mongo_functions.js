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

async function postMenuItems(body){
    const result = await menuItems.insertOne(body);
    console.log(
        `new item in menuItems created with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

app.post('/menuItems', async (req, res) => {
    const newItem = new MenuItem(req.body)
  
    if (!newItem.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const item = await postMenuItems(newItem.getPostDict());
        res.status(201).json({ message: 'item added successfully', item });
        return item
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to add item' });
    }
});


async function getAllMenuItems(query={}){
    const result = await menuItems.find(query).toArray();
    console.log("all items: ", result)
    return result   
}


app.get('/menuItems', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const foundItems = await getAllMenuItems(query);
        res.status(201).json({ message: 'items grabbed', foundItems });
        return foundItems;
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to get items' });
    }
});


async function updateMenuItems(filter, updateDoc){
    const result = await menuItems.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.put('/menuItems', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updateMenuItems(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});




async function postOrders(body){
    const result = await orders.insertOne(body);
    console.log(
        `new item in orders created with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

app.post('/orders', async (req, res) => {
    const newItem = new Order(req.body)
  
    if (!newItem.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const item = await postOrders(newItem.getPostDict());
        res.status(201).json({ message: 'item added successfully', item });
        return item
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to add item' });
    }
});


async function getAllOrders(query={}){
    const result = await orders.find(query).toArray();
    console.log("all items: ", result)
    return result   
}


app.get('/orders', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const foundItems = await getAllOrders(query);
        res.status(201).json({ message: 'items grabbed', foundItems });
        return foundItems;
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to get items' });
    }
});


async function updateOrders(filter, updateDoc){
    const result = await orders.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.put('/orders', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updateOrders(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});




async function postAccounts(body){
    const result = await accounts.insertOne(body);
    console.log(
        `new item in accounts created with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

app.post('/accounts', async (req, res) => {
    const newItem = new Account(req.body)
  
    if (!newItem.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const item = await postAccounts(newItem.getPostDict());
        res.status(201).json({ message: 'item added successfully', item });
        return item
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to add item' });
    }
});


async function getAllAccounts(query={}){
    const result = await accounts.find(query).toArray();
    console.log("all items: ", result)
    return result   
}


app.get('/accounts', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const foundItems = await getAllAccounts(query);
        res.status(201).json({ message: 'items grabbed', foundItems });
        return foundItems;
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to get items' });
    }
});


async function updateAccounts(filter, updateDoc){
    const result = await accounts.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.put('/accounts', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updateAccounts(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});




async function postPickupLocations(body){
    const result = await pickupLocations.insertOne(body);
    console.log(
        `new item in pickupLocations created with the _id: ${result.insertedId}`,
    );
    return result.insertedId
}

app.post('/pickupLocations', async (req, res) => {
    const newItem = new PickupLocation(req.body)
  
    if (!newItem.hasRequiredPostFields()) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }
    
    try {
        const item = await postPickupLocations(newItem.getPostDict());
        res.status(201).json({ message: 'item added successfully', item });
        return item
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to add item' });
    }
});


async function getAllPickupLocations(query={}){
    const result = await pickupLocations.find(query).toArray();
    console.log("all items: ", result)
    return result   
}


app.get('/pickupLocations', async (req, res) => {
    const query = req.query;
    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const foundItems = await getAllPickupLocations(query);
        res.status(201).json({ message: 'items grabbed', foundItems });
        return foundItems;
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to get items' });
    }
});


async function updatePickupLocations(filter, updateDoc){
    const result = await pickupLocations.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    return result
}


app.put('/pickupLocations', async (req, res) => {
    const updateDoc  = {$set: req.body};
    const query = req.query

    if(query._id){
        query._id = new ObjectId(query._id)
    }

    try {
        const result = await updatePickupLocations(query, updateDoc);
        res.status(200).json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ error: 'Failed to update menu item' });
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
            const idString = req.body._id;
            if (!ObjectId.isValid(idString) || idString.length !== 24) {
                return res.status(400).json({ error: 'Invalid _id format' });
            }
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
        let query = {_id : new ObjectId(cart[i]._id)}
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
            const foundAccount = await getAllAccounts(query);
            cart = foundAccount[0].cart
            if (cart.length< 1){
                res.status(400).json({error: 'The cart is empty'})
            }
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
            const orderId = await postOrders(newOrder);
            res.status(201).json({ message: 'order added successfully', orderId });
            return orderId
        }
    } catch (error){
        console.log("ERROR: " + error)
        res.status(500).json({ error: 'Failed to create order' });
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});