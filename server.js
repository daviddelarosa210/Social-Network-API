process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Additional error handling if needed
});

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const thoughtRoutes = require('./routes/thought-routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Add this route handler for the root path ("/")
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
