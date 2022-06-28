const Sequelize =require('sequelize');
const db= require('../database/db')


const Categories = db.define('samuel_categories',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
   
    
    description : {
        type:Sequelize.STRING,
        allowNull:true
    }
})

///crear tabela com Sequelize/////

    // Categories.sync();
    // // exclui a tabela e criar novamente 
    // Users.sync({force: true})

    // // verificar se há alguma diferença na tabela, realiza alteração 
    // Users.sync({alter:true});

    module.exports =Categories;