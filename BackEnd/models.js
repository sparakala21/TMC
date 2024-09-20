class MenuItem{
    constructor(id, name, price, allergen, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.allergen = allergen;
        this.description = description;
        this.image = image;
    }
}


class Order{
    constructor(id, accountId, orderTime, pickupLocation, items, costOfItems, tip, completed) {
        this.id = id;
        this.accountId = accountId;
        this.orderTime = orderTime;
        this.pickupLocation = pickupLocation;
        this.items = items;
        this.costOfItems = costOfItems;
        this.tip = tip;
        this.completed = completed;
    }

    getTotalCost() {
        return this.tip + this.costOfItems;
    }
}


class Account{
    constructor(id, name, email, phone, accessLevel, cart) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.accessLevel = accessLevel;
        this.cart = cart;
    }
}


class PickupLocation{
    constructor(id, address, contactInfo, name){
        this.id = id;
        this.address = address;
        this.contactInfo = contactInfo;
        this.name = name;
    }
}