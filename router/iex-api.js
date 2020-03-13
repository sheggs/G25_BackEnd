const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const IEXCloud = require('../iexcloud/iexcloud')

router.get('/api/prices/:stock',(request,response) => {
    IEXCloud.getStockQuote(request.params.stock, (r) => {
        response.send(r)
    })
})

module.exports = router