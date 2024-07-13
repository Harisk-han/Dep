const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const postRoutes = require('./routes/posts');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.redirect('/posts');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
