const express = require('express')
const app = express();
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const catagoryRoute =  require('./routes/catagory');
const productRoute  =  require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');



app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.use('/user', userRoute);
app.use('/catagory', catagoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/dashboard', dashboardRoute);

module.exports = app;

