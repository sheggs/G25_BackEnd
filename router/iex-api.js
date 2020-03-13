// Importing libraries.
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const IEXCloud = require('../iexcloud/iexcloud')

// This route will get all quotes for the pre-determined stocks. @Mahdi
router.get('/api/quote', (request,response) => {
    // Call the IEXCloud object to get all the stcok query
    IEXCloud.reducedQueryAll((resp) => {
        // Send the JSON results to the client.
        response.send(resp)
    })
})



// These are direct routes that will obtain straight from IEXCloud. 

// This route will get the stock quote. @Mahdi
router.get('/api/quote/:stock',(request,response) => {
    // Will call the IEXCloud object. This retrieves the stock quotes for the :stock stated in the URL.
    IEXCloud.getStockQuote(request.params.stock, (r) => {
        // Send the JSON results straight to the client
        response.send(r)
    })
})

// This route will return the balance sheet of a stock. @Mahdi
router.get('/api/balance-sheet/:stock',(request,response) => {
    // Will call the IEXCloud object which will retreive the balance sheet for a selected stock.
    IEXCloud.getStockBalanceSheet(request.params.stock, (r) => {
        // Send the JSON results to the client.
        response.send(r)
    })
})

// Exports the router module for the server.js to use.
module.exports = router