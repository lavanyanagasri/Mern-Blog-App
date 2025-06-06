const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = 'your_jwt_secret'; // Replace with .env in production

const uploadMiddleware = multer({ dest: 'uploads/' });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// MongoDB connection
mongoose.connect('mongodb+srv://lavanyanagasri:lavanyanagasri@cluster1.pp2m8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.status(200).json({ message: 'User registered', username: userDoc.username });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) return res.status(400).json('User not found');

  const passOk = await bcrypt.compare(password, userDoc.password);
  if (!passOk) return res.status(400).json('Wrong credentials');

  const token = jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '7h' });
  res.cookie('token', token).json({ id: userDoc._id, username });
});

// Profile
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(401).json('Invalid token');
    res.json(info);
  });
});

// Logout
app.post('/logout', (req, res) => {
  res.cookie('token', '').json('Logged out');
});

// Create Post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File not provided" });

    const { originalname, path } = req.file;
    const ext = originalname.split('.').pop();
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(401).json({ error: "Invalid token" });

      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      res.json(postDoc);
    });
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get Posts
// Get Posts
app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', ['username'])  // Ensure it populates 'username' from User model
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (err) {
    console.error('Failed to fetch posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


// Get Single Post
// Get Single Post
app.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', ['username']);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Failed to fetch post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
