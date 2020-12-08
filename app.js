const express = require('express');
const app = express();
const fetch = require('node-fetch');
global.fetch = require("node-fetch");
const token = process.env.IEX; 
const input = "TSLA";
app.use(express.static('public'))

document.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        //check if the input is not blank
        //pass the input into the first API call to get the stock quote data
         
    }
})

console.log("testing out the IEX call from this file");
fetch(`https://cloud.iexapis.com/stable/stock/${input}/quote?token=${token}`)
        .then((response) => response.json())
        .then(data => console.log(data));
//DOM event listener -- 

//getting a stock price target
// /stock/{symbol}/price-target





// app.get(`/stock/${symbol}/price-target`, (request, response) => {
//     fetch(`https://cloud.iexapis.com/stable/stock/${input}/price-target?token=${token}`)
//         .then((response) => response.json())
//         .then(data => console.log(data));
// });

// const path = require('path')
// const PORT = process.env.PORT || 8000; 

// app.get('/', (request, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'))
// })

// app.listen(PORT, () => {
//     console.log(__dirname);
//     console.log(`listening on ${PORT}`)
// })