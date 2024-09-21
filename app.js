require("dotenv").config();
const express = require('express');

// ---- database ----
const db = require ('./db/config')
// ---- database ----

const bodyParser = require('body-parser');

const cors = require('cors');

//===== session and cookie parser ====
const session = require ('express-session')
const cookie = require ('cookie-parser');
//===== session and cookie parser ====

const app = express();
app.use(cors());
app.use(express.json());

// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log({key:secretKey});



app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
  

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(express.static('uploads'));


const router = require('./controller/auth');
app.use('/', router);



// ####### PORT ########
const PORT = process.env.PORT || 2170;
// ####### PORT ########


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
} );