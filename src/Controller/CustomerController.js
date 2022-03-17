const mongoose = require("mongoose");
const {CustomerModel} = require('../Model/CustomerModel');

function createCustomer(req, res) {
    const customer = new CustomerModel({
        _id: mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        photoURL: req.body.photoURL,
        country: req.body.country,
        timeCreated: req.body.timeCreate,
        timeUpdate: req.body.timeUpdate
    });
    customer.save()
    .then((newcustomer)=>{
        return res.status(200).json({
            message: "Create new customer successfully.",
            customer: newcustomer
        })
    })
    .catch((error)=>{
        return res.status(500).json({
            message: "Fail",
            error: error.message
        })
    })
}
function getAllCustomer(request, response){
    const email = request.query.email;
    if(email!==null && email !== undefined)
    CustomerModel.find({email:email})
        .select("_id fullName phoneNumber email password address city photoURL country timeCreated timeUpdate")
        .then((CustomerList) => {
            if(CustomerList) {
                return response.status(200).json({
                    message: "Get all succeed.",
                    Customers: CustomerList
                })
            }
            else {
                return response.status(404).json({
                    message: "Fail",
                    error: "Not Found"
                })
            }
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })
        else
        CustomerModel.find()
        .select("_id fullName phoneNumber email password address city photoURL country timeCreated timeUpdate")
        .then((CustomerList) => {
            if(CustomerList) {
                return response.status(200).json({
                    message: "Get all succeed.",
                    Customers: CustomerList
                })
            }
            else {
                return response.status(404).json({
                    message: "Fail",
                    error: "Not Found"
                })
            }
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })    
}
function getCustomerById (request, response) {
    //Get customer id
    const id = request.params.customerId;
    //check customer id is valid?
    if(mongoose.Types.ObjectId.isValid(id)) {
        CustomerModel.findById(id)
        .select("_id fullName phoneNumber email password address city photoURL country timeCreated timeUpdate")
        .then((data) => {
            if(data) {
                return response.status(200).json({
                    message: `Get customer with id: ${id} succeed.`,
                    Customer: data
                })
            }
            else {
                return response.status(404).json({
                    message: "Fail",
                    error: "Not Found"
                })
            }
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })
    } else {
        return response.status(400).json({
            message: "Fail",
            error: "Customer Id is invalid!"
        })
    }
}
function updateCustomer(request, response) {
    const id = request.params.customerId;
    const updateObject = request.body;
    if(mongoose.Types.ObjectId.isValid(id)){
        CustomerModel.findByIdAndUpdate(id, updateObject)
        .then((data) =>{
            return response.status(200).json({
                message: `Update customer with id: ${id} succeed`,
                updateObject: data
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Update Failure",
                error: error.message
            })
        })
    } else {
        return response.status(400).json({
            message: "Update Failure",
            error: "Customer Id is invalid!"
        })
    }
}
function deleteCustomer (request, response) {
    const id = request.params.customerId;
    if(mongoose.Types.ObjectId.isValid(id)){
        CustomerModel.findByIdAndDelete(id)
        .then((data) =>{
            return response.status(200).json({
                message: "Delete customer succeed",
                deleteObject: data
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Delete Failure",
                error: error.message
            })
        })
    } else {
        return response.status(400).json({
            message: "Fail",
            error: "Customer Id is invalid!"
        })
    }
}
module.exports = {createCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer};