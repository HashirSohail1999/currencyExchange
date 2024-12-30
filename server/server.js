import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Create a new Pool instance to connect to the database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for Neon
  });
// Enable CORS for all routes
app.use(cors({
    origin: "*"
        // 'https://currency-exchange-client-gamma.vercel.app',
        // vercel.app
        // 'http://localhost:3000',
        // 'http://localhost:5173',
    ,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Access your API keys using process.env
const apiKey = process.env.FREECURRENCYAPI_KEY;
const freecurrencyapi = new Freecurrencyapi(apiKey);
//Homepage nothing to see here
app.get('/', (req, res) => {
    res.send(`${"hello"}`);
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
 // API Route to fetch logs
app.get('/api/logs', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM api_logs ORDER BY id DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error From get' });
    }
  });
  
  // API Route to insert a new log
  app.post('/api/logs', async (req, res) => {
    const { request, response } = req.body;
  
    if (!request || !response) {
      return res.status(400).json({ error: 'Invalid input' });
    }
  
    try {
      await pool.query('INSERT INTO api_logs (request, response) VALUES ($1, $2)', [
        request,
        response,
      ]);
      res.status(201).json({ message: 'Log created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error From post' });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});