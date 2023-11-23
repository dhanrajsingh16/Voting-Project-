const bcrypt = require('bcrypt');
const express = require("express");
const userSchema = require("../model/userSchema")
const registrationRoute = express.Router();
const mongoose = require("mongoose");

registrationRoute.post('/register', async (req,res) => {
    const {username, named, age, email, Address, City, DOB, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10); // Salt factor = 10
        
        //Create a new user
        const newUser = new userSchema({username, 
            named, 
            age, 
            email, 
            Address, 
            City, 
            DOB, 
            password: hashedPassword});

        //Save user to the database
        await newUser.save();

        res.status(201).json({ message: 'Registration successful!' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed!' });
    }
    }
)

registrationRoute.delete('/deleteUser/:id', async (req,res) => {
    userSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data)
        }
    })
})

module.exports = registrationRoute;