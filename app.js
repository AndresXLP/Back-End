require('dotenv').config();

const express = require('express');
const connectDb = require('./db/db.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

//Routes
const userRoutes = require('./routes/users');
const raffleRoutes = require('./routes/raffle');
app.use('/', userRoutes);
app.use('/', raffleRoutes);

//Error Handling
const notFoundMiddleware = require('./middleware/notfound');
app.use(notFoundMiddleware);

//Initialize
const start = async () => {
  try {
    await connectDb(URI);
    console.log('Conected to DB');
    app.listen(PORT, () => console.log(`Listening on port`, +PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
