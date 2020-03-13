// Getting all the middlewares and modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const iexAPI = require('./router/iex-api');
const app = express();
// Attaching middlewares the ExpressJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// Adding the IEXAPI route
app.use('/',iexAPI);

// Starting the Server on Port 81
app.listen(81, () =>{
    console.log("Server Started");
})