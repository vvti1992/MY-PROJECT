const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const ProductRouter = require("./src/Router/ProductRouter");
const CustomerRouter = require("./src/Router/CustomerRouter");
const OrderRouter = require("./src/Router/OrderRouter");
const OrderDetailRouter = require("./src/Router/OrderDetailRouter");
//Khai bao lay tieng viet
app.use(express.urlencoded({
    extended:true
}));
//khai bao body dang JSON
app.use(express.json());
//Connect to mongoDB
async function ConnectMongoDB() {
    await mongoose.connect("mongodb://localhost:27017/CRUD_SHOP24H");
};
//Excute connect
ConnectMongoDB()
    .then(()=>console.log("Connect to MongoDB successfully!"))
    .catch(()=>console.log("Connect fail"));

app.get("/", (req, res)=>{
    res.json({
        message: "CRUD API"
    })
});
app.use("/products", ProductRouter);
app.use("/customers", CustomerRouter);
app.use("/orders", OrderRouter);
app.use("/orderdetails", OrderDetailRouter);

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
});