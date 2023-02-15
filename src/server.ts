import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

interface User {
    id:number;
  name: string;
  email: string;
  dob: string;
}

const app = express();

app.use(bodyParser.json());

// In-memory storage of users
let users: User[] = [];

app.get('/', (req: Request, res: Response) => {
   
  
    return res.status(201).json("Welcome");
  });

// Route to add a new user
app.post('/users', (req: Request, res: Response) => {
    const {id, name, email, dob } = req.body;
  
    if (!name || !email) {
      return res.status(400).send('Name and email are required.');
    }
  
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      dob
    };
  
    users.push(newUser);
  
    return res.status(201).json(newUser);
  });

// Route to get all users
app.get('/users', (req: Request, res: Response) => {
  return res.json(users);
});

// Route to get a specific user
app.get('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send('User not found.');
  }

  return res.json(user);
});

// Route to update a specific user
app.put('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).send('User not found.');
  }

  const { name, email, dob } = req.body;

  if (!name || !email) {
    return res.status(400).send('Name and email are required.');
  }

  const updatedUser: User = {
    id,
    name,
    email,
    dob
  };

  users[userIndex] = updatedUser;

  return res.json(updatedUser);
});

// Route to delete a specific user
app.delete('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).send('User not found.');
  }

  users.splice(userIndex, 1);

  return res.sendStatus(204);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;
