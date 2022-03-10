const mongoose = require("mongoose");
const {ProductModel} = require('../Model/ProductModel');

function createProduct(req, res) {
    const product = new ProductModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        imageUrl: req.body.imageUrl,
        buyPrice: req.body.buyPrice,
        promotionPrice: req.body.promotionPrice,
        description: req.body.description,
        timeCreated: req.body.timeCreate,
        timeUpdate: req.body.timeUpdate
    });
    product.save()
    .then((newProduct)=>{
        return res.status(200).json({
            message: "Create new product successfully.",
            product: newProduct
        })
    })
    .catch((error)=>{
        return res.status(500).json({
            message: "Fail",
            error: error.message
        })
    })
}

function getAllProduct(request, response){
    let limit = 0;
    limit = request.query.limit;
    if(limit !== undefined){
        ProductModel.find()
        .limit(limit)
        .select("_id name type imageUrl buyPrice promotionPrice description timeCreated timeUpdate")
        .then((ProductList) => {
            return response.status(200).json({
                message: `Get all succeed. Total products: ${ProductList.length}`,
                products: ProductList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        });
    } else {
        ProductModel.find()
        .select("_id name type imageUrl buyPrice promotionPrice description timeCreated timeUpdate")
        .then((ProductList) => {
            return response.status(200).json({
                message: `Get all succeed. Total products: ${ProductList.length}`,
                products: ProductList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        });
    }
    
}
function getProductById (request, response) {
    //Get product id
    const id = request.params.productId;
    //check product id is valid?
    if(mongoose.Types.ObjectId.isValid(id)) {
        ProductModel.findById(id)
        .select("_id name type imageUrl buyPrice promotionPrice description timeCreated timeUpdate")
        .then((data) => {
            if(data) {
                return response.status(200).json({
                    message: `Get product with id: ${id} succeed.`,
                    product: data
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
            error: "Product Id is invalid!"
        })
    }
}
function updateProduct(request, response) {
    const id = request.params.productId;
    const updateObject = request.body;
    if(mongoose.Types.ObjectId.isValid(id)){
        ProductModel.findByIdAndUpdate(id, updateObject)
        .then((data) =>{
            return response.status(200).json({
                message: `Update product with id: ${id} succeed`,
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
            error: "Product Id is invalid!"
        })
    }
}
function deleteProduct (request, response) {
    const id = request.params.productId;
    if(mongoose.Types.ObjectId.isValid(id)){
        ProductModel.findByIdAndDelete(id)
        .then((data) =>{
            return response.status(200).json({
                message: "Delete product succeed",
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
            error: "Product Id is invalid!"
        })
    }
}
module.exports = {createProduct, getAllProduct, getProductById, updateProduct, deleteProduct};