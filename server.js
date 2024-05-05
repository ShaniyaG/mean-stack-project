const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

// port
const PORT = process.env.PORT || 8001;

app.get('/',async (req,res)=>{
    try{
        const { firstname,lastname,email,password } = req.body;

        if(!(firstname && lastname && email && password)){
            res.status(400).json({message:'All fields are mandatory'})
        }
        const existingUser =  await User.findOne({email});
        
        if(existingUser){
            res.status(401).json({message:'User already exist'}) 
        }
        const  hashedPassword = await bcrypt(password,8);
       const user = await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword,

        })
        const token = jwt.sign(
            {
                id:user._id
            },
            'shhhh',
            {
                expiresIn:"2h"
            }
        )
        user.token = token;
        user.password = undefined;

        res.status(200).json(user);

    }catch(error){
        console.log(error);
    }
})

app.post('/register',(req,res)=>{
    
})

mongoose.connect(process.env.api_url).then(()=>{
    console.log('Database connected successfully')
}).catch((error)=>{
    console.log(error);
})

app.listen(8000,(req,res)=>{
    console.log(`App running successfully ${PORT}`)
})