//Import thư viện mongo
const mongoose = require("mongoose");
//Sử dụng phép gán phá hủy cấu trúc để lấy thuộc tính Scheme
const { Schema } = mongoose;
//Khởi tạo orderDtail Scheme MongoDB
const orderDetailScheme = new Schema(
    {
        _id: Schema.Types.ObjectId,
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Orders'
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        },
        priceEach: {
            type: Number,
            require: true,
            default: 0
        }
    }
);
//Tạo order detail Model
const OrderDetailModel = mongoose.model("OrderDetail", orderDetailScheme);
//Export order detail Model
module.exports = { OrderDetailModel };