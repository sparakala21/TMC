class MenuItem{
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.allergen = data.allergen;
        this.description = data.description;
        this.image = data.image;
    }

    convertToDict(){
        return {
            id : this.id, name : this.name, price : this.price, allergen : this.allergen, 
            description : this.description, image : this.image
        }
    }
}


class Order{
    constructor(data) {
        this.id = data.id;
        this.accountId = data.accountId;
        this.orderTime = data.orderTime;
        this.pickupLocation = data.pickupLocation;
        this.items = data.items;
        this.costOfItems = data.costOfItems;
        this.tip = data.tip;
        this.completed = data.completed;
    }

    getTotalCost() {
        return this.tip + this.costOfItems;
    }

    convertToDict() {
        return {
            id : this.id, accountId : this.accountId, orderTime : this.orderTime, pickupLocation : this.pickupLocation,
            items : this.items, costOfItems : this.costOfItems, tip : this.tip, completed : this.completed
        }
    }
}


class Account{
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.accessLevel = data.accessLevel;
        this.cart = data.cart;
    }

    convertToDict() {
        return {
            id : this.id, name : this.name, email : this.email, phone : this.phone, 
            accessLevel : this.accessLevel, cart : this.cart
        }
    }
}


class PickupLocation{
    constructor(data) {
        this.id = data.id;
        this.address = data.address;
        this.contactInfo = data.contactInfo;
        this.name = data.name;
    }

    convertToDict() {
        return {id : this.id, address : this.address, contactInfo : this.contactInfo, name : this.name}
    }
}