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
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: null
    },
    photoURL: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
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