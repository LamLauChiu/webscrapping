const express = require('express')
const cors = require('cors')
const app = express()
const yahooFinance = require('yahoo-finance')
var schedule = require('node-schedule');
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

const functions = require('firebase-functions');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://familyinvestment-f8cf1.firebaseio.com"
});

var db = firebase.database();
//var ref = db.ref("portfolio-list");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

//https://www.oxxostudio.tw/articles/201907/firebase-nodejs-realtime-database.html
//var portfolioListpush = db.ref("portfolio-list");
// portfolioListpush.push(
//   { COST: '6.22',
//   PRICE_PER_UNIT: '8.84',
//   STOCK_NAME: 'Test',
//   STOCK_NUM: '1234',
//   UNIT: '60000',
//   SYMBOL: '3883.HK',
//   STATUS: 'close'
//   }
// );


var corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  

const port = process.env.PORT || 5001; 
// app.use(cors(corsOptions))
app.use(cors())
app.listen(port, () => {
    console.log(`Server started port at: ${port}!`)
})


app.route('/api/get').get(function (req, res) {
  res.json({'ABC':'123'});
});

// //https://www.npmjs.com/package/yahoo-finance
// //https://appdividend.com/2018/11/04/angular-7-crud-example-mean-stack-tutorial/
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

app.use('/updateAll/getQuotesBySymbol', getQuotesBySymbol );
function getQuotesBySymbol( req, res ){
      var data;
      var portfolioList = db.ref("portfolio-list").orderByChild("STATUS").equalTo('active');
      portfolioList.once("value", function(snapshot) {
        data = snapshot.val();
        //console.log(snapshot.val());
         //https://zellwk.com/blog/looping-through-js-objects/
        for (let [uid, dataValue ] of Object.entries(data)) {
          //console.log(`${key}: ${value}`);
          //console.log(uid);
          for (let [key, value] of Object.entries(data[uid])) {
            //console.log(`${key}: ${value}`);
            if( key === "SYMBOL" ){
              getMarketPrice(value, uid);
              //console.log( "previousClose:"+ previousClose);
            }
          }
        }
      });
};


/*
scheduleCron:
https://www.cnblogs.com/zhongweiv/p/node_schedule.html


* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/
function scheduleCronstyle(){
  schedule.scheduleJob('5 * * * * *', function(){
      console.log('scheduleCronstyle:' + new Date());
      var data;
      var portfolioList = db.ref("portfolio-list").orderByChild("STATUS").equalTo('active');

      portfolioList.once("value", function(snapshot) {
        data = snapshot.val();
        //console.log(snapshot.val());
         //https://zellwk.com/blog/looping-through-js-objects/
        for (let [uid, dataValue ] of Object.entries(data)) {
          //console.log(`${key}: ${value}`);
          //console.log(uid);
          for (let [key, value] of Object.entries(data[uid])) {
            //console.log(`${key}: ${value}`);
            if( key === "SYMBOL" ){
              getMarketPrice(value, uid);
              //console.log( "previousClose:"+ previousClose);
            }
          }
        }
      });
  }); 
}

function getMarketPrice(value, uid){
  //console.log(value);
  yahooFinance.quote({
    symbol: value,
    modules: [ 'price','summaryDetail' ] // see the docs for the full list
  }, function (err, quotes) {
    //res.json(quotes);
    //console.log(quotes);
    for (let [type, objectValue ] of Object.entries(quotes)) {
        //console.log(`${key}: ${value}`);
        //console.log(type);
        for (let [key, value] of Object.entries(quotes[type])) {
          //console.log(`${key}: ${value}`);
          if( key === 'regularMarketPrice'){
            updatePortfolioStockPrice(uid, value);
          }
        }
      }
  });
}

function updatePortfolioStockPrice(uid, regularMarketPrice){
  console.log( "uid: " + uid);
  console.log( "regularMarketPrice: " + regularMarketPrice);
  var portfolioListById = db.ref('portfolio-list/'+ uid );
  portfolioListById.update({
    REGULAR_MARKET_PRICE : regularMarketPrice
  });
  console.log( "updated.");
}


scheduleCronstyle();
exports.app = functions.https.onRequest(app);

//https://www.codeinwp.com/blog/best-nodejs-hosting/#Heroku

//https://anidiots.guide/other-guides/hosting-on-glitch