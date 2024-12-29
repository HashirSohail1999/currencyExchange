import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

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
    //  freecurrencyapi.currencies().then(response => {
    //     console.log(response);
    //     res.send(`<pre>${JSON.stringify(response, null, 2)}</pre> `);
    // });
    res.send('Hello World');
});

app.get('/api/data', (req, res) => {
    const { base_currency, currencies } = req.query;
    console.log("request recieved = "+`${base_currency+" "+ currencies}`);
      // Send a JSON response with the request parameters
  res.json({
    base_currency: base_currency,
    currencies: currencies
  });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});