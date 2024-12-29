import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Access your API keys using process.env
const apiKey = process.env.FREECURRENCYAPI_KEY;
const freecurrencyapi = new Freecurrencyapi(apiKey);
app.get('/', (req, res) => {

    // freecurrencyapi.latest({
    //     base_currency: 'EUR',
    //     currencies: 'USD'
    // }).then(response => {
    //     console.log(response);
    //     res.send(`<pre>${JSON.stringify(response, null, 2)}</pre> `);
    // });
    res.send(`hello world`)
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});