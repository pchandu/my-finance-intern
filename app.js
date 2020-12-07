const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
const token = ""; // how do we do this again? something similar to what's above I guess?
app.use(express.static('public'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})

//getting a stock price target
// /stock/{symbol}/price-target
app.get(`/stock/${symbol}/price-target`, (request, response) => {
    fetch(`https://cloud.iexapis.com/stable/stock/${request.body}/price-target?token=${token}`)
        .then((response) => {
            console.log(response)
            return response;
        });
});

// example route
// // create route to get single book by its isbn
// app.get('/books/:isbn', (request, response) => {
//   // make api call using fetch
//   fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${request.params.isbn}&format=json&jscmd=data`)
//   .then((response) => {
//       return response.text();
//   }).then((body) => {
//       let results = JSON.parse(body)
//       console.log(results)   // logs to server
//       response.send(results) // sends to frontend
//     });
// });

var axios = require("axios").default;