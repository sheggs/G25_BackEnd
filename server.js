// Getting all the middlewares and modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const IEXCloud = require('./iexcloud/iexcloud')
const iexAPI = require('./router/iex-api');
const socketIO = require('socket.io')(8000);
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


// Socket stuff
socketIO.on('connection',(socket) => {
    setInterval(() => {
        IEXCloud.reducedQueryAll((r) => {
            socket.broadcast.emit('stock-update', r)
        })
    },10000)
})
