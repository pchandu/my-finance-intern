const express = require('express');
const app = express();
const fetch = require('node-fetch');
global.fetch = require("node-fetch");
const token = process.env.IEX; 
const symbol = "TSLA";
app.use(express.static('public'))

document.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        //grab symbol from symbol tag
        //check if the symbol is not blank
        //pass the symbol into the first API call to get the stock quote data
        console.log("testing out the IEX call from this file");
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            console.log(data.close)
        });


        //Advanced Stats -- 
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/advanced-stats?token=${token}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            console.log(data.enterpriseValueToRevenue)
            console.log(data.priceToBook)
            console.log(data.priceToSales)
            console.log(data.beta)
            console.log(data.profitMargin)
        });
    }
})


//DOM event listener -- 

//getting a stock price target
// /stock/{symbol}/price-target





// app.get(`/stock/${symbol}/price-target`, (request, response) => {
//     fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/price-target?token=${token}`)
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