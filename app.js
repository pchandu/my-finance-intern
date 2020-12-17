    const IEX = "pk_798e656bccd44e809f829740f04ed86a"; 
    const SS = "9894333eef0d3acad87d56495d3f07c177763f2e"; //free api key. get your own plz
    
    document.addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            const symbol = document.getElementById("ticker-input").value;
            if(symbol.length === 0 || symbol.length > 4){
                document.getElementById("company-name").innerHTML="INVALID TICKER";
                document.getElementById("ev-to-rev").innerHTML="INVALID";
                document.getElementById("price-to-sales").innerHTML="INVALID";
                document.getElementById("peg-ratio").innerHTML="INVALID";
                document.getElementById("beta").innerHTML="INVALID";
                document.getElementById("profit-margin").innerHTML="INVALID";
                document.getElementById("d-to-e").innerHTML="INVALID";
                document.getElementById("rev-per-employee").innerHTML="INVALID";
                document.getElementById("avg-10day-vol").innerHTML="INVALID";
                document.getElementById("avg-30day-vol").innerHTML="INVALID";
                document.getElementById("high-pt").innerHTML="INVALID";
                document.getElementById("avg-pt").innerHTML="INVALID";
                document.getElementById("low-pt").innerHTML="INVALID";
            } else {
            //Social Sentiment Data
            //grabbing industry id
                    fetch(`https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/stocks/${symbol.toUpperCase()}/`, 
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Token ${SS}`
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        //grabbing industry sentiment data
                        fetch(`https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/industries/${data.industry_id}/sentiment/daily/`, 
                        {
                            headers: {
                                Accept: "application/json",
                                Authorization: `Token ${SS}`
                            }
                        })
                        .then(res => res.json())
                        .then(industryData => {
                            //grabbing sentiment data and making chart
                            fetch(`https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/stocks/${symbol.toUpperCase()}/sentiment/daily/`, 
                            {
                                headers: {
                                    Accept: "application/json",
                                    Authorization: `Token ${SS}`
                                }
                            })
                            .then(res => res.json())
                            .then(data => {
                                var ctx = document.getElementById('myChart').getContext('2d');
                                var chart = new Chart(ctx, {
                                    // The type of chart we want to create
                                    type: 'line',
                                    // The data for our dataset
                                    data: {
                                        labels: [
                                            `${data[0].date}`, `${data[1].date}`, `${data[2].date}`, 
                                            `${data[3].date}`, `${data[4].date}`, `${data[5].date}`, 
                                            `${data[6].date}`, `${data[7].date}`],
                                        datasets: [
                                            {
                                                label: 'Stock Sentiment Activity',
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                borderColor: 'rgb(106,45,92)',
                                                yAxisID: 'A',
                                                data: [`${data[0].activity}`, `${data[1].activity}`, `${data[2].activity}`, 
                                                `${data[3].activity}`, `${data[4].activity}`, `${data[5].activity}`, 
                                                `${data[6].activity}`, `${data[7].activity}`]
                                            },
                                            {
                                                label: 'Stock Sentiment Score',
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                borderColor: 'rgb(255,84,118)',
                                                yAxisID: 'B',
                                                data: [`${data[0].score}`, `${data[1].score}`, `${data[2].score}`, 
                                                `${data[3].score}`, `${data[4].score}`, `${data[5].score}`, 
                                                `${data[6].score}`, `${data[7].score}`]
                                            },
                                            {
                                                label: 'Industry Sentiment Activity',
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                borderColor: 'rgb(29,58,20)',
                                                yAxisID: 'A',
                                                data: [`${industryData[0].activity}`, `${industryData[1].activity}`, `${industryData[2].activity}`, 
                                                `${industryData[3].activity}`, `${industryData[4].activity}`, `${industryData[5].activity}`, 
                                                `${industryData[6].activity}`, `${industryData[7].activity}`]
                                            },
                                            {
                                                label: 'Industry Sentiment Score',
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                borderColor: 'rgb(130,212,187)',
                                                yAxisID: 'B',
                                                data: [`${industryData[0].score}`, `${industryData[1].score}`, `${industryData[2].score}`, 
                                                `${industryData[3].score}`, `${industryData[4].score}`, `${industryData[5].score}`, 
                                                `${industryData[6].score}`, `${industryData[7].score}`]
                                            },
                                        ]
                                    },

                                    // Configuration options go here
                                    options: {
                                        scales: {
                                            xAxes: [{
                                                gridLines: {
                                                    display:false
                                                }
                                            }],
                                            yAxes: [
                                                {
                                                    id: 'A',
                                                    type: 'linear',
                                                    position: 'left',
                                                    scaleLabel:{
                                                        display: true,
                                                        labelString: 'Activity'
                                                    },
                                                    gridLines: {
                                                        display:false
                                                    }
                                                }, 
                                                {
                                                    id: 'B',
                                                    type: 'linear',
                                                    position: 'right',
                                                    scaleLabel:{
                                                        display: true,
                                                        labelString: 'Score'
                                                    },
                                                    gridLines: {
                                                        display:false
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                });
                            })
                        })
                    })
                    //end of sentiment data fetching and charting

            fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX}`)
                .then((response) => response.json())
                .then(data => {
                    document.getElementById("current-price-output").innerHTML=`$${data.iexClose}`;
                });
            //Advanced Stats -- 
            fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/advanced-stats?token=${IEX}`)
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
            fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${IEX}`)
                .then((response) => response.json())
                .then(data => {
                    document.getElementById("avg-10day-vol").innerHTML=data.avg10Volume;
                    document.getElementById("avg-30day-vol").innerHTML=data.avg30Volume;
                    document.getElementById("company-name").innerHTML=data.companyName;
                });

            //Analyst Recommendations -- 
            fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/recommendation-trends?token=${IEX}`)
                .then((response) => response.json())
                .then(data => {
                    document.getElementById("buy-rating-body").innerHTML=data[data.length-1].ratingBuy + data[data.length-1].ratingOverweight;
                    document.getElementById("hold-rating-body").innerHTML=data[data.length-1].ratingHold;
                    document.getElementById("sell-rating-body").innerHTML=data[data.length-1].ratingSell + data[data.length-1].ratingUnderweight;
                    document.getElementById("#analysts").innerHTML=
                        data[data.length-1].ratingSell + data[data.length-1].ratingUnderweight + data[data.length-1].ratingBuy + data[data.length-1].ratingOverweight
                        + data[data.length-1].ratingHold;
                });

            //Price Targets
            fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/price-target?token=${IEX}`)
                .then((response) => response.json())
                .then(data => {
                    document.getElementById("high-pt").innerHTML=`$${data.priceTargetHigh.toFixed(0)}`;
                    document.getElementById("avg-pt").innerHTML=`$${data.priceTargetAverage.toFixed(0)}`;
                    document.getElementById("low-pt").innerHTML=`$${data.priceTargetLow.toFixed(0)}`;
                });
        }
        }
    })