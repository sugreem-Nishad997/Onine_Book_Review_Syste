import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/user_routes.js';
import bookRoutes from './routes/book_routes.js';
import reviewRoutes from './routes/review_routes.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({limit:'40kb'}));
app.use(express.urlencoded({limit:'40kb', extended:true}));

app.use(userRoutes);
app.use(bookRoutes);
app.use(reviewRoutes);

// app.post("/:id",authMiddleware,addReview);
const dbUrl = process.env.MONGO_URL;
const port = 8080;

const connectToDB = async() => {
    await mongoose.connect(dbUrl);
    console.log("Connect to db");
}

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Unexpected server error", error: err.message });
});


app.listen(port,(req, res, next)=> {
    console.log('app is listenting at 8080');
    connectToDB();
    
})