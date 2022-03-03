const express = require("express");
const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require("../Controller/ProductController");

const router = express.Router();
router.post('/',createProduct);
router.get('/', getAllProduct);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);


module.exports = router;