const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./router/userRoutes');
const meetupRoutes = require('./router/meetupRoutes');
// Import other route files as needed

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
