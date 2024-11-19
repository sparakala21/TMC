class TableObject{
    constructor(data) {
        this._id = data._id || null
    }

    convertToDict(){
        return {_id : this._id}
    }

    getPostDict(){
        const postDict = this.convertToDict()
        // we dont want to post ids to the database
        delete postDict._id
        return postDict
    }
}


class MenuItem extends TableObject{
    constructor(data) {
        super(data)
        this._id = data._id || null;
        this.name = (data.name !== undefined && data.name !== null) ? data.name : "";
        this.price = (data.price !== undefined && data.price !== null) ? data.price : -1;
        this.allergen = (data.allergen !== undefined && data.allergen !== null) ? data.allergen : "";
        this.description = (data.description !== undefined && data.description !== null) ? data.description : "";
        this.image = (data.image !== undefined && data.image !== null) ? data.image : "";
        this.active = (data.active !== undefined && data.active !== null) ? data.active : true;
        this.category = (data.category !== undefined && data.category !== null) ? data.category : "Main";
        
    }

    hasRequiredPostFields(){
        return this.name != "" && this.price != -1 && this.description != ""
    }

    convertToDict(){
        return {
            _id : this._id, 
            name :  this.name, 
            price :  this.price, 
            allergen :  this.allergen, 
            description :  this.description, 
            image :  this.image, 
            active :  this.active, 
            category :  this.category
            
        }
    }
}

class Order extends TableObject{
    constructor(data) {
        super(data)
        this._id = data._id || null;
        this.accountId = (data.accountId !== undefined && data.accountId !== null) ? data.accountId : null;
        this.orderTime = (data.orderTime !== undefined && data.orderTime !== null) ? data.orderTime : "";
        this.pickupLocation = (data.pickupLocation !== undefined && data.pickupLocation !== null) ? data.pickupLocation : null;
        this.items = (data.items !== undefined && data.items !== null) ? data.items : [];
        this.costOfItems = (data.costOfItems !== undefined && data.costOfItems !== null) ? data.costOfItems : -1;
        this.tip = (data.tip !== undefined && data.tip !== null) ? data.tip : -1;
        this.completed = (data.completed !== undefined && data.completed !== null) ? data.completed : "";
        
    }

    hasRequiredPostFields(){
        return this.accountId != null && this.orderTime != "" && this.items != [] && this.costOfItems != -1
    }

    convertToDict(){
        return {
            _id : this._id, 
            accountId :  this.accountId, 
            orderTime :  this.orderTime, 
            pickupLocation :  this.pickupLocation, 
            items :  this.items, 
            costOfItems :  this.costOfItems, 
            tip :  this.tip, 
            completed :  this.completed
            
        }
    }
}

class Account extends TableObject{
    constructor(data) {
        super(data)
        this._id = data._id || null;
        this.name = (data.name !== undefined && data.name !== null) ? data.name : "";
        this.email = (data.email !== undefined && data.email !== null) ? data.email : "";
        this.phone = (data.phone !== undefined && data.phone !== null) ? data.phone : "";
        this.password = (data.password !== undefined && data.password !== null) ? data.password : "";
        this.accessLevel = (data.accessLevel !== undefined && data.accessLevel !== null) ? data.accessLevel : -1;
        this.cart = (data.cart !== undefined && data.cart !== null) ? data.cart : [];
        
    }

    hasRequiredPostFields(){
        return this.name != "" && this.email != "" && this.password != "" && this.cart != []
    }

    convertToDict(){
        return {
            _id : this._id, 
            name :  this.name, 
            email :  this.email, 
            phone :  this.phone, 
            password :  this.password, 
            accessLevel :  this.accessLevel, 
            cart :  this.cart
            
        }
    }
}

class PickupLocation extends TableObject{
    constructor(data) {
        super(data)
        this._id = data._id || null;
        this.address = (data.address !== undefined && data.address !== null) ? data.address : "";
        this.contactInfo = (data.contactInfo !== undefined && data.contactInfo !== null) ? data.contactInfo : "";
        this.name = (data.name !== undefined && data.name !== null) ? data.name : "";
        this.active = (data.active !== undefined && data.active !== null) ? data.active : false;
        this.pickupTime = (data.pickupTime !== undefined && data.pickupTime !== null) ? data.pickupTime : "";
        
    }

    hasRequiredPostFields(){
        return this.address != "" && this.contactInfo != "" && this.name != ""
    }

    convertToDict(){
        return {
            _id : this._id, 
            address :  this.address, 
            contactInfo :  this.contactInfo, 
            name :  this.name, 
            active :  this.active, 
            pickupTime :  this.pickupTime
            
        }
    }
}



module.exports = {
    MenuItem, 
    Order, 
    Account, 
    PickupLocation
    
}
