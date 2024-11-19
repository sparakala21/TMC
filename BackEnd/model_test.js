const { MenuItem, Order, Account, PickupLocation } = require("./models.js")
const assert = require("assert");


function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  
  return true;
}


function testCreateMenuItem(){
    const exampleItem = {  
        _id : 1,
        name : "example1", 
        price : 1.2, 
        allergen : "example1", 
        description : "example1", 
        image : "example1", 
        active : true, 
        category : "example1"
    };
    const item = new MenuItem(exampleItem);
    
    assert.strictEqual(item._id, exampleItem._id, "id should equal exampleItem.id");
    assert.strictEqual(item.name, exampleItem.name, "name should equal exampleItem.name");
    assert.strictEqual(item.price, exampleItem.price, "price should equal exampleItem.price");
    assert.strictEqual(item.allergen, exampleItem.allergen, "allergen should equal exampleItem.allergen");
    assert.strictEqual(item.description, exampleItem.description, "description should equal exampleItem.description");
    assert.strictEqual(item.image, exampleItem.image, "image should equal exampleItem.image");
    assert.strictEqual(item.active, exampleItem.active, "active should equal exampleItem.active");
    assert.strictEqual(item.category, exampleItem.category, "category should equal exampleItem.category");
}


function testCreateEmptyMenuItem(){
    const item = new MenuItem({});
    
    assert.strictEqual(item.name, "", 'name should be ""');
    assert.strictEqual(item.price, -1, 'price should be -1');
    assert.strictEqual(item.allergen, "", 'allergen should be ""');
    assert.strictEqual(item.description, "", 'description should be ""');
    assert.strictEqual(item.image, "", 'image should be ""');
    assert.strictEqual(item.active, true, 'active should be true');
    assert.strictEqual(item.category, "Main", 'category should be "Main"');
}


function testCreateMenuItemWithNullInput(){
    const exampleItem = {  
        _id : null,
        name : null, 
        price : null, 
        allergen : null, 
        description : null, 
        image : null, 
        active : null, 
        category : null
    };
    const item = new MenuItem(exampleItem);
    
    assert.strictEqual(item._id, null, "id should be null");
    assert.strictEqual(item.name, "", 'name should be ""');
    assert.strictEqual(item.price, -1, 'price should be -1');
    assert.strictEqual(item.allergen, "", 'allergen should be ""');
    assert.strictEqual(item.description, "", 'description should be ""');
    assert.strictEqual(item.image, "", 'image should be ""');
    assert.strictEqual(item.active, true, 'active should be true');
    assert.strictEqual(item.category, "Main", 'category should be "Main"');
}


function testCreateOrder(){
    const exampleItem = {  
        _id : 1,
        accountId : "example1", 
        orderTime : "example1", 
        pickupLocation : "example1", 
        items : ['arrayVal1', 'arrayVal2', 'arrayVal3'], 
        costOfItems : 1.2, 
        tip : 1.2, 
        completed : "example1"
    };
    const item = new Order(exampleItem);
    
    assert.strictEqual(item._id, exampleItem._id, "id should equal exampleItem.id");
    assert.strictEqual(item.accountId, exampleItem.accountId, "accountId should equal exampleItem.accountId");
    assert.strictEqual(item.orderTime, exampleItem.orderTime, "orderTime should equal exampleItem.orderTime");
    assert.strictEqual(item.pickupLocation, exampleItem.pickupLocation, "pickupLocation should equal exampleItem.pickupLocation");
    assert.strictEqual(item.costOfItems, exampleItem.costOfItems, "costOfItems should equal exampleItem.costOfItems");
    assert.strictEqual(item.tip, exampleItem.tip, "tip should equal exampleItem.tip");
    assert.strictEqual(item.completed, exampleItem.completed, "completed should equal exampleItem.completed");
    assert.strictEqual(areArraysEqual(item.items, exampleItem.items), true ); 
}


function testCreateEmptyOrder(){
    const item = new Order({});
    
    assert.strictEqual(item.accountId, null, 'accountId should be null');
    assert.strictEqual(item.orderTime, "", 'orderTime should be ""');
    assert.strictEqual(item.pickupLocation, null, 'pickupLocation should be null');
    assert.strictEqual(item.costOfItems, -1, 'costOfItems should be -1');
    assert.strictEqual(item.tip, -1, 'tip should be -1');
    assert.strictEqual(item.completed, "", 'completed should be ""');
    assert.strictEqual(areArraysEqual(item.items, []), true ); 
}


function testCreateOrderWithNullInput(){
    const exampleItem = {  
        _id : null,
        accountId : null, 
        orderTime : null, 
        pickupLocation : null, 
        items : null, 
        costOfItems : null, 
        tip : null, 
        completed : null
    };
    const item = new Order(exampleItem);
    
    assert.strictEqual(item._id, null, "id should be null");
    assert.strictEqual(item.accountId, null, 'accountId should be null');
    assert.strictEqual(item.orderTime, "", 'orderTime should be ""');
    assert.strictEqual(item.pickupLocation, null, 'pickupLocation should be null');
    assert.strictEqual(item.costOfItems, -1, 'costOfItems should be -1');
    assert.strictEqual(item.tip, -1, 'tip should be -1');
    assert.strictEqual(item.completed, "", 'completed should be ""');
    assert.strictEqual(areArraysEqual(item.items, []), true ); 
}


function testCreateAccount(){
    const exampleItem = {  
        _id : 1,
        name : "example1", 
        email : "example1", 
        phone : "example1", 
        password : "example1", 
        accessLevel : 1, 
        cart : ['arrayVal1', 'arrayVal2', 'arrayVal3']
    };
    const item = new Account(exampleItem);
    
    assert.strictEqual(item._id, exampleItem._id, "id should equal exampleItem.id");
    assert.strictEqual(item.name, exampleItem.name, "name should equal exampleItem.name");
    assert.strictEqual(item.email, exampleItem.email, "email should equal exampleItem.email");
    assert.strictEqual(item.phone, exampleItem.phone, "phone should equal exampleItem.phone");
    assert.strictEqual(item.password, exampleItem.password, "password should equal exampleItem.password");
    assert.strictEqual(item.accessLevel, exampleItem.accessLevel, "accessLevel should equal exampleItem.accessLevel");
    assert.strictEqual(areArraysEqual(item.cart, exampleItem.cart), true ); 
}


function testCreateEmptyAccount(){
    const item = new Account({});
    
    assert.strictEqual(item.name, "", 'name should be ""');
    assert.strictEqual(item.email, "", 'email should be ""');
    assert.strictEqual(item.phone, "", 'phone should be ""');
    assert.strictEqual(item.password, "", 'password should be ""');
    assert.strictEqual(item.accessLevel, -1, 'accessLevel should be -1');
    assert.strictEqual(areArraysEqual(item.cart, []), true ); 
}


function testCreateAccountWithNullInput(){
    const exampleItem = {  
        _id : null,
        name : null, 
        email : null, 
        phone : null, 
        password : null, 
        accessLevel : null, 
        cart : null
    };
    const item = new Account(exampleItem);
    
    assert.strictEqual(item._id, null, "id should be null");
    assert.strictEqual(item.name, "", 'name should be ""');
    assert.strictEqual(item.email, "", 'email should be ""');
    assert.strictEqual(item.phone, "", 'phone should be ""');
    assert.strictEqual(item.password, "", 'password should be ""');
    assert.strictEqual(item.accessLevel, -1, 'accessLevel should be -1');
    assert.strictEqual(areArraysEqual(item.cart, []), true ); 
}


function testCreatePickupLocation(){
    const exampleItem = {  
        _id : 1,
        address : "example1", 
        contactInfo : "example1", 
        name : "example1", 
        active : true, 
        pickupTime : "example1"
    };
    const item = new PickupLocation(exampleItem);
    
    assert.strictEqual(item._id, exampleItem._id, "id should equal exampleItem.id");
    assert.strictEqual(item.address, exampleItem.address, "address should equal exampleItem.address");
    assert.strictEqual(item.contactInfo, exampleItem.contactInfo, "contactInfo should equal exampleItem.contactInfo");
    assert.strictEqual(item.name, exampleItem.name, "name should equal exampleItem.name");
    assert.strictEqual(item.active, exampleItem.active, "active should equal exampleItem.active");
    assert.strictEqual(item.pickupTime, exampleItem.pickupTime, "pickupTime should equal exampleItem.pickupTime");
}


function testCreateEmptyPickupLocation(){
    const item = new PickupLocation({});
    
    assert.strictEqual(item.address, "", 'address should be ""');
    assert.strictEqual(item.contactInfo, "", 'contactInfo should be ""');
    assert.strictEqual(item.name, "", 'name should be ""');
    assert.strictEqual(item.active, false, 'active should be false');
    assert.strictEqual(item.pickupTime, "", 'pickupTime should be ""');
}


function testCreatePickupLocationWithNullInput(){
    const exampleItem = {  
        _id : null,
        address : null, 
        contactInfo : null, 
        name : null, 
        active : null, 
        pickupTime : null
    };
    const item = new PickupLocation(exampleItem);
    
    assert.strictEqual(item._id, null, "id should be null");
    assert.strictEqual(item.address, "", 'address should be ""');
    assert.strictEqual(item.contactInfo, "", 'contactInfo should be ""');
    assert.strictEqual(item.name, "", 'name should be ""');
    assert.strictEqual(item.active, false, 'active should be false');
    assert.strictEqual(item.pickupTime, "", 'pickupTime should be ""');
}




function runTests(){ 
    testCreateMenuItem();
    testCreateEmptyMenuItem();
    testCreateMenuItemWithNullInput();
    testCreateOrder();
    testCreateEmptyOrder();
    testCreateOrderWithNullInput();
    testCreateAccount();
    testCreateEmptyAccount();
    testCreateAccountWithNullInput();
    testCreatePickupLocation();
    testCreateEmptyPickupLocation();
    testCreatePickupLocationWithNullInput();
    console.log("tests passed");
}

runTests();
