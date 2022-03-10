const mongoose = require("mongoose");
const {Schema} = mongoose;
//init customer schema MongoDB
const customerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdate: {
        type: Date,
        default: Date.now()
    }
})
const CustomerModel = mongoose.model("Customers", customerSchema);
module.exports = {CustomerModel};