// server requirements to run
const mongoose = require('mongoose');
const {app, client} = require("../db");
const register_router = require('./loginRoute');

//register api
register_router.post('/api/register', async (req, res) =>{

    // new user data    
    let  _id = new mongoose.Types.ObjectId()
    let  firstName = req.body.firstName
    let  lastName = req.body.lastName
    let  login = req.body.login
    let  password = req.body.password
    let  email = req.body.email   
    
    const db = client.db("MyGameListDB");
  
    // insert new user into database
    const add_user = await db.collection('Users').insertOne({_id:_id,firstName:firstName, lastName:lastName,login:login,password:password,email:email})
    res.status(200).json({
      message: "Registered new user"
    });
  
  })

  module.exports = register_router