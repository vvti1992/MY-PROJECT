// Import thư viện mongoose JS
const mongoose = require('mongoose');
const { CustomerModel } = require('../Model/CustomerModel');
// Import Order Model
const { OrderDetailModel } = require('../model/OrderDetailModel');
const { OrderModel } = require('../model/OrderModel');

// Create Order detail
function createOrderDetail(req, res) {
     // Khởi tạo một đối tượng OrderDetailModel  mới truyền các tham số tương ứng từ request body vào
    const orderDetail = new OrderDetailModel({
        _id: mongoose.Types.ObjectId(),
        order: req.params.orderId,
        product: req.params.productId,
        quantity: req.body.quantity,
        priceEach: req.body.priceEach
    });

    // Gọi hàm order detai save - là 1 promise (Tiến trình bất đồng bộ)
    orderDetail.save()
        // Sau khi update user thành công trả ra status 200 - Success
        .then((OrderDetail) => {
            return res.status(200).json({
                message: 'New order detail created successfully on order',
                Order_detail: OrderDetail,
            });
        })
        // Xử lý lỗi trả ra 500 - Server Internal Error
        .catch((error) => {
            res.status(500).json({
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

// Get all detail of order 
function getAllDetailOfOrder(req, res) {
    const id = req.params.orderId;
    OrderDetailModel.find({order:id})
        .select('_id order product quantity priceEach')
        .then((allDetail) => {
            return res.status(200).json({
                message: 'A list of all order detail',
                Order_detail: allDetail,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}
// Get single Order detail
function getSingleOrderDetail(req, res) {
    const id = req.params.orderDetailId;

    OrderDetailModel.findById(id)
        .then((singleOrderDetail) => {
            if(singleOrderDetail){
                return res.status(200).json({
                    message: `Get data on Order`,
                    Order_detail: singleOrderDetail,
                });
            } else {
                return res.status(404).json({
                    message: "Fail",
                    error: "Order detail not found",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'This order does not exist',
                error: err.message,
            });
        });
}

// update order detail
function updateOrderDetail(req, res) {
    const orderDetailId = req.params.orderDetailId;
    const updateObject = req.body;
    OrderDetailModel.findByIdAndUpdate(orderDetailId, updateObject)
        .then(() => {
            res.status(200).json({
                message: 'Order detail is updated',
                updateOrder: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Server error. Please try again.',
                error: err.message
            });
        });
}

// delete a order detail
function deleteOrderDetail(req, res) {
    const id = req.params.orderDetailId;

    OrderDetailModel.findByIdAndRemove(id)
        .then((OrderDetail) => res.status(200).json({
            message: "Delete succeed",
            Order_detail: OrderDetail
        }))
        .catch((err) => res.status(500).json({
            error: err.message,
        }));
}

module.exports = { createOrderDetail, getAllDetailOfOrder, updateOrderDetail, getSingleOrderDetail, deleteOrderDetail };
