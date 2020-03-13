const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const iexAPI = require('./router/iex-api');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',iexAPI);
console.log("hi");
app.listen(81, () =>{
    console.log("Server Started");
})