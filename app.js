const fetch = require('node-fetch');
global.fetch = require("node-fetch");
const IEXtoken = process.env.IEX; 
const SStoken = process.env.SENTI

document.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        const symbol = document.getElementById("ticker-input").value;
        //check if the input is not blank
        //pass the input into the first API call to get the stock quote data
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEXtoken}`)
            .then((response) => response.json())
            .then(data => {
                document.getElementById("current-price-output").innerHTML=`$${data.iexClose}`;
            });
        //Advanced Stats -- 
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/advanced-stats?token=${IEXtoken}`)
            .then((response) => response.json())
            .then(data => {
                // debugger
                document.getElementById("ev-to-rev").innerHTML=`${data.enterpriseValueToRevenue}x`;
                document.getElementById("price-to-sales").innerHTML=`${parseFloat(data.priceToSales.toFixed(2))}x`;
                document.getElementById("peg-ratio").innerHTML=`${parseFloat(data.pegRatio).toFixed(2)}x`;
                document.getElementById("beta").innerHTML=`${parseFloat(data.beta).toFixed(2)}`;
                document.getElementById("profit-margin").innerHTML=`${(data.profitMargin * 100).toFixed(3)}%`;
                document.getElementById("d-to-e").innerHTML=`${parseFloat(data.debtToEquity).toFixed(2)}`;
                document.getElementById("rev-per-employee").innerHTML=`$${data.revenuePerEmployee}`;
            });
        //Key Stats -- 
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${IEXtoken}`)
            .then((response) => response.json())
            .then(data => {
                document.getElementById("avg-10day-vol").innerHTML=data.avg10Volume;
                document.getElementById("avg-30day-vol").innerHTML=data.avg30Volume;
            });

        
    }
})

function socialSentimentData(symbol) {
    const stock = symbol.toUpperCase();
    var url = `https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/stocks/${stock}/sentiment/daily/`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("Authorization", `Token ${SStoken}`);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        
        console.log(xhr.responseText);
    }};

    xhr.send();
}


// Kavout Score
// fetch(`https://cloud.iexapis.com/stable/time-series/PREMIUM_KAVOUT_KSCORE/${symbol}?token=${token}`)
//                 .then((response) => response.json())
//                 .then(data => {
//                     console.log(data)
//                 });
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

// app.use(express.static('public'))


// Fetch example with header
// fetch('www.example.net', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'text/plain',
//     'X-My-Custom-Header': 'value-v',
//     'Authorization': 'Bearer ' + token,
//   }
// });

// fetch(`https://socialsentiment.io/api/v1/stocks/${symbol}/sentiment/daily/`, 
//                 {
//                     method: 'GET',
//                     headers: {
//                             `Authorization: Token + ${token}`,
//                             'Accept': 'application/json',
//                     }
//                 })
//                 .then(res => {
//                     debugger
//                 });