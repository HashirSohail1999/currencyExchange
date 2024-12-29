require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Access your API keys using process.env
const apiKey = process.env.FREECURRENCYAPI_KEY;
const freecurrencyapi = new Freecurrencyapi(apiKey);
app.get('/', (req, res) => {
    freecurrencyapi.latest({
        base_currency: 'USD',
        currencies: 'EUR'
    }).then(response => {
        console.log(response);
        res.send(response+' Hello World!');
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});