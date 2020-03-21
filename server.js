// Getting all the middlewares and modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const IEXCloud = require('./iexcloud/iexcloud')
const iex = require('iexcloud_api_wrapper')
const iexAPI = require('./router/iex-api');
const app = express();
const http = require('http').Server(app);
const socketIO = require('socket.io')(http);
const cors = require('cors')
const PORT = process.env.port || 4001
let corsOptions = {
  origin: `http://localhost:${PORT}/*`
}

app.use(cors())
// Attaching middlewares the ExpressJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Adding the IEXAPI route
app.use('/', iexAPI);

// Starting the Server
http.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
})

let interval;
socketIO.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    IEXCloud.reducedQueryAll((r) => {
      socket.emit('stock update', r)
    })
  }, 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
