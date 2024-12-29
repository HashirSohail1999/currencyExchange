import express, { Request, Response } from 'express';

const app = express();

app.use('/', (req: Request, res: Response) => {
  res.send('Server ola running.');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
