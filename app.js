const express = require('express');
const app = express();
const Categories = require('./models/Categories');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true}))




app.listen(process.env.PORT,()=>{
    console.log(`Servidor inicado na porta ${process.env.PORT}http://localhost:${process.env.PORT} `)
})

