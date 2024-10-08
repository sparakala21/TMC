export class MenuItem{
    constructor(data) {
        this.id = data.id || null;
        this.name = data.name || "";
        this.price = data.price || -1;
        this.allergen = data.allergen || "";
        this.description = data.description || "";
        this.image = data.image || "";
    }

    convertToDict(){
        return {
            id : this.id, name : this.name, price : this.price, allergen : this.allergen, 
            description : this.description, image : this.image
        }
    }
}


export class Order{
    constructor(data) {
        this.id = data.id || null;
        this.accountId = data.accountId || null;
        this.orderTime = data.orderTime || "";
        this.pickupLocation = data.pickupLocation || -1;
        this.items = data.items || [];
        this.costOfItems = data.costOfItems || -1;
        this.tip = data.tip || -1;
        this.completed = data.completed || "";
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


export class Account{
    constructor(data) {
        this.id = data.id || null;
        this.name = data.name || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.accessLevel = data.accessLevel || -1;
        this.cart = data.cart || [];
    }

    convertToDict() {
        return {
            id : this.id, name : this.name, email : this.email, phone : this.phone, 
            accessLevel : this.accessLevel, cart : this.cart
        }
    }
}


export class PickupLocation{
    constructor(data) {
        this.id = data.id || null;
        this.address = data.address || "";
        this.contactInfo = data.contactInfo || "";
        this.name = data.name || "";
    }

    convertToDict() {
        return {id : this.id, address : this.address, contactInfo : this.contactInfo, name : this.name}
    }
}