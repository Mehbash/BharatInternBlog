const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Post = require('./models/post');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my-blog', { useNewUrlParser: true, useUnifiedTopology: true });

// API Routes
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.get('/api/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    const newPost = new Post({ title, content });
    await newPost.save();
    res.json(newPost);
});

app.put('/api/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    res.json({ message: 'Post updated successfully' });
});

app.delete('/api/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
});

// API Route to delete all posts
app.delete('/api/posts', async (req, res) => {
    await Post.deleteMany({});
    res.json({ message: 'All posts deleted successfully' });
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/create.html'));
});

app.post('/create', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and content are required.');
    }

    const newPost = new Post({ title, content });
    await newPost.save();
    res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render(path.join(__dirname, '/views/edit.html'), { post });
});

app.post('/edit/:id', async (req, res) => {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
