const express = require('express');
const app = express();
const fetch = require('node-fetch');
global.fetch = require("node-fetch");
const token = process.env.IEX; 

app.use(express.static('public'))

document.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        const symbol = document.getElementById("ticker-input").value;
        //check if the symbol is not blank
        console.log("testing out the IEX call from this file");
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`)
            .then((response) => response.json())
            .then(data => {
                document.getElementById("current-price-output").innerHTML=data.iexClose;
            });

        //Advanced Stats -- 
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/advanced-stats?token=${token}`)
            .then((response) => response.json())
            .then(data => {
                document.getElementById("ev-to-rev").innerHTML=data.enterpriseValueToRevenue;
                document.getElementById("price-to-sales").innerHTML=data.priceToSales;
                document.getElementById("peg-ratio").innerHTML=data.pegRatio;
                document.getElementById("beta").innerHTML=data.beta;
                document.getElementById("profit-margin").innerHTML=data.profitMargin;
                document.getElementById("rev-per-employee").innerHTML=data.revenuePerEmployee;
            });
    }
})


//DOM event listener -- 

// const path = require('path')
// const PORT = process.env.PORT || 8000; 

// app.get('/', (request, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'))
// })

// app.listen(PORT, () => {
//     console.log(__dirname);
//     console.log(`listening on ${PORT}`)
// })



// Fetch example with header
// fetch('www.example.net', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'text/plain',
//     'X-My-Custom-Header': 'value-v',
//     'Authorization': 'Bearer ' + token,
//   }
// });