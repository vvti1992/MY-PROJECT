const mongoose = require("mongoose");
const {Schema} = mongoose;
//init product schema MongoDB
const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    brand: {
        type: String,
        required: true,
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
const ProductModel = mongoose.model("Products", productSchema);
module.exports = {ProductModel};