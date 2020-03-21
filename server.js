// Getting all the middlewares and modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const IEXCloud = require('./iexcloud/iexcloud')
const iex = require('iexcloud_api_wrapper')
const iexAPI = require('./router/iex-api');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
const request = require('request')
const PORT = process.env.port || 4001
// let corsOptions = {
//   origin: `http://localhost:${PORT}/*`
// }

app.use(cors())

// Attaching middlewares the ExpressJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Adding the IEXAPI route
app.use('/', iexAPI);

// Execute every 2 seconds
setInterval(() => {
  IEXCloud.getBatchStockQuotes(['AAPL', 'FB', 'ZM', 'MSFT', 'BABA', 'GOOGL', 'AMD', 'INTC', 'V', 'MA'], data => {
    console.log("Updated stock")
    io.emit('stock update', data)
  })
}, 2000)

// Starting the Server
http.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
})
