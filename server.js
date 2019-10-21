const express = require('express')
const cors = require('cors')
const app = express()
const yahooFinance = require('yahoo-finance')
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  
app.use(cors(corsOptions))

app.listen(8000, () => {
    console.log('Server started!')
})

app.route('/api/get').get(function (req, res) {
  res.json({'ABC':'123'});
});

//https://www.npmjs.com/package/yahoo-finance
//https://appdividend.com/2018/11/04/angular-7-crud-example-mean-stack-tutorial/
app.route('/api/getQuotesBySymbol/:symbol').get(function (req, res) {
  let symbol = req.params.symbol;
  yahooFinance.quote({
    symbol: symbol,
    modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
  }, function (err, quotes) {
    res.json(quotes);
    //console.log(quotes);
  });
});
