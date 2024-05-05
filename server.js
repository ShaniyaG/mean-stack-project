const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// port
const PORT = process.env.PORT || 8001;

app.get('/',async (req,res)=>{
    try{

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