const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(require("./routes/apiRoute"));

app.all("*", (req, res, next) => {
  next(new errorHandler(404, `Can't find ${req.originalUrl} on this server!`));
});
connectDB();

app.use((err,req,res,next)=>{
  err.statusCode= err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    statusCode:err.statusCode,
    message:err.message
  });
  next();
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
