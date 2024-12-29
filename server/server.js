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

//Homepage nothing to see here
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/currencies', (req, res) => {
    console.log(`request recieved for currency list`)
     freecurrencyapi.currencies().then(response => {
        res.send(response);
    });
});

app.get('/api/data', (req, res) => {
    const { base_currency, target_currency } = req.query;
    //clg that the request is recieved
    console.log("request recieved = "+`${base_currency+" "+ target_currency}`);
      freecurrencyapi.latest({
            base_currency: `${base_currency}`,
            currencies: `${target_currency}`
        }).then(response => {
            console.log(response);
            res.send(response);
        });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});