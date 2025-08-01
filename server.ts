import express, { Request, Response } from 'express'; // Using POSTMAN
import { ParamsDictionary } from 'express-serve-static-core';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
const users: { username: string; password: string }[] = [];

// Register Endpoint
app.post(
  '/register',
  (req: Request<ParamsDictionary, any, { username: string; password: string }>, res: Response): void => {
    const { username, password } = req.body;

    if (users.find(user => user.username === username)) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully!' });
  }
);

// Login Endpoint
app.post(
  '/login',
  (req: Request<ParamsDictionary, any, { username: string; password: string }>, res: Response): void => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const token = `fake-token-for-${username}`;
    res.json({ message: 'Login successful!', token });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Start Server
// npx ts-node server.ts
// Close Server control + c