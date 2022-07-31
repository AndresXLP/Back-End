import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import connectDb from './config/db.js';
import userRoutes from './routes/users.js';
import raffleRoutes from './routes/raffle.js';
import notFoundMiddleware from './middleware/notfound.js';

const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

//Routes
app.use('/', userRoutes);
app.use('/', raffleRoutes);

//Error Handling
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
