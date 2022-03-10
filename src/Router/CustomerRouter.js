const express = require("express");
const { createCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer } = require("../Controller/CustomerController");


const router = express.Router();
router.post('/',createCustomer);
router.get('/', getAllCustomer);
router.get('/:customerId', getCustomerById);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);


module.exports = router;