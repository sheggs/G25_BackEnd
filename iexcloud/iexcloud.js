
// @Mahdi(Sheggs)
// Importing libraries.
const Axios = require('axios')

// API CONFIGURATION
const SANDBOX_WEBSITE = 'https://sandbox.iexapis.com/stable'
const PRODUCTION_WEBSITE = 'https://iexapis.com/stable'
const SANDBOX_KEY = 'Tpk_07373ee455894972bea090981b4284c7'
const PRODUCTION_KEY = 'pk_9a501456467c4257b85aeb036b0b1ad5'
const API_KEY = SANDBOX_KEY
const BASE_URL = 'https://sandbox.iexapis.com/stable'

// STOCKS THAT WE WILL BE USING. This is temporary this must be retrieved from the admin page.
const STOCK_LIST = [
    ["AAPL","apple.png"],
    ["AMZN","amazon.png"],
    ["MSFT","microsoft.png"],
]

/* The Logo Bank will have all the logos for each company. All the file name should be relative to those stored in the public folder in
the front end */

// The JSON object that will be storing the 
let recent_query = {}

// This object will store all the IEXCloud functions
let iexcloud = {
    getAllLogo: function(response){
        // Store all the logo data inside this json object
        let logos = {}
        // Loop through all the companies
        for(let i = 0; i<STOCK_LIST.length;i++){
            logos[STOCK_LIST[i][0]] = STOCK_LIST[i][1]
        }
        response(logos)
    },
    // This function will retireve the company logo.
    getLogo : function(name,response){
        let found = false;
        for(let i = 0; i<STOCK_LIST.length;i++){
          if(STOCK_LIST[i][0]==name){
           response(STOCK_LIST[i][1])   
           found = true;
          }
        }
        if(found == false){
            response("Not Found")
        }

    },
    // This function will retireve all the data stored by the server.
    reducedQueryAll: async function (response) {
        // Returns the JSON object that has all the stocks stored.
        response(recent_query)
    },
    // This will filter the data stored by the server to get a specified stock
    reducedQuery: async function (stock, response) {
        // Returns the stored specified stock
        response(recent_query[stock])
    },
    // These are direct API requests to IEXCloud

    // Getting the stock quote from IEXCloud.
    getStockQuote: async function (stock, response) {
        // Trying to see if we get an 404 response
        try {
            // Return the JSON response from IEXCloud
            const resp = await Axios.get(BASE_URL + "/stock/" + stock + "/quote/?token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            // An error occured so return undefined
            response(undefined)
        }
    },
    getBatchStockQuotes: async function (stocks, response) {
        try {
            const resp = await Axios.get(BASE_URL + "/stock/market/batch?symbols=" + stocks.join() + "&types=quote&token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            response(undefined)
        }
    },
    // Only use for production. Gets the logo for the company.
    getProductionStockLogo: async function (stock, response) {
        // Trying to see if we get an 404 response
        try {
            // Return the JSON response from IEXCloud
            const resp = await Axios.get(BASE_URL + "/stock/" + stock + "/logo/?token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            // An error occured so return undefined
            response(undefined)
        }
    },
    // Get the stock balance sheet for a specified company.
    getStockBalanceSheet: async function (stock, response) {
        // Trying to see if we get an 404 response
        try {
            // Return the JSON response from IEXCloud
            const resp = await Axios.get(BASE_URL + "/stock/" + stock + "/balance-sheet/?token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            // An error occured so return undefined
            response(undefined)
        }
    },
}

// Get stock data every 10 seconds and store locally
setInterval(() => {
    // Loop through every single company
    for (let i = 0; i < STOCK_LIST.length; i++) {
        // Get the stock quote for each company and store it in the recent_query JSON object.
        iexcloud.getStockQuote(STOCK_LIST[i][0], (resp) => {
            recent_query[STOCK_LIST[i][0]] = resp
        })
    }

}, 10000)


// Returns the JSON object that contains all the functions.
module.exports = iexcloud