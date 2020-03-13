const Axios = require('axios')
const SANDBOX_WEBSITE = 'https://sandbox.iexapis.com/stable'
const PRODUCTION_WEBSITE = 'https://iexapis.com/stable'
const SANDBOX_KEY = 'Tpk_07373ee455894972bea090981b4284c7'
const PRODUCTION_KEY = 'pk_9a501456467c4257b85aeb036b0b1ad5'
const API_KEY = SANDBOX_KEY
const BASE_URL = 'https://sandbox.iexapis.com/stable'
let iexcloud = {
    getStockQuote: async function (stock,response) {
        try {
            const resp = await Axios.get(BASE_URL + "/stock/" + stock + "/quote/?token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            response(undefined)
        }
    },
    // Only use for production
    getProductionStockLogo: async function(stock,response){
        try {
            const resp = await Axios.get(BASE_URL + "/stock/" + stock + "/logo/?token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            response(undefined)
        }
    },
    getStockBalanceSheet: async function(stock,response){
        try {
            const resp = await Axios.get(BASE_URL + "/stock/" + stock + "/balance-sheet/?token=" + API_KEY)
            response(resp.data)
        } catch (err) {
            response(undefined)
        }
    }

}

module.exports = iexcloud