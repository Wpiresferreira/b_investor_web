let stockQuote;

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cmo6he1r01qj3mal97u0cmo6he1r01qj3mal97ug"
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.quote("AAPL", (error, data, response) => {
//  console.log(data)
});

//Company profile2
finnhubClient.companyProfile2({'symbol': 'AAPL'}, (error, data, response) => {
    console.log(data)
    console.log(data.CompanyProfile2)
});