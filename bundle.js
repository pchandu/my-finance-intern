/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*
  !*** ./app.js ***!
  \****************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ \"./keys.js\");\n// const fetch = require('node-fetch');\n// global.fetch = require(\"node-fetch\");\n// const IEXtoken = process.env.IEX; \n// const SStoken = process.env.SENTI;\n\nvar IEXtoken = \"sk_26d151b214a34fc3bef7ad9d7a47d636\";\nvar SStoken = \"e3eff2d2243dd84d557236156fa1b8d2692b2b7c\";\ndocument.addEventListener('keypress', function (e) {\n  if (e.key === 'Enter') {\n    var symbol = document.getElementById(\"ticker-input\").value;\n\n    if (symbol.length === 0 || symbol.length > 4) {\n      document.getElementById(\"company-name\").innerHTML = \"INVALID TICKER\";\n      document.getElementById(\"ev-to-rev\").innerHTML = \"INVALID\";\n      document.getElementById(\"price-to-sales\").innerHTML = \"INVALID\";\n      document.getElementById(\"peg-ratio\").innerHTML = \"INVALID\";\n      document.getElementById(\"beta\").innerHTML = \"INVALID\";\n      document.getElementById(\"profit-margin\").innerHTML = \"INVALID\";\n      document.getElementById(\"d-to-e\").innerHTML = \"INVALID\";\n      document.getElementById(\"rev-per-employee\").innerHTML = \"INVALID\";\n      document.getElementById(\"avg-10day-vol\").innerHTML = \"INVALID\";\n      document.getElementById(\"avg-30day-vol\").innerHTML = \"INVALID\";\n      document.getElementById(\"high-pt\").innerHTML = \"INVALID\";\n      document.getElementById(\"avg-pt\").innerHTML = \"INVALID\";\n      document.getElementById(\"low-pt\").innerHTML = \"INVALID\";\n    } else {\n      //check if the input is not blank\n      //pass the input into the first API call to get the stock quote data\n      //Social Sentiment Data\n      //grabbing industry id\n      fetch(\"https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/stocks/\".concat(symbol.toUpperCase(), \"/\"), {\n        headers: {\n          Accept: \"application/json\",\n          Authorization: \"Token \".concat(SStoken)\n        }\n      }).then(function (res) {\n        return res.json();\n      }).then(function (data) {\n        //grabbing industry sentiment data\n        fetch(\"https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/industries/\".concat(data.industry_id, \"/sentiment/daily/\"), {\n          headers: {\n            Accept: \"application/json\",\n            Authorization: \"Token \".concat(SStoken)\n          }\n        }).then(function (res) {\n          return res.json();\n        }).then(function (industryData) {\n          //grabbing sentiment data and making chart\n          fetch(\"https://cors-anywhere.herokuapp.com/https://socialsentiment.io/api/v1/stocks/\".concat(symbol.toUpperCase(), \"/sentiment/daily/\"), {\n            headers: {\n              Accept: \"application/json\",\n              Authorization: \"Token \".concat(SStoken)\n            }\n          }).then(function (res) {\n            return res.json();\n          }).then(function (data) {\n            var ctx = document.getElementById('myChart').getContext('2d');\n            var chart = new Chart(ctx, {\n              // The type of chart we want to create\n              type: 'line',\n              // The data for our dataset\n              data: {\n                labels: [\"\".concat(data[0].date), \"\".concat(data[1].date), \"\".concat(data[2].date), \"\".concat(data[3].date), \"\".concat(data[4].date), \"\".concat(data[5].date), \"\".concat(data[6].date), \"\".concat(data[7].date)],\n                datasets: [{\n                  label: 'Social Sentiment Activity',\n                  backgroundColor: 'rgba(0,0,0,0)',\n                  borderColor: 'rgb(106,45,92)',\n                  yAxisID: 'A',\n                  data: [\"\".concat(data[0].activity), \"\".concat(data[1].activity), \"\".concat(data[2].activity), \"\".concat(data[3].activity), \"\".concat(data[4].activity), \"\".concat(data[5].activity), \"\".concat(data[6].activity), \"\".concat(data[7].activity)]\n                }, {\n                  label: 'Social Sentiment Score',\n                  backgroundColor: 'rgba(0,0,0,0)',\n                  borderColor: 'rgb(255,84,118)',\n                  yAxisID: 'B',\n                  data: [\"\".concat(data[0].score), \"\".concat(data[1].score), \"\".concat(data[2].score), \"\".concat(data[3].score), \"\".concat(data[4].score), \"\".concat(data[5].score), \"\".concat(data[6].score), \"\".concat(data[7].score)]\n                }, {\n                  label: 'Industry Sentiment Activity',\n                  backgroundColor: 'rgba(0,0,0,0)',\n                  borderColor: 'rgb(29,58,20)',\n                  yAxisID: 'A',\n                  data: [\"\".concat(industryData[0].activity), \"\".concat(industryData[1].activity), \"\".concat(industryData[2].activity), \"\".concat(industryData[3].activity), \"\".concat(industryData[4].activity), \"\".concat(industryData[5].activity), \"\".concat(industryData[6].activity), \"\".concat(industryData[7].activity)]\n                }, {\n                  label: 'Industry Sentiment Score',\n                  backgroundColor: 'rgba(0,0,0,0)',\n                  borderColor: 'rgb(130,212,187)',\n                  yAxisID: 'B',\n                  data: [\"\".concat(industryData[0].score), \"\".concat(industryData[1].score), \"\".concat(industryData[2].score), \"\".concat(industryData[3].score), \"\".concat(industryData[4].score), \"\".concat(industryData[5].score), \"\".concat(industryData[6].score), \"\".concat(industryData[7].score)]\n                }]\n              },\n              // Configuration options go here\n              options: {\n                scales: {\n                  xAxes: [{\n                    gridLines: {\n                      display: false\n                    }\n                  }],\n                  yAxes: [{\n                    id: 'A',\n                    type: 'linear',\n                    position: 'left',\n                    scaleLabel: {\n                      display: true,\n                      labelString: 'Activity'\n                    },\n                    gridLines: {\n                      display: false\n                    }\n                  }, {\n                    id: 'B',\n                    type: 'linear',\n                    position: 'right',\n                    scaleLabel: {\n                      display: true,\n                      labelString: 'Score'\n                    },\n                    gridLines: {\n                      display: false\n                    }\n                  }]\n                }\n              }\n            });\n          });\n        });\n      }); //end of sentiment data fetching and charting\n\n      fetch(\"https://cloud.iexapis.com/stable/stock/\".concat(symbol, \"/quote?token=\").concat(IEXtoken)).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        document.getElementById(\"current-price-output\").innerHTML = \"$\".concat(data.iexClose);\n      }); //Advanced Stats -- \n\n      fetch(\"https://cloud.iexapis.com/stable/stock/\".concat(symbol, \"/advanced-stats?token=\").concat(IEXtoken)).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        // debugger\n        document.getElementById(\"ev-to-rev\").innerHTML = \"\".concat(data.enterpriseValueToRevenue, \"x\");\n        document.getElementById(\"price-to-sales\").innerHTML = \"\".concat(parseFloat(data.priceToSales.toFixed(2)), \"x\");\n        document.getElementById(\"peg-ratio\").innerHTML = \"\".concat(parseFloat(data.pegRatio).toFixed(2), \"x\");\n        document.getElementById(\"beta\").innerHTML = \"\".concat(parseFloat(data.beta).toFixed(2));\n        document.getElementById(\"profit-margin\").innerHTML = \"\".concat((data.profitMargin * 100).toFixed(3), \"%\");\n        document.getElementById(\"d-to-e\").innerHTML = \"\".concat(parseFloat(data.debtToEquity).toFixed(2));\n        document.getElementById(\"rev-per-employee\").innerHTML = \"$\".concat(data.revenuePerEmployee);\n      }); //Key Stats -- \n\n      fetch(\"https://cloud.iexapis.com/stable/stock/\".concat(symbol, \"/stats?token=\").concat(IEXtoken)).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        document.getElementById(\"avg-10day-vol\").innerHTML = data.avg10Volume;\n        document.getElementById(\"avg-30day-vol\").innerHTML = data.avg30Volume;\n        document.getElementById(\"company-name\").innerHTML = data.companyName;\n      }); //Analyst Recommendations -- \n\n      fetch(\"https://cloud.iexapis.com/stable/stock/\".concat(symbol, \"/recommendation-trends?token=\").concat(IEXtoken)).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        document.getElementById(\"buy-rating-body\").innerHTML = data[data.length - 1].ratingBuy + data[data.length - 1].ratingOverweight;\n        document.getElementById(\"hold-rating-body\").innerHTML = data[data.length - 1].ratingHold;\n        document.getElementById(\"sell-rating-body\").innerHTML = data[data.length - 1].ratingSell + data[data.length - 1].ratingUnderweight;\n        document.getElementById(\"#analysts\").innerHTML = data[data.length - 1].ratingSell + data[data.length - 1].ratingUnderweight + data[data.length - 1].ratingBuy + data[data.length - 1].ratingOverweight + data[data.length - 1].ratingHold;\n      }); //Price Targets\n\n      fetch(\"https://cloud.iexapis.com/stable/stock/\".concat(symbol, \"/price-target?token=\").concat(IEXtoken)).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        document.getElementById(\"high-pt\").innerHTML = \"$\".concat(data.priceTargetHigh.toFixed(0));\n        document.getElementById(\"avg-pt\").innerHTML = \"$\".concat(data.priceTargetAverage.toFixed(0));\n        document.getElementById(\"low-pt\").innerHTML = \"$\".concat(data.priceTargetLow.toFixed(0));\n      });\n    }\n  }\n}); // const path = require('path')\n// const PORT = process.env.PORT || 8000; \n// app.get('/', (request, res) => {\n//   res.sendFile(path.join(__dirname, './public/index.html'))\n// })\n// app.listen(PORT, () => {\n//     console.log(__dirname);\n//     console.log(`listening on ${PORT}`)\n// })\n// app.use(express.static('public'))\n\n//# sourceURL=webpack://my-finance-intern/./app.js?");

/***/ }),

/***/ "./keys.js":
/*!*****************!*
  !*** ./keys.js ***!
  \*****************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nvar keys = {\n  IEX: \"sk_26d151b214a34fc3bef7ad9d7a47d636\",\n  SENTI: \"e3eff2d2243dd84d557236156fa1b8d2692b2b7c\"\n}; // const IEXtoken = \"sk_26d151b214a34fc3bef7ad9d7a47d636\"; \n// const SStoken = \"e3eff2d2243dd84d557236156fa1b8d2692b2b7c\"\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (keys);\n\n//# sourceURL=webpack://my-finance-intern/./keys.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;