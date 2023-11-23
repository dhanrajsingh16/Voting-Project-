const express = require("express");
const mongoose = require("mongoose");
const votingRoute = require("./controller/votingRoute")
const registrationRoute = require("./controller/registrationRoute")
const authController = require("./controller/authController")

const app= express();
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://srishtikumbhare:Srishti07@cluster0.35fob74.mongodb.net/Voting")
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occured"));

//Middleware
app.arguments("/authController",authController);
app.arguments("/votingRoute",votingRoute); 
app.arguments("/registrationRoute",registrationRoute);

app.listen(4000,()=>{
    console.log("Server started at 4000");
})