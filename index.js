const express = require('express');
const app = express();
const port = 8000;

let users = require('./MOCK_DATA.json'); // Importing mock data

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------- ROUTES ----------------------

// 1️⃣ Render user names as an HTML list
app.get('/users', (req, res) => {
  const html = `
    <h2>User List</h2>
    <ul>
      ${users.map(user => `<li>${user.full_name}</li>`).join('')}
    </ul>
  `;
  res.send(html);
});

// 2️⃣ Get all users as JSON
app.get('/api/users', (req, res) => {
  res.json(users);
});

// 3️⃣ Get users by gender
app.get('/api/users/:gender', (req, res) => {
  const gen = req.params.gender.toLowerCase();
  const filteredUsers = users.filter(user => user.gender.toLowerCase() === gen);

  if (filteredUsers.length > 0) {
    res.json(filteredUsers);
  } else {
    res.status(404).json({ message: 'No users found with that gender.' });
  }
});

// 4️⃣ POST - Add a new user (optional extension)
app.post('/api/users', (req, res) => {
  const newUser = req.body;
    console.log(newUser)
  if (!newUser.username || !newUser.full_name || !newUser.gender) {
    return res.status(400).json({ message: 'username, full_name, and gender are required.' });
  }

  users.push(newUser);
  res.status(201).json({ message: 'User added successfully.', user: newUser });
});

// 5️⃣ PUT - Update all users with a specific gender
app.put('/api/users/:gender', (req, res) => {
  const gen = req.params.gender.toLowerCase();
  const updateData = req.body;
  let updatedCount = 0;

  users = users.map(user => {
    if (user.gender.toLowerCase() === gen) {
      updatedCount++;
      return { ...user, ...updateData };
    }
    return user;
  });

  if (updatedCount > 0) {
    res.json({ message: `${updatedCount} user(s) updated.` });
  } else {
    res.status(404).json({ message: 'No users found with that gender.' });
  }
});

// 6️⃣ DELETE - Remove all users with a specific gender
app.delete('/api/users/:gender', (req, res) => {
  const gen = req.params.gender.toLowerCase();
  const originalCount = users.length;

  users = users.filter(user => user.gender.toLowerCase() !== gen);

  const deletedCount = originalCount - users.length;

  if (deletedCount > 0) {
    res.json({ message: `${deletedCount} user(s) deleted.` });
  } else {
    res.status(404).json({ message: 'No users found with that gender.' });
  }
});

// ---------------------- SERVER LISTEN ----------------------
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
