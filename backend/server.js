const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/user');

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//ROUTES
app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB, listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
