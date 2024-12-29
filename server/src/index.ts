import express, { Request, Response } from 'express';

const app = express();

// Basic middleware setup
app.use(express.json());

// Main route
app.get('/', (req: Request, res: Response) => {
  res.send('Server ist running.');
});

// Handle all other routes
app.get('*', (req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}

// Export for Vercel
export default app;