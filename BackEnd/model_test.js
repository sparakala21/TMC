
import { MenuItem, Order, Account, PickupLocation } from './models.js';
import assert from 'assert';

function testCreateMenuItem(){
    const exampleItem = {  
        id : 1,
        name : "example",
        price : 23.4,
        allergen : "vegetarian",
        description : "leaves",
        image : "www.example.com" 
    };
    const menuItem = new MenuItem(exampleItem);
    
    assert.strictEqual(menuItem.id, exampleItem.id, "id should equal exampleItem.id");
    assert.strictEqual(menuItem.name, exampleItem.name, "name should equal exampleItem.name");
    assert.strictEqual(menuItem.price, exampleItem.price, "price should equal exampleItem.price");
    assert.strictEqual(menuItem.allergen, exampleItem.allergen, "allergen should equal exampleItem.allergen");
    assert.strictEqual(menuItem.description, exampleItem.description, "description should equal exampleItem.description");
}


function testCreateEmptyMenuItem(){
    const menuItem = new MenuItem({});
    
    assert.strictEqual(menuItem.name, "", "name should be empty");
    assert.strictEqual(menuItem.price, -1, "price should equal be -1");
    assert.strictEqual(menuItem.allergen, "", "allergen should be empty");
    assert.strictEqual(menuItem.description, "", "description should be empty");
}

function testCreateOrder(){
    const exampleOrder = {  
        id : 1,
        accountId : 2,
        orderTime : "2023-09-24T15:30:45Z",
        pickupLocation : 3,
        items : [2,4,6,1],
        costOfItems : 34,
        tip : 3.4,
        completed : "2023-09-24T16:30:45Z",
    };
    const order = new Order(exampleOrder);
    
    assert.strictEqual(order.id, exampleOrder.id, "id should equal exampleOrder.id");
    assert.strictEqual(order.accountId, exampleOrder.accountId, "accountId should equal exampleOrder.accountId");
    assert.strictEqual(order.orderTime, exampleOrder.orderTime, "orderTime should equal exampleOrder.orderTime");
    assert.strictEqual(order.pickupLocation, exampleOrder.pickupLocation, "pickupLocation should equal exampleOrder.pickupLocation");
    assert.strictEqual(order.items, exampleOrder.items, "items should equal exampleOrder.items");
    assert.strictEqual(order.costOfItems, exampleOrder.costOfItems, "costOfItems should equal exampleOrder.costOfItems");
    assert.strictEqual(order.tip, exampleOrder.tip, "tip should equal exampleOrder.tip");
    assert.strictEqual(order.completed, exampleOrder.completed, "completed should equal exampleOrder.completed");
}


function testCreateEmptyOrder(){
    const order = new Order({});
    
    assert.strictEqual(order.orderTime,  "", "orderTime should be empty");
    assert.strictEqual(order.pickupLocation, -1, "pickupLocation should equal -1");
    assert.strictEqual(order.items.length, 0, "items should be empty");
    assert.strictEqual(order.costOfItems, -1, "costOfItems should equal -1");
    assert.strictEqual(order.tip, -1, "tip should equal -1");
    assert.strictEqual(order.completed, "", "completed should be empty");
}


function testCreateAccount(){
    const exampleAccount = {  
        id : 1,
        name : "the tester",
        email : "theTester@test.com",
        phone : "122-333-4444",
        accessLevel : 1, 
        cart : [1, 2, 3, 4]
    };
    const account = new Account(exampleAccount);
    
    assert.strictEqual(account.id, exampleAccount.id, "id should equal exampleAccount.id");
    assert.strictEqual(account.name, exampleAccount.name, "name should equal exampleAccount.name");
    assert.strictEqual(account.email, exampleAccount.email, "email should equal exampleAccount.email");
    assert.strictEqual(account.phone, exampleAccount.phone, "phone should equal exampleAccount.phone");
    assert.strictEqual(account.accessLevel, exampleAccount.accessLevel, "accessLevel should equal exampleAccount.accessLevel");
    assert.strictEqual(account.cart, exampleAccount.cart, "cart should equal exampleAccount.cart");

}


function testCreateEmptyAccount(){
    const account = new Account({});
    
    assert.strictEqual(account.name, "", "name should be empty");
    assert.strictEqual(account.email, "", "email should be empty");
    assert.strictEqual(account.phone, "", "phone should be empty");
    assert.strictEqual(account.accessLevel, -1, "accessLevel should equal -1");
    assert.strictEqual(account.cart.length, 0, "cart should be empty");

}

function testCreatePickupLocation(){
    const exampleLocation = {  
        id : 1,
        address : "123 RPI Rd.",
        contactInfo : "123-456-7890",
        name : "RPI union"
    };
    const location = new PickupLocation(exampleLocation);
    
    assert.strictEqual(location.id, exampleLocation.id, "id should equal exampleLocation.id");
    assert.strictEqual(location.address, exampleLocation.address, "address should equal exampleLocation.address");
    assert.strictEqual(location.contactInfo, exampleLocation.contactInfo, "contactInfo should equal exampleLocation.contactInfo");
    assert.strictEqual(location.name, exampleLocation.name, "name should equal exampleLocation.name");

}


function testCreateEmptyPickupLocation(){
    const location = new PickupLocation({});
    assert.strictEqual(location.address, "", "address should be empty");
    assert.strictEqual(location.contactInfo, "", "contactInfo should be empty");
    assert.strictEqual(location.name, "", "name should be empty");

}


function runTests(){
    testCreateMenuItem();
    testCreateOrder();
    testCreateAccount();
    testCreatePickupLocation();
    testCreateEmptyMenuItem();
    testCreateEmptyOrder();
    testCreateEmptyAccount();
    testCreateEmptyPickupLocation();
    console.log("tests passed");
}

runTests();
