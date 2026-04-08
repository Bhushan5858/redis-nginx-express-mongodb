import express from "express";
import mongoose from "mongoose";
import productRoutes from './routes/product.routes'


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use('/products',productRoutes)

export default app;

