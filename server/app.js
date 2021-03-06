const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors = require('cors');

app.use( cors( ) );
app.use(morgan('[:date[iso]] :method :status :url :response-time(ms) :user-agent'));    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use( '/api', require('./api') );

app.listen(80, ( ) => {
    console.log('Server On!');
});
//npm install -g expo-cli