const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./router/userRoutes');
const meetupRoutes = require('./router/meetupRoutes');
// Import other route files as needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect('mongodb+srv://Fatimah:lzo07Axq3Uug9w8r@convene.w2ouvol.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/meetups', meetupRoutes);

// Define endpoint to return API Render URL
app.get('/api-url', (req, res) => {
  const apiUrl = 'https://tracking-convene.onrender.com/api/v1';
  res.json({ apiUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
