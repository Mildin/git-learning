const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courseRoutes');  


dotenv.config({ path: 'D:/Connecting Mongodb with nodeJs/.env' });

const app = express();
app.use(express.json());

app.use(courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
