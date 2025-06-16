app.use(session({
  secret: 'your_secret_key', // use .env in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/sessionAuth',
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true, // can't access cookie in JS (protects against XSS)
    secure: false,  // true in HTTPS
  }
}));

const users = [
  { id: 1, username: "anish", password: "1234" },
];


// loginn session

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  req.session.userId = user.id;
  res.json({ message: "Logged in" });
});


//logout session
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});


//cookie

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); // parses cookies

// Set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'anish', { maxAge: 3600000, httpOnly: true }); // 1 hour
  res.send('Cookie set!');
});

// Read cookie
app.get('/get-cookie', (req, res) => {
  const user = req.cookies.username;
  res.send(`Hello ${user}`);
});

// Delete cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie cleared');
});
