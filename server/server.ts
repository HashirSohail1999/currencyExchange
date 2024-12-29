// server.ts
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'goodbye World!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});