import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from 'path';

const __dirname = path.resolve();

console.log('__dirname', __dirname)
// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors({
  origin: ["https://tomato-virid.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// db connection
connectDB();


// routes
app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(__dirname, '/public/')));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
})

// listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
