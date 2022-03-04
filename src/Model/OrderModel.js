//Import thư viện mongo
const mongoose = require("mongoose");
//Sử dụng phép gán phá hủy cấu trúc để lấy thuộc tính Scheme
const {Schema} = mongoose;
//Khởi tạo user Scheme MongoDB
const orderScheme = new Schema(
    {
        _id: Schema.Types.ObjectId,
        orderDate: {
            type: Date,
            default: Date.now()
        },
        requiredDate: {
            type: Date,
            require: true,
            default: Date.now()
        },
        shippedDate: {
            type: Date,
            require: true,
            default: Date.now()
        },
        note: {
            type: String,
            require: false,
            default: null
        },
        status: {
            type: Number,
            default: 0
        },
        createDate: {
            type: Date,
            default: Date.now()
        },
        updateDate: {
            type: Date,
            default: Date.now()
        },
        customer: 
            {
                type: Schema.Types.ObjectId,
                ref: 'Customers'
            }
    }
);
//Tạo order Model
const OrderModel = mongoose.model("Orders", orderScheme);
//Export order Model
module.exports = {OrderModel};