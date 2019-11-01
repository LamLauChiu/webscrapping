const functions = require('firebase-functions');

// exports.bigben = functions.https.onRequest((req, res) => {
//   const hours = (new Date().getHours() % 12) + 1  // London is UTC + 1hr;
//   res.status(200).send(`<!doctype html>
//     <head>
//       <title>Time</title>
//     </head>
//     <body>
//       ${'BONG '.repeat(hours)}
//     </body>
//   </html>`);
// });

const express = require('express');

const app = express();
app.get('/get',(req, res)=>{
  res.status(200).send(`${Date.now()}`);
});

exports.app = functions.https.onRequest(app);