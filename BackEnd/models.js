class TableObject{
    constructor(data) {
        this.id = data.id || null
    }

    convertToDict(){
        return {id : this.id}
    }

    getPostDict(){
        const postDict = this.convertToDict()
        // we dont want to post ids to the database
        delete postDict.id
        return postDict
    }
}


export class MenuItem extends TableObject{
    constructor(data) {
        this.id = data.id || null;
        this.name = data.name || "";
        this.price = data.price || -1;
        this.allergen = data.allergen || "";
        this.description = data.description || "";
        this.image = data.image || "";
    }

    hasRequiredPostFields(){
        return this.name != "" && this.price != -1 && this.description != ""
    }

    convertToDict(){
        return {
            id : this.id, name : this.name, price : this.price, allergen : this.allergen, 
            description : this.description, image : this.image
        }
    }
}


export class Order extends TableObject{
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

    hasRequiredPostFields(){
        return this.accountId != null && this.pickupLocation != -1 && this.costOfItems != -1 && this.items.length != 0
    }

    convertToDict() {
        return {
            id : this.id, accountId : this.accountId, orderTime : this.orderTime, pickupLocation : this.pickupLocation,
            items : this.items, costOfItems : this.costOfItems, tip : this.tip, completed : this.completed
        }
    }
}


export class Account extends TableObject{
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


export class PickupLocation extends TableObject{
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