// Import thư viện Express
const express = require('express');

// Import các hàm của lớp controller
const { getSingleOrderDetail, updateOrderDetail, deleteOrderDetail } = require('../Controller/OrderDetailController');

// Khai báo exporess router
const router = express.Router();

// Khai báo các router dạng "/orders" + url bên dưới sẽ gọi đến các hàm tương ứng

//  - Get Order By ID
router.get('/:orderDetailId', getSingleOrderDetail);
//  - Update Order By ID
router.put('/:orderDetailId', updateOrderDetail);
//  - Delete Order By ID
router.delete('/:orderDetailId', deleteOrderDetail);

// Export router dưới dạng module để sử dụng
module.exports = router;
