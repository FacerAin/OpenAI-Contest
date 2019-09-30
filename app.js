const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const fs= require('fs');
const morgan=require('morgan');

app.use(morgan('[:date[iso]] :method :status :url :response-time(ms) :user-agent'));    
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',require('./api'));   

app.listen(3000,()=>{
    console.log('Server On!');
});