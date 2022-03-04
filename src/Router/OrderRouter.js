// Import thư viện Express
const express = require('express');

// Import các hàm của lớp controller
const { getAllOrder, getSingleOrder, updateOrder, deleteOrder } = require("../controller/OrderController");
const { createOrderDetail, getAllDetailOfOrder } = require('../Controller/OrderDetailController');

// Khai báo exporess router
const router = express.Router();

// Khai báo các router dạng "/orders" + url bên dưới sẽ gọi đến các hàm tương ứng

// /reviews - Get All order
router.get('/', getAllOrder);
//  - Get Order By ID
router.get('/:orderId', getSingleOrder);
//  - Update Order By ID
router.put('/:orderId', updateOrder);
//  - Delete Order By ID
router.delete('/:orderId', deleteOrder);

router.post('/:orderId/:productId/orderdetails', createOrderDetail);
router.get('/:orderId/orderdetails', getAllDetailOfOrder);
// Export router dưới dạng module để sử dụng
module.exports = router;
