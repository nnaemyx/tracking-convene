const express = require('express');
const bodyParser = require('body-parser');
const meetupRoutes = require('./router/meetupRoutes');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mount meetup routes
app.use('/api/v1/meetups', meetupRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
