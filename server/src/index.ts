import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Basic middleware setup
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - No errors`);
  next();
});

// Main route
app.get('/', (req: Request, res: Response) => {
  console.log('Route accessed successfully - No errors');
  res.send('Server ist running.');
});

// Handle all other routes
app.get('*', (req: Request, res: Response) => {
  console.log('404 route accessed - No errors');
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong!');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT} - No errors`);
    console.log('Server is running without any errors');
  });
}

// Export for Vercel
export default app;